const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()
const fetch = require("node-fetch")

//Personal keys and details
const weatherBit = process.env.APIKEY_WEATHERBIT
const pixaBay = process.env.APIKEY_PIXABAY
const userGeonames = process.env.USERNAME_GEONAMES
const port = process.env.PORT

//Dependecies
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static("dist"))

//Middleware Functions
function getCoordinates(countryName) {
	let coordinates = fetch(
		`http://api.geonames.org/searchJSON?q=${countryName}&maxRows=1&username=${userGeonames}`
	)
		.then((data) => data.json())
		.then((data) => {
			return {
				lng: data.geonames[0].lng,
				lat: data.geonames[0].lat,
				country: data.geonames[0].countryName,
			}
		})
		.catch((err) => console.log(err, " Something went wrong"))
	return coordinates
}

function getWeather(timeRemaining, location) {
	let weather = fetch(
		`https://api.weatherbit.io/v2.0/forecast/daily?lat=${location.lat}&lon=${location.lng}&days=${timeRemaining}&key=${weatherBit}`
	)
		.then((data) => data.json())
		.then((data) => data.data[data.data.length - 1].temp)
		.catch((err) => err)
	return weather
}

function getImage(location) {
	const picture = fetch(
		`https://pixabay.com/api/?key=18850791-9fa608d4890e55bca82fbec24&q=${location}&image_type=photo`
	)
		.then((pic) => pic.json())
		.then((pic) => {
			let max = pic.hits.length - 1
			let randomPicNum = getRandomInt(max)
			return pic.hits[randomPicNum]
		})
		.then((randomPic) => randomPic.largeImageURL)
		.catch((err) => {
			console.log("Ups there is no IMG")
			return "https://cdn.pixabay.com/photo/2018/06/27/17/48/fantasy-3502188_960_720.jpg"
		})
	return picture
}

async function dataFetcher(location, timeRemaining) {
	//1- Get the coordinates
	const coordinates = await getCoordinates(location)
	const image = await getImage(location)

	try {
		//2- Request data from weatherBIT API with coordinates
		const weather = await getWeather(timeRemaining, coordinates)
		if (location === "") {
			let err = "error, invalid location"
			throw err
		}
		console.log(`Temperaure in ${location} is: ${weather}C°`)
		return { weather, image }
	} catch (error) {
		console.log(error, "Error connecting with the server")
		return "error"
	}
}

//To randomize images
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max))
}

// ---------------------------

app.post("/dataPost", (req, res) => {
	let { destination, remainingDays } = req.body

	dataFetcher(destination, remainingDays).then((data) => res.send(data))
})

app.listen(port, () => {
	console.log("running on port: " + port)
})
