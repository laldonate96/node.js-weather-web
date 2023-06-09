const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(path.join(__dirname, '../public')) // CREATES A PATH TO ANOTHER FOLDER

const app = express() // IT IS THE ONLY FUNCTION THE NPM MODULE HAS
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lucas Aldonate'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Lucas Aldonate'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Lucas Aldonate'
    })
})


app.get('/weather', (req, res) => { // request and response
    const adress = req.query.adress

    if (!adress) { 
        return res.send({ // I USE RETURN TO STOP THE EXECUTION, SO THE CODE BELOW THAT PRINTS ON CONSOLE THE SEARCH DOES NOT EXECUTE AND BREAKS THE PROGRAM
            error: 'You must provide an adress'
        })
    } 

    geocode(adress, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error }) //SHORTHAND METHOD WHEN KEY = VALUE
        } 
    
        forecast(latitude, longitude, (error, forecastData) => { 
            if (error) {
                return res.send({ error })
            }
    
            res.send({
                location,
                forecast: forecastData,
                adress
            })
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ // I USE RETURN TO STOP THE EXECUTION, SO THE CODE BELOW THAT PRINTS ON CONSOLE THE SEARCH DOES NOT EXECUTE AND BREAKS THE PROGRAM
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search) 
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => { // SPECIFIC ERROR IF THE ARTICLE INSIDE HELP IS NOT FOUND
    res.render('404', {
        title: 'Error 404',
        errorText: 'Help article not found',
        name: 'Lucas Aldonate'
    })
})

app.get('*', (req, res) => { // * STANDS FOR ANYTHING THAT HASNT BEEN REFERENCED IN get() BEFORE (IT HAS TO BE AT LAST, VERY IMPORTANT)
    res.render('404', {
        title: 'Error 404',
        errorText: 'Page not found',
        name: 'Lucas Aldonate'
    })
})

app.listen(port, () => { // STARTS UP THE WEB SERVER ON PORT
    console.log('Server is up on port ' + port)
})