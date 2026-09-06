// Side Column, Detachable Panels & Narrow Bar UI Management

(function(window) {
  'use strict';

  function initSidebar() {
    // 1. Draggable Side Column Groups (TOP and BOTTOM)
    document.querySelectorAll('.sc-grab').forEach(function(handle) {
      var groupName = handle.dataset.group;
      var groupEl = document.getElementById('sg-' + groupName);
      if (!groupEl) return;

      var isDragging = false;
      var startX = 0, startY = 0;
      var origLeft = 0, origTop = 0;

      handle.addEventListener('pointerdown', function(e) {
        if (e.target.tagName === 'BUTTON') return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        var rect = groupEl.getBoundingClientRect();
        origLeft = rect.left;
        origTop = rect.top;

        groupEl.classList.add('detached');
        groupEl.style.position = 'fixed';
        groupEl.style.left = origLeft + 'px';
        groupEl.style.top = origTop + 'px';
        groupEl.style.zIndex = '280';
        handle.setPointerCapture(e.pointerId);
      });

      handle.addEventListener('pointermove', function(e) {
        if (!isDragging) return;
        var dx = e.clientX - startX;
        var dy = e.clientY - startY;
        groupEl.style.left = Math.max(10, Math.min(window.innerWidth - 180, origLeft + dx)) + 'px';
        groupEl.style.top = Math.max(10, Math.min(window.innerHeight - 80, origTop + dy)) + 'px';
      });

      handle.addEventListener('pointerup', function(e) {
        isDragging = false;
        try { handle.releasePointerCapture(e.pointerId); } catch (err) {}
      });
    });

    // Dock Buttons
    document.querySelectorAll('.sc-dock').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var groupName = btn.dataset.group;
        var groupEl = document.getElementById('sg-' + groupName);
        if (groupEl) {
          groupEl.classList.remove('detached');
          groupEl.style.position = '';
          groupEl.style.left = '';
          groupEl.style.top = '';
          groupEl.style.zIndex = '';
        }
      });
    });

    // Close / Hide Buttons
    document.querySelectorAll('.sc-close').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var groupName = btn.dataset.group;
        var groupEl = document.getElementById('sg-' + groupName);
        if (groupEl) {
          groupEl.style.display = 'none';
        }
      });
    });

    // 2. Hide / Show UI Toggle
    var bhide = document.getElementById('bhide');
    var isUIHidden = false;
    if (bhide) {
      bhide.addEventListener('click', function() {
        isUIHidden = !isUIHidden;
        bhide.textContent = isUIHidden ? 'SHOW UI' : 'HIDE UI';
        document.body.classList.toggle('ui-hidden', isUIHidden);
        var topbar = document.getElementById('topbar');
        var sidecol = document.getElementById('sidecol');
        var narrowBar = document.getElementById('narrow-bar');
        if (topbar) topbar.style.display = isUIHidden ? 'none' : 'flex';
        if (sidecol) sidecol.style.display = isUIHidden ? 'none' : 'flex';
        if (narrowBar) narrowBar.style.display = isUIHidden ? 'none' : '';
      });
    }

    // 3. Narrow Bar Segmented Tab Control (Camera vs Model)
    var segBtns = document.querySelectorAll('#nb-seg .seg-btn');
    segBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        segBtns.forEach(function(b) { b.classList.remove('on'); });
        btn.classList.add('on');
        var tab = btn.dataset.tab;
        var bottomGroup = document.getElementById('sg-bottom');
        var navCamView = document.getElementById('nav-camera-view');
        var navSurfView = document.getElementById('nav-surface-view');
        var navModeSeg = document.querySelectorAll('#nav-mode-seg .seg-btn');

        if (tab === 'nav') {
          if (navCamView) navCamView.style.display = 'flex';
          if (navSurfView) navSurfView.style.display = 'none';
          if (navModeSeg) {
            navModeSeg.forEach(function(b) { b.classList.toggle('on', b.dataset.navtab === 'camera'); });
          }
        } else {
          if (navCamView) navCamView.style.display = 'none';
          if (navSurfView) navSurfView.style.display = 'flex';
          if (navModeSeg) {
            navModeSeg.forEach(function(b) { b.classList.toggle('on', b.dataset.navtab === 'surface'); });
          }
        }

        if (bottomGroup) {
          bottomGroup.style.display = 'flex';
          bottomGroup.classList.add('detached');
          bottomGroup.style.position = 'fixed';
          bottomGroup.style.bottom = '95px';
          bottomGroup.style.left = '10px';
          bottomGroup.style.zIndex = '350';
        }
      });
    });
  }

  window.initSidebar = initSidebar;
})(window);
