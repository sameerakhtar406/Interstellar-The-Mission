var Start,SImg
var TARS,TMoving
var Ground,GImg
var moon,mImg
var obGroup,obImg
var cGroup,c1,c2,c3,c4,c5,c6
var Radio
var bGroup,Battery
var spealt

var score=0
var charge=100
var alt=0
var acalc=418


var style
var caution

var GameState="Start"

function preload(){
  SImg=loadImage("My Post.jpg")

  TMoving=loadAnimation("01.png","1.png","2.png");
  
  GImg=loadImage("GImg1.png")
  
  mImg=loadImage("mo.jpg")
  
  obImg=loadImage("obs.png")
  
  c1=loadImage("ob.png")
  c2=loadImage("ob1.png")
  c3=loadImage("ob2.png")
  c4=loadImage("ob3.png")
  c5=loadImage("ob4.png")
  c6=loadImage("ob5.png")

  Radio=loadSound("Radio.mp3")

  Battery=loadImage("Bat.png");

  style=loadFont("led_display-7.ttf")
  caution=loadFont("Aaargh.ttf")
}
function setup() {
  createCanvas(1365,620);
  
  Start=createSprite(683,310,70,70);
  Start.addImage(SImg);
  Start.scale=0.615
  
  moon=createSprite(50,50,20,20);
  moon.addImage(mImg);
  moon.scale=0.2
  
  TMoving.frameDelay = 5;
  TARS=createSprite(160,430,20,20);
  TARS.addAnimation("TM",TMoving);
  TARS.scale=0.8

  Ground=createSprite(600,570,1200,20);
  Ground.addImage(GImg);
  Ground.velocityX=-(3 + 3* score/10)
  Ground.x=Ground.width/2
  
  spealt=createSprite(410,45,340,20);
  spealt.shapeColor="black"

  obGroup= createGroup();
  cGroup= createGroup();
  bGroup= createGroup();
}

function draw() {
  //console.log(TARS.y)
  background(0,162,207);
  if(GameState==="Start"){
   background(0)
   moon.visible=false
   TARS.visible=false
   Ground.visible=false
   spealt.visible=false
   Radio.play();
   if(keyCode===13){
    GameState="Play"
  }
  drawSprites();
  fill(57,255,20)
  textFont(caution)
  textSize(17)
  text("!!Do not go above 150ft,or the Battery will drain!! ",480,20)
  fill(15, 106, 99)
  textSize(20)
  text("Created by Sameer Akhtar",970,590)
  }
  if(GameState==="Play"){
    Start.visible=false
    moon.visible=true
    TARS.visible=true
    Ground.visible=true
    spealt.visible=true
  if(Ground.x<0){
    Ground.x=Ground.width/2
  }
  spawnObstacles();
  spawnComms();
  spawnBattery();

  if(keyCode===38){
    TARS.y=TARS.y-2
  }
  if(keyCode===40){
    TARS.y=TARS.y+2
  }
  if(keyCode===37){
    TARS.y=TARS.y-2
  }
  if(keyCode===39){
    TARS.y=TARS.y+2
  }

  if(TARS.y<270){
    charge=charge-1
  }
  if(TARS.y<418){
    alt=Math.round(acalc-TARS.y)
  }
  if(TARS.isTouching(cGroup)){
  cGroup.destroyEach();
  score=score+ Math.round(random(7,12))
  }
  if(TARS.isTouching(bGroup)){
  bGroup.destroyEach();
  charge=charge+25
  }

  fill("white")
  textSize(25)
  text(score+ "  Messages Retrieved",1097,30 )
  fill("green")
  text("Battery :" +charge+"v",1100,60 )

  if(charge<=0){
    GameState="END"
  }
  if(TARS.isTouching(obGroup)){
   GameState="END"
  }
  drawSprites();
  fill(29,145,12)
  textFont(style);
  textSize(16)
  text("Altitude :" +alt+"ft",250,50)
  text("Speed :4mph",450,50)
  }if(GameState==="END"){
    background(0,0,20)
    moon.visible=false
    Ground.velocityX=0
    obGroup.setVelocityXEach(0);
    cGroup.setVelocityXEach(0);
    bGroup.setVelocityXEach(0);
    obGroup.destroyEach();
    cGroup.destroyEach();
    bGroup.destroyEach();
    TARS.destroy();
    Ground.visible=false
    spealt.visible=false
    fill("red")
    textSize(35)
    text("TARS GOT WRECKED",485,300)
    fill("green")
    text("TARS GOT WRECKED",488,303)
    fill("yellow")
    textFont(style);
    textSize(65)
    text("MISSION FAILED",360,250)
    textSize(30)
    fill("white")
    text("Reload to go on the mission again!",330,400)
  } 


  TARS.collide(Ground)


}
function spawnObstacles() {
  if (frameCount % 130 === 0) {
    var OBS = createSprite(600,523,40,10);
    OBS.addImage(obImg);
    OBS.scale = 1;
    OBS.velocityX = -(4 + score/10);;
    OBS.lifetime = 300;
    
    obGroup.add(OBS);
  }
}
function spawnComms(){
  if (frameCount % 350 === 0){
    var comms = createSprite(600,(random(300,480)),10,40);
    comms.velocityX = -7
    
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: comms.addImage(c1);
               break;
       case 2: comms.addImage(c2);
               break;
       case 3: comms.addImage(c3);
               break;
       case 4: comms.addImage(c4);
               break;
       case 5: comms.addImage(c5);
               break;
       case 6: comms.addImage(c6);
               break;
       default: break;
     }
    
     //obstacle.scale = 0.5;
      comms.lifetime = 300;
    
     cGroup.add(comms);
  }
 }
 function spawnBattery() {
  if (frameCount % 1200 === 0) {
    var  BAT= createSprite(600,180,40,10);
    BAT.addImage(Battery);
    BAT.scale = 1;
    BAT.velocityX = -3;
    BAT.lifetime = 300;
    
    bGroup.add(BAT);
  }
}
