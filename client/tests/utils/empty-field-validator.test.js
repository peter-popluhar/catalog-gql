import {isEmptyFieldValidator} from './../../util/empty-field-validator'

const mockFormData = {name: 'test.test@gmail.com', password: '12', nick: ''}

describe('Empty Field Validator', () => {
	it('should return true if some form field is empty', () => {
		const result = isEmptyFieldValidator(mockFormData)

		expect(result).toBe(true)
	})
})
