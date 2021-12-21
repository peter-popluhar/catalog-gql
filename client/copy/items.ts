import {Copy, ItemsCopy} from './../types/copy-type'

export const itemsCopy: ItemsCopy = {
	en: {
		title: 'Catalog',
		notConnected: {
			title: 'There was a problem with database connection.',
			subTitle: 'Please try again later, or contact your administrator.',
		},
		notItems: {
			title: 'Looks like there are not any items yet.',
			subTitle: 'Please go to Add item page!',
		},
		search: {
			label: 'Type to filter items',
			placeholder: 'search',
		},
	},
	sw: {
		title: 'Katalogi',
		notConnected: {
			title: 'Kulikuwa na tatizo na muunganisho wa hifadhidata.',
			subTitle:
				'Tafadhali jaribu tena baadaye, au wasiliana na msimamizi wako.',
		},
		notItems: {
			title: 'Inaonekana kama bado hakuna bidhaa.',
			subTitle: 'Tafadhali nenda kwenye Ongeza ukurasa wa bidhaa!',
		},
		search: {
			label: 'Chapa kuchuja vitu',
			placeholder: 'tafuta',
		},
	},
}

export const itemCopy: Copy = {
	en: {
		title: 'Editing',
		notExists: 'We are sorry, but this Item Doesnt exists anymore!',
	},
	sw: {
		title: 'Kuhariri',
		notExists: 'Samahani, lakini kipengee hiki hakipo tena!',
	},
}
