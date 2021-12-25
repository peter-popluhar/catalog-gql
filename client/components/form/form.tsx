import React, {useRef} from 'react'
import styles from './form.module.scss'
import grid from './../global/grid.module.scss'
import {ItemType} from '../../types/data-type'
import Buttons from './buttons'
import Fieldset from './fieldset'

type Props = {
	data?: ItemType
	isEditable?: boolean
}

export default function Form({data, isEditable}: Props) {
	const form = useRef<HTMLFormElement | null>()

	return (
		<div className={styles.wrapper}>
			<form ref={form}>
				<div className={grid.grid}>
					<Fieldset data={data} lng='en' focus />
					<Fieldset data={data} lng='sw' />
				</div>

				{isEditable && data && (
					<input type='hidden' name='id' value={data ? data._id : ''} />
				)}

				<Buttons
					formRef={form}
					isEditable={isEditable}
					id={data ? data._id : null}
					data={data}
				/>
			</form>
		</div>
	)
}
