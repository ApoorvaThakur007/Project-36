var dog,sadDog,happyDog;
var button1,button2;
var foodObj;
var lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  
  database = firebase.database()
  foodObj = new Food()
  var foodStockRef = database.ref("food")
  foodStockRef.on("value",readFoodStock)

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
   
  addFood = createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

  feed = createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)
}

function draw() {
  background(46,139,87);
  foodObj.display();
  fedTime=database.ref('fedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
  drawSprites();
}

//function to read food Stock
function readFoodStock(data){
  foodS = data.val()
  foodObj.updateFoodStock(foodS)
}
 
//function to update food  stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    fedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
