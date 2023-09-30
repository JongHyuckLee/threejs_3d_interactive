export class PreventDragClick {
  constructor(elem) {
    this.mouseMoved;
    let clickStartX;
    let clickStartY;
    let clickStartTime;

    elem.addEventListener("mousedown", (e) => {
      clickStartX = e.clientX;
      clickStartY = e.clientY;
      clickStartTime = Date.now();
      console.log(clickStartTime);
    });
    elem.addEventListener("mouseup", (e) => {
      const xGap = Math.abs(e.clientX - clickStartX);
      const yGap = Math.abs(e.clientY - clickStartY);
      const timeGap = Date.now() - clickStartTime;
      console.log(xGap, yGap);

      if (xGap > 10 || yGap > 10 || timeGap > 800) {
        this.mouseMoved = true;
      } else {
        this.mouseMoved = false;
      }
    });
  }
}
