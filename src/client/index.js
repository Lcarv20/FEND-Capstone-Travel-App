import { removePreloadClass, printData, deleteEvent } from "./js/app"
import { printDetails } from "./js/support/printDetails"
import { formDataGetter } from "./js/support/postData"

import "./styles/settings.scss"
import "./styles/styles.scss"

removePreloadClass()
printData()

export { formDataGetter, printDetails, deleteEvent }
