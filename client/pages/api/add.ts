import {NextApiRequest, NextApiResponse} from 'next'
import {connectToDatabase} from '../../util/mongodb'
import {isEmptyFieldValidator} from './../../util/empty-field-validator'
import {ItemType} from '../../types/data-type'

const {MONGO_DB_COLLECTION} = process.env

export default async function Add(req: NextApiRequest, res: NextApiResponse) {
	const data: ItemType = req.body

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

	try {
		const {db} = await connectToDatabase()
		const collection = await db.collection(MONGO_DB_COLLECTION)
		await collection.insertOne(data)
		const items = await collection.find({}).toArray()
		res.json(items)
		res.status(201)
	} catch (e) {
		console.log(e)
	}
}
