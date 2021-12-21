import {ReactNode} from 'react'
import header from './header.module.scss'
import Logo from './../logo'
import container from './../global/container.module.scss'
import Settings from './../settings'
import {useIntersectionObserver} from './../../hooks/use-intersection-observer'
import cslx from 'clsx'

type Props = {
	children: ReactNode
}

export default function Header({children}: Props) {
	const [ref, isIntersecting] = useIntersectionObserver()

	return (
		<>
			<div ref={ref} className={header.intersectionDetector} />
			<header
				className={cslx(header.header, !isIntersecting && header.isFloating)}
			>
				<div className={` ${container.container} ${header.wrapper}`}>
					<Logo />
					{children}
					<Settings />
				</div>
			</header>
		</>
	)
}
