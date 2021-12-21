import {useCallback} from 'react'
import {useFormHook} from '../../../hooks/use-form-hook'
import {formCopy} from '../../../copy/form'
import {useSettingsContext} from '../../../context/settings-context'

type Props = {
	role?: string
	cssClass?: string
}

export default function LogoutButton({role, cssClass}: Props) {
	const {handleForm, btnDisabled, isError, errorMsg} = useFormHook(
		null,
		'/api/logout',
		'POST',
		'/login'
	)
	const {lng} = useSettingsContext()
	const lngPath = formCopy?.[lng]

	const handleClick = useCallback((e: {preventDefault: () => void}) => {
		handleForm(e, null)
	}, [])

	return (
		<>
			{isError && <p>{errorMsg}</p>}
			<input
				tabIndex={0}
				type='submit'
				value={lngPath.logoutBtn}
				disabled={btnDisabled}
				className={cssClass}
				onClick={handleClick}
				role={role}
			/>
		</>
	)
}
