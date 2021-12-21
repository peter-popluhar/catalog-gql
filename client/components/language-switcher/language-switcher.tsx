import {useCallback} from 'react'
import cslx from 'clsx'
import {useSettingsContext} from '../../context/settings-context'
import styles from './language-switcher.module.scss'

export default function LanguageSwitcher() {
	const {setLanguage, lng} = useSettingsContext()

	const handlelanguage = useCallback((lng: string) => {
		setLanguage(lng)
	}, [])

	return (
		<ul className={styles.wrapper} role='menu'>
			<li className={styles.item} role='none'>
				<img
					alt='english language'
					src='/uk.svg'
					className={cslx(styles.flag, lng === 'en' && styles.active)}
					onClick={() => handlelanguage('en')}
					title='English'
					role='menuitemradio'
					aria-checked={lng === 'en' ? 'true' : 'false'}
				/>
			</li>
			<li className={styles.item} role='none'>
				<img
					alt='swahili language'
					src='/kenya.svg'
					className={cslx(styles.flag, lng === 'sw' && styles.active)}
					onClick={() => handlelanguage('sw')}
					title='Swahili'
					role='menuitemradio'
					aria-checked={lng === 'sw' ? 'true' : 'false'}
				/>
			</li>
		</ul>
	)
}
