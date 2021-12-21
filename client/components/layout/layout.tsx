import {ReactNode} from 'react'
import Header from './../header'
import Footer from './../footer'
import Navigation from '../navigation'
import styles from './../global/container.module.scss'
import layout from './../global/layout.module.scss'
import {useSettingsContext} from './../../context/settings-context'
import {useRouter} from 'next/router'

type Props = {
	children: ReactNode
}

export default function Layout({children}: Props) {
	const router = useRouter()
	const pathname = router.pathname
	const {theme} = useSettingsContext()

	return (
		<div className={`${theme} ${layout.layout}`}>
			<Header>{pathname !== '/login' && <Navigation />}</Header>
			<div className={styles.container}>{children}</div>
			<Footer />
		</div>
	)
}
