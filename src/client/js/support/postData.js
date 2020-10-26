import { postReq } from "./postReq"
import { calculateDays } from "./calculateDays"
import { printData } from "./../app"

const postData = async function (url, data) {
	const response = await fetch(url, postReq(data))

	try {
		const dataReciever = await response.json()
		return dataReciever
		//add proper error checkers
	} catch (error) {
		//handle the error properly
		console.log(error, "Error connecting with the server")
		alert("Oops! Something went wrong, try again!")
	}
}

function storeData(place, data, departureDate) {
	if (!localStorage.weatherData) {
		localStorage.setItem("weatherData", "[]")
	}
	let dataHolder = JSON.parse(localStorage.getItem("weatherData"))
	let img = data.image
	let weather = data.weather
	dataHolder.push({ place, weather, img, departureDate })
	console.log(dataHolder)
	localStorage.setItem("weatherData", JSON.stringify(dataHolder))
}

function formDataGetter() {
	const destination = document.getElementById("destination").value
	const departureDate = document.getElementById("departureDate").value
	const remainingDays = calculateDays(departureDate)
	console.log(remainingDays)

	if (remainingDays < 0 || remainingDays > 16) {
		alert("It is only possible to calculate within the next 16 days")
		return
	}

	document.getElementsByClassName(
		"result-board"
	)[0].innerHTML = `<h2 class="loading">LOADING...</h2>`
	//TODO: Field checkers
	postData(
		/*devmode*/ "http://localhost:8081/dataPost" /*"http://localhost:8080/dataPost"*/,
		{
			destination,
			remainingDays,
		}
	).then((data) => {
		storeData(destination, data, departureDate)
		printData()
	})
}

export { formDataGetter }
