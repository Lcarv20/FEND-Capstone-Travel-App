const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()

//Dependecies
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static("dist"))

app.get("/", (req, res) => {
	console.log("Hurray it works")
})

const port = process.env.PORT

app.listen(port, () => {
	console.log("running on port: " + port)
})
