import {useState, useRef, useEffect, useCallback} from 'react'
import cslx from 'clsx'
import styles from './settings.module.scss'
import btn from './button.module.scss'
import LanguageSwitcher from './../language-switcher'
import LayoutSwitcher from '../layout-switcher'
import ThemeSwitcher from './../theme-switcher'
import {useRouter} from 'next/router'
import {useSettingsContext} from './../../context/settings-context'
import {settingsCopy} from './../../copy/settings'
import overlay from './overlay.module.scss'
import LogoutButton from './../../components/form/buttons/logout-button'
import Router from 'next/router'

export default function Settings() {
	const [open, setOpen] = useState<boolean>(false)
	const router = useRouter()
	const pathname = router.pathname
	const {lng} = useSettingsContext()
	const copyPath = settingsCopy?.[lng]
	const node = useRef<HTMLDivElement | null>()

	const handleListVisibility = useCallback(() => {
		setOpen(!open)
	}, [open])

	const handleClickOutside = useCallback((e: any) => {
		if (node?.current?.contains(e.target)) {
			return
		}
		setOpen(false)
	}, [])

	Router.events.on('routeChangeStart', () => {
		setOpen(false)
	})

	useEffect(() => {
		if (open) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [open])

	return (
		<>
			<div className={styles.wrapper} ref={node}>
				<button
					className={cslx(btn.btnProfile, pathname === '/login' && btn.Nouser)}
					onClick={handleListVisibility}
					aria-haspopup='true'
					aria-expanded={open ? 'true' : 'false'}
				>
					{copyPath.profile}
				</button>
				<ul
					className={cslx(styles.list, open && styles.visible)}
					role='menu'
					aria-label={copyPath.profile}
				>
					{pathname !== '/login' && (
						<>
							<li className={styles.item} role='none'>
								<span role='menuitem' className={styles.link}>
									{copyPath.greet} George
								</span>
							</li>
							<li className={styles.item} role='none'>
								<LogoutButton role='menuitem' cssClass={btn.btnLogout} />
							</li>
						</>
					)}
					{pathname === '/items' && (
						<li className={styles.item} role='none'>
							<LayoutSwitcher />
						</li>
					)}

					<li className={styles.item} role='none'>
						<ThemeSwitcher />
					</li>

					<li className={styles.item} role='none'>
						<LanguageSwitcher />
					</li>
				</ul>
			</div>
			<div className={cslx(overlay.overlay, open && overlay.isActive)} />
		</>
	)
}
