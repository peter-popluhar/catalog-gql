import React from 'react'
import {render} from '@testing-library/react'
import {SettingsProvider} from '../context/settings-context'

const AllTheProviders = ({children}) => {
	return <SettingsProvider>{children}</SettingsProvider>
}

const customRender = (ui, options) =>
	render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'

export {customRender as render}
