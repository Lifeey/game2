var bg, bgImg;
var player, shooterImg, shooter_shooting, shooter1_img;
var bullet, bulletGroup
var zombieImg, zombie
var zombieGroup
var heart1, heart2, heart3
var heart1img, heart2img, heart3img


function preload() {

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  shooter1_img = loadImage("assets/shooter_1.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")

  heart1img = loadImage("assets/heart_1.png")
  heart2img = loadImage("assets/heart_2.png")
  heart3img = loadImage("assets/heart_3.png")

}

function setup() {


  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.1


  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)

//bullet group
bulletGroup = new Group();

//creating bullet
bullet = createSprite(displayWidth - 1090, displayHeight - 321, 30, 5)
bullet.visible = false
  bulletGroup.add(bullet)

  //create heart sprites

  heart1 = createSprite(displayWidth - 150, 40, 20, 20)
  heart1.visible = false
  heart1.addImage(heart1img)
  heart1.scale = 0.4
  heart2 = createSprite(displayWidth - 100, 40, 20, 20)
  heart2.visible = false
  heart2.addImage(heart2img)
  heart2.scale = 0.4
  heart3 = createSprite(displayWidth - 150, 40, 20, 20)
  heart3.visible = false
  heart3.addImage(heart3img)
  heart3.scale = 0.4


  //create zombie group

  zombieGroup = new Group();

}

function draw() {
  background(0);

  zombiespawn();


  //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30
  }

  //moving the player sideways and making the game mobile using touches
  if (keyDown("RIGHT_ARROW") || touches.length > 0) {
    player.x = player.x + 30
  }
  if (keyDown("LEFT_ARROW") || touches.length > 0) {
    player.x = player.x - 30
  }
  //release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {

    player.addImage(shooter_shooting)
    bullet.visible = true
    bullet.velocityX = 5

  }

  //player goes back to original standing image once we stop pressing the space bar
  else if (keyWentUp("space")) {
    player.addImage(shooterImg)
  }

  //check collision

  if (zombieGroup.isTouching(player)) {
    // console.log("hello");

    for (var i = 0; i < zombieGroup.length; i++) {
      if (zombieGroup[i].isTouching(player)) {
        zombieGroup[i].destroy();
      }
    }



  }


  if (bulletGroup.isTouching(zombieGroup)) {
    // console.log("hello");

    for (var i = 0; i < bulletGroup.length; i++) {
      if (bulletGroup[i].isTouching(zombieGroup)) {
        bulletGroup[i].destroy();
      }
    }



  }



  drawSprites();

}
//creating zombie
function zombiespawn() {
  if (frameCount % 100 == 0) {

    //creating zombiesprite
    zombie = createSprite(random(displayWidth / 2 - 100, displayWidth / 2 + 350), random(displayHeight / 2 - 250, displayHeight / 2 + 250), 50, 50)
    zombie.addImage(zombieImg)
    zombie.velocityX = -3
    zombie.scale = 0.2
    zombie.lifetime = 300
    zombieGroup.add(zombie)
  }

}