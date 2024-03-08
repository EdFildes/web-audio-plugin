class ResonatorProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    this.sampleRate = options.processorOptions.sampleRate
    this.channelCount = options.outputChannelCount[0]
  }

  static get parameterDescriptors() { 
    return [{name:'Q'}, {name: "fc"}] 
  }
  
  process(inputs, outputs, parameters) {
    const [input] = inputs
    const [output] = outputs
    
    const fc = parameters.fc
    const Q = parameters.Q
    const fs = this.sampleRate
  
    const theta_c = 2 * Math.PI * fc / fs
    const BW = fc / Q
    const b2 = Math.exp(-2 * Math.PI * BW / fs)
    const b1 = (-4 * b2 / (1 + b2)) * Math.cos(theta_c)
    const a0 = (1 - b2) * Math.sqrt((1 - ((b1 ** 2) / (4 * b2))))
    
    for(let channelNum = 0; channelNum < this.channelCount; channelNum++){
      const inputChan = input[channelNum]
      const outputChan = output[channelNum]

      for (let i = 0; i < outputChan.length; i++) {
        outputChan[i] = (a0 * inputChan[i]) - (b1 * outputChan[i > 0 ? (i - 1) : 0]) - (b2 * outputChan[i > 1 ? (i - 2) : 0])
      }
    }
    return true;
  }
}

registerProcessor("resonator-processor", ResonatorProcessor);