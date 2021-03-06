import {gql} from '@apollo/client'
import {GetServerSideProps} from 'next'
import {ChangeEvent, useCallback} from 'react'
import {useState, useEffect} from 'react'
import {withIronSession} from 'next-iron-session'
import MediaObject from '../components/media-object'
import grid from '../components/global/grid.module.scss'
import {ItemsType, ItemType} from '../types/data-type'
import MastHead from './../components/masthead'
import {itemsCopy} from '../copy/items'
import {useSettingsContext} from './../context/settings-context'
import cslx from 'clsx'
import {UserType} from './../types/user-type'
import FormField from './../components/form/form-field'
import apolloClient from './../util/apollo-client'

const {COOKIE_NAME} = process.env

type Props = {
	items: ItemsType
	isError?: Record<string, string>
	user: UserType
}

const GET_ITEMS = gql`
	query GetItems {
		GetItems {
			_id
			enName
			enLabelContent
			enCategories
			enDescription
			enPrice
			swName
			swLabelContent
			swCategories
			swDescription
			swPrice
		}
	}
`

export default function List({items, isError, user}: Props) {
	const {lng, layout, setUser} = useSettingsContext()
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

	useEffect(() => {
		setUser(user.name)
	}, [user])

	if (isError) {
		console.log(isError)
		return (
			<>
				<MastHead title='There are some errors!' subtitle={isError.message}>
					<br />
					<p>For error log see browser console, please.</p>
				</MastHead>
			</>
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

		try {
			const {data} = await apolloClient.query({
				query: GET_ITEMS,
				context: { headers: { authorization: user.name }, }
			})

			return {
				props: {items: data.GetItems as ItemsType, user},
			}
		} catch (e) {
			console.log(e)
			return {
				props: {items: [], user, isError: JSON.parse(JSON.stringify(e))},
			}
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
