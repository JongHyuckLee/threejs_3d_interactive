export class KeyController {
  constructor() {
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      console.log(e.code, "누름");
      this.keys[e.code] = true;
      // 예를 들어 W키를 눌렀다면, this.keys["keyW"] = true;
    });
    window.addEventListener("keyup", (e) => {
      console.log(e.code, "땜");
      delete this.keys[e.code];
      // W에서 손을 뗏다면, this.keys 배열에서 'keyW' 이름의 속성을 삭제.
      // 즉 this.keys["keyW"]를 삭제(delete)하는 것
    });
  }
}
