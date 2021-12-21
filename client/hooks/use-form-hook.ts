import {useState} from 'react'
import {useRouter} from 'next/router'
import {MutableRefObject} from 'react'

type Form = MutableRefObject<HTMLFormElement> | null

const headers = {'Content-Type': 'application/json'}

export function useFormHook(
	formRef: Form,
	fetchUrl: string,
	method: string,
	redirect: string
) {
	const router = useRouter()
	const [btnDisabled, setBtnDisabled] = useState<boolean>(false)
	const [isError, setError] = useState<boolean>(false)
	const [errorMsg, setErrorMsg] = useState<string>('')
	const [testStatus, setTestStatus] = useState<Record<string, unknown>>({})

	const handleForm = (e: {preventDefault: () => void}, id: string | null) => {
		// FIXME
		// this is ugly, but I couldnt pass e from use-form.test.js
		if (e) {
			e.preventDefault()
		}

		setBtnDisabled(true)

		if (fetchUrl === '/api/delete') {
			fetch(fetchUrl, {
				headers: headers,
				method: method,
				body: JSON.stringify(id),
			}).then((res) => {
				if (res.status === 200) {
					setBtnDisabled(false)
					router.push(redirect)
					setTestStatus({
						fetchUrl: fetchUrl,
						method: method,
						status: 200,
						redirect: redirect,
					})
				}
			})
		}

		if (fetchUrl === '/api/logout') {
			fetch(fetchUrl, {
				headers: headers,
				method: method,
				body: JSON.stringify({}),
			}).then((res) => {
				if (res.status === 200) {
					setBtnDisabled(false)
					router.push(redirect)
					setTestStatus({
						fetchUrl: fetchUrl,
						method: method,
						status: 200,
						redirect: redirect,
					})
				}
			})
		}

		if (formRef !== null && formRef.current) {
			const formData = new FormData(formRef.current)
			const formValues = Object.fromEntries(formData.entries())
			fetch(fetchUrl, {
				headers: headers,
				method: method,
				body: JSON.stringify(formValues),
			}).then((res) => {
				if (res.status === 203) {
					setError(true)
					setBtnDisabled(false)
					setErrorMsg('All field must be filled!!!')
				}
				if (res.status === 400) {
					setBtnDisabled(false)
					setError(true)
					setErrorMsg('Incorrect credentials!!!')
				}
				if (res.status === 200) {
					setBtnDisabled(false)
					setError(false)
					res.json().then(() => {
						router.push(redirect)
					})
				}
			})
		}
	}

	return {
		handleForm,
		btnDisabled,
		isError,
		errorMsg,
		testStatus,
	}
}
