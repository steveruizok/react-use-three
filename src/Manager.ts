import Subject from './Subject'
import * as THREE from 'three'

export default class Manager {
	canvas: HTMLCanvasElement
	background: string
	clock = new THREE.Clock()
	origin = new THREE.Vector3(0, 0, 0)
	scene: THREE.Scene
	renderer: THREE.Renderer
	camera: THREE.PerspectiveCamera
	subjects: Subject[]

	screenDimensions = {
		width: 0,
		height: 0,
	}

	mousePosition = {
		x: 0,
		y: 0,
	}

	constructor(
		canvas: HTMLCanvasElement,
		subjects: Subject[] = [],
		background: string = '#FFFFFF'
	) {
		this.screenDimensions = {
			width: 0,
			height: 0,
		}

		this.subjects = subjects

		this.background = background
		this.canvas = canvas
		this.scene = this.buildScene()
		this.renderer = this.buildRenderer(this.screenDimensions)
		this.camera = this.buildCamera(this.screenDimensions)
	}

	private buildScene = () => {
		const scene = new THREE.Scene()
		scene.background = new THREE.Color('#FFF')

		return scene
	}

	private buildRenderer = ({ height = 0, width = 0 }) => {
		const renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
			alpha: true,
		})
		const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1
		renderer.setPixelRatio(DPR)
		renderer.setSize(width, height)

		renderer.gammaInput = true
		renderer.gammaOutput = true

		return renderer
	}

	private buildCamera = ({ height = 0, width = 0 }) => {
		const aspectRatio = width / height
		const fieldOfView = 75
		const nearPlane = 0.01
		const farPlane = 1000
		const camera = new THREE.PerspectiveCamera(
			fieldOfView,
			aspectRatio,
			nearPlane,
			farPlane
		)

		camera.position.z = 10
		camera.position.x = 0
		camera.position.y = 0

		return camera
	}

	public onWindowResize = () => {
		const { width, height } = this.canvas

		this.screenDimensions.width = width
		this.screenDimensions.height = height

		this.camera.aspect = width / height
		this.camera.updateProjectionMatrix()

		this.renderer.setSize(width, height)
	}

	public onMouseMove = (x: number, y: number) => {
		this.mousePosition.x = x
		this.mousePosition.y = y
	}

	public start = () => {
		for (let i = 0; i < this.subjects.length; i++) this.subjects[i].start()
	}

	public addSubject = (subject: Subject) => {
		this.subjects = [...this.subjects, subject]
	}

	public update = (time?: number) => {}

	public updateSubjects = () => {
		const elapsedTime = this.clock.getElapsedTime()

		for (let i = 0; i < this.subjects.length; i++)
			this.subjects[i].update(elapsedTime)

		this.update(elapsedTime)
		// this.updateCameraPositionRelativeToMouse()

		this.renderer.render(this.scene, this.camera)
	}
}
