


function getweather(lat,long) {
    let api_url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&exclude=hourly,daily&appid=6090a0c3c0ba8ad5f1c59b776c43013c'

 fetch (api_url).then(function(response) {
     response.json().then(function(data) {
        console.log(data)
     });
    });
}

getweather('33.44','-94.04');