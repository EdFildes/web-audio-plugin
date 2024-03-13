const setupAudioWorklets = async (audioCtx) => {

  const audioWorkletConfig = getAudioWorkletConfig(audioCtx.sampleRate)

  const audioWorklets = {}

  for(let [name, config] of Object.entries(audioWorkletConfig)){
    await audioCtx.audioWorklet.addModule(`js/audio-worklets/${config.location}.js`);

    const worklet = new AudioWorkletNode(audioCtx, config.location, config.options);

    worklet.port.onmessage = (event) => {
      console.log(config.location, event.data)
    }
    worklet.onprocessorerror = (event) => {
      console.error(config.location, event.message);
    };

    audioWorklets[name] = worklet
  }

  return audioWorklets
}