import Link from 'next/link'
import Image from 'next/image'
import styles from './media-object.module.scss'
import flag from './../global/flag.module.scss'
import btn from './../global/buttons.module.scss'
import {ItemType} from '../../types/data-type'
import {mediaObjectCopy} from './../../copy/media-object'
import {useSettingsContext} from './../../context/settings-context'

type Props = {
	data: ItemType
}

export default function MediaObject({data}: Props) {
	const {lng, layout} = useSettingsContext()
	const lngPath = mediaObjectCopy?.[lng]
	const currency = lng === 'en' ? 'EUR' : 'TSH'

	const {
		_id,
		enLabelContent,
		enName,
		enCategories,
		enDescription,
		enPrice,
		swLabelContent,
		swName,
		swCategories,
		swDescription,
		swPrice,
	} = data

	const labelContent = lng === 'en' ? enLabelContent : swLabelContent
	const name = lng === 'en' ? enName : swName
	const categories = lng === 'en' ? enCategories : swCategories
	const description = lng === 'en' ? enDescription : swDescription
	const price = lng === 'en' ? enPrice : swPrice

	return (
		<Link href={`/items/${_id}`}>
			<a className={styles.link}>
				<article className={styles.mediaObject}>
					{layout === 'detail' && (
						<div className={styles.img}>
							<Image
								alt={name}
								src='/150.png'
								layout='intrinsic'
								width={320}
								height={200}
							/>
						</div>
					)}

					<div className={styles.info}>
						{layout === 'detail' && (
							<span className={`strong ${flag.flag}`}>{labelContent}</span>
						)}
						<h2 className='text--md'>{name}</h2>
						{layout === 'detail' && (
							<p className={`text--sm ${styles.categories}`}>{categories}</p>
						)}
						<p className='text--sm text--overflow'>{description}</p>
					</div>
					<div className={styles.action}>
						<p className='text--md strong nbsp'>
							{price} {currency}
						</p>
						{layout === 'detail' && (
							<button className={`${btn.btnAction} ${btn.btnLg}`}>
								{lngPath.editBtn}
							</button>
						)}
					</div>
				</article>
			</a>
		</Link>
	)
}
