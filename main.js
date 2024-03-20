import Oscilloscope from "./js/UI/oscilloscope.js";
import Controls from "./js/UI/controls.js";
import {setupAudioWorklets} from "./js/audio-worklets/setup-audio-worklets.js";
import configureGainNodes from "./js/configure-gain-nodes.js";

const audioCtx = new window.AudioContext();
const oscilloscope_canvas = document.getElementById("oscilloscope");
const controls_canvas = document.getElementById("x-y-controls");

const oscilloscope = new Oscilloscope(audioCtx, oscilloscope_canvas)
const controls = new Controls(controls_canvas)

const main = async () => {
  const {randomNoiseNode, resonatorNode} = await setupAudioWorklets(audioCtx)
  const {gainNodeUser, gainNodeInternal} = configureGainNodes(audioCtx)

  controls.addNode(resonatorNode)

  randomNoiseNode
    .connect(resonatorNode)
    .connect(gainNodeUser)
    .connect(oscilloscope.analyser)
    .connect(gainNodeInternal)
    .connect(audioCtx.destination);

  audioCtx.suspend();
}

main()

let playing = false

const playAudio = () => {
  playing = !playing
  if(playing){
    console.log("play")
    audioCtx.resume();
    oscilloscope.draw();
  } else {
    console.log("pause")
    audioCtx.suspend();
  }
}

document.getElementById("play-pause").addEventListener("click", () => {
  playAudio()
}) 
