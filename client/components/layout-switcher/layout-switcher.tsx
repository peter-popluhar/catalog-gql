import {useCallback} from 'react'
import styles from './layout-switcher.module.scss'
import cslx from 'clsx'
import {useSettingsContext} from './../../context/settings-context'
import {settingsCopy} from './../../copy/settings'

export default function LayoutSwitcher() {
	const {setLayout, layout, lng} = useSettingsContext()
	const copyPath = settingsCopy?.[lng]

	const handleLayout = useCallback((layout: string) => {
		setLayout(layout)
	}, [])

	return (
		<ul className={styles.wrapper} role='menu'>
			<li
				className={cslx(styles.item, layout === 'detail' && styles.active)}
				onClick={() => handleLayout('detail')}
				role='menuitemradio'
				aria-checked={layout === 'detail' ? 'true' : 'false'}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					viewBox='0 0 16 16'
				>
					<path d='M0 0v3h5V0H0zm7 0v1h9V0H7zm0 2v1h7V2H7zM0 6v3h5V6H0zm7 0v1h9V6H7zm0 2v1h7V8H7zm-7 4v3h5v-3H0zm7 0v1h9v-1H7zm0 2v1h7v-1H7z'></path>
				</svg>
				{copyPath.detail}
			</li>
			<li
				className={cslx(styles.item, layout === 'list' && styles.active)}
				onClick={() => handleLayout('list')}
				role='menuitemradio'
				aria-checked={layout === 'list' ? 'true' : 'false'}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					viewBox='0 0 16 16'
				>
					<path d='M9 0v1h7V0H9zm0 3v1h7V3H9zm0 3v1h7V6H9zm0 3v1h7V9H9zm0 3v1h7v-1H9zm0 3v1h7v-1H9zM0 0v1h7V0H0zm0 3v1h7V3H0zm0 3v1h7V6H0zm0 3v1h7V9H0zm0 3v1h7v-1H0zm0 3v1h7v-1H0z'></path>
				</svg>
				{copyPath.list}
			</li>
		</ul>
	)
}
