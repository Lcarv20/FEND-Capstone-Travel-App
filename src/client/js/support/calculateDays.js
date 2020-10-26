export function calculateDays(date) {
	const timeNow = new Date()
	const dateNow = new Date(
		`${timeNow.getFullYear()}-${timeNow.getMonth() + 1}-${timeNow.getDate()}Z`
	)
	const dateDeparture = new Date(`${date}Z`)

	const missingDays = dateDeparture.getTime() - dateNow.getTime()
	return Math.round(missingDays / (1000 * 3600 * 24))
}
