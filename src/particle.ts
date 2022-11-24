import Vec from "victor";

export class Particle {

	private acceleration: Vec = new Vec(0, 0)
	prevPos: Vec
	constructor(public pos: Vec, public radius: number = 20, private mass: number = 1, public physics: boolean = true) {
		this.prevPos = pos.clone();
	}
	addForce(force: Vec) {
		this.acceleration.add(force.clone().divideScalar(1))
	}
	accelerate(acc: Vec) {
		this.acceleration.add(acc);
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath()
		ctx.fillStyle = "white"
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
		ctx.fill()
	}

	update(dt, friction) {
		if (this.physics) {
			let velocity = this.pos.clone().subtract(this.prevPos).multiplyScalar(1 - friction);
			this.prevPos = this.pos.clone()
			this.pos.add(velocity).add(this.acceleration.multiplyScalar(dt))

		}
		this.acceleration.multiplyScalar(0)
	}
}
