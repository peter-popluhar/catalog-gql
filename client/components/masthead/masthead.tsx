import mastHead from './masthead.module.scss'

type Props = {
	title: string
	subtitle?: string
}

export default function MastHead({title, subtitle}: Props) {
	return (
		<header className={mastHead.mastHead}>
			<h1>{title}</h1>
			{subtitle && <h2 className='text--md'>{subtitle}</h2>}
		</header>
	)
}
