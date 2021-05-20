const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidW1hcjgxNzciLCJhIjoiY2tvOXh2N2pwMmx2aDJxbnNwYWZ3MG05YSJ9.VjorK8ayKCt6blbcGdMgOA&limit=1'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services. Geocode!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            console.log(response.body.features[0].place_name)
            callback(undefined, {


                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name

            })

        }
    })
}

module.exports = geocode