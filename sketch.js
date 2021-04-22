var dog, dogImg, happyDogImg, database, foodS, foodStock

function preload()
{
	dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250, 300);
  dog.addImage(dogImg);
  dog.scale = 0.25;
  

  foodStock = database.ref('food');
  foodStock.on("value", readStock);

}


function draw() {
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  drawSprites();
  //add styles here
  fill(255);
  text("Remaining Food: " + foodS, 200, 150);

  text("Press UP ARROW KEY to feed the dog!", 150, 25);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x<=0) {
    x = 0;
  }
  else {
    x = x-1;
  }

  database.ref('/').update({
    food:x
  })
}