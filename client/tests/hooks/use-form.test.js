/**
 * @jest-environment jsdom
 */

import {useFormHook} from './../../hooks/use-form-hook'
import 'whatwg-fetch'
import {renderHook, act} from '@testing-library/react-hooks'
import fetchMock from 'fetch-mock'

jest.mock('next/router', () => ({
	useRouter() {
		return {
			push: () => {},
		}
	},
}))

const mockLogoutData = {
	fetchUrl: '/api/logout',
	method: 'POST',
	status: 200,
	redirect: '/login',
}

const mockDeleteData = {
	fetchUrl: '/api/delete',
	method: 'DELETE',
	status: 200,
	redirect: '/items',
}

describe('useForm hook', () => {
	beforeAll(() => {
		global.fetch = fetch
	})
	afterAll(() => {
		fetchMock.restore()
	})

	it('check correct API call, method, and redirect on Logout', async () => {
		const {result} = renderHook(() =>
			useFormHook(null, '/api/logout', 'POST', '/login')
		)

		fetchMock.mock('/api/logout', {
			returnedData: mockLogoutData,
		})

		await act(async () => {
			result.current.handleForm()
		})

		expect(result.current.testStatus).toStrictEqual(mockLogoutData)
	})

	it('check correct API call, method, and redirect on Delete', async () => {
		const {result} = renderHook(() =>
			useFormHook(null, '/api/delete', 'DELETE', '/items')
		)

		fetchMock.mock('/api/delete', {
			returnedData: mockDeleteData,
		})

		await act(async () => {
			result.current.handleForm()
		})

		expect(result.current.testStatus).toStrictEqual(mockDeleteData)
	})
})
