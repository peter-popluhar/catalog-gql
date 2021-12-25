import React, {MutableRefObject} from 'react'
import buttons from './buttons.module.scss'
import AddButton from './add-button'
import UpdateButton from './update-button'
import DeleteButton from './delete-button'
import { ItemType } from '../../../types/data-type'

type Props = {
	formRef: MutableRefObject<HTMLFormElement>
	isEditable: boolean
	id: string,
	data: ItemType
}

export default function Buttons({formRef, isEditable, id, data}: Props) {
	return (
		<div className={buttons.wrapper}>
			{isEditable ? (
				<>
					<input type='hidden' name='id' value={id} />
					<div>
						<UpdateButton id={data._id} formRef={formRef} />
					</div>
					<DeleteButton id={data._id} />
				</>
			) : (
				<div>
					<AddButton formRef={formRef} />
				</div>
			)}
		</div>
	)
}
