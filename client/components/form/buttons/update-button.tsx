import {MutableRefObject, useCallback} from 'react'
import {useFormHook} from './../../../hooks/use-form-hook'
import btn from './../../global/buttons.module.scss'
import {formCopy} from '../../../copy/form'
import {useSettingsContext} from '../../../context/settings-context'

type Props = {
	form: MutableRefObject<HTMLFormElement>
	id: string
}

export default function UpdateButton({form, id}: Props) {
	const {handleForm, isError, errorMsg} = useFormHook(
		form,
		'/api/update',
		'PUT',
		`/items/${id}`
	)
	const {lng} = useSettingsContext()
	const lngPath = formCopy?.[lng]

	const handleClick = useCallback((e: {preventDefault: () => void}) => {
		handleForm(e, id)
	}, [])

	return (
		<div>
			{isError && <p>{errorMsg}</p>}
			<button
				tabIndex={0}
				onClick={handleClick}
				className={`${btn.btnSuccess} ${btn.btnLg}`}
			>
				{lngPath.updateBtn}
			</button>
		</div>
	)
}
