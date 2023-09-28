var video="";
var detect_object="";
var status="";
var objects=[];


function preload(){
    // img=loadImage("dog_cat.jpg");
}

function setup(){
    canvas=createCanvas(800, 600);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    detect_object=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Btn_status").innerHTML="Status: Detectando objeto(s)";
}

function modelLoaded(){
    console.log("Modelo carregado");
    status=true;
    detect_object.detect(video, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    // else{
        console.log(results);
        objects=results;
    // }
}

function draw(){
    image(video, 0, 0, 800, 600);

    // fill("red");
    // text("Dog", 45, 75);
    // noFill();
    // stroke("red");
    // rect(30, 60, 440, 530)

    // fill("red");
    // text("Cat", 450, 150);
    // noFill();
    // stroke("red");
    // rect(445, 135, 450, 530);

    // console.log("antes do if");

    if(status != ""){

        // console.log("depois do if");
        // console.log(objects);

        detect_object.detect(video, gotResults);
        r=random(255);
        g=random(255);
        b=random(255);

        for(var inc=0; inc<objects.length; inc++){

            console.log("dentro do for");

            document.getElementById("Btn_status").innerHTML="Status:Objeto(s) detectado(s).";
            document.getElementById("Btn_quantidade").innerHTML="Quantidade de objetos detectado:"+objects.length;
            fill(r, g, b);
            percent=floor(objects[inc].confidence*100);
            text(objects[inc].label+" "+percent+"%", objects[inc].x, objects[inc].y);
            noFill();
            stroke(r, g, b);
            rect(objects[inc].x, objects[inc].y, objects[inc].width, objects[inc].height);
        }
    }
}