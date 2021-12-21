import {NextApiResponse} from 'next'
import {withIronSession} from 'next-iron-session'
import {isEmptyFieldValidator} from './../../util/empty-field-validator'

const {APPLICATION_SECRET, USER_NAME, USER_PASSWORD, COOKIE_NAME} = process.env

async function Login(
	req: {
		body: any
		method: string
		session: {set: (arg0: string, arg1: {name: any}) => void; save: () => any}
	},
	res: NextApiResponse
) {
	const data = req.body
	const {name, password} = data

	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
		return
	}

	if (isEmptyFieldValidator(data)) {
		res.setHeader('Allow', ['POST'])
		res.status(203).end(`Non-Authoritative Information`)
		return
	}

	if (name === USER_NAME && password === USER_PASSWORD) {
		req.session.set('user', {name})
		await req.session.save()
		res.json({msg: 'Logged in'})
		res.status(200)
	} else {
		return res.status(400).json({
			status: 'error',
			error: 'incorrect credentials',
		})
	}
}

export default withIronSession(Login, {
	cookieName: COOKIE_NAME,
	password: APPLICATION_SECRET,
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
	},
})
