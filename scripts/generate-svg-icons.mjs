import fs from 'node:fs';
import path from 'node:path';

const TARGET_DIR = 'E:\\X\\AiStudio Workflow\\V19\\public\\icons';

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

function makeSvg(innerElements) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  ${innerElements.trim()}
</svg>
`;
}

export const icons = [
  // ==========================================
  // 01 PRIMARY
  // ==========================================
  {
    name: 'primary-home',
    category: 'Primary',
    svg: `<path d="M3 10.5L12 3l9 7.5v9.5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5H9v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />`
  },
  {
    name: 'primary-scene',
    category: 'Primary',
    svg: `<path d="M12 2.5 19.5 6.8v8.7L12 19.8 4.5 15.5V6.8Z" /><path d="M12 11.2V19.8M12 11.2 4.5 6.8M12 11.2l7.5-4.4" />`
  },
  {
    name: 'primary-add',
    category: 'Primary',
    svg: `<line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />`
  },
  {
    name: 'primary-open',
    category: 'Primary',
    svg: `<path d="M4 4h5l2 3h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />`
  },
  {
    name: 'primary-save',
    category: 'Primary',
    svg: `<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />`
  },
  {
    name: 'primary-import',
    category: 'Primary',
    svg: `<line x1="12" y1="3" x2="12" y2="15" /><polyline points="7 10 12 15 17 10" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />`
  },
  {
    name: 'primary-export',
    category: 'Primary',
    svg: `<line x1="12" y1="15" x2="12" y2="3" /><polyline points="7 8 12 3 17 8" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />`
  },
  {
    name: 'primary-share',
    category: 'Primary',
    svg: `<circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />`
  },
  {
    name: 'primary-image',
    category: 'Primary',
    svg: `<rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 20" />`
  },
  {
    name: 'primary-camera',
    category: 'Primary',
    svg: `<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />`
  },
  {
    name: 'primary-more',
    category: 'Primary',
    svg: `<circle cx="12" cy="5" r="1.5" fill="currentColor" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /><circle cx="12" cy="19" r="1.5" fill="currentColor" />`
  },

  // ==========================================
  // 02 EDIT
  // ==========================================
  {
    name: 'edit-undo',
    category: 'Edit',
    svg: `<path d="M3 8v5h5" /><path d="M3 13a9 9 0 0 1 15.36-6.36A9 9 0 0 1 21 16" />`
  },
  {
    name: 'edit-redo',
    category: 'Edit',
    svg: `<path d="M21 8v5h-5" /><path d="M21 13a9 9 0 0 0-15.36-6.36A9 9 0 0 0 3 16" />`
  },
  {
    name: 'edit-settings',
    category: 'Edit',
    svg: `<circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />`
  },
  {
    name: 'edit-preferences',
    category: 'Edit',
    svg: `<line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /><circle cx="9" cy="8" r="2.5" fill="#1e293b" /><circle cx="15" cy="16" r="2.5" fill="#1e293b" />`
  },
  {
    name: 'edit-crop',
    category: 'Edit',
    svg: `<path d="M6 2v14a2 2 0 0 0 2 2h14" /><path d="M18 22V8a2 2 0 0 0-2-2H2" />`
  },
  {
    name: 'edit-copy',
    category: 'Edit',
    svg: `<rect x="8" y="8" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />`
  },
  {
    name: 'edit-paste',
    category: 'Edit',
    svg: `<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" />`
  },
  {
    name: 'edit-delete',
    category: 'Edit',
    svg: `<polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />`
  },
  {
    name: 'edit-select',
    category: 'Edit',
    svg: `<path d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4" />`
  },
  {
    name: 'edit-cut',
    category: 'Edit',
    svg: `<circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" />`
  },
  {
    name: 'edit-duplicate',
    category: 'Edit',
    svg: `<rect x="7" y="7" width="12" height="12" rx="2" /><path d="M4 16V4a2 2 0 0 1 2-2h12" /><line x1="19" y1="19" x2="19" y2="23" /><line x1="17" y1="21" x2="21" y2="21" />`
  },

  // ==========================================
  // 03 TOOLS & DRAWING
  // ==========================================
  {
    name: 'tools-draw',
    category: 'Tools',
    svg: `<path d="M18 2l4 4-13 13H5v-4L18 2z" /><path d="M14 6l4 4" />`
  },
  {
    name: 'tools-brush',
    category: 'Tools',
    svg: `<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /><path d="M7 16c-2 1-3 3-3 4.5A2.5 2.5 0 0 0 6.5 23C8 23 10 22 11 20l-4-4z" />`
  },
  {
    name: 'tools-erase',
    category: 'Tools',
    svg: `<path d="M18 13l-5.5 5.5a2.12 2.12 0 0 1-3 0L3.5 12.5a2.12 2.12 0 0 1 0-3L9 4l9 9z" /><line x1="6.5" y1="15.5" x2="19" y2="15.5" />`
  },
  {
    name: 'tools-fill',
    category: 'Tools',
    svg: `<path d="M19 11l-8-8-8 8 8 8 8-8z" /><path d="M5 9l8 8" /><path d="M21 16c0 1.5-1.5 3-2 3s-2-1.5-2-3c0-1 2-3 2-3s2 2 2 3z" />`
  },
  {
    name: 'tools-color-picker',
    category: 'Tools',
    svg: `<path d="m14 7 3 3m-9 9-4 1 1-4 10-10a2.12 2.12 0 0 1 3 3L8 16z" /><path d="m16 5 2-2a1.5 1.5 0 0 1 2.1 2.1l-2 2" />`
  },
  {
    name: 'tools-focus',
    category: 'Tools',
    svg: `<circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" fill="currentColor" />`
  },
  {
    name: 'tools-lasso',
    category: 'Tools',
    svg: `<path d="M7 22a5 5 0 0 1-2-9.6A8 8 0 1 1 18 17a6 6 0 0 1-5 2" /><circle cx="6" cy="19" r="2" />`
  },
  {
    name: 'tools-line',
    category: 'Tools',
    svg: `<line x1="4" y1="20" x2="20" y2="4" />`
  },
  {
    name: 'tools-curve',
    category: 'Tools',
    svg: `<path d="M4 18C7 7 17 7 20 18" /><circle cx="4" cy="18" r="2" fill="currentColor" /><circle cx="12" cy="9.5" r="2" fill="currentColor" /><circle cx="20" cy="18" r="2" fill="currentColor" />`
  },
  {
    name: 'tools-measure',
    category: 'Tools',
    svg: `<rect x="4" y="5" width="16" height="6" rx="1" transform="rotate(45 12 12)" /><line x1="8.5" y1="7.5" x2="10" y2="9" /><line x1="11" y1="10" x2="13" y2="12" /><line x1="13.5" y1="12.5" x2="16" y2="15" />`
  },
  {
    name: 'tools-text',
    category: 'Tools',
    svg: `<polyline points="4 7 4 4 20 4 20 7" /><line x1="12" y1="4" x2="12" y2="20" /><line x1="9" y1="20" x2="15" y2="20" />`
  },

  // ==========================================
  // 04 BRUSH OPTIONS
  // ==========================================
  {
    name: 'brush-size',
    category: 'Brush Options',
    svg: `<circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" fill="currentColor" />`
  },
  {
    name: 'brush-flow',
    category: 'Brush Options',
    svg: `<circle cx="12" cy="12" r="8" stroke-dasharray="2 3" />`
  },
  {
    name: 'brush-smoothing',
    category: 'Brush Options',
    svg: `<path d="M3 15c4 0 5-6 9-6s5 6 9 6" />`
  },
  {
    name: 'brush-spacing',
    category: 'Brush Options',
    svg: `<circle cx="7" cy="7" r="2" fill="currentColor" /><circle cx="17" cy="7" r="2" fill="currentColor" /><circle cx="7" cy="17" r="2" fill="currentColor" /><circle cx="17" cy="17" r="2" fill="currentColor" />`
  },
  {
    name: 'brush-opacity',
    category: 'Brush Options',
    svg: `<circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />`
  },
  {
    name: 'brush-hardness',
    category: 'Brush Options',
    svg: `<circle cx="12" cy="12" r="8" stroke-width="1.5" /><circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.8" />`
  },
  {
    name: 'brush-texture',
    category: 'Brush Options',
    svg: `<rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" /><rect x="3" y="3" width="6" height="6" fill="currentColor" /><rect x="15" y="3" width="6" height="6" fill="currentColor" /><rect x="9" y="9" width="6" height="6" fill="currentColor" /><rect x="3" y="15" width="6" height="6" fill="currentColor" /><rect x="15" y="15" width="6" height="6" fill="currentColor" />`
  },
  {
    name: 'brush-pattern',
    category: 'Brush Options',
    svg: `<rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="9" y2="3" /><line x1="3" y1="15" x2="15" y2="3" /><line x1="3" y1="21" x2="21" y2="3" /><line x1="9" y1="21" x2="21" y2="9" /><line x1="15" y1="21" x2="21" y2="15" />`
  },
  {
    name: 'brush-stabilize',
    category: 'Brush Options',
    svg: `<path d="M3 12h2c2-7 4-7 6 0s4 7 6 0h5" />`
  },

  // ==========================================
  // 05 QUICK ACTIONS
  // ==========================================
  {
    name: 'quick-select',
    category: 'Quick Actions',
    svg: `<path d="M12 4a8 8 0 1 0 8 8" stroke-dasharray="2 3" /><polygon points="12 12 12 21 16 17 21 17" fill="currentColor" />`
  },
  {
    name: 'quick-magic-select',
    category: 'Quick Actions',
    svg: `<path d="m14 5 5 5L7 22l-5-5z" /><path d="M18 2v3M2 10h3M21 7l-2 1M6 2 4 4" />`
  },
  {
    name: 'quick-sample-color',
    category: 'Quick Actions',
    svg: `<path d="m14 7 3 3m-9 9-4 1 1-4 10-10a2.12 2.12 0 0 1 3 3L8 16z" />`
  },
  {
    name: 'quick-flood-fill',
    category: 'Quick Actions',
    svg: `<path d="M18 10l-7-7-7 7 7 7 7-7z" /><path d="M19 14c1 1.5 2 3.5 2 5a3 3 0 0 1-6 0c0-1.5 1-3.5 2-5l2-2z" fill="currentColor" />`
  },
  {
    name: 'quick-smart-fill',
    category: 'Quick Actions',
    svg: `<path d="M19 11l-8-8-8 8 8 8 8-8z" /><path d="M19 2v3M22 3.5h-6" />`
  },
  {
    name: 'quick-clear',
    category: 'Quick Actions',
    svg: `<path d="M18 13l-5.5 5.5a2.12 2.12 0 0 1-3 0L3.5 12.5a2.12 2.12 0 0 1 0-3L9 4l9 9z" /><line x1="2" y1="22" x2="22" y2="2" />`
  },
  {
    name: 'quick-expand',
    category: 'Quick Actions',
    svg: `<rect x="5" y="5" width="14" height="14" rx="2" stroke-dasharray="3 3" /><polyline points="15 3 21 3 21 9" /><line x1="14" y1="10" x2="21" y2="3" />`
  },
  {
    name: 'quick-contract',
    category: 'Quick Actions',
    svg: `<rect x="5" y="5" width="14" height="14" rx="2" stroke-dasharray="3 3" /><polyline points="19 13 13 13 13 19" /><line x1="20" y1="6" x2="14" y2="12" />`
  },
  {
    name: 'quick-invert',
    category: 'Quick Actions',
    svg: `<rect x="7" y="7" width="13" height="13" rx="2" /><rect x="4" y="4" width="13" height="13" rx="2" fill="currentColor" opacity="0.3" />`
  },
  {
    name: 'quick-symmetry',
    category: 'Quick Actions',
    svg: `<line x1="12" y1="2" x2="12" y2="22" stroke-dasharray="2 2" /><polygon points="10 6 3 18 10 18" /><polygon points="14 6 21 18 14 18" />`
  },

  // ==========================================
  // 06 VIEWPORT
  // ==========================================
  {
    name: 'viewport-orbit',
    category: 'Viewport',
    svg: `<circle cx="12" cy="12" r="7" /><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(-25 12 12)" />`
  },
  {
    name: 'viewport-pan',
    category: 'Viewport',
    svg: `<path d="M18 11V6a2 2 0 0 0-4 0v4M14 10V4a2 2 0 0 0-4 0v6M10 10V6a2 2 0 0 0-4 0v8a7 7 0 0 0 14 0v-3a2 2 0 0 0-4 0" />`
  },
  {
    name: 'viewport-dolly',
    category: 'Viewport',
    svg: `<circle cx="12" cy="12" r="2.5" /><polyline points="9 7 12 4 15 7" /><polyline points="9 17 12 20 15 17" /><line x1="12" y1="4" x2="12" y2="9.5" /><line x1="12" y1="14.5" x2="12" y2="20" />`
  },
  {
    name: 'viewport-zoom-in',
    category: 'Viewport',
    svg: `<circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />`
  },
  {
    name: 'viewport-zoom-out',
    category: 'Viewport',
    svg: `<circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" />`
  },
  {
    name: 'viewport-frame-selected',
    category: 'Viewport',
    svg: `<path d="M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3" /><circle cx="12" cy="12" r="2" fill="currentColor" />`
  },
  {
    name: 'viewport-fit-view',
    category: 'Viewport',
    svg: `<path d="M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3" />`
  },
  {
    name: 'viewport-perspective',
    category: 'Viewport',
    svg: `<path d="M3 7 12 3l9 4-3 12-6 2-6-2Z" /><path d="M12 3v18M3 7l9 6 9-6" />`
  },
  {
    name: 'viewport-orthographic',
    category: 'Viewport',
    svg: `<path d="M12 2.5 19.5 6.8v8.7L12 19.8 4.5 15.5V6.8Z" /><path d="M12 11.2V19.8M12 11.2 4.5 6.8M12 11.2l7.5-4.4" />`
  },
  {
    name: 'viewport-fullscreen',
    category: 'Viewport',
    svg: `<polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><polyline points="21 15 21 21 15 21" /><polyline points="3 9 3 3 9 3" />`
  },

  // ==========================================
  // 07 CAMERA VIEWS
  // ==========================================
  {
    name: 'camera-front',
    category: 'Camera Views',
    svg: `<rect x="4" y="6" width="16" height="14" rx="1" /><polygon points="4 6 8 2 20 2 16 6" /><polygon points="20 2 20 16 16 20 16 6" />`
  },
  {
    name: 'camera-back',
    category: 'Camera Views',
    svg: `<rect x="4" y="6" width="16" height="14" rx="1" stroke-dasharray="2 2" /><polygon points="4 6 8 2 20 2 16 6" /><polygon points="20 2 20 16 16 20 16 6" />`
  },
  {
    name: 'camera-left',
    category: 'Camera Views',
    svg: `<polygon points="4 6 12 3 12 17 4 20" /><polygon points="12 3 20 6 20 20 12 17" fill="currentColor" opacity="0.2" />`
  },
  {
    name: 'camera-right',
    category: 'Camera Views',
    svg: `<polygon points="4 6 12 3 12 17 4 20" fill="currentColor" opacity="0.2" /><polygon points="12 3 20 6 20 20 12 17" />`
  },
  {
    name: 'camera-top',
    category: 'Camera Views',
    svg: `<polygon points="12 4 21 10 12 16 3 10" /><path d="m3 10 9 6 9-6" /><polyline points="3 10 3 14 12 20 21 14 21 10" opacity="0.4" />`
  },
  {
    name: 'camera-bottom',
    category: 'Camera Views',
    svg: `<polyline points="3 8 12 2 21 8" opacity="0.4" /><polygon points="12 8 21 14 12 20 3 14" />`
  },
  {
    name: 'camera-isometric',
    category: 'Camera Views',
    svg: `<path d="M12 2.5 19.5 6.8v8.7L12 19.8 4.5 15.5V6.8Z" /><path d="M12 11.2V19.8M12 11.2 4.5 6.8M12 11.2l7.5-4.4" />`
  },
  {
    name: 'camera-perspective-camera',
    category: 'Camera Views',
    svg: `<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />`
  },
  {
    name: 'camera-lock',
    category: 'Camera Views',
    svg: `<path d="M20 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h4" /><circle cx="10" cy="13" r="3" /><rect x="16" y="13" width="7" height="8" rx="1" /><path d="M18 13V11a1.5 1.5 0 0 1 3 0v2" />`
  },
  {
    name: 'camera-safe-frame',
    category: 'Camera Views',
    svg: `<rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 8h10v8H7z" stroke-dasharray="2 2" /><line x1="12" y1="10" x2="12" y2="14" /><line x1="10" y1="12" x2="14" y2="12" />`
  },

  // ==========================================
  // 08 TRANSFORM
  // ==========================================
  {
    name: 'transform-move',
    category: 'Transform',
    svg: `<polyline points="5 9 2 12 5 15" /><polyline points="9 5 12 2 15 5" /><polyline points="15 19 12 22 9 19" /><polyline points="19 9 22 12 19 15" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="12" y1="2" x2="12" y2="22" />`
  },
  {
    name: 'transform-rotate',
    category: 'Transform',
    svg: `<path d="M21.5 2v6h-6" /><path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-1.42" />`
  },
  {
    name: 'transform-scale',
    category: 'Transform',
    svg: `<polyline points="15 3 21 3 21 9" /><line x1="14" y1="10" x2="21" y2="3" /><polyline points="9 21 3 21 3 15" /><line x1="10" y1="14" x2="3" y2="21" />`
  },
  {
    name: 'transform-uniform-scale',
    category: 'Transform',
    svg: `<path d="M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3" /><rect x="8" y="8" width="8" height="8" rx="1" />`
  },
  {
    name: 'transform-stretch',
    category: 'Transform',
    svg: `<polyline points="6 9 3 12 6 15" /><polyline points="18 9 21 12 18 15" /><line x1="3" y1="12" x2="21" y2="12" /><path d="M2 5h2v14H2M22 5h-2v14h2" />`
  },
  {
    name: 'transform-shear',
    category: 'Transform',
    svg: `<polygon points="7 19 13 5 21 5 15 19" /><polyline points="19 9 22 9 22 12" /><line x1="16" y1="15" x2="22" y2="9" />`
  },
  {
    name: 'transform-bend',
    category: 'Transform',
    svg: `<path d="M4 18c0-8 6-12 16-12v4c-7 0-12 3-12 8z" />`
  },
  {
    name: 'transform-twist',
    category: 'Transform',
    svg: `<ellipse cx="12" cy="5" rx="8" ry="2" /><ellipse cx="12" cy="10" rx="6" ry="1.8" /><ellipse cx="12" cy="15" rx="4" ry="1.5" /><ellipse cx="12" cy="19" rx="2" ry="1" />`
  },
  {
    name: 'transform-mirror',
    category: 'Transform',
    svg: `<line x1="12" y1="2" x2="12" y2="22" stroke-dasharray="2 2" /><polygon points="10 5 3 19 10 19" /><polygon points="14 5 21 19 14 19" />`
  },
  {
    name: 'transform-reset',
    category: 'Transform',
    svg: `<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><polyline points="3 3 3 8 8 8" />`
  },

  // ==========================================
  // 09 ALIGN & SNAP
  // ==========================================
  {
    name: 'align-left',
    category: 'Align & Snap',
    svg: `<line x1="4" y1="2" x2="4" y2="22" /><rect x="8" y="5" width="12" height="4" rx="1" /><rect x="8" y="11" width="8" height="4" rx="1" /><rect x="8" y="17" width="14" height="4" rx="1" />`
  },
  {
    name: 'align-center',
    category: 'Align & Snap',
    svg: `<line x1="12" y1="2" x2="12" y2="22" /><rect x="5" y="5" width="14" height="4" rx="1" /><rect x="7" y="11" width="10" height="4" rx="1" /><rect x="4" y="17" width="16" height="4" rx="1" />`
  },
  {
    name: 'align-right',
    category: 'Align & Snap',
    svg: `<line x1="20" y1="2" x2="20" y2="22" /><rect x="4" y="5" width="12" height="4" rx="1" /><rect x="8" y="11" width="8" height="4" rx="1" /><rect x="2" y="17" width="14" height="4" rx="1" />`
  },
  {
    name: 'align-distribute',
    category: 'Align & Snap',
    svg: `<rect x="3" y="4" width="4" height="16" rx="1" /><rect x="10" y="4" width="4" height="16" rx="1" /><rect x="17" y="4" width="4" height="16" rx="1" />`
  },
  {
    name: 'snap-grid',
    category: 'Align & Snap',
    svg: `<rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" />`
  },
  {
    name: 'snap-vertex',
    category: 'Align & Snap',
    svg: `<line x1="12" y1="5" x2="5" y2="18" /><line x1="12" y1="5" x2="19" y2="18" /><line x1="5" y1="18" x2="19" y2="18" /><circle cx="12" cy="5" r="2.5" fill="currentColor" /><circle cx="5" cy="18" r="2.5" fill="currentColor" /><circle cx="19" cy="18" r="2.5" fill="currentColor" />`
  },
  {
    name: 'snap-edge',
    category: 'Align & Snap',
    svg: `<line x1="4" y1="12" x2="20" y2="12" /><circle cx="4" cy="12" r="2.5" fill="currentColor" /><circle cx="20" cy="12" r="2.5" fill="currentColor" />`
  },
  {
    name: 'snap-face',
    category: 'Align & Snap',
    svg: `<path d="M12 2.5 19.5 6.8v8.7L12 19.8 4.5 15.5V6.8Z" /><path d="M12 11.2V19.8M12 11.2 4.5 6.8M12 11.2l7.5-4.4" /><circle cx="12" cy="6.8" r="2" fill="currentColor" />`
  },
  {
    name: 'snap-magnet',
    category: 'Align & Snap',
    svg: `<path d="M4 11V5a3 3 0 0 1 6 0v6a2 2 0 0 0 4 0V5a3 3 0 0 1 6 0v6a8 8 0 0 1-16 0z" /><line x1="4" y1="8" x2="10" y2="8" /><line x1="14" y1="8" x2="20" y2="8" />`
  },
  {
    name: 'snap-precision-mode',
    category: 'Align & Snap',
    svg: `<circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2" fill="currentColor" /><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" />`
  },

  // ==========================================
  // 10 MEASURE & GUIDES
  // ==========================================
  {
    name: 'measure-ruler',
    category: 'Measure & Guides',
    svg: `<rect x="4" y="5" width="16" height="6" rx="1" transform="rotate(45 12 12)" /><line x1="8.5" y1="7.5" x2="10" y2="9" /><line x1="11" y1="10" x2="13" y2="12" /><line x1="13.5" y1="12.5" x2="16" y2="15" />`
  },
  {
    name: 'measure-angle',
    category: 'Measure & Guides',
    svg: `<line x1="4" y1="20" x2="20" y2="20" /><line x1="4" y1="20" x2="16" y2="6" /><path d="M10 20a6 6 0 0 0-3-5" />`
  },
  {
    name: 'measure-distance',
    category: 'Measure & Guides',
    svg: `<circle cx="5" cy="19" r="2" /><circle cx="19" cy="5" r="2" /><line x1="6.5" y1="17.5" x2="17.5" y2="6.5" stroke-dasharray="2 2" />`
  },
  {
    name: 'measure-dimensions',
    category: 'Measure & Guides',
    svg: `<line x1="3" y1="5" x2="3" y2="19" /><line x1="21" y1="5" x2="21" y2="19" /><line x1="3" y1="12" x2="21" y2="12" /><polyline points="7 9 4 12 7 15" /><polyline points="17 9 20 12 17 15" />`
  },
  {
    name: 'measure-grid-toggle',
    category: 'Measure & Guides',
    svg: `<rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" />`
  },
  {
    name: 'measure-guides',
    category: 'Measure & Guides',
    svg: `<line x1="12" y1="2" x2="12" y2="22" stroke-dasharray="3 3" /><line x1="2" y1="12" x2="22" y2="12" stroke-dasharray="3 3" />`
  },
  {
    name: 'measure-origin',
    category: 'Measure & Guides',
    svg: `<circle cx="12" cy="12" r="4" /><line x1="12" y1="3" x2="12" y2="7" /><line x1="12" y1="17" x2="12" y2="21" /><line x1="3" y1="12" x2="7" y2="12" /><line x1="17" y1="12" x2="21" y2="12" />`
  },
  {
    name: 'measure-axis',
    category: 'Measure & Guides',
    svg: `<polyline points="12 4 12 16 20 20" /><line x1="12" y1="16" x2="4" y2="20" /><polyline points="10 6 12 4 14 6" /><polyline points="18 18 20 20 18 21" /><polyline points="6 21 4 20 6 18" />`
  },
  {
    name: 'measure-bounding-box',
    category: 'Measure & Guides',
    svg: `<path d="M12 3 19 7v10l-7 4-7-4V7z" stroke-dasharray="2 2" /><circle cx="12" cy="3" r="1.5" fill="currentColor" /><circle cx="19" cy="7" r="1.5" fill="currentColor" /><circle cx="19" cy="17" r="1.5" fill="currentColor" /><circle cx="12" cy="21" r="1.5" fill="currentColor" /><circle cx="5" cy="17" r="1.5" fill="currentColor" /><circle cx="5" cy="7" r="1.5" fill="currentColor" /><circle cx="12" cy="12" r="1.5" fill="currentColor" />`
  },
  {
    name: 'measure-protractor',
    category: 'Measure & Guides',
    svg: `<path d="M3 18h18A9 9 0 0 0 3 18z" /><circle cx="12" cy="18" r="1.5" fill="currentColor" /><line x1="12" y1="9" x2="12" y2="11" /><line x1="7" y1="11" x2="8.5" y2="12.5" /><line x1="17" y1="11" x2="15.5" y2="12.5" />`
  },

  // ==========================================
  // 11 SCENE & OBJECTS
  // ==========================================
  {
    name: 'scene-new',
    category: 'Scene',
    svg: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" />`
  },
  {
    name: 'scene-open',
    category: 'Scene',
    svg: `<path d="M4 4h5l2 3h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />`
  },
  {
    name: 'scene-save',
    category: 'Scene',
    svg: `<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" />`
  },
  {
    name: 'scene-list',
    category: 'Scene',
    svg: `<line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" /><line x1="9" y1="18" x2="20" y2="18" /><circle cx="4.5" cy="6" r="1.5" fill="currentColor" /><circle cx="4.5" cy="12" r="1.5" fill="currentColor" /><circle cx="4.5" cy="18" r="1.5" fill="currentColor" />`
  },
  {
    name: 'scene-environment',
    category: 'Scene',
    svg: `<circle cx="6" cy="7" r="2.5" /><path d="m3 19 6-8 4 5 3-3 5 6H3z" />`
  },
  {
    name: 'scene-background',
    category: 'Scene',
    svg: `<rect x="3" y="4" width="18" height="16" rx="2" /><polyline points="21 15 16 10 5 20" /><circle cx="8" cy="9" r="2" />`
  },
  {
    name: 'scene-ground',
    category: 'Scene',
    svg: `<polygon points="2 20 6 12 18 12 22 20" /><line x1="6" y1="16" x2="18" y2="16" /><line x1="10" y1="12" x2="8" y2="20" /><line x1="14" y1="12" x2="16" y2="20" />`
  },
  {
    name: 'scene-world',
    category: 'Scene',
    svg: `<circle cx="12" cy="12" r="9" /><line x1="3" y1="12" x2="21" y2="12" /><path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />`
  },
  {
    name: 'scene-collection',
    category: 'Scene',
    svg: `<polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 12 12 17 22 12" /><polyline points="2 17 12 22 22 17" />`
  },
  {
    name: 'scene-outliner',
    category: 'Scene',
    svg: `<rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="15" width="6" height="6" rx="1" /><rect x="3" y="15" width="6" height="6" rx="1" /><path d="M6 9v6M9 18h6" />`
  },

  // ==========================================
  // 12 OBJECTS
  // ==========================================
  {
    name: 'object-mesh',
    category: 'Objects',
    svg: `<path d="M12 2.5 19.5 6.8v8.7L12 19.8 4.5 15.5V6.8Z" /><path d="M12 11.2V19.8M12 11.2 4.5 6.8M12 11.2l7.5-4.4" stroke-dasharray="1 1" />`
  },
  {
    name: 'object-curve',
    category: 'Objects',
    svg: `<circle cx="5" cy="17" r="2" /><circle cx="19" cy="7" r="2" /><circle cx="11" cy="9" r="1.5" fill="currentColor" /><path d="M7 17c4 0 2-8 10-9" />`
  },
  {
    name: 'object-surface',
    category: 'Objects',
    svg: `<path d="M3 17c5-8 13-8 18 0" /><path d="M3 11c5-8 13-8 18 0" /><line x1="7" y1="16" x2="7" y2="10" /><line x1="12" y1="13" x2="12" y2="7" /><line x1="17" y1="16" x2="17" y2="10" />`
  },
  {
    name: 'object-text',
    category: 'Objects',
    svg: `<polyline points="4 7 4 4 20 4 20 7" /><line x1="12" y1="4" x2="12" y2="20" /><line x1="9" y1="20" x2="15" y2="20" />`
  },
  {
    name: 'object-image-plane',
    category: 'Objects',
    svg: `<polygon points="5 19 9 5 19 5 15 19" /><circle cx="12" cy="9" r="1.5" />`
  },
  {
    name: 'object-empty',
    category: 'Objects',
    svg: `<line x1="12" y1="12" x2="12" y2="3" /><line x1="12" y1="12" x2="4" y2="19" /><line x1="12" y1="12" x2="20" y2="19" /><circle cx="12" cy="12" r="1.5" fill="currentColor" />`
  },
  {
    name: 'object-instance',
    category: 'Objects',
    svg: `<rect x="4" y="4" width="10" height="10" rx="1" /><rect x="10" y="10" width="10" height="10" rx="1" stroke-dasharray="2 2" />`
  },
  {
    name: 'object-group',
    category: 'Objects',
    svg: `<path d="M8 2 12 4.5v5L8 12 4 9.5v-5Z" /><path d="M16 8 20 10.5v5l-4 2.5-4-2.5v-5Z" /><path d="M8 12 12 14.5v5l-4 2.5-4-2.5v-5Z" />`
  },
  {
    name: 'object-parent',
    category: 'Objects',
    svg: `<circle cx="12" cy="5" r="2.5" /><circle cx="6" cy="19" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="M12 7.5v4M12 11.5l-6 5M12 11.5l6 5" />`
  },
  {
    name: 'object-child',
    category: 'Objects',
    svg: `<circle cx="12" cy="5" r="2.5" /><circle cx="12" cy="19" r="2.5" /><line x1="12" y1="7.5" x2="12" y2="16.5" /><polyline points="9 13 12 16.5 15 13" />`
  },

  // ==========================================
  // 13 PRIMITIVES & SHAPES
  // ==========================================
  {
    name: 'primitive-plane',
    category: 'Primitives',
    svg: `<polygon points="12 4 22 10 12 16 2 10" />`
  },
  {
    name: 'primitive-cube',
    category: 'Primitives',
    svg: `<path d="M12 2.5 19.5 6.8v8.7L12 19.8 4.5 15.5V6.8Z" /><path d="M12 11.2V19.8M12 11.2 4.5 6.8M12 11.2l7.5-4.4" />`
  },
  {
    name: 'primitive-sphere',
    category: 'Primitives',
    svg: `<circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="9" ry="3.5" />`
  },
  {
    name: 'primitive-cylinder',
    category: 'Primitives',
    svg: `<ellipse cx="12" cy="6" rx="7" ry="2.5" /><path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" />`
  },
  {
    name: 'primitive-cone',
    category: 'Primitives',
    svg: `<ellipse cx="12" cy="18" rx="7" ry="2.5" /><path d="M5 18L12 4l7 14" />`
  },
  {
    name: 'primitive-torus',
    category: 'Primitives',
    svg: `<ellipse cx="12" cy="12" rx="9" ry="5" /><ellipse cx="12" cy="12" rx="4" ry="2" />`
  },
  {
    name: 'primitive-capsule',
    category: 'Primitives',
    svg: `<rect x="7" y="4" width="10" height="16" rx="5" />`
  },
  {
    name: 'primitive-pyramid',
    category: 'Primitives',
    svg: `<polygon points="12 3 20 18 4 18" /><line x1="12" y1="3" x2="12" y2="18" />`
  },
  {
    name: 'primitive-tube',
    category: 'Primitives',
    svg: `<ellipse cx="7" cy="8" rx="3" ry="5" transform="rotate(-45 7 8)" /><ellipse cx="17" cy="16" rx="3" ry="5" transform="rotate(-45 17 16)" /><line x1="8" y1="4" x2="18" y2="12" /><line x1="6" y1="12" x2="16" y2="20" />`
  },
  {
    name: 'primitive-ring',
    category: 'Primitives',
    svg: `<circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" />`
  },
  {
    name: 'shape-square',
    category: 'Shapes',
    svg: `<rect x="4" y="4" width="16" height="16" rx="2" />`
  },
  {
    name: 'shape-circle',
    category: 'Shapes',
    svg: `<circle cx="12" cy="12" r="8.5" />`
  },
  {
    name: 'shape-triangle',
    category: 'Shapes',
    svg: `<polygon points="12 4 21 19 3 19" />`
  },
  {
    name: 'shape-star',
    category: 'Shapes',
    svg: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />`
  },
  {
    name: 'shape-heart',
    category: 'Shapes',
    svg: `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />`
  },

  // ==========================================
  // 14 MODIFIERS
  // ==========================================
  {
    name: 'modifier-subdivide',
    category: 'Modifiers',
    svg: `<rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" />`
  },
  {
    name: 'modifier-bevel',
    category: 'Modifiers',
    svg: `<path d="M12 2.5 19.5 6.8v8.7L12 19.8 4.5 15.5V6.8Z" /><path d="M12 11.2V19.8M12 11.2 4.5 6.8M12 11.2l7.5-4.4" /><line x1="9" y1="4.2" x2="15" y2="4.2" stroke-width="3" />`
  },
  {
    name: 'modifier-extrude',
    category: 'Modifiers',
    svg: `<path d="M12 7 19 11v8l-7 4-7-4v-8Z" /><path d="M12 15v8M12 15 5 11M12 15l7-4" /><polyline points="9 5 12 2 15 5" /><line x1="12" y1="2" x2="12" y2="7" />`
  },
  {
    name: 'modifier-inset',
    category: 'Modifiers',
    svg: `<rect x="3" y="3" width="18" height="18" rx="2" /><rect x="7" y="7" width="10" height="10" rx="1" stroke-dasharray="2 2" />`
  },
  {
    name: 'modifier-solidify',
    category: 'Modifiers',
    svg: `<path d="M12 2.5 19.5 6.8v8.7L12 19.8 4.5 15.5V6.8Z" /><path d="M12 11.2V19.8M12 11.2 4.5 6.8M12 11.2l7.5-4.4" /><path d="M12 5.5 17 8.5v6L12 17.5 7 14.5v-6Z" stroke-dasharray="1 1" />`
  },
  {
    name: 'modifier-mirror',
    category: 'Modifiers',
    svg: `<line x1="12" y1="2" x2="12" y2="22" stroke-dasharray="2 2" /><polygon points="10 5 3 19 10 19" /><polygon points="14 5 21 19 14 19" />`
  },
  {
    name: 'modifier-array',
    category: 'Modifiers',
    svg: `<rect x="3" y="7" width="8" height="8" rx="1" /><rect x="8" y="5" width="8" height="8" rx="1" opacity="0.6" /><rect x="13" y="3" width="8" height="8" rx="1" opacity="0.3" />`
  },
  {
    name: 'modifier-boolean',
    category: 'Modifiers',
    svg: `<rect x="4" y="4" width="11" height="11" rx="2" /><rect x="9" y="9" width="11" height="11" rx="2" />`
  },
  {
    name: 'modifier-bend',
    category: 'Modifiers',
    svg: `<path d="M4 18c0-8 6-12 16-12v4c-7 0-12 3-12 8z" />`
  },
  {
    name: 'modifier-twist',
    category: 'Modifiers',
    svg: `<ellipse cx="12" cy="5" rx="8" ry="2" /><ellipse cx="12" cy="10" rx="6" ry="1.8" /><ellipse cx="12" cy="15" rx="4" ry="1.5" /><ellipse cx="12" cy="19" rx="2" ry="1" />`
  },

  // ==========================================
  // 15 ORGANIZATION
  // ==========================================
  {
    name: 'org-rename',
    category: 'Organization',
    svg: `<line x1="8" y1="4" x2="16" y2="4" /><line x1="8" y1="20" x2="16" y2="20" /><line x1="12" y1="4" x2="12" y2="20" />`
  },
  {
    name: 'org-duplicate',
    category: 'Organization',
    svg: `<rect x="8" y="8" width="12" height="12" rx="2" /><path d="M4 16V4a2 2 0 0 1 2-2h12" />`
  },
  {
    name: 'org-hide',
    category: 'Organization',
    svg: `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />`
  },
  {
    name: 'org-unhide',
    category: 'Organization',
    svg: `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />`
  },
  {
    name: 'org-lock',
    category: 'Organization',
    svg: `<rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />`
  },
  {
    name: 'org-freeze',
    category: 'Organization',
    svg: `<line x1="12" y1="2" x2="12" y2="22" /><line x1="3.34" y1="7" x2="20.66" y2="17" /><line x1="3.34" y1="17" x2="20.66" y2="7" /><polyline points="10 4 12 2 14 4" /><polyline points="10 20 12 22 14 20" />`
  },
  {
    name: 'org-center-pivot',
    category: 'Organization',
    svg: `<circle cx="12" cy="12" r="3" fill="currentColor" /><circle cx="12" cy="12" r="8" /><line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" />`
  },
  {
    name: 'org-reset-pivot',
    category: 'Organization',
    svg: `<circle cx="12" cy="12" r="2.5" fill="currentColor" /><path d="M21 12a9 9 0 1 1-9-9c2.5 0 4.8 1 6.5 2.7L21 8" /><polyline points="21 3 21 8 16 8" />`
  },
  {
    name: 'org-recenter',
    category: 'Organization',
    svg: `<circle cx="12" cy="12" r="2" fill="currentColor" /><polyline points="4 9 4 4 9 4" /><polyline points="20 9 20 4 15 4" /><polyline points="4 15 4 20 9 20" /><polyline points="20 15 20 20 15 20" />`
  },
  {
    name: 'org-delete',
    category: 'Organization',
    svg: `<polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />`
  },

  // ==========================================
  // 16 BRUSH TYPES
  // ==========================================
  {
    name: 'brush-type-pencil',
    category: 'Brush Types',
    svg: `<path d="M18 2l4 4-13 13H5v-4L18 2z" /><path d="M14 6l4 4" /><line x1="5" y1="19" x2="9" y2="19" />`
  },
  {
    name: 'brush-type-pen',
    category: 'Brush Types',
    svg: `<path d="M12 2 6 12l6 10 6-10Z" /><line x1="12" y1="2" x2="12" y2="14" /><circle cx="12" cy="14" r="1" fill="currentColor" />`
  },
  {
    name: 'brush-type-marker',
    category: 'Brush Types',
    svg: `<path d="M14 3 6 15l3 3 8-12z" /><polygon points="6 15 3 19 7 18" fill="currentColor" />`
  },
  {
    name: 'brush-type-paint-brush',
    category: 'Brush Types',
    svg: `<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /><path d="M7 16c-2 1-3 3-3 4.5A2.5 2.5 0 0 0 6.5 23C8 23 10 22 11 20l-4-4z" />`
  },
  {
    name: 'brush-type-airbrush',
    category: 'Brush Types',
    svg: `<path d="M4 14h5l2-2h6a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2h-3L12 4H9v4H4z" /><circle cx="21" cy="7" r="0.75" fill="currentColor" /><circle cx="23" cy="9" r="0.75" fill="currentColor" /><circle cx="22" cy="11" r="0.75" fill="currentColor" />`
  },
  {
    name: 'brush-type-calligraphy',
    category: 'Brush Types',
    svg: `<path d="m14 4-9 12 3 4 12-9z" /><line x1="5" y1="16" x2="8" y2="20" stroke-width="3" />`
  },
  {
    name: 'brush-type-crayon',
    category: 'Brush Types',
    svg: `<path d="M6 18 16 4l4 4-10 14z" /><polygon points="6 18 3 21 6 22" fill="currentColor" /><line x1="11" y1="11" x2="14" y2="14" />`
  },
  {
    name: 'brush-type-ink',
    category: 'Brush Types',
    svg: `<path d="m14 7 3 3m-9 9-4 1 1-4 10-10a2.12 2.12 0 0 1 3 3L8 16z" /><circle cx="5" cy="21" r="1.5" fill="currentColor" />`
  },
  {
    name: 'brush-type-chalk',
    category: 'Brush Types',
    svg: `<rect x="6" y="5" width="6" height="15" rx="1" transform="rotate(30 9 12)" /><circle cx="16" cy="18" r="0.75" fill="currentColor" /><circle cx="19" cy="19" r="0.75" fill="currentColor" />`
  },
  {
    name: 'brush-type-spray',
    category: 'Brush Types',
    svg: `<rect x="8" y="7" width="8" height="14" rx="2" /><rect x="10" y="3" width="4" height="4" rx="1" /><line x1="18" y1="4" x2="21" y2="2" /><line x1="18" y1="6" x2="22" y2="6" /><line x1="18" y1="8" x2="21" y2="10" />`
  },

  // ==========================================
  // 17 STROKE STYLES
  // ==========================================
  {
    name: 'stroke-solid',
    category: 'Stroke Styles',
    svg: `<line x1="3" y1="12" x2="21" y2="12" stroke-width="2.5" />`
  },
  {
    name: 'stroke-dashed',
    category: 'Stroke Styles',
    svg: `<line x1="3" y1="12" x2="21" y2="12" stroke-dasharray="4 3" stroke-width="2.5" />`
  },
  {
    name: 'stroke-dotted',
    category: 'Stroke Styles',
    svg: `<line x1="3" y1="12" x2="21" y2="12" stroke-dasharray="1 3" stroke-width="3" stroke-linecap="round" />`
  },
  {
    name: 'stroke-ribbon',
    category: 'Stroke Styles',
    svg: `<path d="M3 10c4-4 8 4 12 0s4 4 6 0" fill="none" stroke-width="2" /><path d="M3 14c4-4 8 4 12 0s4 4 6 0" fill="none" stroke-width="2" />`
  },
  {
    name: 'stroke-tube',
    category: 'Stroke Styles',
    svg: `<rect x="3" y="8" width="18" height="8" rx="4" />`
  },
  {
    name: 'stroke-taper',
    category: 'Stroke Styles',
    svg: `<polygon points="3 14 21 12 3 10" fill="currentColor" />`
  },
  {
    name: 'stroke-variable-width',
    category: 'Stroke Styles',
    svg: `<path d="M3 12c5-5 13-5 18 0-5 5-13 5-18 0z" fill="currentColor" />`
  },
  {
    name: 'stroke-pressure',
    category: 'Stroke Styles',
    svg: `<circle cx="4" cy="12" r="2" fill="currentColor" /><path d="M4 12c5-4 11 6 16-2" />`
  },
  {
    name: 'stroke-smooth',
    category: 'Stroke Styles',
    svg: `<path d="M3 15c4 0 5-6 9-6s5 6 9 6" />`
  },
  {
    name: 'stroke-stabilize',
    category: 'Stroke Styles',
    svg: `<circle cx="12" cy="12" r="7" /><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" />`
  },

  // ==========================================
  // 18 BRUSH SHAPES
  // ==========================================
  {
    name: 'brush-shape-round-tip',
    category: 'Brush Shapes',
    svg: `<circle cx="12" cy="12" r="8" />`
  },
  {
    name: 'brush-shape-flat-tip',
    category: 'Brush Shapes',
    svg: `<path d="M6 20V10a6 6 0 0 1 12 0v10z" />`
  },
  {
    name: 'brush-shape-angle-tip',
    category: 'Brush Shapes',
    svg: `<polygon points="6 20 6 12 18 5 18 20" />`
  },
  {
    name: 'brush-shape-soft-edge',
    category: 'Brush Shapes',
    svg: `<circle cx="12" cy="12" r="8" stroke-width="1.5" /><circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.6" />`
  },
  {
    name: 'brush-shape-hard-edge',
    category: 'Brush Shapes',
    svg: `<circle cx="12" cy="12" r="8" stroke-width="2.5" />`
  },
  {
    name: 'brush-shape-square-tip',
    category: 'Brush Shapes',
    svg: `<rect x="5" y="5" width="14" height="14" rx="1" />`
  },
  {
    name: 'brush-shape-fan-brush',
    category: 'Brush Shapes',
    svg: `<path d="M12 21 4 10a10 10 0 0 1 16 0z" /><line x1="12" y1="21" x2="7" y2="10" /><line x1="12" y1="21" x2="12" y2="8" /><line x1="12" y1="21" x2="17" y2="10" />`
  },
  {
    name: 'brush-shape-needle-tip',
    category: 'Brush Shapes',
    svg: `<path d="M12 3C9 10 8 15 8 18a4 4 0 0 0 8 0c0-3-1-8-4-15z" />`
  },
  {
    name: 'brush-shape-texture-tip',
    category: 'Brush Shapes',
    svg: `<circle cx="12" cy="12" r="8" /><circle cx="9" cy="9" r="1" fill="currentColor" /><circle cx="14" cy="9" r="1" fill="currentColor" /><circle cx="11" cy="12" r="1" fill="currentColor" /><circle cx="9" cy="14" r="1" fill="currentColor" /><circle cx="14" cy="14" r="1" fill="currentColor" />`
  },
  {
    name: 'brush-shape-pattern-tip',
    category: 'Brush Shapes',
    svg: `<circle cx="12" cy="12" r="8" /><line x1="7" y1="9" x2="17" y2="9" /><line x1="5" y1="12" x2="19" y2="12" /><line x1="7" y1="15" x2="17" y2="15" />`
  },

  // ==========================================
  // 19 FLOW & DYNAMICS
  // ==========================================
  {
    name: 'dynamics-size',
    category: 'Flow & Dynamics',
    svg: `<circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" />`
  },
  {
    name: 'dynamics-flow',
    category: 'Flow & Dynamics',
    svg: `<circle cx="12" cy="12" r="7" stroke-dasharray="2 3" />`
  },
  {
    name: 'dynamics-opacity',
    category: 'Flow & Dynamics',
    svg: `<circle cx="9" cy="12" r="6" /><circle cx="15" cy="12" r="6" />`
  },
  {
    name: 'dynamics-spacing',
    category: 'Flow & Dynamics',
    svg: `<circle cx="5" cy="12" r="1.5" fill="currentColor" /><circle cx="9" cy="12" r="2" fill="currentColor" /><circle cx="14" cy="12" r="2.5" fill="currentColor" /><circle cx="20" cy="12" r="3" fill="currentColor" />`
  },
  {
    name: 'dynamics-jitter',
    category: 'Flow & Dynamics',
    svg: `<circle cx="4" cy="10" r="1" fill="currentColor" /><circle cx="8" cy="15" r="1.5" fill="currentColor" /><circle cx="12" cy="8" r="1" fill="currentColor" /><circle cx="16" cy="14" r="1.5" fill="currentColor" /><circle cx="20" cy="11" r="1" fill="currentColor" />`
  },
  {
    name: 'dynamics-scatter',
    category: 'Flow & Dynamics',
    svg: `<circle cx="12" cy="12" r="2" fill="currentColor" /><circle cx="8" cy="7" r="1.5" fill="currentColor" /><circle cx="16" cy="8" r="1.5" fill="currentColor" /><circle cx="6" cy="14" r="1" fill="currentColor" /><circle cx="18" cy="15" r="1.5" fill="currentColor" /><circle cx="12" cy="19" r="1" fill="currentColor" />`
  },
  {
    name: 'dynamics-rotation',
    category: 'Flow & Dynamics',
    svg: `<path d="M21.5 2v6h-6" /><path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-1.42" />`
  },
  {
    name: 'dynamics-randomize',
    category: 'Flow & Dynamics',
    svg: `<path d="M12 2.5 19.5 6.8v8.7L12 19.8 4.5 15.5V6.8Z" /><circle cx="12" cy="7" r="1" fill="currentColor" /><circle cx="8" cy="14" r="1" fill="currentColor" /><circle cx="16" cy="14" r="1" fill="currentColor" />`
  },
  {
    name: 'dynamics-velocity',
    category: 'Flow & Dynamics',
    svg: `<path d="M4 18a8 8 0 1 1 16 0" /><line x1="12" y1="14" x2="17" y2="9" stroke-width="2.5" /><circle cx="12" cy="14" r="2" fill="currentColor" />`
  },
  {
    name: 'dynamics-direction',
    category: 'Flow & Dynamics',
    svg: `<polyline points="12 4 12 16" /><polyline points="9 7 12 4 15 7" /><polyline points="6 14 12 16 18 14" /><polyline points="4 11 6 14 8 13" /><polyline points="20 11 18 14 16 13" />`
  },

  // ==========================================
  // 20 EFFECTS
  // ==========================================
  {
    name: 'effect-glow',
    category: 'Effects',
    svg: `<circle cx="12" cy="12" r="5" /><line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" /><line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" /><line x1="4.93" y1="4.93" x2="6.34" y2="6.34" /><line x1="17.66" y1="17.66" x2="19.07" y2="19.07" /><line x1="4.93" y1="19.07" x2="6.34" y2="17.66" /><line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />`
  },
  {
    name: 'effect-blur',
    category: 'Effects',
    svg: `<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />`
  },
  {
    name: 'effect-smudge',
    category: 'Effects',
    svg: `<path d="M4 8c4-2 8 2 12 0s4-2 4-2" /><path d="M4 12c4-2 8 2 12 0s4-2 4-2" /><path d="M4 16c4-2 8 2 12 0s4-2 4-2" />`
  },
  {
    name: 'effect-eraser-brush',
    category: 'Effects',
    svg: `<path d="M18 13l-5.5 5.5a2.12 2.12 0 0 1-3 0L3.5 12.5a2.12 2.12 0 0 1 0-3L9 4l9 9z" /><line x1="6.5" y1="15.5" x2="19" y2="15.5" />`
  },
  {
    name: 'effect-blend',
    category: 'Effects',
    svg: `<circle cx="9" cy="12" r="6" /><circle cx="15" cy="12" r="6" />`
  },
  {
    name: 'effect-emboss',
    category: 'Effects',
    svg: `<polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 12 12 17 22 12" /><polyline points="2 17 12 22 22 17" />`
  },
  {
    name: 'effect-noise',
    category: 'Effects',
    svg: `<circle cx="6" cy="6" r="1" fill="currentColor" /><circle cx="12" cy="6" r="1" fill="currentColor" /><circle cx="18" cy="6" r="1" fill="currentColor" /><circle cx="6" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="18" cy="12" r="1" fill="currentColor" /><circle cx="6" cy="18" r="1" fill="currentColor" /><circle cx="12" cy="18" r="1" fill="currentColor" /><circle cx="18" cy="18" r="1" fill="currentColor" />`
  },
  {
    name: 'effect-grain',
    category: 'Effects',
    svg: `<circle cx="5" cy="7" r="0.75" fill="currentColor" /><circle cx="11" cy="5" r="0.75" fill="currentColor" /><circle cx="18" cy="8" r="0.75" fill="currentColor" /><circle cx="8" cy="11" r="0.75" fill="currentColor" /><circle cx="15" cy="13" r="0.75" fill="currentColor" /><circle cx="6" cy="17" r="0.75" fill="currentColor" /><circle cx="13" cy="18" r="0.75" fill="currentColor" /><circle cx="19" cy="16" r="0.75" fill="currentColor" />`
  },
  {
    name: 'effect-wet-mix',
    category: 'Effects',
    svg: `<path d="M3 10c3 0 5-3 8-3s5 3 8 3" /><path d="M3 15c3 0 5-3 8-3s5 3 8 3" /><path d="M3 20c3 0 5-3 8-3s5 3 8 3" />`
  },
  {
    name: 'effect-edge-highlight',
    category: 'Effects',
    svg: `<circle cx="10" cy="12" r="7" /><path d="M15 6a7 7 0 0 1 0 12" stroke-width="3" />`
  },

  // ==========================================
  // 21 MATERIALS
  // ==========================================
  {
    name: 'material-sphere',
    category: 'Materials',
    svg: `<circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 1 6.36 15.36" stroke-dasharray="1 2" />`
  },
  {
    name: 'material-shader',
    category: 'Materials',
    svg: `<circle cx="6" cy="18" r="3" /><circle cx="18" cy="18" r="3" /><circle cx="12" cy="6" r="3" /><line x1="8.12" y1="15.88" x2="10.5" y2="8.5" /><line x1="15.88" y1="15.88" x2="13.5" y2="8.5" /><line x1="9" y1="18" x2="15" y2="18" />`
  },
  {
    name: 'material-base-color',
    category: 'Materials',
    svg: `<circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />`
  },
  {
    name: 'material-metallic',
    category: 'Materials',
    svg: `<ellipse cx="12" cy="6" rx="7" ry="2.5" /><path d="M5 6v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" /><path d="M5 11v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4" /><path d="M5 16v3c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-3" />`
  },
  {
    name: 'material-roughness',
    category: 'Materials',
    svg: `<circle cx="12" cy="12" r="9" /><path d="M5 9c2-1 4 1 6 0s4-1 6 0" /><path d="M5 13c2-1 4 1 6 0s4-1 6 0" /><path d="M5 17c2-1 4 1 6 0s4-1 6 0" />`
  },
  {
    name: 'material-emission',
    category: 'Materials',
    svg: `<circle cx="12" cy="12" r="5" /><line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" /><line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" /><line x1="4.93" y1="4.93" x2="7.05" y2="7.05" /><line x1="16.95" y1="16.95" x2="19.07" y2="19.07" /><line x1="4.93" y1="19.07" x2="7.05" y2="16.95" /><line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />`
  },
  {
    name: 'material-opacity',
    category: 'Materials',
    svg: `<circle cx="12" cy="12" r="9" /><path d="M12 3v18" /><line x1="12" y1="6" x2="20" y2="6" stroke-dasharray="1 1" /><line x1="12" y1="10" x2="21" y2="10" stroke-dasharray="1 1" /><line x1="12" y1="14" x2="21" y2="14" stroke-dasharray="1 1" /><line x1="12" y1="18" x2="20" y2="18" stroke-dasharray="1 1" />`
  },
  {
    name: 'material-normal-map',
    category: 'Materials',
    svg: `<rect x="3" y="4" width="18" height="16" rx="2" /><polyline points="21 15 16 10 5 20" /><circle cx="8" cy="9" r="2" />`
  },
  {
    name: 'material-gradient',
    category: 'Materials',
    svg: `<rect x="4" y="4" width="16" height="16" rx="2" /><line x1="4" y1="6" x2="20" y2="6" opacity="0.9" /><line x1="4" y1="9" x2="20" y2="9" opacity="0.7" /><line x1="4" y1="12" x2="20" y2="12" opacity="0.5" /><line x1="4" y1="15" x2="20" y2="15" opacity="0.3" /><line x1="4" y1="18" x2="20" y2="18" opacity="0.1" />`
  },
  {
    name: 'material-texture-slot',
    category: 'Materials',
    svg: `<rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" />`
  },

  // ==========================================
  // 22 LIGHTING
  // ==========================================
  {
    name: 'light-sun',
    category: 'Lighting',
    svg: `<circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />`
  },
  {
    name: 'light-point',
    category: 'Lighting',
    svg: `<circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" fill="currentColor" />`
  },
  {
    name: 'light-spot',
    category: 'Lighting',
    svg: `<path d="M12 3 5 15h14Z" /><ellipse cx="12" cy="19" rx="8" ry="2.5" />`
  },
  {
    name: 'light-area',
    category: 'Lighting',
    svg: `<polygon points="5 6 19 6 17 12 7 12" /><line x1="7" y1="16" x2="7" y2="19" /><line x1="12" y1="16" x2="12" y2="20" /><line x1="17" y1="16" x2="17" y2="19" />`
  },
  {
    name: 'light-hdri',
    category: 'Lighting',
    svg: `<path d="M3 18A9 9 0 0 1 21 18z" /><ellipse cx="12" cy="18" rx="9" ry="3" /><line x1="12" y1="9" x2="12" y2="18" />`
  },
  {
    name: 'light-link',
    category: 'Lighting',
    svg: `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />`
  },
  {
    name: 'light-exposure',
    category: 'Lighting',
    svg: `<line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /><circle cx="9" cy="8" r="2.5" fill="currentColor" /><circle cx="15" cy="16" r="2.5" fill="currentColor" />`
  },
  {
    name: 'light-shadows',
    category: 'Lighting',
    svg: `<circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />`
  },
  {
    name: 'light-bloom',
    category: 'Lighting',
    svg: `<circle cx="9" cy="12" r="6" /><circle cx="15" cy="12" r="6" />`
  },
  {
    name: 'light-temperature',
    category: 'Lighting',
    svg: `<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" /><circle cx="11.5" cy="17.5" r="2" fill="currentColor" />`
  },

  // ==========================================
  // 23 RENDER
  // ==========================================
  {
    name: 'render-preview',
    category: 'Render',
    svg: `<rect x="3" y="4" width="18" height="16" rx="2" /><path d="m3 9 18-2" /><polygon points="10 12 10 17 15 14.5" fill="currentColor" />`
  },
  {
    name: 'render-final',
    category: 'Render',
    svg: `<rect x="3" y="4" width="18" height="16" rx="2" /><path d="m3 9 18-2" /><circle cx="12" cy="15" r="2" /><path d="M12 11v1M12 17v1M9 15h1M14 15h1" />`
  },
  {
    name: 'render-realtime',
    category: 'Render',
    svg: `<circle cx="12" cy="12" r="9" /><polyline points="12 6 12 12 16 14" />`
  },
  {
    name: 'render-raytrace',
    category: 'Render',
    svg: `<path d="M12 2.5 19.5 6.8v8.7L12 19.8 4.5 15.5V6.8Z" /><line x1="2" y1="2" x2="8" y2="8" /><polyline points="8 8 16 4 22 10" />`
  },
  {
    name: 'render-samples',
    category: 'Render',
    svg: `<circle cx="6" cy="6" r="1.5" fill="currentColor" /><circle cx="12" cy="6" r="1.5" fill="currentColor" /><circle cx="18" cy="6" r="1.5" fill="currentColor" /><circle cx="6" cy="12" r="1.5" fill="currentColor" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /><circle cx="18" cy="12" r="1.5" fill="currentColor" /><circle cx="6" cy="18" r="1.5" fill="currentColor" /><circle cx="12" cy="18" r="1.5" fill="currentColor" /><circle cx="18" cy="18" r="1.5" fill="currentColor" />`
  },
  {
    name: 'render-denoise',
    category: 'Render',
    svg: `<path d="m12 3 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" /><path d="m19 15 1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" />`
  },
  {
    name: 'render-resolution',
    category: 'Render',
    svg: `<rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />`
  },
  {
    name: 'render-camera-output',
    category: 'Render',
    svg: `<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />`
  },
  {
    name: 'render-region',
    category: 'Render',
    svg: `<rect x="5" y="5" width="14" height="14" rx="1" stroke-dasharray="2 2" /><path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" />`
  },
  {
    name: 'render-queue',
    category: 'Render',
    svg: `<line x1="4" y1="6" x2="16" y2="6" /><line x1="4" y1="12" x2="14" y2="12" /><line x1="4" y1="18" x2="16" y2="18" /><polygon points="18 10 18 16 23 13" fill="currentColor" />`
  },

  // ==========================================
  // 24 EXPORT & FORMATS
  // ==========================================
  {
    name: 'export-png',
    category: 'Export',
    svg: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><text x="6" y="16" font-family="sans-serif" font-size="5" font-weight="bold" fill="currentColor" stroke="none">PNG</text>`
  },
  {
    name: 'export-jpg',
    category: 'Export',
    svg: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><text x="6" y="16" font-family="sans-serif" font-size="5" font-weight="bold" fill="currentColor" stroke="none">JPG</text>`
  },
  {
    name: 'export-svg',
    category: 'Export',
    svg: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><text x="6" y="16" font-family="sans-serif" font-size="5" font-weight="bold" fill="currentColor" stroke="none">SVG</text>`
  },
  {
    name: 'export-glb',
    category: 'Export',
    svg: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="M12 12l4 2v3l-4 2-4-2v-3z" />`
  },
  {
    name: 'export-obj',
    category: 'Export',
    svg: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><text x="6" y="16" font-family="sans-serif" font-size="5" font-weight="bold" fill="currentColor" stroke="none">OBJ</text>`
  },
  {
    name: 'export-fbx',
    category: 'Export',
    svg: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><text x="6" y="16" font-family="sans-serif" font-size="5" font-weight="bold" fill="currentColor" stroke="none">FBX</text>`
  },
  {
    name: 'export-usdz',
    category: 'Export',
    svg: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><text x="5" y="16" font-family="sans-serif" font-size="4" font-weight="bold" fill="currentColor" stroke="none">USDZ</text>`
  },
  {
    name: 'export-share-link',
    category: 'Export',
    svg: `<circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />`
  },
  {
    name: 'export-package',
    category: 'Export',
    svg: `<path d="M12 2.5 19.5 6.8v8.7L12 19.8 4.5 15.5V6.8Z" /><path d="M12 11.2V19.8M12 11.2 4.5 6.8M12 11.2l7.5-4.4" /><line x1="7.5" y1="8.5" x2="16.5" y2="13.5" />`
  },
  {
    name: 'export-publish',
    category: 'Export',
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />`
  },

  // ==========================================
  // 25 HISTORY & PROJECT
  // ==========================================
  {
    name: 'history-recent',
    category: 'History & Project',
    svg: `<circle cx="12" cy="12" r="9" /><polyline points="12 6 12 12 16 14" />`
  },
  {
    name: 'history-version',
    category: 'History & Project',
    svg: `<polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 12 12 17 22 12" /><polyline points="2 17 12 22 22 17" />`
  },
  {
    name: 'history-cloud-sync',
    category: 'History & Project',
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /><path d="M14 13a3 3 0 1 0-3 3" /><polyline points="14 10 14 13 11 13" />`
  },
  {
    name: 'history-backup',
    category: 'History & Project',
    svg: `<rect x="4" y="6" width="16" height="12" rx="2" /><line x1="8" y1="14" x2="10" y2="14" /><circle cx="16" cy="14" r="1" fill="currentColor" />`
  },
  {
    name: 'history-autosave',
    category: 'History & Project',
    svg: `<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><path d="M12 7a2.5 2.5 0 1 1-2.5 2.5" />`
  },
  {
    name: 'history-timeline',
    category: 'History & Project',
    svg: `<circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 9 14" /><path d="M3 12a9 9 0 0 1 9-9" />`
  },
  {
    name: 'history-restore',
    category: 'History & Project',
    svg: `<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><polyline points="3 3 3 8 8 8" />`
  },
  {
    name: 'history-download',
    category: 'History & Project',
    svg: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />`
  },
  {
    name: 'history-upload',
    category: 'History & Project',
    svg: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />`
  },
  {
    name: 'history-archive',
    category: 'History & Project',
    svg: `<polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" rx="1" /><line x1="10" y1="12" x2="14" y2="12" />`
  },

  // ==========================================
  // 26 ANIMATION
  // ==========================================
  {
    name: 'anim-timeline',
    category: 'Animation',
    svg: `<line x1="3" y1="12" x2="21" y2="12" /><circle cx="6" cy="12" r="2.5" fill="currentColor" /><circle cx="12" cy="12" r="2.5" fill="currentColor" /><circle cx="18" cy="12" r="2.5" fill="currentColor" />`
  },
  {
    name: 'anim-keyframe',
    category: 'Animation',
    svg: `<polygon points="12 3 20 12 12 21 4 12" />`
  },
  {
    name: 'anim-play',
    category: 'Animation',
    svg: `<polygon points="6 4 20 12 6 20" />`
  },
  {
    name: 'anim-pause',
    category: 'Animation',
    svg: `<rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />`
  },
  {
    name: 'anim-stop',
    category: 'Animation',
    svg: `<rect x="5" y="5" width="14" height="14" rx="2" />`
  },
  {
    name: 'anim-loop',
    category: 'Animation',
    svg: `<path d="M17 2l4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" />`
  },
  {
    name: 'anim-speed',
    category: 'Animation',
    svg: `<path d="M4 18a8 8 0 1 1 16 0" /><line x1="12" y1="14" x2="17" y2="9" stroke-width="2" /><circle cx="12" cy="14" r="2" fill="currentColor" />`
  },
  {
    name: 'anim-record',
    category: 'Animation',
    svg: `<polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />`
  },

  // ==========================================
  // 27 TOOLS & UTILITIES
  // ==========================================
  {
    name: 'util-notes',
    category: 'Tools & Utilities',
    svg: `<rect x="4" y="3" width="16" height="18" rx="2" /><line x1="8" y1="8" x2="16" y2="8" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="8" y1="16" x2="12" y2="16" />`
  },
  {
    name: 'util-screenshot',
    category: 'Tools & Utilities',
    svg: `<path d="M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3" /><circle cx="12" cy="12" r="3" />`
  },
  {
    name: 'util-help',
    category: 'Tools & Utilities',
    svg: `<circle cx="12" cy="12" r="9" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><circle cx="12" cy="17" r="1" fill="currentColor" />`
  },
  {
    name: 'util-info',
    category: 'Tools & Utilities',
    svg: `<circle cx="12" cy="12" r="9" /><line x1="12" y1="16" x2="12" y2="12" /><circle cx="12" cy="8" r="1" fill="currentColor" />`
  },
  {
    name: 'util-tips',
    category: 'Tools & Utilities',
    svg: `<path d="M9 18h6M10 22h4" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A6 6 0 1 0 7.5 11.5c.76.76 1.23 1.52 1.41 2.5" />`
  },

  // ==========================================
  // 28 MOBILE & NAVIGATION
  // ==========================================
  {
    name: 'nav-back',
    category: 'Navigation',
    svg: `<polyline points="15 18 9 12 15 6" />`
  },
  {
    name: 'nav-forward',
    category: 'Navigation',
    svg: `<polyline points="9 18 15 12 9 6" />`
  },
  {
    name: 'nav-up',
    category: 'Navigation',
    svg: `<polyline points="18 15 12 9 6 15" />`
  },
  {
    name: 'nav-down',
    category: 'Navigation',
    svg: `<polyline points="6 9 12 15 18 9" />`
  },
  {
    name: 'nav-menu',
    category: 'Navigation',
    svg: `<line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />`
  },
  {
    name: 'nav-search',
    category: 'Navigation',
    svg: `<circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />`
  },
  {
    name: 'nav-close',
    category: 'Navigation',
    svg: `<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />`
  },
  {
    name: 'nav-confirm',
    category: 'Navigation',
    svg: `<polyline points="20 6 9 17 4 12" />`
  },

  // ==========================================
  // 29 TOGGLE & EXTRAS
  // ==========================================
  {
    name: 'toggle-on',
    category: 'Toggles & Extras',
    svg: `<rect x="3" y="6" width="18" height="12" rx="6" fill="currentColor" opacity="0.2" /><circle cx="15" cy="12" r="4" fill="currentColor" />`
  },
  {
    name: 'toggle-off',
    category: 'Toggles & Extras',
    svg: `<rect x="3" y="6" width="18" height="12" rx="6" /><circle cx="9" cy="12" r="4" />`
  },
  {
    name: 'toggle-snap',
    category: 'Toggles & Extras',
    svg: `<rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 12V8a2 2 0 0 1 4 0v4a1 1 0 0 0 2 0V8a2 2 0 0 1 4 0v4a5 5 0 0 1-10 0z" />`
  },
  {
    name: 'extra-favorite',
    category: 'Toggles & Extras',
    svg: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />`
  },
  {
    name: 'extra-recent',
    category: 'Toggles & Extras',
    svg: `<circle cx="12" cy="12" r="9" /><polyline points="12 6 12 12 16 14" />`
  },
  {
    name: 'extra-download',
    category: 'Toggles & Extras',
    svg: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />`
  }
];

// Write individual SVG files
let writtenCount = 0;
for (const icon of icons) {
  const filePath = path.join(TARGET_DIR, `${icon.name}.svg`);
  const fullSvg = makeSvg(icon.svg);
  fs.writeFileSync(filePath, fullSvg, 'utf8');
  writtenCount++;
}

console.log(`Successfully generated ${writtenCount} SVG icons in: ${TARGET_DIR}`);

// Build an interactive viewer HTML page inside public/icons/index.html
const categories = [...new Set(icons.map(i => i.category))];

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SVG Icon Library (${writtenCount} Icons)</title>
  <style>
    :root {
      --bg: #0f172a;
      --card-bg: #1e293b;
      --card-border: #334155;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #38bdf8;
      --accent-hover: #0ea5e9;
      --tag-bg: #334155;
    }
    body.light {
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --card-border: #e2e8f0;
      --text: #0f172a;
      --text-muted: #64748b;
      --accent: #0284c7;
      --accent-hover: #0369a1;
      --tag-bg: #f1f5f9;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      padding: 24px;
      transition: background 0.2s, color 0.2s;
    }
    header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--card-border);
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .subtitle {
      font-size: 14px;
      color: var(--text-muted);
      margin-top: 4px;
    }
    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
    }
    input[type="text"] {
      padding: 8px 14px;
      border-radius: 8px;
      border: 1px solid var(--card-border);
      background: var(--card-bg);
      color: var(--text);
      font-size: 14px;
      width: 220px;
      outline: none;
    }
    input[type="text"]:focus {
      border-color: var(--accent);
    }
    button {
      padding: 8px 16px;
      border-radius: 8px;
      border: 1px solid var(--card-border);
      background: var(--card-bg);
      color: var(--text);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s;
    }
    button:hover {
      background: var(--accent);
      color: #fff;
      border-color: var(--accent);
    }
    .category-filter {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 24px;
    }
    .filter-btn {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      border: 1px solid var(--card-border);
      background: var(--card-bg);
      color: var(--text-muted);
      cursor: pointer;
    }
    .filter-btn.active {
      background: var(--accent);
      color: #fff;
      border-color: var(--accent);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 12px;
    }
    .icon-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      padding: 16px 8px 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      transition: transform 0.15s, border-color 0.15s;
    }
    .icon-card:hover {
      transform: translateY(-2px);
      border-color: var(--accent);
    }
    .icon-card svg {
      width: 32px;
      height: 32px;
      margin-bottom: 12px;
      stroke: var(--text);
    }
    .icon-name {
      font-size: 11px;
      text-align: center;
      color: var(--text);
      word-break: break-word;
      line-height: 1.3;
    }
    .icon-category {
      font-size: 9px;
      color: var(--text-muted);
      margin-top: 4px;
      background: var(--tag-bg);
      padding: 2px 6px;
      border-radius: 4px;
    }
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #10b981;
      color: #fff;
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
      z-index: 100;
    }
    .toast.show {
      opacity: 1;
    }
  </style>
</head>
<body>
  <header>
    <div>
      <h1>SVG Icon Library</h1>
      <div class="subtitle">${writtenCount} clean vector icons extracted and organized directly in public/icons</div>
    </div>
    <div class="controls">
      <input type="text" id="searchInput" placeholder="Search icons..." />
      <button id="themeToggle">🌓 Toggle Theme</button>
    </div>
  </header>

  <div class="category-filter" id="categoryFilter">
    <button class="filter-btn active" data-cat="all">All (${writtenCount})</button>
    ${categories.map(c => `<button class="filter-btn" data-cat="${c}">${c}</button>`).join('')}
  </div>

  <div class="grid" id="iconGrid">
    ${icons.map(icon => `
      <div class="icon-card" data-name="${icon.name}" data-category="${icon.category}" title="Click to copy SVG code">
        ${makeSvg(icon.svg)}
        <span class="icon-name">${icon.name.replace(/^[a-z0-9]+-/, '')}</span>
        <span class="icon-category">${icon.category}</span>
      </div>
    `).join('')}
  </div>

  <div class="toast" id="toast">Copied SVG code to clipboard!</div>

  <script>
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const iconGrid = document.getElementById('iconGrid');
    const toast = document.getElementById('toast');
    const themeToggle = document.getElementById('themeToggle');
    const cards = Array.from(document.querySelectorAll('.icon-card'));

    let currentCat = 'all';

    function filterIcons() {
      const q = searchInput.value.toLowerCase().trim();
      cards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const cat = card.dataset.category;
        const matchesQuery = name.includes(q) || cat.toLowerCase().includes(q);
        const matchesCat = currentCat === 'all' || cat === currentCat;
        card.style.display = (matchesQuery && matchesCat) ? 'flex' : 'none';
      });
    }

    searchInput.addEventListener('input', filterIcons);

    categoryFilter.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentCat = e.target.dataset.cat;
        filterIcons();
      }
    });

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
    });

    cards.forEach(card => {
      card.addEventListener('click', async () => {
        const svgElement = card.querySelector('svg');
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        try {
          await navigator.clipboard.writeText(svgString);
          showToast('Copied ' + card.dataset.name + '.svg to clipboard!');
        } catch (err) {
          showToast('Selected ' + card.dataset.name + '.svg');
        }
      });
    });

    function showToast(msg) {
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2000);
    }
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(TARGET_DIR, 'index.html'), htmlContent, 'utf8');
console.log(`Generated HTML gallery in: ${path.join(TARGET_DIR, 'index.html')}`);
