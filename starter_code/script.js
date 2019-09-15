
  document.getElementById('start-button').onclick = () => 
  setState();
  
  
  let obstacles = [];

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let frame = 0;

  

  function drawTable() {
    ctx.fillStyle = 'gray';
      ctx.fillRect(0, 0, 400, 600);
      ctx.fillStyle = 'green';
      ctx.fillRect(0, 0, 30, 600);
      ctx.fillStyle = 'green';
      ctx.fillRect(370, 0, 30, 600);
      ctx.fillStyle = 'white';
      ctx.fillRect(50, 0, 4, 600);
      ctx.fillStyle = 'white';
      ctx.fillRect(345, 0, 4, 600);
  }


// ------------- CAR ------------------- //

  let yCar = 450;
  let xCar = 175;
  function drawCar () {
    const img = new Image(); // Create new <img> element
    img.src = './images/car.png';
    if (xCar <= 15){
      xCar += 8;
    } else if (xCar >= 330) {
      xCar -= 8;
    }
    ctx.drawImage(img, xCar, yCar, 50, 110);
  }
    
  document.onkeydown = (e) => {
    switch(e.keyCode) {
      case 37:
        xCar -= 8;
        break;
      case 39:
        xCar += 8;
        break;
    }
  }

//  --------------- OBSTACLES ------------------ //
  
  class Obstacle {
    constructor(x, y, color, width, height){
      this.x = x;
      this.y = y;
      this.color = color;
      this.width = width;
      this.heigth = height;
    }

    print() { 
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.heigth);
    }

    left() {
      return this.x;
    }

    right() {
      return this.x + this.width;
    }

    bottom() {
      return this.y + this.heigth;
    }

    top() {
      return this.y
    }
    
    crashedWithCar() {
      return (((xCar + 50 > this.left() && xCar < this.right()) || (xCar > this.left() && xCar < this.right())) && 
      (this.bottom() > yCar && this.top() < (yCar + 110)))
    }
  }
  
  
  function updateObstacles() {
    for (let i = 0; i < obstacles.length; i += 1) {
      obstacles[i].y += 2;
      obstacles[i].print();
    }
    frame += 1;
    let randomGap = 70 + Math.floor(Math.random() * 70);
    let randomWidth = Math.floor(Math.random() * (canvas.width - 2 * randomGap));
    if (frame % 120 === 0) {
      obstacles.push(new Obstacle(0, 0, 'red', randomWidth , 10));
      obstacles.push(new Obstacle(randomWidth + randomGap, 0, 'red', canvas.width - randomWidth  , 10));
    }
  }
  
  
  
  
  // ---------- LINE ---------------- //
  
  let lineOneBegin = -600;
  let lineOneEnd = 0;
  let lineTwoBegin = 0;
  let lineTwoEnd = 600;
  
  function drawLines () {
    if (lineOneBegin === 600) {
      lineOneBegin = -600;
      lineOneEnd = 0;
    }
    ctx.beginPath();
    ctx.stroke();
    ctx.strokeStyle = 'white'; // !
    ctx.setLineDash([30, 30])
    ctx.moveTo(200, lineOneBegin);
    ctx.lineTo(200, lineOneEnd);
    lineOneBegin += 5;
    lineOneEnd += 5;
    ctx.stroke();
    ctx.closePath();

    
    if (lineTwoBegin === 600) {
      lineTwoBegin = -600;
      lineTwoEnd = 0;
    }
    
    ctx.beginPath();
    ctx.setLineDash([30, 30]);
    ctx.strokeStyle = 'white'; // !
    ctx.stroke();
    ctx.moveTo(200, lineTwoBegin);
    ctx.lineTo(200, lineTwoEnd);
    ctx.stroke();
    ctx.closePath();
    lineTwoBegin += 5;
    lineTwoEnd += 5;
  }
  

  // ------------------START & PAUSE ---------------- //
  
  let state = false;
  function setState() {
    state = !state;
    if(state) {
      updateCanvas()
    } else 
    cancelAnimationFrame(updateCanvas)
    // clearInterval(interval)
  }
  
  
  // ---------------- GAME OVER -------------------- //
  
  function checkGameOver() {
    const crashed = obstacles.some(element => element.crashedWithCar());
    if(crashed) {
      state = !state;
  }
}
// let interval = setInterval(updateCanvas, 10);

  function updateCanvas() {
    if (state) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawTable();
      drawLines();
      drawCar();
      updateObstacles();
      checkGameOver();
      requestAnimationFrame(updateCanvas);
      // interval();
    } 
  }



