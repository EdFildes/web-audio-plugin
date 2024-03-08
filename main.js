const audioCtx = new window.AudioContext();
const oscilloscope_canvas = document.getElementById("oscilloscope");

const oscilloscope = new Oscilloscope(audioCtx, oscilloscope_canvas)
const controls = new Controls("controls")

controls.controlDOM()


const main = async () => {
  await audioCtx.audioWorklet.addModule("random-noise-processor.js");
  await audioCtx.audioWorklet.addModule("resonator-processor.js");

  const randomNoiseNode = new AudioWorkletNode(
    audioCtx,
    "random-noise-processor",
    {
      outputChannelCount: [2]
    }
  );

  const resonatorNode = new AudioWorkletNode(
    audioCtx,
    "resonator-processor",
    {
      outputChannelCount: [2],
      processorOptions: {
        sampleRate: audioCtx.sampleRate
      },
      parameterData: {
        Q: 0.5,
        fc: 1500
      }
    }
  );

  resonatorNode.port.onmessage = (event) => {
    console.log(event.data)
  }
  resonatorNode.onprocessorerror = (event) => {
    console.error(event);
  };

  const gainNode = new GainNode(audioCtx, {gain: 0.2})

  const slider = document.getElementById("slider")

  controls.addNode(resonatorNode)
  
  slider.addEventListener("change", () => {
    const gain = slider.value / 10
    gainNode.gain.setValueAtTime(gain, 0);
  })

  randomNoiseNode
    .connect(resonatorNode)
    .connect(gainNode)
    .connect(oscilloscope.analyser)
    .connect(audioCtx.destination);

  audioCtx.suspend();
}

main()

const playAudio = () => {
  audioCtx.resume();
  oscilloscope.draw();
}

const stopAudio = () => {
  audioCtx.suspend();
}

