song="";
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
score_lw=0;
score_rw=0;

function preload() {
    song=loadSound("music.mp3");
}

function setup() {
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}

function draw() {
    image(video,0,0,600,500);
    
    if (score_lw > 0.2) {
        fill("purple");
    stroke("limegreen");
        circle(leftwristX,leftwristY,30);
    num_lwY=Number(leftwristY);
    remove_decimal=floor(num_lwY);
    vol=remove_decimal/500;
    document.getElementById("volume").innerHTML="Volume= "+vol;
    song.setVolume(vol);
    }
    if(score_rw>0.2){
        fill("limegreen");
        stroke("purple");
        circle(rightwristX,rightwristY,30);
        if (rightwristY>0 && rightwristY<=100) {
            song.rate(0.5);
            document.getElementById("speed").innerHTML="Speed= 0.5x";
        }
         else if (rightwristY>100 && rightwristY<=200) {
            song.rate(1);
            document.getElementById("speed").innerHTML="Speed= 1.0x";
        }
        else if (rightwristY>200 && rightwristY<=300) {
            song.rate(1.5);
            document.getElementById("speed").innerHTML="Speed= 1.5x";
        } 
        else if(rightwristY>300 && rightwristY<=400) {
            song.rate(2);
            document.getElementById("speed").innerHTML="Speed= 2.0x";
        }
        else if(rightwristY>400 && rightwristY<=500) {
            song.rate(2.5);
            document.getElementById("speed").innerHTML="Speed= 2.5x";
        }
    }
    
}

function play() {
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function modelLoaded() {
    console.log("The Model has been initialised.");
}

function gotPoses(results) {
    if (results.length>0) {
        console.log(results);
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
        console.log("Left wristX = "+leftwristX+" ;Left wristY = "+leftwristY);
        console.log("right wristX = "+rightwristX+" ;right wristY = "+rightwristY);
        score_lw=results[0].pose.keypoints[9].score;
        console.log("left wrist score= "+score_lw);
        score_rw=results[0].pose.keypoints[10].score;
        console.log("right wrist score= "+score_rw);
    }
}
