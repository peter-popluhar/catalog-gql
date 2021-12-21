import {GetServerSideProps} from 'next'
import {ChangeEvent, useCallback} from 'react'
import {useState, useEffect} from 'react'
import {withIronSession} from 'next-iron-session'
import {connectToDatabase} from '../../util/mongodb'
import MediaObject from './../../components/media-object'
import grid from './../../components/global/grid.module.scss'
import {ItemsType, ItemType} from '../../types/data-type'
import MastHead from './../../components/masthead'
import {itemsCopy} from '../../copy/items'
import {useSettingsContext} from './../../context/settings-context'
import cslx from 'clsx'
import {UserType} from './../../types/user-type'
import FormField from './../../components/form/form-field'

const {MONGO_DB_COLLECTION, COOKIE_NAME} = process.env

type Props = {
	isConnected: boolean
	items: ItemsType
}

export default function List({isConnected, items}: Props) {
	const {lng, layout} = useSettingsContext()
	const lngPath = itemsCopy?.[lng]

	const [searchTerm, setSearchTerm] = useState<string>('')
	const [searchResults, setSearchResults] = useState<ItemType[]>([])

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setSearchTerm(e.target.value)
		},
		[searchTerm]
	)

	useEffect(() => {
		const results = items.filter((item: ItemType) =>
			item.enName.toLowerCase().includes(searchTerm.toLowerCase())
		)
		setSearchResults(results)
	}, [searchTerm])

	if (!isConnected) {
		return (
			<MastHead
				title={lngPath.notConnected.title}
				subtitle={lngPath.notConnected.subTitle}
			/>
		)
	}

	if (items.length < 1) {
		return (
			<MastHead
				title={lngPath.notItems.title}
				subtitle={lngPath.notItems.subTitle}
			/>
		)
	}

	return (
		<main>
			<MastHead title={lngPath.title} />
			<FormField
				label={lngPath.search.label}
				inputType='search'
				name='search'
				defaultValue={searchTerm}
				handleChange={handleChange}
				placeholder={lngPath.search.placeholder}
				orange
			/>
			<section className={cslx(grid.grid, layout === 'list' && grid.gridList)}>
				{searchResults.map((item) => (
					<MediaObject data={item} key={item._id} />
				))}
			</section>
		</main>
	)
}

export const getServerSideProps: GetServerSideProps = withIronSession(
	async ({req}) => {
		const user: UserType = req.session.get('user')

		if (!user) {
			return {
				redirect: {
					permanent: false,
					destination: '/login',
				},
			}
		}

		let items: ItemsType = []
		const {client, db} = await connectToDatabase()
		const isConnected = await client.isConnected()

		try {
			items = await db
				.collection(MONGO_DB_COLLECTION)
				.find({})
				.sort({_id: -1})
				.toArray()
		} catch (e) {
			console.log(e)
		}

		return {
			props: {isConnected, items: JSON.parse(JSON.stringify(items)), user},
		}
	},
	{
		cookieName: COOKIE_NAME,
		cookieOptions: {
			secure: process.env.NODE_ENV === 'production' ? true : false,
		},
		password: process.env.APPLICATION_SECRET,
	}
)
