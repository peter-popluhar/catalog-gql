import {NextApiRequest, NextApiResponse} from 'next'
import {connectToDatabase} from '../../util/mongodb'
import {ObjectID} from 'mongodb'

const {MONGO_DB_COLLECTION} = process.env

export default async function Delete(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const id: string = req.body

	try {
		const objectId = await ObjectID(id)
		const {db} = await connectToDatabase()
		const collection = await db.collection(MONGO_DB_COLLECTION)

		await collection.deleteOne({_id: objectId})
		const items = await collection.find({}).toArray()
		res.json(items)
		res.status(200)
	} catch (e) {
		console.log(e)
	}
}
