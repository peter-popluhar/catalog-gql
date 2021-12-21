import {MongoClient} from 'mongodb'

const mockItem = {
	_id: '10',
	enLabelContent: 'top 41',
	enName: 'Akai MPC Live II',
	enCategories: 'DJ MIDI controllers ',
	enDescription:
		'MPC Live II is the standalone tool of the new generation! Functionally independent',
	enPrice: 29490,
	swLabelContent: 'juu 41',
	swName: 'Akai MPC Live II',
	swCategories: 'Watawala wa DJ MIDI',
	swDescription: 'MPC Live II ni chombo cha pekee cha kiz',
	swPrice: 4529490,
}

const mockNewItem = {
	enLabelContent: 'Replaced Item',
	enName: 'Replaced Item',
	enCategories: 'Replaced Item',
	enDescription: 'Replaced Item',
	enPrice: 29490,
	swLabelContent: 'Replaced Item',
	swName: 'Replaced Item',
	swCategories: 'Replaced Item',
	swDescription: 'Replaced Item',
	swPrice: 4529490,
}

describe('test db CRUD operation', () => {
	let connection
	let db

	beforeAll(async () => {
		connection = await MongoClient.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		db = await connection.db()
	})

	afterAll(async () => {
		await connection.close()
		// await db.close()
	})

	it('should create a doc in collection', async () => {
		const catalog = db.collection('catalog')

		await catalog.insertOne(mockItem)

		const insertedItem = await catalog.findOne({_id: '10'})
		expect(insertedItem).toEqual(mockItem)
	})

	it('should update a doc in collection', async () => {
		const catalog = db.collection('catalog')

		await catalog.replaceOne({_id: '10'}, mockNewItem)

		const items = await catalog.find({}).toArray()
		const replacedItem = await catalog.findOne({_id: '10'})

		expect(items).toHaveLength(1)
		expect(replacedItem.enName).toBe('Replaced Item')
	})

	it('should remove a doc from collection', async () => {
		const catalog = db.collection('catalog')

		await catalog.deleteOne({_id: '10'})

		const items = await catalog.find({}).toArray()

		expect(items).toHaveLength(0)
	})
})
