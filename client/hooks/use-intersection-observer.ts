import {useState, useEffect, useRef} from 'react'
import type {RefObject} from 'react'

export const useIntersectionObserver = (
	passedOptions?: Readonly<IntersectionObserverInit>,
	fallbackState = false
): [RefObject<HTMLDivElement | null>, boolean] => {
	const ref = useRef<HTMLDivElement | null>(null)
	const [isIntersecting, setIntersecting] = useState<boolean>(false)

	useEffect(() => {
		if (typeof window.IntersectionObserver === 'undefined') {
			setIntersecting(fallbackState)
			return undefined
		}
		const currentRef = ref.current
		const options: IntersectionObserverInit = {threshold: 0.5}
		if (passedOptions) {
			Object.assign(options, passedOptions)
		}
		const observer = new IntersectionObserver(([entry]) => {
			setIntersecting(entry.isIntersecting)
		}, options)
		if (currentRef) {
			observer.observe(currentRef)
		}
		return () => {
			if (currentRef) {
				observer.unobserve(currentRef)
			}
		}
	}, [ref, passedOptions, fallbackState])

	return [ref, isIntersecting]
}
