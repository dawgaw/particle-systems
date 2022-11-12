import Vec from "victor";

export class Particle {
	static friction = 0

	acceleration: Vec = new Vec(0, 0)
	velocity: Vec = new Vec(0, 0)

	constructor(public pos: Vec = new Vec(0, 0), public radius: number = 20, private mass: number = 1, public physics: boolean = true) { }

	addForce(force: Vec) {
		this.acceleration.add(force.clone().divideScalar(this.mass));
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath()
		ctx.fillStyle = "white"
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
		ctx.fill()
	}

	update() {
		if (this.physics) {
			this.velocity.add(this.acceleration)
			this.pos.add(this.velocity)
			this.velocity.multiplyScalar(1 - Particle.friction)
			this.acceleration.multiplyScalar(0)
		}
	}
}
