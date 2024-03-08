class Controls {
  canDraw = false;

  constructor(canvasId){
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
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

  draw(x, y) {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(x,  y, 3, 3);
    const qVal = Math.abs(x) / 200
    const fcVal = (10 ** ((Math.abs(y) / 150) * 5)) + 20
    console.log(fcVal + "hz")
    this.node.parameters.get("Q").linearRampToValueAtTime(qVal, 0.2)
    this.node.parameters.get("fc").linearRampToValueAtTime(fcVal, 0.2)
  }
}