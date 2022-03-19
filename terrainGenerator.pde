/* @pjs preload="data/deadBush.png","data/flowerPink.png","data/flowerRed.png", "data/flowerYellow.png", "data/notSnowyTreeExport.png", "data/shortSnowyTreeTwoHumpsExport.png", "data/shortSnowyTreeThreeHumpsExport.png", "data/snowTreeExport.png", "data/shortTreeTwoHumpsExport.png", "data/shortTreeThreeHumpsExport.png"; */

//add frequency array for trees, stuff
//rocks, grass, cactus, etc
  //-> more biomes
//background color (gradient)
  //-> use sine function for gradual change
//UI?

PImage deadBush;
PImage flowerPink;
PImage flowerRed;
PImage flowerYellow;
PImage notSnowyTree;
PImage notSnowyTreeTwoHumps;
PImage notSnowyTreeThreeHumps;
PImage snowyTree;
PImage snowyTreeTwoHumps;
PImage snowyTreeThreeHumps;

Biome plains;
Biome evergreenForrest;
Biome desert;
Biome icyPlains;
Biome icyForrest;

void setup () {

  frameRate(120);
  background(0);
  
  size(innerWidth, 400);
  noStroke();
  
  imageMode(CORNER);
  
  deadBush = loadImage("data/deadBush.png");
  flowerPink = loadImage("data/flowerPink.png");
  flowerRed = loadImage("data/flowerRed.png");
  flowerYellow = loadImage("data/flowerYellow.png");
  notSnowyTree = loadImage("data/notSnowyTreeExport.png");
  notSnowyTreeTwoHumps = loadImage("data/shortSnowyTreeTwoHumpsExport.png");
  notSnowyTreeThreeHumps = loadImage("data/shortSnowyTreeThreeHumpsExport.png");
  snowyTree = loadImage("data/snowTreeExport.png");
  snowyTreeTwoHumps = loadImage("data/shortTreeTwoHumpsExport.png");
  snowyTreeThreeHumps = loadImage("data/shortTreeThreeHumpsExport.png");
  
  //...deadbush, pink, red, yellow, notSnowy1, notSnowy2, notSnowy3, snowy1, snowy2, snowy3
  
  plains = new Biome(#43BF4A, #BF8343, 1.25, 2, 150, true, true, true, true, false, false, false, false, false, false);
  evergreenForrest = new Biome(#4A6736, #58391C, 1.65, 2, 50, true, false, false, false, true, false, false, false, true, true);
  desert = new Biome(#E8E5C9, #E8E5C9, 1, 5, 10, true, false, false, false, false, false, false, false, false, false);
  icyPlains = new Biome(#D4D2DE, #EAEAEA, 1.25, 2, 100, true, false, false, false, false, true, false, false, false, false);
  icyForrest = new Biome(#D4D2DE, #EAEAEA, 1.65, 2, 50, true, false, false, false, false, true, true, true, false, false);
  
  generateTerrain(evergreenForrest, 3, 10000); //resolution 3

};

int terrainHeight = 300;

int i = 0;

int cameraXOffset = 0;

int[] heightMap = {300};
int[] extensions = {1};
int[] details = {};

class Biome {

  color grassColor;
  color dirtColor;
  
  float heightFactor;
  int extensionMax;
  int detailFrequency;
  
  boolean deadbush;
  boolean pink;
  boolean red;
  boolean yellow;
  boolean notSnowy1;
  boolean notSnowy2;
  boolean notSnowy3;
  boolean snowy1;
  boolean snowy2;
  boolean snowy3;
  
  
  Biome(color grassColorIn, color dirtColorIn, float heightFactorIn, int extensionMaxIn, int detailFrequencyIn, boolean deadbushIn, boolean pinkIn, boolean redIn, boolean yellowIn, boolean notSnowy1In, boolean notSnowy2In, boolean notSnowy3In, boolean snowy1In, boolean snowy2In, boolean snowy3In) {
  
    grassColor = grassColorIn;
    dirtColor = dirtColorIn;
    
    heightFactor = heightFactorIn;
    extensionMax = extensionMaxIn;
    detailFrequency = detailFrequencyIn;
    
    deadbush = deadbushIn;
    pink = pinkIn;
    red = redIn;
    yellow = yellowIn;
    notSnowy1 = notSnowy1In;
    notSnowy2 = notSnowy2In;
    notSnowy3 = notSnowy3In;
    snowy1 = snowy1In;
    snowy2 = snowy2In;
    snowy3 = snowy3In;

  }
  

};

void generateTerrain (Biome chosenBiome, int squareDimention, int stacksGenerated) {
  
  for (int k = 0; k < stacksGenerated; k++) {
  
    terrainHeight += squareDimention*round(random(-1*chosenBiome.heightFactor, chosenBiome.heightFactor));
    
    if (terrainHeight >= 390) {
    
      terrainHeight = 390;
      
    } else if (terrainHeight <= 100) {
    
      terrainHeight = 100;
      
    }
    
    extensions = append(extensions, round(random(1, chosenBiome.extensionMax)));
    
    details = append(details, round(random(1, chosenBiome.detailFrequency)));
    
    for (int j = 0; j < extensions[k]; j++) {
    
      heightMap = append(heightMap, terrainHeight); 
    
    }
  
  }
  
};

void renderTerrain (Biome chosenBiome, int squareDimention, int startingPoint) {
  
    while (i < (startingPoint + width + 100)) {
      
      if (details[i] == 1 || details[i] == 2 && chosenBiome.deadbush == true) {
      
        image(deadBush, ((i-startingPoint)*squareDimention)-50, heightMap[i]-100, 100, 100);
      
      } else if (details[i] == 3 && chosenBiome.pink == true) {
      
        image(flowerPink, ((i-startingPoint)*squareDimention)-100, heightMap[i]-200, 200, 200);
        
      } else if (details[i] == 4 && chosenBiome.red == true) {
      
        image(flowerRed, ((i-startingPoint)*squareDimention)-100, heightMap[i]-200, 200, 200);
      
      } else if (details[i] == 5 && chosenBiome.yellow == true) {
      
        image(flowerYellow, ((i-startingPoint)*squareDimention)-100, heightMap[i]-200, 200, 200);
        
      } else if (details[i] == 6 && chosenBiome.notSnowy1 == true) {
      
        image(notSnowyTree, ((i-startingPoint)*squareDimention)-25, heightMap[i]-75, 50, 75);
      
      } else if (details[i] == 7 && chosenBiome.notSnowy2 == true) {
      
        image(notSnowyTreeTwoHumps, ((i-startingPoint)*squareDimention)-25, heightMap[i]-75, 50, 75);
      
      } else if (details[i] == 8 && chosenBiome.notSnowy3 == true) {
      
        image(notSnowyTreeThreeHumps, ((i-startingPoint)*squareDimention)-25, heightMap[i]-75, 50, 75);
      
      } else if (details[i] == 9 && chosenBiome.snowy1 == true) {
      
        image(snowyTree, ((i-startingPoint)*squareDimention)-25, heightMap[i]-75, 50, 75);
      
      } else if (details[i] == 10 && chosenBiome.snowy2 == true) {
      
        image(snowyTreeTwoHumps, ((i-startingPoint)*squareDimention)-25, heightMap[i]-75, 50, 75);
      
      } else if (details[i] == 11 && chosenBiome.snowy3 == true) {
      
        image(snowyTreeThreeHumps, ((i-startingPoint)*squareDimention)-25, heightMap[i]-75, 50, 75);
      
      }
      
      //drawing dirt
      fill(chosenBiome.dirtColor);
      rect(i*squareDimention, heightMap[i+startingPoint], squareDimention, 2*height);
      
      //drawing grass
      fill(chosenBiome.grassColor);
      rect(i*squareDimention, heightMap[i+startingPoint], squareDimention*1.5, 1.5*squareDimention);
      
      i++;
    
    }
    
};

void keyPressed () {
  
  if (keyCode == RIGHT) {
    
    //change "10000" according to stacksGenerated
    if (cameraXOffset < 10000-width-200) {

      loop();
      cameraXOffset += 1;
      i = 0;
    
    }
  
  } else if (keyCode == LEFT) {
    
    if (cameraXOffset > 1) {
    
      loop();
      cameraXOffset += -1;
      i = 0;
    
    }
    
  } else if (keyCode == ENTER) {
  
    saveFrame("output/#######.png");
  
  }
  
};

void draw () {
  
  background(0);
  renderTerrain(icyForrest, 5, 0 + cameraXOffset); //resolution 5
  noLoop();
  
  /*cameraXOffset += 1;
  i = 0;
  saveFrame("output/video/#####.png");*/
  
};
