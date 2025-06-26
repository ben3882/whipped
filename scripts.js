let facingImage;
let whipVillainImage;
let played = false;
let whipSound;
let portrait;
let whippedText;
if(innerWidth/innerHeight<1){
  portrait=true;
} else {
  portrait=false;
}
let soundPlayed = false;


function preload() {
  facingImage = createImg('catwoman-facing.gif');
  facingImage.hide();
  whipVillainImage = createImg('catwoman-whip-villain.gif');
  whipVillainImage.hide();
  soundFormats('mp3');
  whipSound = loadSound('whipcrack');
  
}

function setup() {
  
  noCanvas();
  if(portrait){
    wide = innerWidth < 700 ? innerWidth * 0.8 : 700;
    high = innerWidth < 700 ? innerWidth * 0.8 : 700;
  } else {
    wide = innerHeight < 400 ? innerHeight * 0.8 : 360;
    high = innerHeight < 400 ? innerHeight * 0.8 : 360;
  }
  

  let button = createButton('click here for whip on shake');
  button.position(25, 25).size(250, 150).style('font-size', '1.5em').style('border-radius', '15px');
  button.mousePressed(()=>{
    if (typeof DeviceMotionEvent.requestPermission === 'function') {

    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', handleMotionEvent);
        }
      })
      .catch(console.error)
      } else {
        window.addEventListener('devicemotion', handleMotionEvent);
    }
    button.hide();
  })
  whippedText = createP('You\'re &#x1F408 whpped!');
  whippedText.style('font-size', '1.25em');
  whippedText.hide();

  whippedText.position(innerWidth*0.6, innerHeight*0.5);
  // whippedText.show();
  whipVillainImage.size(wide, high).style('border', '1px solid black');
  whipVillainImage.hide();
  facingImage.size(wide, high).style('border', '1px solid black');
  facingImage.show().position(innerWidth*0.1, innerHeight*0.1);

}


function mousePressed() {
  if(!soundPlayed){
    soundPlayed = true;
    sequenceImage();
    
  }
  
    
}

function handleMotionEvent(event) {
  let totalAccel = Math.sqrt(event.acceleration.x ** 2 + event.acceleration.y ** 2);

  if (totalAccel > 20) {
    if(!soundPlayed){
      soundPlayed = true;
      sequenceImage();
    
  }

  }

}
function sequenceImage(){
  facingImage.hide();
  whipVillainImage.show().position(innerWidth*0.1, innerHeight*0.1);

  setTimeout(()=>whipSound.play(), 800);
  setTimeout(changeImage, 1200);
  
}

function changeImage() {
  whipVillainImage.hide();
  facingImage.show().position(innerWidth*0.1, innerHeight*0.1);
  whippedText.show();
  setTimeout(()=>whippedText.hide(), 1000);
  soundPlayed = false;
}
