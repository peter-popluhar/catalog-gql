export type Copy = {[lng: string]: {[x: string]: string}}

export type ItemsCopy = {
	[lng: string]: {
		title: string
		notConnected: {[x: string]: string}
		notItems: {[x: string]: string}
		search: {[x: string]: string}
	}
}
