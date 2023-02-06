const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boatanimation = [];
var boatspritedata, boatspritesheet;


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatspritedata = loadJSON("./assets/boat/boat.json");
  boatspritesheet = loadImage("./assets/boat/boat.png");
}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15;
  tower = Bodies.rectangle(150, 350, 160, 310,{isStatic:true});
  World.add(world,tower);
  cannon = new Cannon(180, 110, 100, 50, angle);
  boat = new Boat(width, height - 100, 200, 200, -100);
  //Crear suelo
  ground = Bodies.rectangle(600,600,1200,20,{isStatic:true});
  World.add(world,ground);
  var boatframes = boatspritedata.frames;
  //Ciclo for para que siempre se haga un recuadro
  for (var i = 0; i < boatframes.length; i ++ ){
    var pos = boatframes[i].position;
    var img = boatspritesheet.get(pos.x,pos.y,pos.w,pos.h);
    boatanimation.push(img);
  }

  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, heigth);

 

  Engine.update(engine);
  //Velocidad para el barco
  Matter.Body.setVelocity(boat.body,{x:-0.9,y:0})
push();
  imageMode(CENTER);
 image(towerImage,tower.position.x,tower.position.y,160,310)
pop();
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }
  boat.display()

  cannon.display();
  //tower.display();
  rect(ground.position.x,ground.position.y,1200,20);

  
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

//function to show the ball
function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}



function keyReleased() {
  if (keyCode === DOWN_ARROW) { 
    balls[balls.length - 1].shoot();
  }
}