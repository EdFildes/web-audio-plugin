const getAudioWorkletConfig = (sampleRate) => ({
  randomNoiseNode: {
    location: "random-noise-processor",
    options: {
      outputChannelCount: [2]
    }
  }, 
  resonatorNode: {
    location: "resonator-processor",
    options: {
      outputChannelCount: [2],
      processorOptions: {
        sampleRate: sampleRate
      },
      parameterData: {
        Q: 0.5,
        fc: 1500
      }
    }
  },
  combFilterNode: {
    location: "comb-filter-processor",
    options: {
      numberOfOutputs: 4,
      outputChannelCount: [1, 1, 1, 1],
      processorOptions: {
        sampleRate: sampleRate,
        D: [16, 6.5, 3.0, 2.5],
        g: [0.86, 0.86, 0.86, 0.86]
      }
    }
  }
})

export default getAudioWorkletConfig