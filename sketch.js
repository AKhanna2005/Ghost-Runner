var towerImage,tower;
var doorImage,door,doorsGroup;
var climberImage,climber,climbersGroup;
var ghost, ghostImage;
var invisableblockgroup,invisableblock;
var gamestate="play";
function preload(){
  doorImage=loadImage("door.png");
  towerImage=loadImage("tower.png");
climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY=1;
  doorsGroup=new Group();
  climbersGroup=new Group();
  ghost=createSprite(200,200,50,50);
  ghost.scale=0.3;
  ghost.addImage("ghost",ghostImage);
  invisableblockgroup= new Group();
  
}

function draw(){
background(0);
  if(gamestate==="play"){
  if (tower.y>400){
    tower.y=300;
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  if (climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisableblockgroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gamestate="end";
  }
  spawndoors();
drawSprites();
}
  if(gamestate==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("gameover",230,250);
  }
}
function spawndoors(){
  if(frameCount%240===0){
    var door=createSprite(200,-50);
    door.addImage(doorImage);
door.x=Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=800;
    doorsGroup.add(door);
    ghost.depth=door.depth;
    ghost.depth+=1;
var climber=createSprite(200,10);
    climber.addImage(climberImage);
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=800;
    climbersGroup.add(climber);
    var invisableblock=createSprite(200,15);
    invisableblock.width=climber.width;
    invisableblock.height= 2;
    invisableblock.x=door.x;
    invisableblock.velocityY=1;
    invisableblock.lifetime=800;
    invisableblock.debug=true;
    invisableblockgroup.add(invisableblock);
  }
}