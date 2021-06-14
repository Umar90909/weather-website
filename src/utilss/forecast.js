const request = require('request')
 


const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8d0d306fc72a8a6b3644690c92635ab3&query=' + address + '&units=m'// + latitude + ',' + longitude + '&units=m'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to Weather Service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location! weather-app', undefined)
        } else {
            console.log('It is ' + response.body.current.weather_descriptions + ' in ' + response.body.location.name + ', ' + response.body.location.region + '. It is currently ' + response.body.current.temperature + ' degrees out. And It feelslike ' + response.body.current.feelslike + ' And Humidity is ' + response.body.current.humidity)
            console.log(response.body.current)
            callback(undefined, 'It is ' + response.body.current.weather_descriptions + ' in ' + response.body.location.name + ', ' + response.body.location.region + '.\nIt is currently ' + response.body.current.temperature + ' degrees out. And It feelslike ' + response.body.current.feelslike + ' And Humidity is ' + response.body.current.humidity + ' And Wind Speed is ' + response.body.current.wind_speed +  ' And let us know that is it a day? '+ response.body.current.is_day)
        }
    })
}

module.exports = forecast