const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")

//Dependecies
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
	res.send("Hurray it works")
})

const port = 8080

app.listen(port, () => {
	console.log("running on port: " + port)
})
