"use strict"
//const removePreloadClass = require("./../../src/client/js/app")

import { postReq } from "./../../src/client/js/support/postReq"

test("postReq: test POST headers", () => {
	let request = postReq({ value: "test" })
	expect(request.method).toBe("POST")
	expect(JSON.parse(request.body)).toMatchObject({ value: "test" })
	expect(JSON.parse(request.body)).toHaveProperty("value")
})
