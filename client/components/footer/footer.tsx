import {footerCopy} from './../../copy/footer'
import footer from './footer.module.scss'
import {useSettingsContext} from '../../context/settings-context'

export default function Footer() {
	const {lng} = useSettingsContext()
	const lngPath = footerCopy?.[lng]

	return (
		<footer className={footer.footer}>{lngPath.copyright} © 2007–2021</footer>
	)
}
