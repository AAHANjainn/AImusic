music_1 = "";
music_2 = "";
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_score = 0;
rightWrist_score = 0;
song_1_status = "";
song_2_status = "";


function preload(){
    music_1 = "music.mp3";
    music_2 = "music2.mp3";
}


function setup(){
    canvas = createCanvas(500,400);
    video = createCapture(VIDEO);
    video.size(500,400);
    video.hide();
    canvas.center();
    pose_model = ml5.poseNet(video,modelLoaded);
    pose_model.on("pose",gotPoses);
}
function modelLoaded(){
    console.log("model is loaded");
}

function gotPoses(results){
if(results.length>0){
console.log(results);
leftWrist_x = results[0].pose.leftWrist.x;
leftWrist_y = results[0].pose.leftWrist.y;
rightWrist_y = results[0].pose.rightWrist.x;
rightWrist_y = results[0].pose.rightWrist.y;
leftWrist_score = results[0].pose.keypoints[9].score;
rightWrist_score = results[0].pose.keypoints[10].score;
}
}

function draw(){
    image(video,0,0,500,400);
    fill("red");
            stroke("white");
   // song_1_status = music_1.isPlaying();
   song_1_status = music_1.isPlaying();
    song_2_status = music_2.isPlaying();
    if(leftWrist_score>0.2){
circle(leftWrist_x,leftWrist_y,20);
 music_2.stop();
 if(song_1_status==false){
music_1.play();
document.getElementById("song_status").innerHTML = "Playing Harry Potter Theme Song"
 }

    }
    if(rightWrist_score>0.2){
        circle(rightWrist_x,rightWrist_y,20);
        music_1.stop();
        if(song_2_status==false){
       music_2.play();
       document.getElementById("song_status").innerHTML = "Playing Peter Pan Theme Song"
        }        
    }
            
}