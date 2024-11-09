let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    document.addEventListener('mousemove', (e) => {
      if (!this.rotating && this.holdingPaper) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;

        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;

        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
      }
    });

    paper.addEventListener('mousedown', (e) => {
      if (this.holdingPaper) return; 
      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      if (e.button === 0) {
        // Left-click to drag
        this.mouseTouchX = this.mouseX;
        this.mouseTouchY = this.mouseY;
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
      }

      if (e.button === 2) {
        // Right-click to rotate
        this.rotating = true;
      }
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    paper.addEventListener('contextmenu', (e) => {
      e.preventDefault(); // Prevent right-click menu from showing
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});




