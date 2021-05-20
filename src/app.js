const path = require('path')
const express = require('express')
//const forecast =require('/forecast')
const hbs = require('hbs')
const geocode = require('./utilss/geocode')
const forecast = require('./utilss/forecast')

const app = express()
const port = process.env.PORT || 3000

//testing git by changing


//Define paths for Express config
const publicFolderPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//console.log(path.join(__dirname, '../public/'))

//setup handerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve.
app.use(express.static(publicFolderPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App!',
        name: 'M. Umar Aman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me!',
        name: 'M.Umar Aman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text!',
        title: 'Help!',
        name: 'M. Umar Aman.'
    })

})

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew',
//         age: 27
//     }, {
//         name: 'Umar'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>Welcome to Sufi Cloth House!</h1>')
// })

app.get('/view-weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an Address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(location, (error, forecastData) => {

            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // const obj = [{
    //     forecast: 'Rainy',
    //     location: 'Faisalabad!',
    //     address: req.query.address
    // }]
    // res.send(obj)
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


// app.com
//app.com/help
//app.com/about

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: ' mvsmkdfmsd',
        errorMessage: 'Page not Found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'M. Umkasn Aman',
        errorMessage: 'Page Not Found!'
    })
})

app.listen(port, () => {
    console.log('Server started on port ' + port)
})