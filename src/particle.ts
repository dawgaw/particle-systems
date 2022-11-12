import Vec from "victor";

export class Particle {
	acceleration: Vec
	velocity: Vec
	constructor(public pos: Vec = new Vec(0, 0), public radius: number = 20, private mass: number = 1, public physics: boolean = true) {
		this.acceleration = new Vec(0, 0)
		this.velocity = new Vec(0, 0)
	}
	addForce(force) {
		this.acceleration.add(force.clone().divideScalar(this.mass));
	}
	draw(ctx) {

		ctx.beginPath()
		ctx.fillStyle = "white"
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
		ctx.fill()
	}

	update() {
		if (this.physics) {
			//console.log(this.velocity, this.acceleration)
			this.velocity.add(this.acceleration)
			this.pos.add(this.velocity)
			this.velocity.multiplyScalar(1 - Particle.friction)
			this.acceleration.multiplyScalar(0)

		}

	}
	static friction = 0
}
