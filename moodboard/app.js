/**
 * Remix 3D (V19) — Infinite Mind Map Engine
 * Utilitarian, fast, high contrast.
 * Handles infinite pan/zoom, sub-sections, draggable cards, full-size image lightbox,
 * curved bezier lines, world-space pen drawing, clipboard paste, and text/PNG export.
 */

// ==========================================================================
// 1. Global State & DOM Elements
// ==========================================================================
const viewport = document.getElementById('viewport');
const world = document.getElementById('world');
const nodesContainer = document.getElementById('nodes-container');
const sectionsLayer = document.getElementById('sections-layer');
const connectionsSvg = document.getElementById('connections-svg');
const drawingCanvas = document.getElementById('drawing-canvas');
const drawCtx = drawingCanvas.getContext('2d');
const toastMessage = document.getElementById('toast-message');
const itemCountBadge = document.getElementById('item-count-badge');
const zoomLevelText = document.getElementById('zoom-level-text');

// Catalog elements
const catalogDrawer = document.getElementById('catalog-drawer');
const catalogList = document.getElementById('catalog-list');
const catalogSearchInput = document.getElementById('catalog-search-input');
const btnToggleCatalog = document.getElementById('btn-toggle-catalog');
const btnCloseCatalog = document.getElementById('btn-close-catalog');

// Lightbox elements
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxFilename = document.getElementById('lightbox-filename');
const lightboxCategory = document.getElementById('lightbox-category');
const lightboxBody = document.getElementById('lightbox-body');
const lightboxImageWrap = document.getElementById('lightbox-image-wrap');
const lightboxZoomVal = document.getElementById('lightbox-zoom-val');

// Text modal elements
const textModal = document.getElementById('text-modal');
const textTitleInput = document.getElementById('text-title-input');
const textInput = document.getElementById('text-input');

// Pen drawing toolbar elements
const drawToolbar = document.getElementById('draw-toolbar');
const btnToggleDraw = document.getElementById('btn-toggle-draw');
const btnCloseDraw = document.getElementById('btn-close-draw');
const btnEraser = document.getElementById('btn-eraser');
const btnUndoDraw = document.getElementById('btn-undo-draw');
const btnClearDraw = document.getElementById('btn-clear-draw');

// Core Data Structures
let items = []; // { id, type: 'image'|'text', title, content, x, y, width, height, sectionId, tagColor, meta }
let connections = []; // { id, from: id, to: id }
let drawingStrokes = []; // [{ color, size, isEraser, points: [{x, y}] }]
let manifestData = null; // Loaded from screenshots-manifest.json
let activeCatalogTab = 'all';

// Transform State (Infinite Canvas)
let panX = 80;
let panY = 80;
let scale = 0.85;
const MIN_SCALE = 0.15;
const MAX_SCALE = 2.5;

// Dragging & Interaction State
let isPanning = false;
let panStart = { x: 0, y: 0 };
let draggedItem = null;
let dragOffset = { x: 0, y: 0 };
let connectionStartItem = null;
let tempConnectingLine = null;
let currentMouseWorld = { x: 0, y: 0 };

// Pen Drawing State
let isDrawingMode = false;
let isPainting = false;
let currentDrawColor = '#38bdf8';
let currentDrawSize = 4;
let isEraser = false;
let currentStroke = null;

// Lightbox State
let lightboxScale = 1.0;
let lightboxPan = { x: 0, y: 0 };
let isLightboxPanning = false;
let lightboxPanStart = { x: 0, y: 0 };
let currentInspectingItem = null;

// ==========================================================================
// 2. Coordinate Transformations (Screen <-> World)
// ==========================================================================
function screenToWorld(sx, sy) {
    const rect = viewport.getBoundingClientRect();
    const vx = sx - rect.left;
    const vy = sy - rect.top;
    return {
        x: (vx - panX) / scale,
        y: (vy - panY) / scale
    };
}

function worldToScreen(wx, wy) {
    const rect = viewport.getBoundingClientRect();
    return {
        x: wx * scale + panX + rect.left,
        y: wy * scale + panY + rect.top
    };
}

function updateWorldTransform() {
    world.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
    zoomLevelText.innerText = `${Math.round(scale * 100)}%`;
    const gridSize = Math.max(8, 40 * scale);
    viewport.style.backgroundPosition = `${panX}px ${panY}px`;
    viewport.style.backgroundSize = `${gridSize}px ${gridSize}px`;
    redrawInkCanvas();
}

function setZoom(newScale, centerScreenX, centerScreenY) {
    const clampedScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
    if (clampedScale === scale) return;

    const rect = viewport.getBoundingClientRect();
    const cx = centerScreenX !== undefined ? centerScreenX - rect.left : rect.width / 2;
    const cy = centerScreenY !== undefined ? centerScreenY - rect.top : rect.height / 2;

    // Keep world coordinate under pointer fixed during zoom
    const wx = (cx - panX) / scale;
    const wy = (cy - panY) / scale;

    scale = clampedScale;
    panX = cx - wx * scale;
    panY = cy - wy * scale;

    updateWorldTransform();
}

function fitAllContent() {
    if (items.length === 0) {
        panX = 80;
        panY = 80;
        scale = 0.85;
        updateWorldTransform();
        return;
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    items.forEach(i => {
        const w = i.width || 280;
        const h = i.height || 220;
        minX = Math.min(minX, i.x);
        minY = Math.min(minY, i.y);
        maxX = Math.max(maxX, i.x + w);
        maxY = Math.max(maxY, i.y + h);
    });

    const padding = 100;
    const contentW = (maxX - minX) + padding * 2;
    const contentH = (maxY - minY) + padding * 2;
    const rect = viewport.getBoundingClientRect();

    const scaleX = rect.width / contentW;
    const scaleY = rect.height / contentH;
    scale = Math.max(MIN_SCALE, Math.min(1.0, Math.min(scaleX, scaleY)));

    panX = (rect.width - (maxX - minX) * scale) / 2 - minX * scale;
    panY = (rect.height - (maxY - minY) * scale) / 2 - minY * scale;

    updateWorldTransform();
    showToast('Fitted all items to screen');
}

// ==========================================================================
// 3. Pan & Zoom Event Handlers
// ==========================================================================
viewport.addEventListener('wheel', e => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.88;
    setZoom(scale * zoomFactor, e.clientX, e.clientY);
}, { passive: false });

viewport.addEventListener('pointerdown', e => {
    // Middle click or drag on background
    const isBackground = e.target === viewport || e.target === world || e.target.id === 'sections-layer';
    if (isDrawingMode) return;

    if (e.button === 1 || (e.button === 0 && isBackground) || e.spaceKey) {
        isPanning = true;
        panStart.x = e.clientX - panX;
        panStart.y = e.clientY - panY;
        viewport.classList.add('panning');
        try { viewport.setPointerCapture(e.pointerId); } catch (_) {}
    }
});

viewport.addEventListener('pointermove', e => {
    const worldPt = screenToWorld(e.clientX, e.clientY);
    currentMouseWorld = worldPt;

    if (isPanning) {
        panX = e.clientX - panStart.x;
        panY = e.clientY - panStart.y;
        updateWorldTransform();
        return;
    }

    if (draggedItem) {
        draggedItem.x = worldPt.x - dragOffset.x;
        draggedItem.y = worldPt.y - dragOffset.y;
        draggedItem.element.style.left = `${draggedItem.x}px`;
        draggedItem.element.style.top = `${draggedItem.y}px`;
        drawConnections();
        updateSectionFrames();
    }
});

function endPanOrDrag(e) {
    if (isPanning) {
        isPanning = false;
        viewport.classList.remove('panning');
        try { viewport.releasePointerCapture(e.pointerId); } catch (_) {}
    }
    if (draggedItem) {
        saveState();
        draggedItem = null;
        updateSectionFrames();
    }
}

viewport.addEventListener('pointerup', endPanOrDrag);
viewport.addEventListener('pointercancel', endPanOrDrag);

// Double-click on canvas to quickly drop a text note
viewport.addEventListener('dblclick', e => {
    if (e.target === viewport || e.target === world || e.target.id === 'sections-layer') {
        const pt = screenToWorld(e.clientX, e.clientY);
        openTextModal(pt.x, pt.y);
    }
});

// HUD Zoom Buttons
document.getElementById('btn-zoom-in').addEventListener('click', () => setZoom(scale * 1.2));
document.getElementById('btn-zoom-out').addEventListener('click', () => setZoom(scale * 0.8));
document.getElementById('btn-zoom-reset').addEventListener('click', () => {
    scale = 1.0;
    updateWorldTransform();
});
document.getElementById('btn-zoom-fit').addEventListener('click', fitAllContent);

// ==========================================================================
// 4. Sub-Sections Layout & Frames
// ==========================================================================
const SECTION_DEFS = {
    my_feedback: {
        id: 'my_feedback',
        title: '⭐ My Feedback & Requests ("What I Want")',
        description: 'Drop screenshots here, write change requests, and connect notes'
    },
    play_mode: {
        id: 'play_mode',
        title: 'Play Mode (Touch & Quick Tools)',
        description: 'Main dock, toybox, brush popouts, color picker, top bar'
    },
    pro_mode: {
        id: 'pro_mode',
        title: 'Pro Mode (5-Mode Rail Studio)',
        description: 'Select, Draw, Create 3D, Deform, Layers, Illumination'
    },
    universal_modals: {
        id: 'universal_modals',
        title: 'Universal Modals & Studios',
        description: 'DNA Inspector, Importer, Export, AR, Scaffolding, Raycasting'
    },
    brush_strokes: {
        id: 'brush_strokes',
        title: 'Brush Strokes on Canvas',
        description: 'Live demonstrations of all 10 brushes'
    },
    miscellaneous: {
        id: 'miscellaneous',
        title: 'Miscellaneous & System Checks',
        description: 'Screen verifications, diagnostics, sandbox variations'
    }
};

function updateSectionFrames() {
    sectionsLayer.innerHTML = '';

    // Group items by sectionId
    const groups = {};
    items.forEach(item => {
        const sid = item.sectionId || 'miscellaneous';
        if (!groups[sid]) groups[sid] = [];
        groups[sid].push(item);
    });

    // Also ensure my_feedback section always has a frame even if empty
    if (!groups['my_feedback']) groups['my_feedback'] = [];

    Object.keys(groups).forEach(sid => {
        const sectionItems = groups[sid];
        const def = SECTION_DEFS[sid] || { id: sid, title: sid };

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        if (sectionItems.length > 0) {
            sectionItems.forEach(i => {
                const w = i.width || 280;
                const h = i.height || 220;
                minX = Math.min(minX, i.x);
                minY = Math.min(minY, i.y);
                maxX = Math.max(maxX, i.x + w);
                maxY = Math.max(maxY, i.y + h);
            });
        } else if (sid === 'my_feedback') {
            // Default placeholder position for feedback zone
            minX = 100;
            minY = 100;
            maxX = 750;
            maxY = 550;
        } else {
            return;
        }

        const pad = 24;
        const frame = document.createElement('div');
        frame.className = `section-frame ${sid === 'my_feedback' ? 'active-zone' : ''}`;
        frame.style.left = `${minX - pad}px`;
        frame.style.top = `${minY - pad}px`;
        frame.style.width = `${(maxX - minX) + pad * 2}px`;
        frame.style.height = `${(maxY - minY) + pad * 2}px`;

        const header = document.createElement('div');
        header.className = 'section-frame-header';
        header.innerHTML = `<span>${def.title}</span> <span class="section-count">(${sectionItems.length} items)</span>`;
        frame.appendChild(header);

        sectionsLayer.appendChild(frame);
    });
}

function autoLayoutAllSections() {
    if (items.length === 0) {
        showToast('No items to arrange. Open the Screenshot Library to load items.');
        return;
    }

    // Two-row layout configuration
    const row1Sections = ['play_mode', 'pro_mode', 'universal_modals'];
    const row2Sections = ['my_feedback', 'brush_strokes', 'miscellaneous'];

    const groups = {};
    [...row1Sections, ...row2Sections].forEach(sid => groups[sid] = []);

    items.forEach(item => {
        const sid = item.sectionId || 'miscellaneous';
        if (!groups[sid]) groups[sid] = [];
        groups[sid].push(item);
    });

    const CARD_WIDTH = 290;
    const CARD_GAP_X = 24;
    const CARD_GAP_Y = 24;
    const SECTION_SPACING_X = 140;
    const COLUMNS_PER_SECTION = 3;

    function layoutRow(sectionsList, startY) {
        let curX = 100;
        sectionsList.forEach(sid => {
            const sectionItems = groups[sid] || [];
            let col = 0;
            let row = 0;
            const topY = startY + 60;

            sectionItems.forEach((item) => {
                item.x = curX + col * (CARD_WIDTH + CARD_GAP_X);
                item.y = topY + row * (230 + CARD_GAP_Y);
                item.element.style.left = `${item.x}px`;
                item.element.style.top = `${item.y}px`;

                col++;
                if (col >= COLUMNS_PER_SECTION) {
                    col = 0;
                    row++;
                }
            });

            const sectionCols = Math.max(1, Math.min(COLUMNS_PER_SECTION, sectionItems.length));
            const secW = sectionCols * (CARD_WIDTH + CARD_GAP_X);
            curX += Math.max(secW, 3 * (CARD_WIDTH + CARD_GAP_X)) + SECTION_SPACING_X;
        });
    }

    layoutRow(row1Sections, 100);
    layoutRow(row2Sections, 1000);

    drawConnections();
    updateSectionFrames();
    saveState();
    fitAllContent();
    showToast('Auto-arranged mind map into clean sub-sections');
}

document.getElementById('btn-auto-layout').addEventListener('click', autoLayoutAllSections);

// ==========================================================================
// 5. Mind Map Item Creation (Images & Text Nodes)
// ==========================================================================
function genId() {
    return 'node_' + Math.random().toString(36).substr(2, 9);
}

function updateItemCount() {
    itemCountBadge.innerText = `${items.length} items`;
}

function createItemElement(data) {
    const { id, type, title, content, x, y, sectionId, tagColor, meta } = data;

    const div = document.createElement('div');
    div.className = `mindmap-node ${type === 'image' ? 'image-node' : 'text-node'} ${tagColor ? 'note-' + tagColor : ''}`;
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    div.dataset.id = id;

    // Header
    const header = document.createElement('div');
    header.className = 'node-header';

    const titleWrap = document.createElement('div');
    titleWrap.className = 'node-title-wrap';

    const titleEl = document.createElement('span');
    titleEl.className = 'node-title';
    titleEl.innerText = title || (type === 'image' ? 'Screenshot' : 'Note');
    titleWrap.appendChild(titleEl);

    const tools = document.createElement('div');
    tools.className = 'node-tools';

    // Image inspect button
    if (type === 'image') {
        const viewBtn = document.createElement('button');
        viewBtn.className = 'node-btn';
        viewBtn.title = 'Inspect Full Size Image';
        viewBtn.innerHTML = '🔍';
        viewBtn.onclick = (e) => {
            e.stopPropagation();
            openLightbox(data);
        };
        tools.appendChild(viewBtn);
    }

    // Connect button
    const connectBtn = document.createElement('button');
    connectBtn.className = 'node-btn';
    connectBtn.title = 'Connect with curving line';
    connectBtn.innerHTML = '🔗';
    connectBtn.onclick = (e) => {
        e.stopPropagation();
        handleConnectClick(itemObj);
    };
    tools.appendChild(connectBtn);

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'node-btn delete-btn';
    delBtn.title = 'Remove card';
    delBtn.innerHTML = '×';
    delBtn.onclick = (e) => {
        e.stopPropagation();
        deleteItem(id);
    };
    tools.appendChild(delBtn);

    header.appendChild(titleWrap);
    header.appendChild(tools);
    div.appendChild(header);

    // Body
    if (type === 'image') {
        const wrap = document.createElement('div');
        wrap.className = 'image-preview-wrap';
        const img = document.createElement('img');
        img.src = content;
        img.loading = 'lazy';
        img.alt = title || 'Screenshot';

        const overlay = document.createElement('div');
        overlay.className = 'image-zoom-overlay';
        overlay.innerText = 'Click to inspect full size';

        wrap.appendChild(img);
        wrap.appendChild(overlay);
        wrap.onclick = (e) => {
            if (e.altKey) {
                handleConnectClick(itemObj);
            } else {
                openLightbox(itemObj);
            }
        };
        div.appendChild(wrap);
    } else {
        const body = document.createElement('div');
        body.className = 'node-body';

        const textarea = document.createElement('textarea');
        textarea.value = content || '';
        textarea.placeholder = 'Type what you want changed or reviewed...';
        textarea.oninput = () => {
            itemObj.content = textarea.value;
            saveState();
        };
        body.appendChild(textarea);
        div.appendChild(body);
    }

    // Dragging handle on header
    header.addEventListener('pointerdown', e => {
        if (e.button !== 0) return;
        if (e.target.closest('.node-btn')) return;

        if (e.altKey) {
            handleConnectClick(itemObj);
            e.preventDefault();
            return;
        }

        draggedItem = itemObj;
        const worldPt = screenToWorld(e.clientX, e.clientY);
        dragOffset.x = worldPt.x - itemObj.x;
        dragOffset.y = worldPt.y - itemObj.y;

        // Bring to front
        const maxZ = Math.max(...items.map(i => parseInt(i.element.style.zIndex || 10)), 10);
        div.style.zIndex = maxZ + 1;
        e.preventDefault();
    });

    nodesContainer.appendChild(div);

    const itemObj = {
        id,
        type,
        title: title || 'Item',
        content,
        x,
        y,
        width: type === 'image' ? 280 : 240,
        height: type === 'image' ? 210 : 140,
        sectionId: sectionId || 'my_feedback',
        tagColor: tagColor || 'yellow',
        meta: meta || {},
        element: div
    };

    items.push(itemObj);
    updateItemCount();
    updateSectionFrames();
    return itemObj;
}

function deleteItem(id) {
    const idx = items.findIndex(i => i.id === id);
    if (idx > -1) {
        items[idx].element.remove();
        items.splice(idx, 1);
        connections = connections.filter(c => c.from !== id && c.to !== id);
        if (connectionStartItem && connectionStartItem.id === id) {
            connectionStartItem = null;
        }
        drawConnections();
        updateSectionFrames();
        updateItemCount();
        saveState();
        showToast('Card removed');
    }
}

// ==========================================================================
// 6. Curving Bezier Connection Lines
// ==========================================================================
function handleConnectClick(itemObj) {
    if (!connectionStartItem) {
        connectionStartItem = itemObj;
        itemObj.element.classList.add('connecting');
        showToast(`Selected "${itemObj.title}". Now click another card to link with a curving line.`);
    } else {
        if (connectionStartItem.id !== itemObj.id) {
            const exists = connections.some(c =>
                (c.from === connectionStartItem.id && c.to === itemObj.id) ||
                (c.to === connectionStartItem.id && c.from === itemObj.id)
            );

            if (!exists) {
                connections.push({
                    id: 'conn_' + Math.random().toString(36).substr(2, 9),
                    from: connectionStartItem.id,
                    to: itemObj.id
                });
                showToast(`Connected "${connectionStartItem.title}" to "${itemObj.title}"`);
            } else {
                // Toggle off connection
                connections = connections.filter(c =>
                    !((c.from === connectionStartItem.id && c.to === itemObj.id) ||
                      (c.to === connectionStartItem.id && c.from === itemObj.id))
                );
                showToast('Removed connection line');
            }
            drawConnections();
            saveState();
        }
        connectionStartItem.element.classList.remove('connecting');
        connectionStartItem = null;
    }
}

function drawConnections() {
    connectionsSvg.innerHTML = '';

    connections.forEach(conn => {
        const fromItem = items.find(i => i.id === conn.from);
        const toItem = items.find(i => i.id === conn.to);

        if (fromItem && toItem) {
            const w1 = fromItem.width || 280;
            const h1 = fromItem.height || 210;
            const w2 = toItem.width || 280;
            const h2 = toItem.height || 210;

            const x1 = fromItem.x + w1 / 2;
            const y1 = fromItem.y + h1 / 2;
            const x2 = toItem.x + w2 / 2;
            const y2 = toItem.y + h2 / 2;

            // Compute smooth horizontal S-curve
            const dx = Math.abs(x2 - x1) * 0.5;
            const cx1 = x1 + (x2 > x1 ? dx : -dx);
            const cy1 = y1;
            const cx2 = x2 - (x2 > x1 ? dx : -dx);
            const cy2 = y2;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`);
            path.setAttribute('class', 'connection-line');
            path.setAttribute('fill', 'none');
            path.title = 'Click to delete connection';

            path.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Delete this connection line?')) {
                    connections = connections.filter(c => c.id !== conn.id);
                    drawConnections();
                    saveState();
                }
            });

            connectionsSvg.appendChild(path);
        }
    });
}

// ==========================================================================
// 7. Freehand Pen Drawing Mode (World-Space)
// ==========================================================================
function resizeDrawingCanvas() {
    // Canvas dimensions are world dimensions
    drawingCanvas.width = 100000;
    drawingCanvas.height = 100000;
    redrawInkCanvas();
}

function redrawInkCanvas() {
    drawCtx.setTransform(1, 0, 0, 1, 0, 0);
    drawCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

    drawingStrokes.forEach(stroke => {
        if (!stroke.points || stroke.points.length === 0) return;
        drawCtx.save();
        drawCtx.lineCap = 'round';
        drawCtx.lineJoin = 'round';
        drawCtx.lineWidth = stroke.size;

        if (stroke.isEraser) {
            drawCtx.globalCompositeOperation = 'destination-out';
            drawCtx.strokeStyle = 'rgba(0,0,0,1)';
            drawCtx.fillStyle = 'rgba(0,0,0,1)';
        } else {
            drawCtx.globalCompositeOperation = 'source-over';
            drawCtx.strokeStyle = stroke.color;
            drawCtx.fillStyle = stroke.color;
        }

        const pts = stroke.points;
        // World coordinates are centered around 50000, 50000 offset of canvas
        const offsetX = 50000;
        const offsetY = 50000;

        if (pts.length === 1) {
            drawCtx.beginPath();
            drawCtx.arc(pts[0].x + offsetX, pts[0].y + offsetY, stroke.size / 2, 0, Math.PI * 2);
            drawCtx.fill();
        } else {
            drawCtx.beginPath();
            drawCtx.moveTo(pts[0].x + offsetX, pts[0].y + offsetY);
            for (let i = 1; i < pts.length; i++) {
                drawCtx.lineTo(pts[i].x + offsetX, pts[i].y + offsetY);
            }
            drawCtx.stroke();
        }
        drawCtx.restore();
    });
}

function setDrawingMode(active) {
    isDrawingMode = active;
    viewport.classList.toggle('drawing-mode', isDrawingMode);
    drawToolbar.classList.toggle('hidden', !isDrawingMode);
    btnToggleDraw.classList.toggle('active', isDrawingMode);

    if (isDrawingMode) {
        showToast('Pen Mode Active: Draw freehand sketches anywhere on the canvas');
    } else {
        showToast('Exited Pen Mode');
    }
}

btnToggleDraw.addEventListener('click', () => setDrawingMode(!isDrawingMode));
btnCloseDraw.addEventListener('click', () => setDrawingMode(false));

// Pen Toolbar interactions
document.querySelectorAll('.color-swatch').forEach(btn => {
    btn.addEventListener('click', () => {
        isEraser = false;
        btnEraser.classList.remove('active');
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        currentDrawColor = btn.dataset.color;
    });
});

btnEraser.addEventListener('click', () => {
    isEraser = !isEraser;
    btnEraser.classList.toggle('active', isEraser);
    if (isEraser) {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
    } else {
        const activeColor = document.querySelector(`.color-swatch[data-color="${currentDrawColor}"]`);
        if (activeColor) activeColor.classList.add('active');
    }
});

document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDrawSize = parseInt(btn.dataset.size, 10);
    });
});

btnUndoDraw.addEventListener('click', () => {
    if (drawingStrokes.length > 0) {
        drawingStrokes.pop();
        redrawInkCanvas();
        saveDrawingState();
    }
});

btnClearDraw.addEventListener('click', () => {
    if (drawingStrokes.length > 0 && confirm('Clear all ink strokes?')) {
        drawingStrokes = [];
        redrawInkCanvas();
        saveDrawingState();
        showToast('Cleared all pen drawings');
    }
});

// Pen pointer events
viewport.addEventListener('pointerdown', e => {
    if (!isDrawingMode || e.button !== 0) return;
    isPainting = true;

    const worldPt = screenToWorld(e.clientX, e.clientY);
    currentStroke = {
        color: currentDrawColor,
        size: currentDrawSize,
        isEraser: isEraser,
        points: [{ x: worldPt.x, y: worldPt.y }]
    };
    drawingStrokes.push(currentStroke);

    drawCtx.save();
    drawCtx.setTransform(1, 0, 0, 1, 0, 0);
    drawCtx.lineCap = 'round';
    drawCtx.lineJoin = 'round';
    drawCtx.lineWidth = currentDrawSize;

    if (isEraser) {
        drawCtx.globalCompositeOperation = 'destination-out';
        drawCtx.fillStyle = 'rgba(0,0,0,1)';
    } else {
        drawCtx.globalCompositeOperation = 'source-over';
        drawCtx.fillStyle = currentDrawColor;
    }

    drawCtx.beginPath();
    drawCtx.arc(worldPt.x + 50000, worldPt.y + 50000, currentDrawSize / 2, 0, Math.PI * 2);
    drawCtx.fill();
    drawCtx.restore();
});

viewport.addEventListener('pointermove', e => {
    if (!isDrawingMode || !isPainting || !currentStroke) return;

    const worldPt = screenToWorld(e.clientX, e.clientY);
    const prevPt = currentStroke.points[currentStroke.points.length - 1];
    currentStroke.points.push({ x: worldPt.x, y: worldPt.y });

    drawCtx.save();
    drawCtx.setTransform(1, 0, 0, 1, 0, 0);
    drawCtx.lineCap = 'round';
    drawCtx.lineJoin = 'round';
    drawCtx.lineWidth = currentStroke.size;

    if (currentStroke.isEraser) {
        drawCtx.globalCompositeOperation = 'destination-out';
        drawCtx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
        drawCtx.globalCompositeOperation = 'source-over';
        drawCtx.strokeStyle = currentStroke.color;
    }

    drawCtx.beginPath();
    drawCtx.moveTo(prevPt.x + 50000, prevPt.y + 50000);
    drawCtx.lineTo(worldPt.x + 50000, worldPt.y + 50000);
    drawCtx.stroke();
    drawCtx.restore();
});

function finishPainting() {
    if (isPainting) {
        isPainting = false;
        currentStroke = null;
        saveDrawingState();
    }
}

viewport.addEventListener('pointerup', finishPainting);
viewport.addEventListener('pointercancel', finishPainting);

function saveDrawingState() {
    try {
        localStorage.setItem('mindmap_drawings', JSON.stringify(drawingStrokes));
    } catch (_) {}
}

function loadDrawingState() {
    try {
        const saved = localStorage.getItem('mindmap_drawings');
        if (saved) {
            drawingStrokes = JSON.parse(saved);
            redrawInkCanvas();
        }
    } catch (_) {}
}

// ==========================================================================
// 8. Full-Size Lightbox Modal (Zoom & Pan Image Details)
// ==========================================================================
function openLightbox(item) {
    currentInspectingItem = item;
    lightboxImg.src = item.content;
    lightboxTitle.innerText = item.title;
    lightboxFilename.innerText = item.meta?.filename || 'screenshot.png';
    lightboxCategory.innerText = item.meta?.category || item.sectionId || 'Screenshot';

    lightboxScale = 1.0;
    lightboxPan = { x: 0, y: 0 };
    updateLightboxTransform();

    lightboxModal.classList.remove('hidden');
}

function closeLightbox() {
    lightboxModal.classList.add('hidden');
    currentInspectingItem = null;
}

function updateLightboxTransform() {
    lightboxImageWrap.style.transform = `translate(${lightboxPan.x}px, ${lightboxPan.y}px) scale(${lightboxScale})`;
    lightboxZoomVal.innerText = `${Math.round(lightboxScale * 100)}%`;
}

document.getElementById('btn-lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-overlay').addEventListener('click', closeLightbox);

document.getElementById('btn-lightbox-zoom-in').addEventListener('click', () => {
    lightboxScale = Math.min(4.0, lightboxScale * 1.25);
    updateLightboxTransform();
});

document.getElementById('btn-lightbox-zoom-out').addEventListener('click', () => {
    lightboxScale = Math.max(0.25, lightboxScale * 0.8);
    updateLightboxTransform();
});

document.getElementById('btn-lightbox-reset').addEventListener('click', () => {
    lightboxScale = 1.0;
    lightboxPan = { x: 0, y: 0 };
    updateLightboxTransform();
});

// Wheel zoom inside lightbox
lightboxBody.addEventListener('wheel', e => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.85;
    lightboxScale = Math.max(0.25, Math.min(5.0, lightboxScale * factor));
    updateLightboxTransform();
}, { passive: false });

// Pan inside lightbox
lightboxBody.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    isLightboxPanning = true;
    lightboxPanStart.x = e.clientX - lightboxPan.x;
    lightboxPanStart.y = e.clientY - lightboxPan.y;
    lightboxBody.classList.add('panning');
});

lightboxBody.addEventListener('pointermove', e => {
    if (isLightboxPanning) {
        lightboxPan.x = e.clientX - lightboxPanStart.x;
        lightboxPan.y = e.clientY - lightboxPanStart.y;
        updateLightboxTransform();
    }
});

function endLightboxPan() {
    isLightboxPanning = false;
    lightboxBody.classList.remove('panning');
}
lightboxBody.addEventListener('pointerup', endLightboxPan);
lightboxBody.addEventListener('pointercancel', endLightboxPan);

// Lightbox "Add Note" button creates a connected note next to the inspected screenshot!
document.getElementById('btn-lightbox-add-note').addEventListener('click', () => {
    if (currentInspectingItem) {
        const targetItem = currentInspectingItem;
        closeLightbox();

        const noteX = targetItem.x + (targetItem.width || 280) + 40;
        const noteY = targetItem.y;

        const newNote = createItemElement({
            id: genId(),
            type: 'text',
            title: `Note: ${targetItem.title}`,
            content: '',
            x: noteX,
            y: noteY,
            sectionId: targetItem.sectionId,
            tagColor: 'yellow'
        });

        connections.push({
            id: 'conn_' + Math.random().toString(36).substr(2, 9),
            from: targetItem.id,
            to: newNote.id
        });

        drawConnections();
        saveState();

        // Focus the newly created note's textarea
        setTimeout(() => {
            const ta = newNote.element.querySelector('textarea');
            if (ta) ta.focus();
        }, 100);

        showToast(`Added note connected to "${targetItem.title}"`);
    }
});

// Escape key to close modal or drawer
window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (!lightboxModal.classList.contains('hidden')) {
            closeLightbox();
        } else if (!textModal.classList.contains('hidden')) {
            textModal.classList.add('hidden');
        } else if (!catalogDrawer.classList.contains('hidden')) {
            catalogDrawer.classList.add('hidden');
        } else if (isDrawingMode) {
            setDrawingMode(false);
        }
    }
});

// ==========================================================================
// 9. Text Note Creation Modal
// ==========================================================================
let pendingNotePos = { x: 100, y: 100 };
let selectedNoteColor = 'yellow';

function openTextModal(worldX, worldY) {
    pendingNotePos = { x: worldX, y: worldY };
    textTitleInput.value = '';
    textInput.value = '';
    textModal.classList.remove('hidden');
    setTimeout(() => textTitleInput.focus(), 80);
}

document.getElementById('btn-add-text').addEventListener('click', () => {
    const center = screenToWorld(window.innerWidth / 2, window.innerHeight / 2);
    openTextModal(center.x, center.y);
});

document.getElementById('btn-modal-cancel').addEventListener('click', () => {
    textModal.classList.add('hidden');
});

document.querySelectorAll('.note-color-opt').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.note-color-opt').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedNoteColor = btn.dataset.color;
    });
});

document.getElementById('btn-modal-add').addEventListener('click', () => {
    const title = textTitleInput.value.trim() || 'Mind Map Note';
    const content = textInput.value.trim();

    createItemElement({
        id: genId(),
        type: 'text',
        title,
        content,
        x: pendingNotePos.x,
        y: pendingNotePos.y,
        sectionId: 'my_feedback',
        tagColor: selectedNoteColor
    });

    saveState();
    textModal.classList.add('hidden');
    showToast(`Added note "${title}"`);
});

// ==========================================================================
// 10. Clipboard Paste & File Upload
// ==========================================================================
window.addEventListener('paste', e => {
    // If inside an active textarea/input, let normal paste proceed
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    const clipItems = e.clipboardData?.items;
    if (!clipItems) return;

    let handled = false;
    for (let i = 0; i < clipItems.length; i++) {
        const item = clipItems[i];
        if (item.type.indexOf('image') !== -1) {
            handled = true;
            const blob = item.getAsFile();
            const reader = new FileReader();
            reader.onload = ev => {
                const pt = currentMouseWorld.x ? currentMouseWorld : screenToWorld(window.innerWidth / 2, window.innerHeight / 2);
                createItemElement({
                    id: genId(),
                    type: 'image',
                    title: 'Pasted Screenshot',
                    content: ev.target.result,
                    x: pt.x,
                    y: pt.y,
                    sectionId: 'my_feedback'
                });
                saveState();
                showToast('Pasted image added to board');
            };
            reader.readAsDataURL(blob);
            break;
        }
    }

    if (!handled) {
        const text = e.clipboardData.getData('text/plain');
        if (text && text.trim().length > 0) {
            const pt = currentMouseWorld.x ? currentMouseWorld : screenToWorld(window.innerWidth / 2, window.innerHeight / 2);
            const lines = text.trim().split('\n');
            const title = lines[0].slice(0, 40);
            createItemElement({
                id: genId(),
                type: 'text',
                title: title || 'Pasted Note',
                content: text.trim(),
                x: pt.x,
                y: pt.y,
                sectionId: 'my_feedback',
                tagColor: 'yellow'
            });
            saveState();
            showToast('Pasted text note added to board');
        }
    }
});

// File upload button
const fileInput = document.getElementById('file-input');
document.getElementById('btn-upload-file').addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', e => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const center = screenToWorld(window.innerWidth / 2, window.innerHeight / 2);

    Array.from(files).forEach((file, index) => {
        const offsetX = index * 30;
        const offsetY = index * 30;

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = ev => {
                createItemElement({
                    id: genId(),
                    type: 'image',
                    title: file.name.replace(/\.[^/.]+$/, ""),
                    content: ev.target.result,
                    x: center.x + offsetX,
                    y: center.y + offsetY,
                    sectionId: 'my_feedback',
                    meta: { filename: file.name }
                });
                saveState();
            };
            reader.readAsDataURL(file);
        } else if (file.type.startsWith('text/') || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
            const reader = new FileReader();
            reader.onload = ev => {
                createItemElement({
                    id: genId(),
                    type: 'text',
                    title: file.name,
                    content: ev.target.result,
                    x: center.x + offsetX,
                    y: center.y + offsetY,
                    sectionId: 'my_feedback'
                });
                saveState();
            };
            reader.readAsText(file);
        }
    });

    fileInput.value = '';
    showToast(`Uploaded ${files.length} file(s) to board`);
});

// ==========================================================================
// 11. Screenshot Catalog Drawer (Browse & Load Sections)
// ==========================================================================
btnToggleCatalog.addEventListener('click', () => {
    catalogDrawer.classList.toggle('hidden');
    if (!catalogDrawer.classList.contains('hidden')) {
        renderCatalogItems();
    }
});

btnCloseCatalog.addEventListener('click', () => catalogDrawer.classList.add('hidden'));

document.querySelectorAll('.catalog-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.catalog-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeCatalogTab = tab.dataset.tab;
        renderCatalogItems();
    });
});

catalogSearchInput.addEventListener('input', renderCatalogItems);

function renderCatalogItems() {
    if (!manifestData || !manifestData.allFiles) return;

    const query = catalogSearchInput.value.toLowerCase().trim();
    let filtered = manifestData.allFiles;

    if (activeCatalogTab !== 'all') {
        filtered = filtered.filter(f => f.sectionId === activeCatalogTab);
    }

    if (query) {
        filtered = filtered.filter(f =>
            f.title.toLowerCase().includes(query) ||
            f.filename.toLowerCase().includes(query) ||
            f.sectionTitle.toLowerCase().includes(query)
        );
    }

    catalogList.innerHTML = '';

    if (filtered.length === 0) {
        catalogList.innerHTML = '<div class="text-subtle" style="padding: 20px; text-align: center;">No screenshots match search.</div>';
        return;
    }

    filtered.slice(0, 80).forEach(item => {
        const card = document.createElement('div');
        card.className = 'catalog-item-card';

        const thumb = document.createElement('img');
        thumb.className = 'catalog-thumb';
        thumb.src = item.url;
        thumb.alt = item.title;
        thumb.loading = 'lazy';

        const info = document.createElement('div');
        info.className = 'catalog-info';

        const title = document.createElement('div');
        title.className = 'catalog-title';
        title.innerText = item.title;

        const tag = document.createElement('div');
        tag.className = 'catalog-tag';
        tag.innerText = item.sectionTitle;

        info.appendChild(title);
        info.appendChild(tag);
        card.appendChild(thumb);
        card.appendChild(info);

        card.addEventListener('click', () => {
            const center = screenToWorld(window.innerWidth / 2, window.innerHeight / 2);
            createItemElement({
                id: genId(),
                type: 'image',
                title: item.title,
                content: item.url,
                x: center.x + Math.random() * 40 - 20,
                y: center.y + Math.random() * 40 - 20,
                sectionId: item.sectionId,
                meta: item
            });
            saveState();
            showToast(`Added "${item.title}" to board`);
        });

        catalogList.appendChild(card);
    });
}

// Load selected section button
document.getElementById('btn-add-filtered-to-board').addEventListener('click', () => {
    if (!manifestData || !manifestData.allFiles) return;

    let targetSection = activeCatalogTab === 'all' ? 'play_mode' : activeCatalogTab;
    const toAdd = manifestData.allFiles.filter(f => f.sectionId === targetSection);

    if (toAdd.length === 0) {
        showToast('No screenshots in selected section');
        return;
    }

    toAdd.forEach((item, i) => {
        // Only add if not already on board
        const exists = items.some(existing => existing.content === item.url);
        if (!exists) {
            createItemElement({
                id: genId(),
                type: 'image',
                title: item.title,
                content: item.url,
                x: 100 + (i % 4) * 310,
                y: 160 + Math.floor(i / 4) * 250,
                sectionId: item.sectionId,
                meta: item
            });
        }
    });

    saveState();
    autoLayoutAllSections();
    showToast(`Loaded "${SECTION_DEFS[targetSection]?.title || targetSection}" to board`);
});

// Load all 5 sections
document.getElementById('btn-load-all-sections').addEventListener('click', () => {
    loadAllSectionsFromManifest();
});

function loadAllSectionsFromManifest() {
    if (!manifestData || !manifestData.sections) return;

    items.forEach(i => i.element.remove());
    items = [];
    connections = [];

    // Prioritize representative curated screenshots for each section to prevent lagging
    manifestData.sections.forEach(sec => {
        // Take up to 8 representative screenshots per section
        const subset = sec.items.slice(0, 8);
        subset.forEach(item => {
            createItemElement({
                id: genId(),
                type: 'image',
                title: item.title,
                content: item.url,
                x: 0,
                y: 0,
                sectionId: item.sectionId,
                meta: item
            });
        });
    });

    // Add a default welcome sticky note in "My Feedback"
    const welcomeNote = createItemElement({
        id: genId(),
        type: 'text',
        title: '⭐ My Feedback & Notes',
        content: 'Welcome! Drag any screenshot here to review it. Add your notes, draw with the pen tool, or connect ideas with curving lines.',
        x: 140,
        y: 180,
        sectionId: 'my_feedback',
        tagColor: 'yellow'
    });

    // Create sample connection to demonstrate curving line
    const firstScreenshot = items.find(i => i.type === 'image');
    if (firstScreenshot) {
        connections.push({
            id: 'conn_' + Math.random().toString(36).substr(2, 9),
            from: firstScreenshot.id,
            to: welcomeNote.id
        });
    }

    autoLayoutAllSections();
    drawConnections();
    saveState();
    showToast('Loaded all 5 sections onto mind map');
}

// ==========================================================================
// 12. Save, Export PNG & Export Text
// ==========================================================================
function saveState() {
    const itemsData = items.map(i => ({
        id: i.id,
        type: i.type,
        title: i.title,
        content: i.content,
        x: i.x,
        y: i.y,
        width: i.width,
        height: i.height,
        sectionId: i.sectionId,
        tagColor: i.tagColor,
        meta: i.meta
    }));

    try {
        localStorage.setItem('mindmap_items_v19', JSON.stringify(itemsData));
        localStorage.setItem('mindmap_connections_v19', JSON.stringify(connections));
        localStorage.setItem('mindmap_view_v19', JSON.stringify({ panX, panY, scale }));
    } catch (e) {
        console.warn('Could not save mind map state', e);
    }
}

document.getElementById('btn-save-local').addEventListener('click', () => {
    saveState();
    saveDrawingState();
    showToast('Mind Map successfully saved locally');
});

// Export as Text (Markdown Outline)
document.getElementById('btn-export-text').addEventListener('click', () => {
    let md = `# Remix 3D (V19) — Mind Map Review & Feedback Outline\n`;
    md += `*Exported on: ${new Date().toLocaleString()}*\n\n`;

    const groups = {};
    Object.keys(SECTION_DEFS).forEach(sid => groups[sid] = []);

    items.forEach(i => {
        const sid = i.sectionId || 'miscellaneous';
        if (!groups[sid]) groups[sid] = [];
        groups[sid].push(i);
    });

    Object.keys(groups).forEach(sid => {
        const sectionItems = groups[sid];
        if (sectionItems.length === 0) return;
        const def = SECTION_DEFS[sid] || { title: sid };

        md += `## ${def.title}\n\n`;

        sectionItems.forEach(item => {
            if (item.type === 'text') {
                md += `### Note: ${item.title}\n`;
                md += `${item.content || '(empty note)'}\n\n`;
            } else {
                md += `- **Screenshot:** ${item.title} (${item.meta?.relPath || item.content})\n`;
            }

            // List connected items
            const outgoing = connections
                .filter(c => c.from === item.id)
                .map(c => items.find(other => other.id === c.to))
                .filter(Boolean);

            if (outgoing.length > 0) {
                md += `  - *Connected To:*\n`;
                outgoing.forEach(out => {
                    md += `    - ${out.title} (${out.type})\n`;
                });
            }
        });
        md += `\n---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'remix3d-mindmap-feedback.md';
    link.click();
    showToast('Exported Mind Map text outline (.md)');
});

// Export as PNG
document.getElementById('btn-export-png').addEventListener('click', () => {
    const btn = document.getElementById('btn-export-png');
    const originalText = btn.innerText;
    btn.innerText = 'Generating...';
    btn.disabled = true;

    showToast('Capturing high-resolution PNG export...');

    // Reset zoom temporarily or render full body
    const isLight = document.documentElement.classList.contains('light');
    const bg = isLight ? '#f4f4f5' : '#090a0f';

    html2canvas(document.body, {
        backgroundColor: bg,
        useCORS: true,
        scale: 2,
        ignoreElements: el => el.dataset.html2canvasIgnore === 'true'
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'remix3d-mindmap.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('PNG successfully exported!');
    }).catch(err => {
        console.error('PNG export failed', err);
        alert('PNG export failed due to browser canvas restrictions. Try zooming to fit first.');
    }).finally(() => {
        btn.innerText = originalText;
        btn.disabled = false;
    });
});

// Clear board
document.getElementById('btn-clear-board').addEventListener('click', () => {
    if (confirm('Clear the entire board (cards, lines, and ink)? This cannot be undone.')) {
        items.forEach(i => i.element.remove());
        items = [];
        connections = [];
        drawingStrokes = [];
        redrawInkCanvas();
        drawConnections();
        updateSectionFrames();
        updateItemCount();
        saveState();
        saveDrawingState();
        showToast('Board cleared');
    }
});

// Theme handling
function applyTheme(theme) {
    const isLight = theme === 'light';
    document.documentElement.classList.toggle('light', isLight);
    document.documentElement.classList.toggle('dark', !isLight);
    document.body.classList.toggle('light', isLight);
    document.body.classList.toggle('dark', !isLight);
    document.getElementById('btn-theme-toggle').innerText = isLight ? 'Theme: Light' : 'Theme: Dark';
}

function toggleTheme() {
    const isLight = document.documentElement.classList.contains('light');
    const next = isLight ? 'dark' : 'light';
    localStorage.setItem('mody_theme', next);
    applyTheme(next);
}

document.getElementById('btn-theme-toggle').addEventListener('click', toggleTheme);

function showToast(msg) {
    toastMessage.innerText = msg;
    const toast = document.getElementById('status-toast');
    toast.style.opacity = '1';
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.style.opacity = '0.7';
    }, 4000);
}

// ==========================================================================
// 13. Initialization
// ==========================================================================
async function init() {
    applyTheme(localStorage.getItem('mody_theme') || 'dark');
    resizeDrawingCanvas();
    loadDrawingState();

    // Fetch screenshot manifest
    try {
        const res = await fetch('/screenshots-manifest.json');
        if (res.ok) {
            manifestData = await res.json();
            console.log(`Loaded manifest with ${manifestData.totalScreenshots} screenshots.`);
        }
    } catch (e) {
        console.warn('Could not fetch /screenshots-manifest.json', e);
    }

    // Load saved items
    const savedItemsStr = localStorage.getItem('mindmap_items_v19');
    const savedConnectionsStr = localStorage.getItem('mindmap_connections_v19');
    const savedViewStr = localStorage.getItem('mindmap_view_v19');

    if (savedViewStr) {
        try {
            const v = JSON.parse(savedViewStr);
            panX = v.panX || 80;
            panY = v.panY || 80;
            scale = v.scale || 0.85;
        } catch (_) {}
    }

    updateWorldTransform();

    if (savedItemsStr) {
        try {
            const parsed = JSON.parse(savedItemsStr);
            if (Array.isArray(parsed) && parsed.length > 0) {
                parsed.forEach(item => createItemElement(item));
            } else {
                loadAllSectionsFromManifest();
            }
        } catch (_) {
            loadAllSectionsFromManifest();
        }
    } else {
        loadAllSectionsFromManifest();
    }

    if (savedConnectionsStr) {
        try {
            connections = JSON.parse(savedConnectionsStr);
            drawConnections();
        } catch (_) {}
    }

    updateSectionFrames();
    showToast('Mind Map Ready · Drag background to pan · Scroll to zoom · Paste images or text anytime');
}

window.addEventListener('load', init);
window.addEventListener('resize', () => {
    resizeDrawingCanvas();
    drawConnections();
});
