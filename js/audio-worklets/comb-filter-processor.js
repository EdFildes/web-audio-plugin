export class CombFilterProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    this.sampleRate = options.processorOptions.sampleRate
    this.g = options.processorOptions.g
    this.D = options.processorOptions.D
  }
  
  process(inputs, outputs) {
    const input = inputs[0]
    
    // loop through all outputs
    for(let outputNum = 0; outputNum < outputs.length; outputNum++){
      const output = outputs[outputNum]

      const feedback = this.g[outputNum]
      const delayMs = this.D[outputNum] / 1000
      const delaySamples = this.sampleRate * delayMs

      //this.port.postMessage(delaySamples)

      // loop through channels in given output
      for(let channelNum = 0; channelNum < output.length; channelNum++){
        const inputChan = input[channelNum] // source is in mono currently
        const outputChan = output[channelNum]
  
        // loop through samples in given channel
        for (let n = 0; n < outputChan.length; n++) {
          const nMinusD = n >= delaySamples ? (n - delaySamples) : n
          outputChan[n] = inputChan[nMinusD] + (0.92 * outputChan[nMinusD])
        }
      }
    }

    return true;
  }
}

registerProcessor("comb-filter-processor", CombFilterProcessor);