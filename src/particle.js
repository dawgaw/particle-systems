import Vec from "victor";

export class Particle {
	constructor(pos = new Vec(0, 0), radius = 20, physics = true, mass = 1,) {
		this.physics = physics
		this.pos = pos
		this.radius = radius
		this.mass = mass;
		this.a = new Vec(0, 0)
		this.v = new Vec(0, 0)
	}
	addForce(force) {

		this.a.add(force.clone().divideScalar(this.mass));
	}
	draw(ctx) {

		ctx.beginPath()
		ctx.fillStyle = "white"
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
		ctx.fill()
	}
	update() {
		if (this.physics) {
			this.v.add(this.a)
			this.pos.add(this.v)
			this.v.multiplyScalar(1 - Particle.friction)
			this.a.multiplyScalar(0)
		}
	}
	static friction = 0
}
