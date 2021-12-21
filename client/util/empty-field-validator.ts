export function isEmptyFieldValidator(obj: any) {
	for (const key in obj) {
		if (obj[key] === '') {
			return true
		}
	}

	return false
}
