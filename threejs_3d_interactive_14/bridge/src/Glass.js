import { Mesh } from "three";
import { Stuff } from "./Stuff";
import { cm1, geo, mat, sounds } from "./common";

export class Glass extends Stuff {
  constructor(info) {
    super(info);

    this.type = info.type;
    this.step = info.step;
    this.geometry = geo.glass;
    console.log(info.type);
    switch (this.type) {
      case "normal":
        this.material = mat.glass1;
        this.mass = 1;
        break;
      case "strong":
        this.material = mat.glass2;
        this.mass = 0;
        break;
    }

    this.width = this.geometry.parameters.width;
    this.height = this.geometry.parameters.height;
    this.depth = this.geometry.parameters.depth;

    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.set(this.x, this.y, this.z);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.name = this.name;
    this.mesh.step = this.step;
    this.mesh.type = this.type;
    cm1.scene.add(this.mesh);

    this.setCannonBody();
    const sound = sounds[this.type];

    this.cannonBody.addEventListener("collide", function (e) {
      const strength = e.contact.getImpactVelocityAlongNormal();
      console.log(strength);
      if (strength > 1) {
        sound.currentTime = 0;
        console.log(info.type);
        sound.play();
      }
    });
  }
}
