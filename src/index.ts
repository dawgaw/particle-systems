import Vec from "victor";
import { Cloth } from "./Systems/cloth.js";
import { Line } from "./Systems/line.js";
import { Particle } from "./particle.js"
import { ParticleSystem } from "./Systems/ParticleSystem.js";
import { Simulation } from "./simulation.js";
import { DrawMethods } from "./DrawMethods.js";


const gravity = new Vec(0, 0.1)

const friction = 0.05

const spacing = 50, k = 0.03
const count = 10;

const types = {
	"line": new Line(count, spacing, k),
	"cloth": new Cloth(count, spacing, k),
}

let canvas = document.getElementsByTagName("canvas")[0];

function resizeCanvas() {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
}

window.onresize = resizeCanvas;
resizeCanvas();
let sim = new Simulation(types.line, DrawMethods.linesAndDots, gravity, canvas, friction);


sim.enableSelecting()

sim.run();