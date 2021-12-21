/**
 * @jest-environment jsdom
 */

import React from 'react'
import {render, screen} from '../test-utils'
import Login from '../../pages/login'

describe('Login Page', () => {
	it('should render form', () => {
		render(<Login />)
		const userName = screen.getByLabelText('User Name:', {selector: 'input'})
		const userPassword = screen.getByLabelText('User Password:', {
			selector: 'input',
		})
		const button = screen.getByText(/login/i, {selector: 'input'})

		expect(userName).toBeInTheDocument()
		expect(userPassword).toBeInTheDocument()
		expect(button).toBeInTheDocument()
	})
})
