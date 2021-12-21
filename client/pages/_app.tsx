import Head from 'next/head'
import type {AppProps} from 'next/app'
import './../styles/index.scss'
import Layout from './../components/layout'
import {SettingsProvider} from './../context/settings-context'
import NProgress from 'nprogress'
import Router from 'next/router'

function MyApp({Component, pageProps}: AppProps) {
	Router.events.on('routeChangeStart', () => {
		NProgress.start()
	})
	Router.events.on('routeChangeComplete', () => {
		NProgress.done()
	})
	Router.events.on('routeChangeError', () => {
		NProgress.done()
	})

	return (
		<>
			<Head>
				<title>Catalog app</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<SettingsProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</SettingsProvider>
		</>
	)
}
export default MyApp
