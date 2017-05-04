if (!window.context){
  // window.context doesn't exist yet, must perform steps to create it
  // before using it
  console.log("window.context NOT READY");

  // must add listener for the creation of window.context
  window.addEventListener('amp-windowContextCreated', function(){
    console.log("window.context created and ready to use");
    window.context.onResizeSuccess(resizeSuccessCallback);
    window.context.onResizeDenied(resizeDeniedCallback);
  });

  // load ampcontext-lib.js which will create window.context
  ampContextScript = document.createElement('script');
  ampContextScript.src = "https://localhost:8000/dist.3p/current/ampcontext-lib.js";
  document.head.appendChild(ampContextScript);
}

function intersectionCallback(payload){
  changes = payload.changes;
  // Code below is simply an example.
  var latestChange = changes[changes.length - 1];

  // Amp-ad width and height.
  var w = latestChange.boundingClientRect.width;
  var h = latestChange.boundingClientRect.height;

  // Visible width and height.
  var vw = latestChange.intersectionRect.width;
  var vh = latestChange.intersectionRect.height;

  // Position in the viewport.
  var vx = latestChange.boundingClientRect.x;
  var vy = latestChange.boundingClientRect.y;

  // Viewable percentage.
  var viewablePerc = (vw * vh) / (w * h) * 100;

  console.log(viewablePerc, w, h, vw, vh, vx, vy);

}

function dummyCallback(changes){
  console.log(changes);
}

var shouldStopVis = false;
var stopVisFunc;
var shouldStopInt = false;
var stopIntFunc;

function resizeSuccessCallback(requestedHeight, requestedWidth){
  console.log("Success!");
  console.log(this);
  resizeTo(requestedHeight, requestedWidth);
  console.log(requestedHeight);
  console.log(requestedWidth);
}

function resizeTo(height, width){
  this.innerWidth = width;
  this.innerHeight = height;
}

function resizeDeniedCallback(requestedHeight, requestedWidth){
  console.log("DENIED");
  console.log(requestedHeight);
  console.log(requestedWidth);
}

function toggleObserveIntersection(){
  if (shouldStopInt){
    stopIntFunc();
  } else {
    stopIntFunc = window.context.observeIntersection(intersectionCallback);
  }
  shouldStopInt = !shouldStopInt;
}

function toggleObserveVisibility(){
  if (shouldStopVis){
    stopVisFunc();
  } else {
    stopVisFunc = window.context.observePageVisibility(dummyCallback);
  }
  shouldStopVis = !shouldStopVis;
}
