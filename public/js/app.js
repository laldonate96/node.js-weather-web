const weatherForm = document.querySelector('form') 
const search = document.querySelector('input') 
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value // GETS WHATEVER THE USER TYPED INSIDE THE INPUT

    messageOne.textContent = 'Loading...' // SETS WHAT THE PARAGRAPH WILL PRINT
    messageTwo.textContent = ''

    fetch('/weather?adress=' + location).then((response) => { // FETCH FROM THE WEBPAGE URL (IF LOCAL localhost:3000, BEFORE THE /weather)
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})