const configureGainNodes = (audioCtx) => {
  const gainNodeUser = new GainNode(audioCtx, {gain: 0.5})
  const gainNodeInternal = new GainNode(audioCtx, {gain: 0.3})

  const gainSlider = document.getElementById("gain-slider")
  
  gainSlider.addEventListener("change", () => {
    const gain = gainSlider.value / 20
    gainNodeUser.gain.setValueAtTime(gain, 0);
  })

  return {
    gainNodeUser,
    gainNodeInternal
  }
}