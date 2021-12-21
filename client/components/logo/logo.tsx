import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
	return (
		<Link href='/items'>
			<a>
				<Image
					alt='Logo'
					src='/logo.png'
					layout='intrinsic'
					width={130}
					height={25}
				/>
			</a>
		</Link>
	)
}
