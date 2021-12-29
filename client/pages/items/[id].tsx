import {gql} from '@apollo/client'
import {GetServerSideProps} from 'next'
import {withIronSession} from 'next-iron-session'
import MastHead from './../../components/masthead'
import Form from './../../components/form'
import {itemCopy} from '../../copy/items'
import {useSettingsContext} from './../../context/settings-context'
import {UserType} from './../../types/user-type'
import {ItemType} from '../../types/data-type'
import apolloClient from '../../util/apollo-client'

const {COOKIE_NAME} = process.env

type Props = {
	data: ItemType
	isError?: Record<string, string>
}

const GET_ITEM = gql`
	query GetItem($id: String!) {
		GetItem(id: $id) {
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

export default function Item({data, isError}: Props) {
	const {lng} = useSettingsContext()
	const lngPath = itemCopy?.[lng]

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

	if (!data) {
		return <MastHead title={lngPath.notExists} />
	}

	const {enName, swName} = data
	const name = lng === 'en' ? enName : swName

	return (
		<>
			<MastHead title={` ${lngPath.title}: ${name}`} />
			<Form data={data} isEditable />
		</>
	)
}

export const getServerSideProps: GetServerSideProps = withIronSession(
	async ({req, query}) => {
		const user: UserType = req.session.get('user')

		if (!user) {
			return {
				redirect: {
					permanent: false,
					destination: '/login',
				},
			}
		}

		const {id} = query

		try {
			const {data} = await apolloClient.query({
				query: GET_ITEM,
				variables: {id: id},
				context: { headers: { authorization: user.name }, }
			})

			return {
				props: {user, data: JSON.parse(JSON.stringify(data.GetItem))},
			}
		} catch (e) {
			console.log(e)
			return {
				props: {items: {}, user, isError: JSON.parse(JSON.stringify(e))},
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
