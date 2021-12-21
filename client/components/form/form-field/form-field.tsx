import React, {useEffect, useRef} from 'react'
import formField from './form-field.module.scss'
import formLabel from './form-label.module.scss'
import input from './input.module.scss'
import cslx from 'clsx'

type Props = {
	label: string
	inputType: string
	defaultValue?: string | number
	name: string
	hasFocus?: boolean
	currency?: string
	handleChange?: (e) => void
	placeholder?: string
	orange?: boolean
}

export default function FormField({
	label,
	inputType,
	defaultValue,
	name,
	hasFocus,
	currency,
	handleChange,
	placeholder,
	orange,
}: Props) {
	const inputFocus = useRef<HTMLInputElement | null>()

	useEffect(() => {
		if (inputFocus.current) {
			inputFocus.current.focus()
		}
	}, [])

	return (
		<div className={formField.field}>
			<label htmlFor={name}>
				<span className={`text--sm ${formLabel.formLabel}`}>{label}:</span>
				{inputType === 'area' ? (
					<textarea
						name={name}
						id={name}
						className={`${input.input} ${input.area}`}
						required
						defaultValue={defaultValue}
					></textarea>
				) : (
					<div className={cslx(currency && formField.hasCurrency)}>
						<input
							type={inputType}
							name={name}
							id={name}
							className={cslx(input.input, orange && input.orange)}
							required
							ref={hasFocus && inputFocus}
							defaultValue={defaultValue}
							onChange={handleChange}
							placeholder={placeholder}
							autoComplete='off'
						/>

						{currency && (
							<span className={`text--sm ${formLabel.formLabel}`}>
								<span className={formField.currency}>{currency}</span>
							</span>
						)}
					</div>
				)}
			</label>
		</div>
	)
}
