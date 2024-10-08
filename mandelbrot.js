let app = new Vue({
  el: "#app",
  data: {
    title: "hello there!",
    width: 1200,
    height: 750,
    magniFactor: 10000,
    hue: 289,
    lightness: 1,
    maxit: 100,
    panX: 0.6,
    panY: 0.7,
    ctx: "",
  },

  //this happens when the page loads
  mounted() {
    console.log("mount");
    let canvas = document.getElementById("mandelbrot");
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext("2d");
    this.drawMandelbrot();
  },

  methods: {
    // here I think we should step based on magnifactor
    go(direction) {
      if (direction === "left") {
        this.panX += 0.01;
      } else if (direction === "right") {
        this.panX -= 0.01;
      } else if (direction === "up") {
        this.panY += 0.01;
      } else if (direction === "down") {
        this.panY -= 0.01;
      }

      this.drawMandelbrot();
    },

    //https://progur.com/2017/02/create-mandelbrot-fractal-javascript.html
    checkIfMandelbrotPoint(x, y) {
      let realCompRes = x;
      let imgCompRes = y;
      let maxIterations = this.maxit;

      for (let i = 0; i < maxIterations; ++i) {
        //calculate real and img parts
        let tempRealComp =
          realCompRes * realCompRes - imgCompRes * imgCompRes + x;
        let tempImgComp = 2 * realCompRes * imgCompRes + y;

        realCompRes = tempRealComp;
        imgCompRes = tempImgComp;

        if (realCompRes * imgCompRes > 5) {
          return (i / maxIterations) * 100;
        }
      }
      return 0;
    },
    drawMandelbrot() {
      for (let x = 0; x < this.width; ++x) {
        for (let y = 0; y < this.height; ++y) {
          let belongsToSet = this.checkIfMandelbrotPoint(
            x / this.magniFactor - this.panX,
            y / this.magniFactor - this.panY
          );
          //console.log(belongsToSet);
          if (belongsToSet == 0) {
            this.ctx.fillStyle = "#000";
            this.ctx.fillRect(x, y, 1, 1); // draw black pixel
          } else {
            this.ctx.fillStyle = `hsl(${
              belongsToSet + parseInt(this.hue)
            }, 100%, ${belongsToSet * this.lightness}%)`;
            this.ctx.fillRect(x, y, 1, 1); //draw color pixel
          }
        }
      }
    },
    reset() {
      (this.magniFactor = 10000),
        (this.hue = 289),
        (this.lightness = 1),
        (this.panX = 0.6),
        (this.panY = 0.7);

      this.drawMandelbrot();
    },
  },
});
