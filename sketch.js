var PLAY = 1;
var END = 0;
var gameState = PLAY;



var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudgroup, cloudimage;
var obs1, obs2, obs3, obs4, obs5, obs6;


var score;

//carregar image
function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  cloudimage = loadImage ("cloud.png");
  groundImage = loadImage("ground2.png");
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");


}

function setup() {

  createCanvas(1000,1000)
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide", trex_collided);
  trex.scale = 0.6;
  
  //crie sprite ground (solo)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;

 
  
  //crie um solo invisível
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //gerar números aleatórios
  var rand =  Math.round(random(1,100))
  console.log(rand)

  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  console.log("Hello" + 5);
  
  score = 0;

}

function draw() {
  //definir cor do plano de fundo
  background("white");
  
  console.log(trex.y)
  
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
    //mover o solo
    ground.velocityX = -6;
  
    
  score = score + Math.round(frameCount/60);

  if(keyDown("space")&& trex.y >= 120) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //impedir que o trex caia
  trex.collide(invisibleGround);
  
  //Gerar Nuvens
  spawnClouds();

  Spawn_Obstacle();
  }
  else if(gameState === END){
    //parar o solo
    ground.velocityX = 0;
  
  }
  
  // pulando o trex ao pressionar a tecla de espaço
  
  
  drawSprites();
}



//função para gerar as nuvens
function spawnClouds(){
 //escreva seu código aqui
if (frameCount % 60 === 0){
cloud = createSprite(1000, 100, 40, 10);
cloud.addImage (cloudimage);
cloud.y = Math.round (random(10, 60));
cloud.scale = 1;
cloud.velocityX = -4;

cloud.lifetime = 200

cloud.depth = trex.depth;
trex.depth = trex.depth +1;
}
}
function Spawn_Obstacle(){
if (frameCount % 60 === 0){
var obstacle = createSprite(1000, 165, 10, 40);
obstacle.velocityX = -6;
var rand = Math.round(random(1,6));

switch(rand){
case 1: obstacle.addImage(obs1);
break
case 2: obstacle.addImage(obs2);
break
case 3: obstacle.addImage(obs3);
break
case 4: obstacle.addImage(obs4);
break
case 5: obstacle.addImage(obs5);
break
case 6: obstacle.addImage(obs6);
break
default: break
}

obstacle.scale = 0.5;
obstacle.lifetime = 300;
obstaclesGroup.add(obstacle);
}

}


