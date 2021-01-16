var PLAY = 2;
var END = 0;
var START = 1;

var gameState = START;

var backImg, scaryBG;
var firstImg, starter;
var princeImg, prince;
var treasureImg, treasure;
var dragonImg, dragon;
var gameoverImg, gameOver;

var distance=0;
var treasureValue=0;

function preload() {
  backImg =loadImage("scary background2.jpg")
  firstImg = loadImage("DRAGONS 1.jpg");
  princeImg = loadImage("PRINCE.jpg");
  treasureImg = loadImage("treasure.jfif");
  dragonImg = loadImage("dragon obstacle.jfif");
  gameoverImg = loadImage("dragon fire.jpg");
}

function setup() {
  createCanvas(700, 500);
  
  scaryBG = createSprite(350,250);
  scaryBG.addImage("scarybackground", backImg);
  scaryBG.scale = 1.2;
  //scaryBG.x = scaryBG.width /2;
  scaryBG.velocityX = - (8 + distance/40);
  scaryBG.visible = false;
  
  starter = createSprite(350,250);
  starter.addImage("starter", firstImg);
  starter.scale = 1.7;
  
  prince = createSprite(60,250);
  prince.addImage("prince", princeImg);
  prince.visible = false;
  
  gameOver = createSprite(1500,250);
  gameOver.addImage("gameover", gameoverImg);
  gameOver.scale = 1.4;
  gameOver.visible = false;
  
  treasureGrp = new Group();
  dragonGrp = new Group();
  
}

function draw() {
   background(225);
    textSize(30);
    fill("yellow");
    text("Distance : "+ distance +  " m" , 50, 40);
  
    textSize(30);
    fill("yellow");
    text("Treasure : "+ treasureValue +  " 💎" , 320, 40);
  
    drawSprites();
  
  
  if (keyDown("ENTER")) {
    gameState = "PLAY";
    reset();
  }
  
  if (gameState === "PLAY") {
    scaryBG.visible = true;
    
    starter.visible = false;
    
    prince.visible = true;
    
    textSize(30);
    fill("yellow");
    text("Distance : "+ distance +  " m" , 50, 40);
    distance = distance + Math.round(getFrameRate()/60);
    
    textSize(30);
    fill("yellow");
    text("Treasure : "+ treasureValue +  " 💎" , 320, 40);
    
    if (treasureGrp.isTouching(prince)) {
      treasureGrp.destroyEach();
      treasureValue = treasureValue + 10;
    }
    
    if (scaryBG.x < 0) {
      scaryBG.x = scaryBG.width/2;
      //scaryBG.x = 700;
    }
    
    if (dragonGrp.isTouching(prince)) {
      gameState = END;
    }
    
    gameOver.x = 1500;
    
    prince.y = mouseY;
    
    spawntreasure();
    spawndragons();
  }
  else if (gameState === END) {
    //scaryBG.velocityX = 0;
    scaryBG.visible = false;
    
    gameOver.visible = true;
    gameOver.x = 350;
    
    treasureGrp.destroyEach();
    dragonGrp.destroyEach();
    
    prince.visible = false;
    
    textSize(30);
    fill("red");
    text("PRESS ENTER TO RESTART THE GAME", 70,480);
  }
  


}

function spawntreasure() {

  if (frameCount % 150 === 0) {
     treasure = createSprite(700,500,40,10);
     treasure.y = Math.round(random(100,300));
     treasure.addImage(treasureImg);
     treasure.scale = 0.6;
     treasure.velocityX = - (9 + distance/40);
    
     //assign lifetime to the variable
     treasure.lifetime = 750;
    
     treasure.depth = prince.depth;
     prince.depth = prince.depth + 1;

     treasureGrp.add(treasure);
    }
}

function spawndragons() {

  if (frameCount % 100 === 0) {
     dragon = createSprite(700,500,40,10);
     dragon.y = Math.round(random(100,420));
     dragon.addImage(dragonImg);
     dragon.scale = 0.5;
     dragon.velocityX = - (9 + distance/40);
    
     //assign lifetime to the variable
     dragon.lifetime = 750;
    
    dragonGrp.add(dragon);
    }
}

function reset() {
      
    distance = 0;
    treasure = 0;
}








