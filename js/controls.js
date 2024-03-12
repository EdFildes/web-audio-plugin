const drawAlphaBackground = (ctx, canvas) => {
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = "rgba(205 205 205)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1.0;
}


class Controls {
  canDraw = false;

  constructor(controlsCanvas){
    this.canvas = controlsCanvas;
    this.ctx = this.canvas.getContext("2d");
    this.controlDOM()
  }

  controlDOM() {
    document.onmousemove = (event) => {
      if(this.canDraw){
        const {clientX, clientY} = event;
        this.draw(clientX, clientY)
      }
    }
    
    this.canvas.onmousedown = (event) => {
      this.canDraw = true
      const {clientX, clientY} = event;
      this.draw(clientX, clientY)
    }
    
    this.canvas.onmouseup = (event) => {
      this.canDraw = false
    }
  }

  addNode(node) {
    this.node = node
  }

  draw(x_abs, y_abs) {
    drawAlphaBackground(this.ctx, this.canvas)
    const rect = this.canvas.getBoundingClientRect();
    const x = x_abs - rect.left
    const y = y_abs - rect.top
    this.ctx.beginPath();
    this.ctx.arc(x,  y, 10, 0, 2 * Math.PI);
    this.ctx.stroke();
    const qVal = Math.abs(x) / 200
    const fcVal = (10 ** ((Math.abs(y) / 150) * 5)) + 20
    this.node.parameters.get("Q").linearRampToValueAtTime(qVal, 0.2)
    this.node.parameters.get("fc").linearRampToValueAtTime(fcVal, 0.2)
  }
}