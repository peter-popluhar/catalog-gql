import btn from './../../global/buttons.module.scss'
import {formCopy} from '../../../copy/form'
import {useSettingsContext} from '../../../context/settings-context'
import {gql, useMutation} from '@apollo/client'
import {useRouter} from 'next/router'
import {MutableRefObject} from 'react'

const CREATE_ITEM = gql`
	mutation CreateItem(
		$enName: String!
		$enLabelContent: String!
		$enCategories: String!
		$enDescription: String!
		$enPrice: String!
		$swName: String!
		$swLabelContent: String!
		$swCategories: String!
		$swDescription: String!
		$swPrice: String!
	) {
		CreateItem(
			enName: $enName
			enLabelContent: $enLabelContent
			enCategories: $enCategories
			enDescription: $enDescription
			enPrice: $enPrice
			swName: $swName
			swLabelContent: $swLabelContent
			swCategories: $swCategories
			swDescription: $swDescription
			swPrice: $swPrice
		) {
			enName
			enLabelContent
			enCategories
			enDescription
			enPrice
			swName
			swLabelContent
			swCategories
			swDescription
			swPrice
		}
	}
`

type Props = {
	formRef: MutableRefObject<HTMLFormElement>
}

export default function AddButton({formRef}: Props) {
	const router = useRouter()
	const {lng} = useSettingsContext()
	const lngPath = formCopy?.[lng]

	const [createItem, {data, loading, error}] = useMutation(CREATE_ITEM, {
		onCompleted({loading, error}) {
			if (!loading && !error) {
				router.push('/items')
			}
		},
	})

	const handleClick = (e) => {
		e.preventDefault()
		if (formRef.current) {
			const formData = new FormData(formRef.current)
			const formValues = Object.fromEntries(formData.entries())
			createItem({
				variables: {
					...formValues,
				},
			})
		}
	}

	return (
		<>
			{loading && <p>'Submitting...'</p>}
			{error && <p>`Submission error! ${error.message}`</p>}
			<input
				type='submit'
				tabIndex={0}
				value={lngPath.addBtn}
				disabled={loading}
				className={btn.btnPrimary}
				onClick={handleClick}
			/>
		</>
	)
}
