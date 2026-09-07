// ================================================================
//  RECORD VIEWS — auto-play all saved views and capture to webm
// ================================================================
var _recState=null; // {recorder, chunks, cancelled}
function startRecordViews(){
  var views=pages[curPage]&&pages[curPage].views;
  if(!views||views.length<2){toast('Need 2+ saved views to record');return;}
  // Check MediaRecorder support
  var canvasEl=renderer.domElement;
  if(typeof canvasEl.captureStream!=='function'){toast('Recording not supported on this device');return;}
  // Try MP4 first (Safari), then WebM (Chrome/Firefox)
  var mimeType='';var fileExt='.mp4';
  var tryTypes=['video/mp4','video/mp4;codecs=avc1','video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'];
  for(var ti=0;ti<tryTypes.length;ti++){
    try{if(MediaRecorder.isTypeSupported(tryTypes[ti])){mimeType=tryTypes[ti];break;}}catch(ex){}
  }
  if(!mimeType){toast('Recording not supported on this device');return;}
  if(mimeType.indexOf('webm')>=0)fileExt='.webm';

  // Save overlay visibility and hide for clean recording
  var _recOverlayState={grid:gridH.visible,axis:axisGroup.visible,surf:surfGroup.visible};
  window._recOverlayState=_recOverlayState;
  gridH.visible=false;axisGroup.visible=false;surfGroup.visible=false;markDirty();

  // Hide UI for clean recording
  if(!document.body.classList.contains('ui-hidden')){
    document.getElementById('bhide').click();
  }
  // Close any open strips
  document.getElementById('views').classList.remove('open','recording-open','pages-also-open');
  document.getElementById('pages').classList.remove('open');
  document.body.classList.remove('views-open','pages-open');

  // Start capture
  var stream;
  try{stream=canvasEl.captureStream(30);}catch(ex){toast('Recording failed: '+ex.message);return;}
  var recorder;
  try{recorder=new MediaRecorder(stream,{mimeType:mimeType,videoBitsPerSecond:4000000});}catch(ex){toast('Recording failed: '+ex.message);return;}
  var chunks=[];
  _recState={recorder:recorder,chunks:chunks,cancelled:false};
  recorder.ondataavailable=function(e){if(e.data&&e.data.size>0)chunks.push(e.data);};
  recorder.onstop=function(){
    if(_recState&&_recState.cancelled){_recState=null;toast('Recording cancelled');return;}
    var recChunks=_recState?_recState.chunks:chunks;
    _recState=null;
    if(!recChunks.length){toast('No recording data');return;}
    var blob=new Blob(recChunks,{type:mimeType});
    promptExportName('sketch3d-views',fileExt,function(name){
      var url=URL.createObjectURL(blob);
      var a=document.createElement('a');a.href=url;a.download=name+fileExt;a.click();
      URL.revokeObjectURL(url);toast('Recording saved');
    });
  };
  recorder.onerror=function(){
    _recState=null;
    document.getElementById('rec-stop-btn').classList.remove('vis');
    toast('Recording error');
  };
  recorder.start();
  // Show stop button
  document.getElementById('rec-stop-btn').classList.add('vis');
  toast('Recording started');

  // Render one initial frame then begin sequencing views
  renderer.render(scene,activeCam());markDirty();
  // Small delay before starting the animation sequence
  setTimeout(function(){_recPlayViews(views,0);},500);
}

function _recPlayViews(views,idx){
  if(!_recState||_recState.cancelled)return;
  if(idx>=views.length){
    // All views played — hold final frame for 1s then stop
    setTimeout(function(){stopRecordViews(false);},1000);
    return;
  }
  // Recall this view (triggers smooth lerp animation)
  recallView(views[idx]);
  // Wait for the animation to complete (recallView duration is 1-3s, we poll _vwLerp)
  function waitForLerp(){
    if(!_recState||_recState.cancelled)return;
    if(_vwLerp!=null){
      // Animation still in progress
      requestAnimationFrame(waitForLerp);
    } else {
      // Animation complete — hold for 800ms then move to next view
      setTimeout(function(){_recPlayViews(views,idx+1);},800);
    }
  }
  // Start polling after a frame to let recallView kick off
  requestAnimationFrame(waitForLerp);
}

function stopRecordViews(cancel){
  if(!_recState)return;
  if(cancel)_recState.cancelled=true;
  document.getElementById('rec-stop-btn').classList.remove('vis');
  // Cancel any in-progress view lerp
  if(_vwLerp){cancelAnimationFrame(_vwLerp);_vwLerp=null;}
  try{if(_recState.recorder.state!=='inactive')_recState.recorder.stop();}catch(ex){}
  // Restore overlay visibility
  if(window._recOverlayState){
    gridH.visible=window._recOverlayState.grid;
    axisGroup.visible=window._recOverlayState.axis;
    surfGroup.visible=window._recOverlayState.surf;
    window._recOverlayState=null;
    // Sync button states
    var bg=document.getElementById('bgrid');if(bg)bg.classList.toggle('on',gridH.visible);
    var ba=document.getElementById('baxis');if(ba)ba.classList.toggle('on',axisGroup.visible);
    var bs=document.getElementById('bsurf');if(bs)bs.classList.toggle('on',surfGroup.visible);
    var pbg=document.getElementById('pb-grid');if(pbg)pbg.classList.toggle('on',gridH.visible);
    var pba=document.getElementById('pb-axis');if(pba)pba.classList.toggle('on',axisGroup.visible);
    var pbs=document.getElementById('pb-surf');if(pbs)pbs.classList.toggle('on',surfGroup.visible);
    markDirty();
  }
  // Restore UI
  if(document.body.classList.contains('ui-hidden')){
    document.getElementById('bhide').click();
  }
}
