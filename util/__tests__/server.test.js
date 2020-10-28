"use strict"

const getRandomInt = require("./../../src/server/helpers")

test("getRandomInt: expected random Int between range", () => {
	const max = Math.random() * 10
	const result = getRandomInt(max)

	expect(result).toBeGreaterThanOrEqual(0)
	expect(result).not.toBeNull()
	expect(result).toBeDefined()
	expect(result).toBeTruthy()
	expect(result).toBeLessThanOrEqual(max)
})
