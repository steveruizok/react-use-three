import * as THREE from 'three'

export default class Subject {
	scene: THREE.Scene

	constructor(scene: THREE.Scene) {
		this.scene = scene
	}

	public start = () => {}

	public update = (time: number) => {}
}
