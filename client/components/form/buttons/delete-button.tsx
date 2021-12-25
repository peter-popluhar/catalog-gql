import btn from './../../global/buttons.module.scss'
import {formCopy} from '../../../copy/form'
import {useSettingsContext} from '../../../context/settings-context'
import {gql, useMutation} from '@apollo/client'
import {useRouter} from 'next/router'

const DELETE_ITEM = gql`
	mutation DeleteItem($id: String!) {
		DeleteItem(id: $id) {
			id
		}
	}
`

type Props = {
	id: string
}

export default function DeleteButton({id}: Props) {
	const router = useRouter()
	const [deleteItem, {data, loading, error}] = useMutation(DELETE_ITEM, {
		variables: {
			id,
		},
		onCompleted({ loading, error }) {
			if (!loading && !error) {
				router.push('/items')
			}
		  }
	})

	const {lng} = useSettingsContext()
	const lngPath = formCopy?.[lng]

	const handleClick = (e) => {
		e.preventDefault()
		deleteItem()
	}

	if (loading) return <p>'Submitting...'</p>
	if (error) return <p>`Submission error! ${error.message}`</p>

	return (
		<div>
			<button
				tabIndex={0}
				onClick={handleClick}
				className={`${btn.btnDelete} ${btn.btnLg}`}
				disabled={loading}
			>
				{lngPath.deleteBtn}
			</button>
		</div>
	)
}
