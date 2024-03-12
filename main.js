const audioCtx = new window.AudioContext();
const oscilloscope_canvas = document.getElementById("oscilloscope");
const controls_canvas = document.getElementById("x-y-controls");

const oscilloscope = new Oscilloscope(audioCtx, oscilloscope_canvas)
const controls = new Controls(controls_canvas)

const main = async () => {
  const {randomNoiseNode, resonatorNode} = await setupAudioWorklets(audioCtx)
  const {gainNodeUser, gainNodeInternal} = configureGainNodes(audioCtx, controls, resonatorNode)

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
    audioCtx.resume();
    oscilloscope.draw();
  } else {
    audioCtx.suspend();
  }
}
