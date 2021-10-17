objectDetector = "";
values = "";
status = "";
function setup() {
    canvas = createCanvas(240,240);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(240,240);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    values = document.getElementById("input").innerHTML;
}

function modelLoaded() {
    console.log("Model loaded!");
    status = true;
}

function draw() {
    image(video,0,0,240,240)
}