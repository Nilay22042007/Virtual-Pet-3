//Create variables here
var dog
var happyDog
var dogImage,dogImage1
var database
var S ,fedTime,lastFed,currentTime,foodStock,gameState,readState
var foodS 
var changingState
var readingState
var bedroomImage,gardenImage,washroomImage
function preload()
{

dogImage=	loadImage("images/dogImg.png")
dogImage1=loadImage("images/dogImg1.png")
bedroomImage=loadImage("images/Bed Room.png")
gardenImage=loadImage("images/Garden.png")
washroomImage=loadImage("images/Wash Room.png")
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database()
  foodObj = new Food()
  foodStock=database.ref('Food')
  foodStock.on("value",readStock);
  dog=createSprite(250,300,150,150)
  dog.addImage(dogImage)
  dog .scale=0.15
  feed = createButton("feed the dog")
  feed.position(650,95)
  feed.mousePressed(feedDog)
  addFood = createButton("addFood")
  addFood.position(750,95)
  addFood.mousePressed(addFoods)
  fedTime = database.ref('feedTime')
  fedTime.on("value",function(data){
    lastFed = data.val()
  })
  readState = database.ref('gameState')
  readState.on("value",function(data){
    gameState = data.val()
  })
}


function draw() {  
  currentTime-hour ();
if(currentTime === (lastFed+1)){
update("Playing");
foodObj.garden();
}
else if(currentTime === (lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
}
else if(currentTime>(lastFed+2) && currentTime<-(lastFed+4)){
    update("Bathing");
    foodObj . washroom();
}
else{
    update("Hungry")
    foodObj.display();
}
if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    feed.show();
    addFood.show();
    dog.addImage(dogImage);
  }
  drawSprites()
  }

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)


}
function feedDog(){
  dog.addImage(dogImage1)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
 
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour(),
    gameState:"Hungry"

  })
}
function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}
function update(state){
  database.ref('/').update({
    gameState:state
  });
}












