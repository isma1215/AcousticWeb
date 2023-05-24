
let audioContext,mic,pitch;
const $btn_ativar = document.getElementById("Act_Afinador"),
$btn_desactivar = document.getElementById("Dec_Afinador"),
$frecuencia=document.getElementById("frecuencia");

async function setup() {
  audioContext = new AudioContext();
  stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  startPitch(stream, audioContext);
}

function startPitch(stream, audioContext) {
  pitch = ml5.pitchDetection('./model/', audioContext , stream, modelLoaded);
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if(audioContext.state === "running"){
    imp_frecuancia(frequency);
    console.log(frequency);
    getPitch();}
  })
}

$btn_desactivar.addEventListener("click" ,e =>{
      audioContext.suspend();
      console.log(audioContext.state);
})
$btn_ativar.addEventListener("click",e=>{
   setup();
   console.log(audioContext);
})

function imp_frecuancia(frecuencia){
  if(frecuencia <= 60)
  $frecuencia.innerHTML="00.00";
  else
  $frecuencia.innerHTML=frecuencia.toFixed(2);
}
