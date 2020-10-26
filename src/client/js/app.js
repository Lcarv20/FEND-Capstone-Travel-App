import { calculateDays } from "./support/calculateDays"

const headerCard = `
<h2>Your Trips</h2>
<div class="print-btn">
	<i class="fa fa-print" onclick="Client.printDetails()"></i>
</div>`

function removePreloadClass() {
	window.addEventListener("load", function () {
		document.getElementsByTagName("body")[0].classList.remove("preload")
	})
}

function templateCard(weather, location, timeRemaining, imgUrl) {
	const template = `
	<div class="trip">
		<div class="destination-image" style="background-image: url(${imgUrl})"><div class="image-title">${location}</div></div>
	<p class="countdown">In ${timeRemaining} days</p>
	<p class="temperature">${weather}°C</p>
	<button class="del-btn" onClick="Client.deleteEvent(this)"><i class="fa fa-trash"></i> </button>
</div>`

	return template
}

//print from localStorage
function printData() {
	if (!localStorage.weatherData) {
		console.log("Nothing in storage")
		return
	}
	const targetDiv = document.getElementsByClassName("result-board")[0]
	const getLocalStorage = JSON.parse(localStorage.getItem("weatherData"))
	targetDiv.innerHTML = headerCard

	for (let item of getLocalStorage) {
		//console.log(item)
		templateCard
		targetDiv.innerHTML += templateCard(
			item.weather,
			item.place,
			calculateDays(item.departureDate),
			item.img
		)
	}
	console.log("In Storage", getLocalStorage)
}

function delFromStorage(name) {
	let dataHolder = JSON.parse(localStorage.getItem("weatherData"))

	for (let i = 0; i < dataHolder.length; ++i) {
		if (dataHolder[i].place === name) {
			console.log("Object to delete", dataHolder[i])
			dataHolder.splice(i, 1)
			localStorage.setItem("weatherData", JSON.stringify(dataHolder))
			printData()
		}
	}
}

function deleteEvent(e) {
	let temp = e.parentElement.children[0].children[0].innerHTML
	console.log("temp", temp)
	delFromStorage(temp)
}

export { removePreloadClass, printData, deleteEvent }
