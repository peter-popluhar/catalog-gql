import React, {MutableRefObject} from 'react'
import buttons from './buttons.module.scss'
import AddButton from './add-button'
import UpdateButton from './update-button'
import DeleteButton from './delete-button'

type Props = {
	form: MutableRefObject<HTMLFormElement>
	isEditable: boolean
	id: string
}

export default function Buttons({form, isEditable, id}: Props) {
	return (
		<div className={buttons.wrapper}>
			{isEditable ? (
				<>
					<input type='hidden' name='id' value={id} />
					<div>
						<UpdateButton form={form} id={id} />
					</div>
					<DeleteButton id={id} />
				</>
			) : (
				<div>
					<AddButton form={form} />
				</div>
			)}
		</div>
	)
}
