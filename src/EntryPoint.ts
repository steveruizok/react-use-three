import Manager from './Manager'

export default class EntryPoint {
	manager: Manager
	canvasHalfWidth = 0
	canvasHalfHeight = 0
	canvas: HTMLCanvasElement
	paused = false

	constructor(container: HTMLElement) {
		this.canvas = this.createCanvas(container)
		this.manager = new Manager(this.canvas)

		this.bindEventListeners()
		this.render()
	}

	private createCanvas = (container: HTMLElement) => {
		const canvas = document.createElement('canvas')
		container.appendChild(canvas)

		return canvas
	}

	private bindEventListeners = () => {
		window.addEventListener('resize', this.resizeCanvas)
		window.addEventListener('mousemove', this.mouseMove)
		this.resizeCanvas()
	}

	private resizeCanvas = () => {
		this.canvas.style.width = '100%'
		this.canvas.style.height = '100%'

		this.canvas.width = this.canvas.offsetWidth
		this.canvas.height = this.canvas.offsetHeight

		this.canvasHalfWidth = Math.round(this.canvas.offsetWidth / 2)
		this.canvasHalfHeight = Math.round(this.canvas.offsetHeight / 2)

		this.manager.onWindowResize()
	}

	private mouseMove = ({ screenX = 0, screenY = 0 }) => {
		this.manager.onMouseMove(
			screenX - this.canvasHalfWidth,
			screenY - this.canvasHalfHeight
		)
	}

	private render = (time = 0) => {
		if (!this.paused) this.manager.updateSubjects()
		requestAnimationFrame(this.render)
	}

	public setPaused = (paused: boolean) => {
		this.paused = paused
	}
}
