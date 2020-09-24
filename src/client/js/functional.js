import { postReq } from "./postReq"

const postData = async function (url, data) {
	const response = await fetch(url, postReq(data))

	try {
		const dataReciever = await response.json()
		//add proper error checkers
	} catch (error) {
		//handle the error properly
		console.log(error, "error")
	}
}

/* TODO here:
- Collect data from fields on click
*/
