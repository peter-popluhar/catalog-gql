import {GetServerSideProps} from 'next'
import {withIronSession} from 'next-iron-session'
import {connectToDatabase} from '../../util/mongodb'
import {ObjectID} from 'mongodb'
import MastHead from './../../components/masthead'
import Form from './../../components/form'
import {itemCopy} from '../../copy/items'
import {useSettingsContext} from './../../context/settings-context'
import {UserType} from './../../types/user-type'
import {ItemType} from '../../types/data-type'

const {MONGO_DB_COLLECTION, COOKIE_NAME} = process.env

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
		const {db} = await connectToDatabase()
		const objectId = await ObjectID(id)
		const data = await db
			.collection(MONGO_DB_COLLECTION)
			.findOne({_id: objectId})

		return {
			props: {user, data: JSON.parse(JSON.stringify(data))},
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
