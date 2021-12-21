import Link from 'next/link'
import {navigationCopy} from './../../copy/navigation'
import {useSettingsContext} from './../../context/settings-context'
import styles from './navigation.module.scss'
import {useRouter} from 'next/router'
import cslx from 'clsx'

export default function Navigation() {
	const router = useRouter()
	const pathname = router.pathname
	const {lng} = useSettingsContext()

	const copyPath = navigationCopy?.[lng]

	return (
		<nav className={styles.nav}>
			<ul className={styles.list}>
				<li className={styles.item}>
					<Link href='/items'>
						<a
							className={cslx(
								styles.link,
								pathname === '/items' && styles.active
							)}
						>
							{copyPath.allItems}
						</a>
					</Link>
				</li>
				<li className={styles.item}>
					<Link href='/add'>
						<a
							className={cslx(
								styles.link,
								pathname === '/add' && styles.active
							)}
						>
							{copyPath.addItem}
						</a>
					</Link>
				</li>
			</ul>
		</nav>
	)
}
