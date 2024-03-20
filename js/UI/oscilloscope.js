export default class Oscilloscope {
  constructor(audioCtx, canvas){
    this.analyser = audioCtx.createAnalyser();
    this.analyser.fftSize = 2048;
  
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteTimeDomainData(this.dataArray);

    this.canvas = canvas
    this.canvasCtx = canvas.getContext("2d");
    this.drawInitial();
  }

  drawInitial() {
    this.canvasCtx.fillStyle = "rgb(200 200 200)";
    this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasCtx.lineWidth = 2;
    this.canvasCtx.strokeStyle = "rgb(0 0 0)";
    this.canvasCtx.beginPath();
    let x = 0;
    const y = this.canvas.height / 2;
    this.canvasCtx.moveTo(x, y);
    this.canvasCtx.lineTo(this.canvas.width, y);
    this.canvasCtx.stroke();
  }

  draw() {
    requestAnimationFrame(() => this.draw());
  
    this.analyser.getByteTimeDomainData(this.dataArray);
  
    this.canvasCtx.fillStyle = "rgb(200 200 200)";
    this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
    this.canvasCtx.lineWidth = 2;
    this.canvasCtx.strokeStyle = "rgb(0 0 0)";
  
    this.canvasCtx.beginPath();
  
    const sliceWidth = (this.canvas.width * 1.0) / this.bufferLength;
    let x = 0;
  
    for (let i = 0; i < this.bufferLength; i++) {
      const v = this.dataArray[i] / 128.0;
      const y = (v * this.canvas.height) / 2;
  
      if (i === 0) {
        this.canvasCtx.moveTo(x, y);
      } else {
        this.canvasCtx.lineTo(x, y);
      }
  
      x += sliceWidth;
    }
  
    this.canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2);
    this.canvasCtx.stroke();
  }
}