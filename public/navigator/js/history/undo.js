function pushUndo(action){_redoStack.length=0;redoStack.length=0;_undoStack.push(action);if(_undoStack.length>_UNDO_MAX)_undoStack.shift();}
const _undoStack=[];
const _redoStack=[];

function undo(){
  if(_undoStack.length){
    const a=_undoStack.pop();
    if(a.type==='stroke_add'){const i=strokes.indexOf(a.stroke);if(i>-1){strokes.splice(i,1);scene.remove(a.stroke.mesh);}_redoStack.push(a);clearSelection();_lastPlaneKey='';markDirty();return;}
    if(a.type==='stroke_add_multi'){
      a.strokes.forEach(function(s){
        const i=strokes.indexOf(s);
        if(i>-1){strokes.splice(i,1);scene.remove(s.mesh);}
      });
      _redoStack.push(a);clearSelection();_lastPlaneKey='';markDirty();return;
    }
    if(a.type==='stroke_delete'){scene.add(a.stroke.mesh);strokes.splice(a.index,0,a.stroke);_redoStack.push(a);_lastPlaneKey='';showMergeLayerRow(strokes.some(function(s){return s.layer===3;}));markDirty();return;}
    if(a.type==='stroke_transform'){
      const redo_a={type:'stroke_transform',stroke:a.stroke,oldMatrix:a.stroke.mesh.matrix.clone()};
      a.stroke.mesh.matrix.copy(a.oldMatrix);
      a.stroke.mesh.matrix.decompose(a.stroke.mesh.position,a.stroke.mesh.quaternion,a.stroke.mesh.scale);
      _redoStack.push(redo_a);
      markDirty();updateSelHighlights();if(window._sgGcDraw)window._sgGcDraw();return;
    }
    if(a.type==='stroke_transform_multi'){
      const redo_a={type:'stroke_transform_multi',strokes:a.strokes,oldMatrices:a.strokes.map(s=>s.mesh.matrix.clone())};
      a.strokes.forEach((s,i)=>{s.mesh.matrix.copy(a.oldMatrices[i]);s.mesh.matrix.decompose(s.mesh.position,s.mesh.quaternion,s.mesh.scale);});
      _redoStack.push(redo_a);
      markDirty();updateSelHighlights();if(window._sgGcDraw)window._sgGcDraw();return;
    }
    if(a.type==='stroke_duplicate'){
      const i=strokes.indexOf(a.newStroke);if(i>-1){strokes.splice(i,1);scene.remove(a.newStroke.mesh);}_redoStack.push(a);clearSelection();markDirty();return;
    }
    if(a.type==='stroke_rebuild_multi'){
      a.oldProps.forEach(function(item){
        var fn = typeof _rebuildStrokeMesh === 'function' ? _rebuildStrokeMesh : window._rebuildStrokeMesh;
        if(fn) fn(item.stroke, item.color, item.sz, item.op, item.matType, item.fxScale);
      });
      _redoStack.push(a);
      updateSelHighlights();
      markDirty();
      return;
    }
    if(a.type==='stroke_split'){
      // Remove the split halves
      a.newStrokes.forEach(function(ns){var si=strokes.indexOf(ns);if(si>-1)strokes.splice(si,1);scene.remove(ns.mesh);ns.mesh.traverse(function(c){if(c.geometry)c.geometry.dispose();if(c.material)c.material.dispose();});});
      // Restore original
      scene.add(a.original.mesh);strokes.splice(a.originalIndex,0,a.original);
      _redoStack.push(a);clearSelection();markDirty();return;
    }
    if(a.type==='merge_layer'){
      // Remove merged stroke from scene
      var mi=strokes.indexOf(a.mergedStroke);if(mi>-1){strokes.splice(mi,1);}scene.remove(a.mergedStroke.mesh);
      // Restore replaced merged strokes if any
      a.replacedMerged.forEach(function(s){scene.add(s.mesh);strokes.push(s);});
      // Restore originals in order
      var sorted=a.origStrokes.slice().map(function(s,ii){return{s:s,idx:a.savedOrigIndices[ii]};});
      sorted.sort(function(x,y){return x.idx-y.idx;});
      sorted.forEach(function(item){scene.add(item.s.mesh);strokes.splice(item.idx,0,item.s);});
      _redoStack.push(a);
      showMergeLayerRow(strokes.some(function(s){return s.layer===3;}));
      applyLayerVisibility();markDirty();return;
    }
    if(a.type==='prim_add'){
      // Undo adding a prim: save current state for redo, then remove
      var curPos=a.prim.mesh.position.clone(),curQ=a.prim.mesh.quaternion.clone(),curS=a.prim.mesh.scale.clone();
      if(window._primUndoAdd)window._primUndoAdd(a.prim);
      _redoStack.push({type:'prim_add',prim:a.prim,savedPos:curPos,savedQuat:curQ,savedScale:curS});
      return;
    }
    if(a.type==='prim_delete'){
      if(window._primUndoDelete)window._primUndoDelete(a.prim, a.index);
      _redoStack.push(a);
      return;
    }
    if(a.type==='prim_transform'){
      var curPos=a.prim.mesh.position.clone(),curQ=a.prim.mesh.quaternion.clone(),curS=a.prim.mesh.scale.clone();
      if(window._primUndoTransform)window._primUndoTransform(a.prim, a.oldPos, a.oldQuat, a.oldScale);
      _redoStack.push({type:'prim_transform',prim:a.prim,oldPos:curPos,oldQuat:curQ,oldScale:curS});
      return;
    }
  }
  // No-op when there are no typed undo actions (e.g. just after initial load).
  // The legacy redoStack fallback was removed — undoing into restored content was
  // surprising and left redo in an inconsistent state.
}
function redo(){
  // Handle typed actions from _redoStack first
  if(_redoStack.length){
    const a=_redoStack.pop();
    if(a.type==='stroke_add'){scene.add(a.stroke.mesh);strokes.push(a.stroke);_undoStack.push(a);_lastPlaneKey='';markDirty();return;}
    if(a.type==='stroke_add_multi'){
      a.strokes.forEach(function(s){
        scene.add(s.mesh);strokes.push(s);
      });
      _undoStack.push(a);_lastPlaneKey='';markDirty();return;
    }
    if(a.type==='stroke_delete'){const i=strokes.indexOf(a.stroke);if(i>-1){strokes.splice(i,1);scene.remove(a.stroke.mesh);}else{scene.remove(a.stroke.mesh);}_undoStack.push(a);_lastPlaneKey='';showMergeLayerRow(strokes.some(function(s){return s.layer===3;}));markDirty();return;}
    if(a.type==='stroke_transform'){
      const undo_a={type:'stroke_transform',stroke:a.stroke,oldMatrix:a.stroke.mesh.matrix.clone()};
      a.stroke.mesh.matrix.copy(a.oldMatrix);
      a.stroke.mesh.matrix.decompose(a.stroke.mesh.position,a.stroke.mesh.quaternion,a.stroke.mesh.scale);
      _undoStack.push(undo_a);
      markDirty();updateSelHighlights();if(window._sgGcDraw)window._sgGcDraw();return;
    }
    if(a.type==='stroke_transform_multi'){
      const undo_a={type:'stroke_transform_multi',strokes:a.strokes,oldMatrices:a.strokes.map(s=>s.mesh.matrix.clone())};
      a.strokes.forEach((s,i)=>{s.mesh.matrix.copy(a.oldMatrices[i]);s.mesh.matrix.decompose(s.mesh.position,s.mesh.quaternion,s.mesh.scale);});
      _undoStack.push(undo_a);
      markDirty();updateSelHighlights();if(window._sgGcDraw)window._sgGcDraw();return;
    }
    if(a.type==='stroke_duplicate'){scene.add(a.newStroke.mesh);strokes.push(a.newStroke);_undoStack.push(a);markDirty();return;}
    if(a.type==='stroke_rebuild_multi'){
      a.newProps.forEach(function(item){
        var fn = typeof _rebuildStrokeMesh === 'function' ? _rebuildStrokeMesh : window._rebuildStrokeMesh;
        if(fn) fn(item.stroke, item.color, item.sz, item.op, item.matType, item.fxScale);
      });
      _undoStack.push(a);
      updateSelHighlights();
      markDirty();
      return;
    }
    if(a.type==='stroke_split'){
      // Re-remove original, re-add split halves
      var oi=strokes.indexOf(a.original);if(oi>-1)strokes.splice(oi,1);scene.remove(a.original.mesh);
      a.newStrokes.forEach(function(ns){
        // Rebuild mesh if it was disposed during undo
        if(!ns.mesh.parent){
          var rg=new THREE.Group();
          var rt=buildTube(ns.pts,ns.vels,ns.color,ns.sz,ns.op,ns.flat,ns.matType);if(rt)rg.add(rt);
          if(!ns.flat){rg.add(buildCap(ns.pts[0],ns.color,ns.sz,ns.op,ns.matType));rg.add(buildCap(ns.pts[ns.pts.length-1],ns.color,ns.sz,ns.op,ns.matType));}
          rg.matrix.copy(a.original.mesh.matrix);rg.matrix.decompose(rg.position,rg.quaternion,rg.scale);rg.matrixAutoUpdate=false;
          ns.mesh=rg;
        }
        scene.add(ns.mesh);strokes.push(ns);
      });
      _undoStack.push(a);clearSelection();markDirty();return;
    }
    if(a.type==='merge_layer'){
      // Re-remove originals
      a.origStrokes.forEach(function(s){var idx=strokes.indexOf(s);if(idx>-1)strokes.splice(idx,1);scene.remove(s.mesh);});
      // Re-remove any replaced merged strokes
      a.replacedMerged.forEach(function(s){var idx=strokes.indexOf(s);if(idx>-1)strokes.splice(idx,1);scene.remove(s.mesh);});
      // Re-add merged stroke
      scene.add(a.mergedStroke.mesh);strokes.push(a.mergedStroke);
      _undoStack.push(a);
      showMergeLayerRow(true);applyLayerVisibility();markDirty();return;
    }
    if(a.type==='prim_add'){
      if(window._primRedoAdd)window._primRedoAdd(a.prim);
      // Restore saved transform if present
      if(a.savedPos){a.prim.mesh.position.copy(a.savedPos);a.prim.mesh.quaternion.copy(a.savedQuat);a.prim.mesh.scale.copy(a.savedScale);a.prim.mesh.updateMatrix();a.prim.mesh.matrixAutoUpdate=false;}
      _undoStack.push({type:'prim_add',prim:a.prim});
      return;
    }
    if(a.type==='prim_delete'){
      if(window._primRedoDelete)window._primRedoDelete(a.prim);
      _undoStack.push(a);
      return;
    }
    if(a.type==='prim_transform'){
      var curPos=a.prim.mesh.position.clone(),curQ=a.prim.mesh.quaternion.clone(),curS=a.prim.mesh.scale.clone();
      if(window._primUndoTransform)window._primUndoTransform(a.prim, a.oldPos, a.oldQuat, a.oldScale);
      _undoStack.push({type:'prim_transform',prim:a.prim,oldPos:curPos,oldQuat:curQ,oldScale:curS});
      return;
    }
  }
  // No-op when _redoStack is empty. Legacy redoStack fallback was removed (see undo()).
}

window.pushUndo = pushUndo;
window._undoStack = _undoStack;
window._redoStack = _redoStack;
window.undo = undo;
window.redo = redo;