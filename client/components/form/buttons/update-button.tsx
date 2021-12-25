import {MutableRefObject} from 'react'
import btn from './../../global/buttons.module.scss'
import {formCopy} from '../../../copy/form'
import {useSettingsContext} from '../../../context/settings-context'
import {gql, useMutation} from '@apollo/client'
import {useRouter} from 'next/router'

const UPDATE_ITEM = gql`
	mutation UpdateItem(
		$id: String!
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
		UpdateItem(
			id: $id
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
			id
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
	id: string
}

export default function UpdateButton({formRef, id}: Props) {
	const router = useRouter()
	const {lng} = useSettingsContext()
	const lngPath = formCopy?.[lng]

	const [updateItem, {data, loading, error}] = useMutation(UPDATE_ITEM, {
		onCompleted({loading, error}) {
			if (!loading && !error) {
				router.push(`/items/${id}`)
			}
		},
	})

	const handleClick = (e) => {
		e.preventDefault()
		if (formRef.current) {
			const formData = new FormData(formRef.current)
			const formValues = Object.fromEntries(formData.entries())
			updateItem({
				variables: {
					id,
					...formValues,
				},
			})
		}
	}

	return (
		<div>
			{/* @FIXME validation */}
			{/* {error && <p>'All field must be filled!!!'</p>} */}
			{loading && <p>'Submitting...'</p>}
			{error && <p>`Submission error! ${error.message}`</p>}
			<button
				tabIndex={0}
				onClick={handleClick}
				className={`${btn.btnSuccess} ${btn.btnLg}`}
				disabled={loading}
			>
				{lngPath.updateBtn}
			</button>
		</div>
	)
}
