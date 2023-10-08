export const formattedTelephone = e => {
    let inputValue = e.target.value.replace(/\D/g, "")
    let formattedInputValue = ""
    const { selectionStart } = e.target
    if (["7", "8", "9", "3"].indexOf(inputValue[0]) !== -1) {
        const firstSybmol = (inputValue[0] === "8") ? "8" : `+${inputValue[0]}`
        formattedInputValue = e.target.value = firstSybmol
        if (selectionStart === inputValue.length) {
            const data = e.target.value
            if (data && /\D/g.test(data)) e.target.value = inputValue
        }
        if (inputValue.length > 1) {
            formattedInputValue += " (" + inputValue.substring(1, 4)
        }
        if (inputValue.length >= 5) {
            formattedInputValue += ") " + inputValue.substring(4, 7)
        }
        if (inputValue.length >= 8) {
            formattedInputValue += "-" + inputValue.substring(7, 9)
        }
        if (inputValue.length >= 10) {
            formattedInputValue += "-" + inputValue.substring(9, 11)
        }
    } else {
        formattedInputValue = "+" + inputValue.substring(0, 14)
    }
    const keyDown = (e) => {
        if (e.keyCode === 8 && (e.target.value.length === 2 || e.target.value.length === 1)) {
            e.target.value = ""
        }
    }
    e.target.addEventListener("keydown", keyDown)
    e.target.value = formattedInputValue
    return formattedInputValue
}