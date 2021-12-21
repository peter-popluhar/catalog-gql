import {MutableRefObject, useCallback} from 'react'
import {useFormHook} from './../../../hooks/use-form-hook'
import btn from './../../global/buttons.module.scss'
import {formCopy} from '../../../copy/form'
import {useSettingsContext} from '../../../context/settings-context'

type Props = {
	form: MutableRefObject<HTMLFormElement>
	id: string
}

export default function DeleteButton({id, form}: Props) {
	const {handleForm, btnDisabled} = useFormHook(
		form,
		'/api/delete',
		'DELETE',
		'/items'
	)
	const {lng} = useSettingsContext()
	const lngPath = formCopy?.[lng]

	const handleClick = useCallback((e: {preventDefault: () => void}) => {
		handleForm(e, id)
	}, [])

	return (
		<div>
			<button
				tabIndex={0}
				onClick={handleClick}
				className={`${btn.btnDelete} ${btn.btnLg}`}
				disabled={btnDisabled}
			>
				{lngPath.deleteBtn}
			</button>
		</div>
	)
}
