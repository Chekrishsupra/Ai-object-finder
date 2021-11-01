status = "";
objects = [];
function setup() {
    canvas = createCanvas(320,320);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(240,240);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("input").value;
}

function modelLoaded() {
    console.log("Model loaded!");
    status = true;
}

function draw() {
    image(video,0,0,320,320);
    if(status != "") {
        objectDetector.detect(video,gotresult);
        for(i=0;i<objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects detected!";
            fill("#4ede87");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 5,objects[i].y + 15);
            noFill();
            stroke("#4ede87");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == object_name) {
                video.stop();
                objectDetector.detect(gotresult);
                document.getElementById("result").innerHTML = object_name + " found";
                synth = window.speechSynthesis;
                utterthis = new SpeechSynthesisUtterance(object_name + "found");
                synth.speak(utterthis);

            }
            else {
                document.getElementById("result").innerHTML = object_name + " not found";
            }
        }
    }
}

function gotresult(error,results) {
    if(error) {
        console.log("Error:" + error);
    }
    else {
        console.log(results);
        objects = results;
    }
objects = results;
}