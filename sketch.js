var bgimg, timg, gimg, bimg;
var bg, t, g, b, score;
var tgroup, bgroup;
var game;
var shot;
function preload(){
  bgimg = loadImage("background.jpg");
  timg = loadImage("target.png");
  gimg = loadImage("gun.png")
  bimg = loadImage("bullet.png")
  shot = loadSound("shot.mp3")
}

function setup(){
  createCanvas(700, 400)
  bg = createSprite(350, 200);
  bg.addImage(bgimg);
  bg.scale = 0.5;
  g = createSprite(600, 300);
  g.addImage(gimg);
  g.scale = 0.2
  tgroup = createGroup();
  bgroup = createGroup();
  score = 5
  game = 'play'
}

function draw(){
  
  if (game == 'play'){
    background('white');
    drawSprites();
    fill("black")
    textSize(20)
    text("Bullets:" + score, 600, 50)

    g.y = mouseY
    createTarget();
    shoot();
    for (var q = 0; q < tgroup.length; q ++){
      for (var i = 0; i < bgroup.length; i ++ ){
        if (bgroup[i].isTouching(tgroup[q])){
          tgroup[q].destroy()
          bgroup[i].destroy()
          score += 1
        }  
      }
    }

    if (score == -1){
      game = 'end'
    }
  }

  if (game == 'end'){
    fill('black')
    textSize(50)
    text("OUT OF BULLET", 200, 200)

  }
}


function createTarget(){
  if (frameCount % 50 == 0){
    t = createSprite(0, random(0,400));
    t.scale =0.1;
    t.addImage(timg);
    t.velocityX=random(5, 30);
    t.velocityY = random(-8, 8);
    tgroup.add(t);
    t.lifetime = 600
  }

}

function shoot(){
  if (keyWentDown("space") && score > -1){
    b = createSprite(g.x, g.y);
    b.addImage(bimg);
    b.scale = 0.05
    b.velocityX = -25
    bgroup.add(b);
    b.lifetime = 600
    score -= 1
    shot.play()
  }
}