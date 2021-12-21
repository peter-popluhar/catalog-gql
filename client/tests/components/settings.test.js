/**
 * @jest-environment jsdom
 */

import React from 'react'
import * as nextRouter from 'next/router'

nextRouter.useRouter = jest.fn()
nextRouter.useRouter.mockImplementation(() => ({route: '/'}))

import {render, fireEvent, screen} from '../test-utils'
import Settings from '../../components/settings'

describe('Settings', () => {
	it('on click settings should be visible', () => {
		render(<Settings />)
		const button = screen.getByText('View Profile', {selector: 'button'})

		fireEvent.click(button)

		expect(screen.getByLabelText('View Profile', {selector: 'ul'})).toHaveStyle(
			'visibility: visible'
		)
	})
})
