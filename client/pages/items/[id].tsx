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
}

export default function Item({data}: Props) {
	const {lng} = useSettingsContext()
	const lngPath = itemCopy?.[lng]

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

		const {data} = await apolloClient.query({
			query: gql`
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
			`,
			variables: {id: id},
		})

		return {
			props: {user, data: JSON.parse(JSON.stringify(data.GetItem))},
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
