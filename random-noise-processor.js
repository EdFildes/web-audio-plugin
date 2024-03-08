// random-noise-processor.js
class RandomNoiseProcessor extends AudioWorkletProcessor {
  process(_, outputs) {
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = Math.random() * 2 - 1;  // white noise
      }
    });
    return true;
  }
}

registerProcessor("random-noise-processor", RandomNoiseProcessor);