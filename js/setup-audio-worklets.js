const setupAudioWorklets = async (audioCtx) => {
  await audioCtx.audioWorklet.addModule("js/random-noise-processor.js");
  await audioCtx.audioWorklet.addModule("js/resonator-processor.js");

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

  [randomNoiseNode, resonatorNode].forEach(node => {
    node.port.onmessage = (event) => {
      console.log(event.data)
    }
    node.onprocessorerror = (event) => {
      console.error(event);
    };
  })

  return {randomNoiseNode, resonatorNode}
}