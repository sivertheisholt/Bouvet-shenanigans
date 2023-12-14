export const getCurrentDateTime = () => {
	const now = new Date()

	const year = now.getFullYear()
	const month = (now.getMonth() + 1).toString().padStart(2, "0") // getMonth() is zero-based
	const day = now.getDate().toString().padStart(2, "0")

	const hours = now.getHours().toString().padStart(2, "0")
	const minutes = now.getMinutes().toString().padStart(2, "0")
	const seconds = now.getSeconds().toString().padStart(2, "0")

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}
