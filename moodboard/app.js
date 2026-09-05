const board = document.getElementById('board');
const svg = document.getElementById('connections');
let items = []; // { id, x, y, src, element }
let connections = []; // { from: id, to: id }
let draggedItem = null;
let offset = { x: 0, y: 0 };
let connectionStartItem = null;

// Drawing engine state
const drawingCanvas = document.getElementById('drawing-canvas');
const drawCtx = drawingCanvas.getContext('2d');
const drawToolbar = document.getElementById('draw-toolbar');
const toggleDrawBtn = document.getElementById('btn-toggle-draw');
const statusHint = document.getElementById('status-hint');
const eraserBtn = document.getElementById('btn-eraser');

let isDrawingMode = false;
let isPainting = false;
let currentDrawColor = '#38bdf8';
let currentDrawSize = 4;
let isEraser = false;
let drawingStrokes = []; // [{ color, size, isEraser, points: [{x, y}] }]
let currentStroke = null;
let dpr = window.devicePixelRatio || 1;

function resizeDrawingCanvas() {
    dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    drawingCanvas.width = Math.floor(width * dpr);
    drawingCanvas.height = Math.floor(height * dpr);
    drawingCanvas.style.width = width + 'px';
    drawingCanvas.style.height = height + 'px';
    redrawCanvas();
}

function redrawCanvas() {
    drawCtx.setTransform(1, 0, 0, 1, 0, 0);
    drawCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    drawCtx.scale(dpr, dpr);

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
        if (pts.length === 1) {
            drawCtx.beginPath();
            drawCtx.arc(pts[0].x, pts[0].y, stroke.size / 2, 0, Math.PI * 2);
            drawCtx.fill();
        } else {
            drawCtx.beginPath();
            drawCtx.moveTo(pts[0].x, pts[0].y);
            for (let i = 1; i < pts.length; i++) {
                drawCtx.lineTo(pts[i].x, pts[i].y);
            }
            drawCtx.stroke();
        }
        drawCtx.restore();
    });
}

function saveDrawingState() {
    try {
        localStorage.setItem('moodboard_drawings', JSON.stringify(drawingStrokes));
    } catch (e) {
        console.warn('Could not save drawings', e);
    }
}

function loadDrawingState() {
    try {
        const saved = localStorage.getItem('moodboard_drawings');
        if (saved) {
            drawingStrokes = JSON.parse(saved);
            redrawCanvas();
        }
    } catch (e) {
        console.warn('Could not load drawings', e);
    }
}

function setDrawingMode(active) {
    isDrawingMode = active;
    if (isDrawingMode) {
        toggleDrawBtn.classList.add('active');
        toggleDrawBtn.innerText = 'Exit Draw';
        drawToolbar.classList.remove('hidden');
        drawingCanvas.classList.add('drawing-active');
        if (statusHint) {
            statusHint.innerText = 'Drawing Mode: sketch notes anywhere · Click Exit Draw when done';
        }
    } else {
        toggleDrawBtn.classList.remove('active');
        toggleDrawBtn.innerText = 'Draw Notes';
        drawToolbar.classList.add('hidden');
        drawingCanvas.classList.remove('drawing-active');
        if (statusHint) {
            statusHint.innerText = 'Paste image (Ctrl+V) · Drag to move · Alt+Click two items to connect';
        }
    }
}

function initDrawToolbar() {
    if (toggleDrawBtn) {
        toggleDrawBtn.addEventListener('click', () => {
            setDrawingMode(!isDrawingMode);
        });
    }

    document.querySelectorAll('.color-swatch').forEach(btn => {
        btn.addEventListener('click', () => {
            isEraser = false;
            if (eraserBtn) eraserBtn.classList.remove('active');
            document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            btn.classList.add('active');
            currentDrawColor = btn.dataset.color;
        });
    });

    if (eraserBtn) {
        eraserBtn.addEventListener('click', () => {
            isEraser = !isEraser;
            eraserBtn.classList.toggle('active', isEraser);
            if (isEraser) {
                document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            } else {
                const activeColorBtn = document.querySelector(`.color-swatch[data-color="${currentDrawColor}"]`);
                if (activeColorBtn) activeColorBtn.classList.add('active');
            }
        });
    }

    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentDrawSize = parseInt(btn.dataset.size, 10);
        });
    });

    const undoBtn = document.getElementById('btn-undo-draw');
    if (undoBtn) {
        undoBtn.addEventListener('click', () => {
            if (drawingStrokes.length > 0) {
                drawingStrokes.pop();
                redrawCanvas();
                saveDrawingState();
            }
        });
    }

    const clearDrawBtn = document.getElementById('btn-clear-draw');
    if (clearDrawBtn) {
        clearDrawBtn.addEventListener('click', () => {
            if (drawingStrokes.length > 0 && confirm('Clear all drawn notes on this board?')) {
                drawingStrokes = [];
                redrawCanvas();
                saveDrawingState();
            }
        });
    }

    // Pointer events on canvas
    drawingCanvas.addEventListener('pointerdown', e => {
        if (!isDrawingMode) return;
        if (e.button !== 0) return;
        isPainting = true;
        try {
            drawingCanvas.setPointerCapture(e.pointerId);
        } catch (_) {}

        const rect = drawingCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        currentStroke = {
            color: currentDrawColor,
            size: currentDrawSize,
            isEraser: isEraser,
            points: [{ x, y }]
        };
        drawingStrokes.push(currentStroke);

        drawCtx.save();
        drawCtx.setTransform(1, 0, 0, 1, 0, 0);
        drawCtx.scale(dpr, dpr);
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
        drawCtx.arc(x, y, currentDrawSize / 2, 0, Math.PI * 2);
        drawCtx.fill();
        drawCtx.restore();
    });

    drawingCanvas.addEventListener('pointermove', e => {
        if (!isDrawingMode || !isPainting || !currentStroke) return;
        const rect = drawingCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const prevPt = currentStroke.points[currentStroke.points.length - 1];
        currentStroke.points.push({ x, y });

        drawCtx.save();
        drawCtx.setTransform(1, 0, 0, 1, 0, 0);
        drawCtx.scale(dpr, dpr);
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
        drawCtx.moveTo(prevPt.x, prevPt.y);
        drawCtx.lineTo(x, y);
        drawCtx.stroke();
        drawCtx.restore();
    });

    function finishPainting(e) {
        if (isPainting) {
            isPainting = false;
            currentStroke = null;
            try {
                drawingCanvas.releasePointerCapture(e.pointerId);
            } catch (_) {}
            saveDrawingState();
        }
    }

    drawingCanvas.addEventListener('pointerup', finishPainting);
    drawingCanvas.addEventListener('pointercancel', finishPainting);
}

// Theme handling (syncs with App V19's mody_theme)
function getStoredTheme() {
    try {
        const saved = localStorage.getItem('mody_theme');
        if (saved === 'light' || saved === 'dark') return saved;
    } catch (_) {}
    return 'dark';
}

function applyTheme(theme) {
    const isLight = theme === 'light';
    document.documentElement.classList.toggle('light', isLight);
    document.documentElement.classList.toggle('dark', !isLight);
    document.body.classList.toggle('light', isLight);
    document.body.classList.toggle('dark', !isLight);
    const themeBtn = document.getElementById('btn-theme-toggle');
    if (themeBtn) {
        themeBtn.innerText = isLight ? 'Theme: Light' : 'Theme: Dark';
    }
}

function toggleTheme() {
    const isCurrentlyLight = document.documentElement.classList.contains('light');
    const nextTheme = isCurrentlyLight ? 'dark' : 'light';
    try {
        localStorage.setItem('mody_theme', nextTheme);
    } catch (_) {}
    applyTheme(nextTheme);
}

window.addEventListener('storage', (e) => {
    if (e.key === 'mody_theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        applyTheme(e.newValue);
    }
});

// Generate unique ID
function genId() {
    return Math.random().toString(36).substr(2, 9);
}

// Load state from local storage
function loadState() {
    applyTheme(getStoredTheme());
    const themeToggle = document.getElementById('btn-theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    resizeDrawingCanvas();
    loadDrawingState();
    initDrawToolbar();
    const savedItems = localStorage.getItem('moodboard_items');
    const savedConnections = localStorage.getItem('moodboard_connections');
    
    if (savedItems) {
        try {
            const parsedItems = JSON.parse(savedItems);
            parsedItems.forEach(item => {
                createItemElement(item.id, item.type || 'image', item.content || item.src, item.x, item.y);
            });
        } catch (e) {
            console.error('Error loading items from local storage', e);
        }
    }
    if (savedConnections) {
        try {
            connections = JSON.parse(savedConnections);
            // Verify connections still point to valid items
            connections = connections.filter(conn => 
                items.find(i => i.id === conn.from) && items.find(i => i.id === conn.to)
            );
            drawConnections();
        } catch (e) {
            console.error('Error loading connections from local storage', e);
        }
    }
}

// Save state to local storage
function saveState() {
    const itemsData = items.map(i => ({ id: i.id, type: i.type || 'image', content: i.content || i.src, x: i.x, y: i.y }));
    localStorage.setItem('moodboard_items', JSON.stringify(itemsData));
    localStorage.setItem('moodboard_connections', JSON.stringify(connections));
}

// Intercept paste event to read image data
window.addEventListener('paste', e => {
    const itemsList = e.clipboardData.items;
    let foundImage = false;
    for (let i = 0; i < itemsList.length; i++) {
        if (itemsList[i].type.indexOf('image') !== -1) {
            foundImage = true;
            const blob = itemsList[i].getAsFile();
            const reader = new FileReader();
            reader.onload = (event) => {
                const src = event.target.result;
                // Add new item slightly offset from center for visibility
                const offsetAmount = Math.random() * 40 - 20;
                const x = window.innerWidth / 2 - 100 + offsetAmount;
                const y = window.innerHeight / 2 - 100 + offsetAmount;
                createItemElement(genId(), 'image', src, x, y);
                saveState();
            };
            reader.readAsDataURL(blob);
            break; // Handle one image at a time
        }
    }
    if (!foundImage) {
        console.warn('No image data found in clipboard.');
    }
});

// Create and append an item to the board
function createItemElement(id, type, content, x, y) {
    const div = document.createElement('div');
    div.className = 'moodboard-item';
    div.style.left = x + 'px';
    div.style.top = y + 'px';
    div.dataset.id = id;
    // ensure new items are on top
    const maxZ = Math.max(...items.map(i => parseInt(i.element.style.zIndex || 0)), 10);
    div.style.zIndex = maxZ + 1;

    if (type === 'image') {
        const img = document.createElement('img');
        img.src = content;
        div.appendChild(img);
    } else if (type === 'text') {
        const textDiv = document.createElement('div');
        textDiv.className = 'moodboard-text';
        textDiv.innerText = content;
        div.appendChild(textDiv);
    }

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.innerHTML = '×';
    delBtn.setAttribute('data-html2canvas-ignore', 'true');
    delBtn.onclick = (e) => {
        e.stopPropagation();
        deleteItem(id);
    };
    div.appendChild(delBtn);
    board.appendChild(div);

    const itemObj = { id, type, content, x, y, element: div };
    items.push(itemObj);

    // Interaction handling
    div.addEventListener('mousedown', e => {
        if (e.button !== 0) return; // only left click
        
        // Handle Alt+Click for connecting nodes
        if (e.altKey) {
            handleConnectionClick(itemObj);
            e.preventDefault();
            return;
        }
        
        // Handle dragging
        draggedItem = itemObj;
        offset.x = e.clientX - itemObj.x;
        offset.y = e.clientY - itemObj.y;
        
        // Bring to front
        const newMaxZ = Math.max(...items.map(i => parseInt(i.element.style.zIndex || 0)), 10);
        div.style.zIndex = newMaxZ + 1;
        
        e.preventDefault(); // prevent native drag
    });

    // Touch support for dragging
    div.addEventListener('touchstart', e => {
        if (e.touches.length === 1 && !e.target.closest('.delete-btn')) {
            const touch = e.touches[0];
            draggedItem = itemObj;
            offset.x = touch.clientX - itemObj.x;
            offset.y = touch.clientY - itemObj.y;
            const newMaxZ = Math.max(...items.map(i => parseInt(i.element.style.zIndex || 0)), 10);
            div.style.zIndex = newMaxZ + 1;
        }
    }, { passive: true });

    return itemObj;
}

// Logic for connecting two nodes
function handleConnectionClick(itemObj) {
    if (!connectionStartItem) {
        connectionStartItem = itemObj;
        itemObj.element.classList.add('selected-for-connection');
    } else {
        // Only connect if it's a different node and connection doesn't exist
        const exists = connections.some(c => 
            (c.from === connectionStartItem.id && c.to === itemObj.id) ||
            (c.to === connectionStartItem.id && c.from === itemObj.id)
        );
        
        if (connectionStartItem.id !== itemObj.id && !exists) {
            connections.push({ from: connectionStartItem.id, to: itemObj.id });
            saveState();
            drawConnections();
        } else if (exists) {
            // Remove connection if it already exists (toggle)
            connections = connections.filter(c => 
                !((c.from === connectionStartItem.id && c.to === itemObj.id) ||
                  (c.to === connectionStartItem.id && c.from === itemObj.id))
            );
            saveState();
            drawConnections();
        }
        connectionStartItem.element.classList.remove('selected-for-connection');
        connectionStartItem = null;
    }
}

// Remove an item and its connections
function deleteItem(id) {
    const itemIndex = items.findIndex(i => i.id === id);
    if (itemIndex > -1) {
        items[itemIndex].element.remove();
        items.splice(itemIndex, 1);
        
        // Remove related connections
        connections = connections.filter(c => c.from !== id && c.to !== id);
        
        // Remove selection state if deleted while connecting
        if (connectionStartItem && connectionStartItem.id === id) {
            connectionStartItem = null;
        }
        
        saveState();
        drawConnections();
    }
}

// Dragging logic (Mouse + Touch)
window.addEventListener('mousemove', e => {
    if (draggedItem) {
        draggedItem.x = e.clientX - offset.x;
        draggedItem.y = e.clientY - offset.y;
        draggedItem.element.style.left = draggedItem.x + 'px';
        draggedItem.element.style.top = draggedItem.y + 'px';
        drawConnections();
    }
});

window.addEventListener('touchmove', e => {
    if (draggedItem && e.touches.length === 1) {
        const touch = e.touches[0];
        draggedItem.x = touch.clientX - offset.x;
        draggedItem.y = touch.clientY - offset.y;
        draggedItem.element.style.left = draggedItem.x + 'px';
        draggedItem.element.style.top = draggedItem.y + 'px';
        drawConnections();
    }
}, { passive: true });

// Drop logic
window.addEventListener('mouseup', () => {
    if (draggedItem) {
        saveState();
        draggedItem = null;
    }
});

window.addEventListener('touchend', () => {
    if (draggedItem) {
        saveState();
        draggedItem = null;
    }
});

// Drag-and-drop images from explorer or browser onto board
window.addEventListener('dragover', e => {
    e.preventDefault();
});

window.addEventListener('drop', e => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const x = e.clientX + (i * 24);
                    const y = e.clientY + (i * 24);
                    createItemElement(genId(), 'image', event.target.result, x, y);
                    saveState();
                };
                reader.readAsDataURL(file);
            }
        }
    }
});

// Draw SVG lines between connected nodes
function drawConnections() {
    svg.innerHTML = ''; // clear existing
    connections.forEach(conn => {
        const fromItem = items.find(i => i.id === conn.from);
        const toItem = items.find(i => i.id === conn.to);
        
        if (fromItem && toItem) {
            const fromRect = fromItem.element.getBoundingClientRect();
            const toRect = toItem.element.getBoundingClientRect();
            
            // Calculate center points
            const x1 = fromRect.left + fromRect.width / 2;
            const y1 = fromRect.top + fromRect.height / 2;
            const x2 = toRect.left + toRect.width / 2;
            const y2 = toRect.top + toRect.height / 2;

            // Calculate control points for a smooth S-curve
            const cx1 = (x1 + x2) / 2;
            const cy1 = y1;
            const cx2 = (x1 + x2) / 2;
            const cy2 = y2;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`);
            path.setAttribute('class', 'connection-line');
            path.setAttribute('fill', 'none'); // Crucial so SVG paths don't auto-fill
            
            svg.appendChild(path);
        }
    });
}

// Handle window resize to redraw lines and resize drawing canvas
window.addEventListener('resize', () => {
    resizeDrawingCanvas();
    drawConnections();
});

// Clear entire board
document.getElementById('btn-clear').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the entire moodboard (cards, connections, and drawn notes)? This cannot be undone.')) {
        items.forEach(i => i.element.remove());
        items = [];
        connections = [];
        drawingStrokes = [];
        redrawCanvas();
        saveState();
        saveDrawingState();
        drawConnections();
    }
});

// Export board as PNG
document.getElementById('btn-export').addEventListener('click', () => {
    const btn = document.getElementById('btn-export');
    const originalText = btn.innerText;
    const isLight = document.documentElement.classList.contains('light');
    const uniformBg = isLight ? '#f4f0e9' : '#0f1117';

    // Use html2canvas
    html2canvas(document.body, {
        backgroundColor: uniformBg,
        useCORS: true, // Attempt to handle cross-origin images
        scale: window.devicePixelRatio || 2 // Higher quality
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'moodboard.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(err => {
        console.error('Export failed:', err);
        alert('Failed to export image. Some external images might block exporting due to CORS.');
    }).finally(() => {
        btn.innerText = originalText;
        btn.disabled = false;
    });
});

// Deselect connection if clicking empty space
window.addEventListener('mousedown', (e) => {
    if (connectionStartItem && !e.target.closest('.moodboard-item')) {
        connectionStartItem.element.classList.remove('selected-for-connection');
        connectionStartItem = null;
    }
});

// Text Modal Logic
const textModal = document.getElementById('text-modal');
const textInput = document.getElementById('text-input');

document.getElementById('btn-add-text').addEventListener('click', () => {
    textModal.classList.remove('hidden');
    textInput.value = '';
    setTimeout(() => textInput.focus(), 100);
});

document.getElementById('btn-modal-cancel').addEventListener('click', () => {
    textModal.classList.add('hidden');
});

document.getElementById('btn-modal-add').addEventListener('click', () => {
    const content = textInput.value.trim();
    if (content) {
        const offsetAmount = Math.random() * 40 - 20;
        const x = window.innerWidth / 2 - 100 + offsetAmount;
        const y = window.innerHeight / 2 - 100 + offsetAmount;
        createItemElement(genId(), 'text', content, x, y);
        saveState();
    }
    textModal.classList.add('hidden');
});

// Initialize
window.addEventListener('load', loadState);
