const weatherForm = document.querySelector('form') 
const search = document.querySelector('input') 
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const userLocation = document.querySelector('#location-button')

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

userLocation.addEventListener('click', () => {
    
    if (!navigator.geolocation) {
        return alert ('Geolocation is not supported.')
    }

    messageOne.textContent = 'Loading...' // SETS WHAT THE PARAGRAPH WILL PRINT
    messageTwo.textContent = ''

    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords. longitude

        fetch(`/positionweather?coords=${latitude},${longitude}`).then((response) => {
            response.json().then((data) => {

                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = 'At your position, the weather is:'
                    messageTwo.textContent = data.forecast
                }
            })
        })
        
    })
})