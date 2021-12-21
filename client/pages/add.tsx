import {GetServerSideProps} from 'next'
import {withIronSession} from 'next-iron-session'
import Head from 'next/head'
import Form from './../components/form'
import MastHead from './../components/masthead'
import {addCopy} from './../copy/add'
import {useSettingsContext} from './../context/settings-context'
import {UserType} from './../types/user-type'

const {COOKIE_NAME} = process.env

export default function Add() {
	const {lng} = useSettingsContext()
	const lngPath = addCopy?.[lng]

	return (
		<>
			<Head>
				<title>Add Item</title>
			</Head>
			<main>
				<MastHead title={lngPath.title} />
				<Form />
			</main>
		</>
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

		return {
			props: {user},
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
