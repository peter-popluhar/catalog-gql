import {NextApiRequest, NextApiResponse} from 'next'
import {connectToDatabase} from '../../util/mongodb'
import {ObjectID} from 'mongodb'
import {isEmptyFieldValidator} from './../../util/empty-field-validator'
import {ItemType} from '../../types/data-type'

const {MONGO_DB_COLLECTION} = process.env

export default async function Update(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const data: ItemType = req.body
	const id: string = req.body.id

	if (req.method !== 'PUT') {
		res.setHeader('Allow', ['PUT'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
		return
	}

	if (isEmptyFieldValidator(data)) {
		res.setHeader('Allow', ['PUT'])
		res.status(203).end(`Non-Authoritative Information`)
		return
	}

	try {
		const objectId = await ObjectID(id)
		const {db} = await connectToDatabase()
		const collection = await db.collection(MONGO_DB_COLLECTION)
		await collection.replaceOne({_id: objectId}, data)
		res.json(objectId)
		res.status(201)
	} catch (e) {
		console.log(e)
	}
}
