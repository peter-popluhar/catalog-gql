import React, {createContext, useContext, useState, ReactNode} from 'react'

type Props = {
	children: ReactNode
}

type Settings = {
	theme: string
	setTheme: (params: string) => void
	layout: string
	setLayout: (params: string) => void
	lng: string
	setLanguage: (params: string) => void
	user: string
	setUser: (params: string) => void
}

const SettingsContext = createContext<Settings>({
	theme: '',
	setTheme: () => {},
	layout: '',
	setLayout: () => {},
	lng: '',
	setLanguage: () => {},
	user: '',
	setUser: () => {}
})

export const SettingsProvider = ({children}: Props) => {
	const [theme, setTheme] = useState<string>('light')
	const [layout, setLayout] = useState<string>('detail')
	const [lng, setLanguage] = useState<string>('en')
	const [user, setUser] = useState<string>('')

	return (
		<SettingsContext.Provider
			value={{theme, setTheme, layout, setLayout, lng, setLanguage, user, setUser}}
		>
			{children}
		</SettingsContext.Provider>
	)
}

export const useSettingsContext = () => useContext(SettingsContext)
