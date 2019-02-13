import * as React from 'react'
import Manager from './Manager'
import EntryPoint from './EntryPoint'
import Subject from './Subject'

interface State {
	mounted: boolean
	entryPoint?: EntryPoint
	manager?: Manager
}

function useThree() {
	const [state, setState] = React.useState({
		mounted: false,
	} as State)

	const containerRef: React.RefObject<HTMLDivElement> = React.useRef(null)

	React.useEffect(function mountEntryPoint() {
		const container = containerRef.current
		if (state.mounted || !container) return

		const entryPoint = new EntryPoint(container)
		const manager = entryPoint.manager

		setState({ ...state, entryPoint, manager, mounted: true })

		return function unMountEntryPoint() {}
	})

	return {
		containerRef,
		...state,
	}
}

export default useThree

export { Subject }
