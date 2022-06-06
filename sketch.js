var Missouri, Kansas, Nebraska, Wyoming, Wyoming2, Idaho, Oregon, state;
var wagon_img, wagon, position, square, right, up, textTime, diceRoll, GameState, chance;
var Dysentery, health, work, amount, fix, half,slow;
var inventory, info, ammunition, parts, money, oil;
var food, ox, shopTime, bonus;



function preload() {
  wagon_img = loadImage("sprites/wagon.png");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  state = "Missouri"
  position = [];
  square = 0.01;
  distance = 0;
  up = 0;
  wagon = createSprite(width/20,height*19/20,50,50);
  wagon.lifetime = 1; 
  wagon.addImage("wagon",wagon_img);
  wagon.scale = 0.2;
  textTime = 0;
  Dysentery = "no";
  inventory = "off";
  food = 20;
  ox = 4;
  parts = 1;
  ammunition = 30;
  GameState = "on";
  chance = 0;
  work = 0;
  amount = -100;
  money = 100;
  fix = "yes";
  half = "no";
  oil = 2;
}

function draw() {
  
  background(7,104,207);
  if (GameState === "on") {
    display();
  }
  if (GameState === "wait" && keyWentDown("space")) {
    GameState = "on";
    work = 0;
  } else if (GameState === "shop" && keyWentDown("space")) {
    GameState = "on";
    work = 0;
    amount = -100;
  } else if (keyWentDown("space") && GameState === "on"){
    diceRoll = Math.ceil(random(0,ox) + 0.000001);
    if (half === "yes") {
      diceRoll = Math.ceil(diceRoll/2);
    }
    shopTime = square;
    square = square + diceRoll;
    wagon.lifetime = 1;
    textTime = 30;
    if (Dysentery === "yes") {
      health = health - 1;
    }
    if (square > 19 && shopTime < 19) {
    } else if (square > 39 && shopTime < 39) {
    } else if (square > 59 && shopTime < 59) {
    } else if (square > 79 && shopTime < 79) {
    } else if ((Math.ceil(random(0,2)+0.0000000001) === 2)) {
      chance = Math.ceil(random(0,10)+0.0000000001);
      work = 1;
      }
    food = food - 2;
  }
  
  if (square >= 10){
    up = square - 10*Math.floor(square/10);
  } else {
    up = square;
  }
  strokeWeight(5)
  right = 20 - (2*Math.ceil(square/10)-1);
  
  
  if (square <= 99) {
    wagon = createSprite(width*(2*up + 1)/20,height*right/20,50,50);
    wagon.addImage("wagon",wagon_img);
    wagon.scale = 0.2;
  }
  if (inventory === "on") {
    info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
    info.shapeColor = rgb(0,0,0);
    
  }
  
  //inventory button
  if(keyWentDown("i") && inventory === "off" && GameState === "on") {
    info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
    info.shapeColor = rgb(0,0,0);
    
    inventory = "on";
    GameState = "off";
  } else if(keyWentDown("i") && inventory === "on" && GameState === "off") {
    
    inventory = "off";
    GameState = "on";
  }
  //shop
  if (GameState === "shop" && amount <= -100) {
    if (amount === -100) {
      info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
      info.shapeColor = rgb(0,0,0);
      amount = -10;
    }
    
    
    if (keyWentDown("1")) {
      amount = -10;
      GameState = "shop1";
    } else if(keyWentDown("2")) {
      amount = -10;
      GameState = "shop2";
    } else if(keyWentDown("3")) {
      amount = -10;
      GameState = "shop3"
    } else if(keyWentDown("4")) {
      amount = -10;
      GameState = "shop4"
    }
  } else if (GameState === "shop1") {
    if (amount === -10 ) {
    info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
    info.shapeColor = rgb(0,0,0);
    amount = 0;
    }
    if (keyDown(RIGHT_ARROW) || keyDown(LEFT_ARROW)) {
      info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
      info.shapeColor = rgb(0,0,0);
    }
    buyFood();
  } else if (GameState === "shop2") {
    if (amount === -10 ) {
      info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
      info.shapeColor = rgb(0,0,0);
      amount = 0;
      }
      if (keyDown(RIGHT_ARROW) || keyDown(LEFT_ARROW)) {
        info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
        info.shapeColor = rgb(0,0,0);
      }
      buyOx();
  } else if (GameState === "shop3") {
    if (amount === -10 ) {
      info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
      info.shapeColor = rgb(0,0,0);
      amount = 0;
      }
      if (keyDown(RIGHT_ARROW) || keyDown(LEFT_ARROW)) {
        info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
        info.shapeColor = rgb(0,0,0);
      }
    buyAmmunition();
  } else if (GameState === "shop4") {
    if (amount === -10 ) {
      info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
      info.shapeColor = rgb(0,0,0);
      amount = 0;
      }
      if (keyDown(RIGHT_ARROW) || keyDown(LEFT_ARROW)) {
        info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
        info.shapeColor = rgb(0,0,0);
      }
    buySpareParts();
  }
  // inventory
  
  if (GameState === "fixing") {
    if (amount === -100) {
      info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
      info.shapeColor = rgb(0,0,0);
      amount = 0;
      }
    
  }
  if (GameState === "caster") {
    if (amount = -100) {
      info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
      info.shapeColor = rgb(0,0,0);
      amount = 0;
      }
    
  }

  
  if (GameState === "hunt") {
    if (amount === -100) {
      info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
      info.shapeColor = rgb(0,0,0);
      amount = 0;
      }
      
  }



  drawSprites();
  for (var k = 0; k <10; k = k + 1) {
    line(0,height*(k/10),width,height*(k/10))
  }
  for (var k = 0; k <10; k = k + 1) {
    line(width*(k/10),0,width*(k/10),height)
  }

  if (GameState === "shop1") {
    
    buyFood();
  } else if (GameState === "shop2") {
    
      buyOx();
  } else if (GameState === "shop3") {
    
    buyAmmunition();
  } else if (GameState === "shop4") {
    buySpareParts();
  }

  
  if (GameState === "shop" ) {
    textSize(30);
    fill('white');
    stroke('black');
    text("Shop",width/2 - 50, height*(3/10));
    textSize(20);
    text("1: Food: " + food, width*(2/10) + 50, height*(4/10));
    text("2: Oxen: " + ox, width*(2/10) + 50, height*(4.5/10));
    text("3: Ammunition: " + ammunition, width*(2/10), height*(5/10));
    text("4: Spare Parts: " + parts,width*(2/10),height*(5.5/10));
    text("Press space to Exit" ,width*(5/10) - 50,height*(6.5/10));
  
  }


  if (GameState === "fixing") {
    textSize(30);
    fill('white');
    stroke('black');
    if (half === "yes") {
      text("You fixed your wagon", width/2 - 100, height*(5/10));
    } else {
      text("your wagon is not broken", width/2 - 100, height*(5.5/10));
    }
    text("Press space to Exit" ,width*(5/10) - 50,height*(6.5/10));
    if (keyWentDown("space")) {
      if (half === "yes") {
        half = "no";
        parts = parts - 1;
        GameState = "on";
        inventory = "off";
      }
        
      
    }
  }

  if (GameState === "caster") {
    textSize(30);
    fill('white');
    stroke('black');
  if (Dysentery === "yes") {
    text("You cured your dysentery", width/2 - 100, height*(5/10));
  } else {
    text("you don't need to use this", width/2 - 100, height*(5.5/10));
  }
  text("Press space to Exit" ,width*(5/10) - 50,height*(6.5/10));
  if (keyWentDown("space")) {
    if (Dysentery === "yes") {
      Dysentery = "no";
      oil = oil - 1;
      GameState = "on";
      inventory = "off";
    }
      
    
  }
  }

  if (GameState === "hunt") {
    textSize(30);
    fill("white");
    stroke("black");
    text("How much ammunition do you want to use?", width/2 - 150, height*(5/10));
      text("_" + amount + "_", width/2, height*(5.5/10));
      text("press space to confirm", width/2 - 100, height*(6.5/10));
      if (keyDown(RIGHT_ARROW)) {
        amount = amount + 1;
    } else if(keyDown(LEFT_ARROW && amount - 1>  0)) {
      amount = amount - 1;
    }
    
    if (keyWentDown("space")){
      textSize(30);
  fill("white");
  stroke("black");
      if (ammunition - amount < 0 ) {
        text("too much ammunition", width/2 - 100, height*(7/10));
      } else {
        bonus = food;
        for (var i = 0; i < amount; i+=1) {
          food = food + Math.ceil(random(0,4) + 0.000001);
        }
        text("You gained " + food - bonus + " food", width/2 - 75, height*(5.5/10));
        if (keyWentDown("space")){
          ammunition = ammunition - (amount);
        amount = -100;
        GameState = "on";
        inventory = "off";
        }
      }
      }
    }
  if (GameState === "off") {
    textSize(30);
    fill("white");
    stroke("black");
    text("Inventory",width/2 - 50, height*(3/10));
    textSize(20);
    states();
    text("Food: " + food, width*(2/10) + 50, height*(4/10));
    text("Oxen: " + ox, width*(2/10) + 50, height*(4.5/10));
    text("State: " + state,width*(2/10) + 50, height*(5/10));
    text("1. Ammunition: " + ammunition, width*(2/10) + 50, height*(5.5/10));
    text("2. Spare Parts: " + parts,width*(2/10) + 50,height*(6/10));
    text("3. Caster oil: " + oil,width*(2/10) + 50,height*(6.5/10));
    text("Press space to Exit" ,width*(5/10) - 50,height*(7/10));
    if(keyWentDown("1")) {
      GameState = "hunt";
      amount = -100;
    } else if (keyWentDown("2")) {
      GameState = "fixing";
      amount = -100;
    } else if (keyWentDown("3")) {
      GameState = "caster";
      amount = -100;
    }
    

  }
  

  if (work === 1) {
    textSize(30);
    stroke('white');
    fill('black');
    text("press space to exit", width/2 - 100, height*(7/10));
    if (chance === 1) {
      dysentery();
    } else if (chance === 2) {
      broken();
    } else if (chance === 3) {
      exhaustion();
    } else if (chance === 4) {
      thief();
    } else if (chance === 5) {
      lessOxen();
    } else if (chance === 6) {
      encounter();
    } else if (chance === 7) {
      badEncounter();
    } else if (chance === 8) {
      snake();
    } else if (chance === 9) {
      loseTrail();
    } else if (chance === 10) {
      wildFruit();
    }
  }
  if (textTime > 0) {
    textSize(30);
    fill('white');
    stroke('black');
    text('Dice Roll: ' + diceRoll,width/2 - 100, height*(9/10));
    textTime = textTime - 1;
  }
  if(health === 0) {
    textSize(30);
    fill('white');
    stroke('black');
    text("Game Over",width/2 - 100,height/2);
    GameState = "Over";
  }
  
  if (square > 19 && shopTime < 19) {
    GameState = "shop";
    shopTime = GameState;
  } else if (square > 39 && shopTime < 39) {
    GameState = "shop";
    shopTime = GameState;
  } else if (square > 59 && shopTime < 59) {
    GameState = "shop";
    shopTime = GameState;
  } else if (square > 79 && shopTime < 79) {
    GameState = "shop";
    shopTime = GameState;
  }
  if (GameState === "on") {
    textSize(30);
    stroke('white');
    fill('black');
    text("Press space to move forward, press i to open and close inventory",width/2 - 400,height*(1/20));
  }
  
}

// random encounter functions
function dysentery() {
  info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
  info.shapeColor = rgb(0,0,0);
  //console.log(chance);
  textSize(30);
  fill('white');
  stroke('black');
  
  text("You got dysentery",width/2 - 100,height/2);
  text("You can cure it with caster oil",width/2 - 150,height/2 + 100);
  
  Dysentery = "yes";
  
  GameState = "wait";
  text("Press space to Exit" ,width*(5/10) - 50,height*(6.5/10));
  }

function broken() {
  info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
  info.shapeColor = rgb(0,0,0);
  textSize(30);
  fill("white");
  stroke("black");
  text("While traveling, you break a wagon tongue", width/2 - 200, height/2);
  text("You will move at a slower average pace", width/2 - 200, height/2 + 100);
  half = "yes";
  GameState = "wait";
  text("Press space to Exit" ,width*(5/10) - 50,height*(6.5/10));
  }

function exhaustion() {
  info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
  info.shapeColor = rgb(0,0,0);
  textSize(30);
  fill("white");
  stroke("black");
  chance = Math.ceil(random(0,3) + 0.000001);
  text("You became too exausted to keep traveling", width/2 - 200, height/2);
  text("You take a " + chance + "day break", width/2 - 150, height/2 + 100);
  text("lose " + 2*chance + " food")
  food = food - 2*chance;
  GameState = "wait";
  text("Press space to Exit" ,width*(5/10) - 50,height*(6.5/10));
}

function thief() {
  info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
  info.shapeColor = rgb(0,0,0);
  textSize(30);
  fill("white");
  stroke("black");
  text("While sleeping, some thieves came and stole your stuff", width/2 - 300, height/2);
  text ("-" + Math.ceil((1/4)*food) + " food", width/2 - 50, height*(5.5/10));
  food = food - Math.ceil((1/4)*food);
  text("-" + Math.ceil((1/4)*ammunition) + " ammunition", width/2 - 50, height*(6/10));
  ammunition = ammunition - Math.ceil((1/4)*ammunition);
  if ( parts > 1){
    text("-" + Math.ceil((1/4)*parts) +  "spare parts", width/2 -50, height*(6.5/10));
    parts = parts - Math.ceil((1/4)*parts);
    }
  GameState = "wait";
  text("Press space to Exit" ,width*(5/10) - 50,height*(6.5/10));
}
    

function lessOxen() {
  info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
  info.shapeColor = rgb(0,0,0);
  textSize(30);
  fill("white");
  stroke("black");
  text("An oxen breaks free and ran away while you were traveling",width/2 - 300, height*(5/10));
  text("-1 oxen", width/2 -50, height*(5.5/10));
  ox = ox - 1;
  GameState = "wait";
  text("Press space to Exit" ,width*(5/10) - 50,height*(6.5/10));
}

function encounter() {
  info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
  info.shapeColor = rgb(0,0,0);
  textSize(30);
  fill("white");
  stroke("black");
  text("You encountered a native american tribe",width/2 - 250, height*(5/10));
  text("they offer you some food for your travels",width/2 - 250, height*(5.5/10));
  text("+5 food",width/2 - 50, height*(6/10));
  food = food + 5;
  GameState = "wait";
  text("Press space to Exit" ,width*(5/10) - 50,height*(6.5/10));
}
function badEncounter() {
  info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
  info.shapeColor = rgb(0,0,0);
  textSize(30);
  fill("white");
  stroke("black");
  text("You encountered a native american tribe",width/2 - 250, height*(5/10));
  text("You end up getting into a shoot out", width/2 - 250, height*(5.5/10));
  text("-3 health", width/2 - 250, height*(6/10));
  health = health - 3;
  GameState = "wait";
  text("Press space to Exit" ,width*(5/10) - 50,height*(6.5/10));
}

function snake() {
  info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
  info.shapeColor = rgb(0,0,0);
  textSize(30);
  text("You got bitten by a wild snake", width/2 - 250, height*(5/10));
  text("-1 health", width/2 - 250, height*(5.5/10));
  health = health - 1;
  GameState = "wait";
  text("Press space to Exit" ,width*(5/10) - 50,height*(6.5/10));
}

function loseTrail() {
  info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
  info.shapeColor = rgb(0,0,0);
  textSize(30);
  text("You end up losing track of the trail, and waste a day", width/2 - 250, height*(5/10));
  text("-2 food", width/2 - 250, height*(5/10));
  food = food - 2;
  GameState = "wait";
  text("Press space to Exit" ,width*(5/10) - 50,height*(6.5/10));
}

function wildFruit() {
  info = createSprite(width/2,height/2,width*(6/10),height*(6/10));
  info.shapeColor = rgb(0,0,0);
  textSize(30);
  text("you find some wild fruits", width/2 - 250, height*(5/10));
  text("+3 food", width/2 - 250, height*(5.5/10));
  GameState = "wait";
  text("Press space to Exit" ,width*(5/10) - 50,height*(6.5/10));
}

function display() {
  Missouri = createSprite(width*(1/20),height*(19/20),width*(1/10),height*(1/10));
  Missouri.shapeColor = rgb(182,101,65);
  Kansas = createSprite(width*(11/20),height*(19/20),width*(9/10),height*(1/10)); 
  Kansas.shapeColor = rgb(149,174,85);
  Nebraska = createSprite(width/2, height*(8/10),width, height*(2/10));
  Nebraska.shapeColor = rgb(220,186,107);
  Wyoming = createSprite(width/2, height*(6/10),width, height*(2/10));
  Wyoming.shapeColor = rgb(47,74,42);
  Wyoming2 = createSprite(width/4, height*(4.5/10),width/2, height*(1/10));
  Wyoming2.shapeColor = rgb(47,74,42);
  Idaho2 = createSprite(width*3/4, height*(4.5/10),width/2, height*(1/10));
  Idaho2.shapeColor = rgb(15,109,79);
  Idaho = createSprite(width/2, height*(3/10),width, height*(2/10));
  Idaho.shapeColor = rgb(15,109,79);
  Oregon = createSprite(width/2, height*(1/10),width, height*(2/10));
  Oregon.shapeColor = rgb(164,173,30);
}

function states() {
  if (square < 1) {
    state = "Missouri";
  } else if (square <11) {
    state = "Kansas";
  } else if (square < 31) {
    state = "Nebraska";
  } else if (square < 56) {
    state = "Wyoming";
  } else if (square < 81) {
    state = "Idaho";
  } else {
    state = "Oregon";
  }
}

function buyFood() {
  
  textSize(30);
  fill("white");
  stroke("black");
  text("How much food?", width/2 - 100, height*(5/10));
  text("1 food cost 5 dollars", width/2 - 150, height*(5.5/10));
  text("_" + amount + "_", width/2, height*(6/10));
  text("Press space to Confirm" ,width*(5/10) - 50,height*(6.5/10));
  if (keyDown(RIGHT_ARROW)) {
      amount = amount + 1;
  } else if(keyDown(LEFT_ARROW && amount - 1 > 0)) {
    amount = amount - 1;
  }
  if (keyWentDown("space")){
    if (money - 5*amount < 0 ) {
      text("too poor", width/2 - 25, height*(7/10));
    } else {
    food = food + amount;
    money = money - (5*amount);
    amount = -100;
    GameState = "shop";
    }
    
  }
}

function buyOx(){
  textSize(30);
  fill("white");
  stroke("black");
  text("How much Oxen?", width/2 - 100, height*(5/10));
  text("1 oxen cost 40 dollars", width/2 - 150, height*(5.5/10));
  text("_" + amount + "_", width/2, height*(6/10));
  text("Press space to Confirm" ,width*(5/10) - 50,height*(6.5/10));
  if (keyDown(RIGHT_ARROW)) {
      amount = amount + 1;
  } else if(keyDown(LEFT_ARROW && amount - 1 > 0)) {
    amount = amount - 1;
  }
  if (keyWentDown("space")){
    if (money - 40*amount < 0 ) {
      text("too poor", width/2 - 25, height*(7/10));
    } else {
    ox = ox + amount;
    money = money - (40*amount);
    amount = -100;
    GameState = "shop";
    }
    
  }
}

function buyAmmunition() {
  textSize(30);
  fill("white");
  stroke("black");
  text("How much ammo?", width/2 - 100, height*(5/10));
  text("1 ammunition cost 1 dollar", width/2 - 150, height*(5.5/10));
  text("_" + amount + "_", width/2, height*(6/10));
  text("Press space to Confirm" ,width*(5/10) - 50,height*(6.5/10));
  if (keyDown(RIGHT_ARROW)) {
      amount = amount + 1;
  } else if(keyDown(LEFT_ARROW && amount - 1 > 0)) {
    amount = amount - 1;
  }
  if (keyWentDown("space")){
    if (money - amount < 0 ) {
      text("too poor", width/2 - 25, height*(7/10));
    } else {
    food = food + amount;
    money = money - (amount);
    amount = -100;
    GameState = "shop";
    }
    
  }
}

function buySpareParts(){
  textSize(30);
  fill("white");
  stroke("black");
  text("How many spare parts?", width/2 - 100, height*(5/10));
  text("1 spare part cost 20 dollars", width/2 - 150, height*(5.5/10));
  text("_" + amount + "_", width/2, height*(6/10));
  text("Press space to Confirm" ,width*(5/10) - 50,height*(6.5/10));
  if (keyDown(RIGHT_ARROW)) {
      amount = amount + 1;
  } else if(keyDown(LEFT_ARROW && amount - 1 > 0)) {
    amount = amount - 1;
  }
  if (keyWentDown("space")){
    if (money - 20*amount < 0 ) {
      text("too poor", width/2 - 25, height*(7/10));
    } else {
    food = food + amount;
    money = money - (20*amount);
    amount = -100;
    GameState = "shop";
    }
    
  }
}
