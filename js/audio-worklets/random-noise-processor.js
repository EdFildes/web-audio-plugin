// random-noise-processor.js
class RandomNoiseProcessor extends AudioWorkletProcessor {
  process(_, outputs) {
    const output = outputs[0];
    for (let i = 0; i < 127; i++) {
      // same sample in each channel
      output.forEach((channel) => {
        channel[i] = Math.random() * 2 - 1;  // white noise
      });
    }
    return true;
  }
}

registerProcessor("random-noise-processor", RandomNoiseProcessor);