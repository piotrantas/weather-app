var adress = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=';
var APIkey = '&APPID=b262d26e70a8314da4e70371cca9cbe6';
var days = '&units=metric&cnt=7';
var icon = 'http://openweathermap.org/img/w/'

window.onload = getCoordinates();

function getCoordinates() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(findWeatherByPosition, alertError);
    } else {
        alert('Your browser does not support geolocation ');
        console.log(error)
    }
};


function alertError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert('You refused permission for geolocation, give city name by yourself');
            console.log(error);
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Coordinate information are available, give city name by yourself');
            break;
        case error.TIMEOUT:
            alert('Timeout waiting for the coordinates, give city name by yourself');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred, give city name by yourself');
            break;
    }
};


var button = document.getElementById('search');
button.addEventListener('click', function() {
  findWeatherByInput();
});

var input = document.getElementById('looking-name').onkeypress = function(e) {
	if(e.keyCode==13)
		findWeatherByInput()
}


function findWeatherByInput() {
  var input = document.getElementById('looking-name').value;
  // if (!input.length) input = 'wroclaw';
  var url = adress + input + days + APIkey;
    var ask = new XMLHttpRequest();
    ask.open('GET', url);
    ask.addEventListener('load', function() {
      var resp = JSON.parse(ask.response);
      showWeather(resp);
    });
  ask.send();
};

function findWeatherByPosition(position) {
  var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + days + APIkey;
    var ask = new XMLHttpRequest();
    ask.open('GET', url);
    ask.addEventListener('load', function() {
      var resp = JSON.parse(ask.response);
      showWeather(resp);
    });
  ask.send();
};


function showWeather(resp) {
  console.log(resp);
  function getWindDirection() {
    var windDir = resp.list['0'].deg;
    var wind = '';
    if (windDir < 90) { wind = 'N-NE' } 
    else if ( (windDir >= 90) && (windDir < 180) ) { wind = 'E-SE' }
    else if ( (windDir >= 180) && (windDir < 270) ) { wind = 'S-SW' }
    else { wind = 'W-NW' }
    return wind
  };
  function getRain() {
    var rainResp = resp.list['0'].rain;
    var rain = '';
    if ( !rainResp ) { rain = '0'}
    else { rain = resp.list['0'].rain }
    return rain;
  };
  function getSnow() {
    var snowResp = resp.list['0'].snow ;
    var snow = '';
    if ( !snowResp ) { snow = '0'}
    else { snow = resp.list['0'].snow }
    return snow;
  };

  function getDayName(n) {
    var utcSeconds = n;
    var d = new Date(0); 
    d.setUTCSeconds(utcSeconds);
    var weekday = new Array("sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday");
    return weekday[d.getUTCDay()];
  };

  document.getElementById('city').innerHTML = resp.city.name;
  
  document.getElementById('current-day-temperature').innerHTML = resp.list['0'].temp.day + '*C';
  document.getElementById('current-day-weather').innerHTML = resp.list['0'].weather['0'].description;
  document.getElementById('current-day-humidity').innerHTML = 'Humidity: ' + resp.list['0'].humidity + '%';
  document.getElementById('current-day-pressure').innerHTML = 'Pressure: ' + resp.list['0'].pressure + 'hPa';
  document.getElementById('current-day-wind-direction').innerHTML = 'wind derection: ' + getWindDirection(resp);
  document.getElementById('current-day-wind-speed').innerHTML = 'Wind speed is ' + resp.list['0'].speed + 'mps';
  document.getElementById('current-day-rain').innerHTML = 'Rain volume: ' + getRain(resp) + ' mm';
  document.getElementById('current-day-snow').innerHTML = 'Snow volume: ' + getSnow(resp) + ' mm';
  document.getElementById('current-day-icon').setAttribute('src', icon + resp.list['0'].weather['0'].icon + '.png');
  
  document.getElementById('day-one-icon').setAttribute('src', icon + resp.list['1'].weather['0'].icon + '.png');
  document.getElementById('day-two-icon').setAttribute('src', icon + resp.list['2'].weather['0'].icon + '.png');
  document.getElementById('day-tree-icon').setAttribute('src', icon + resp.list['3'].weather['0'].icon + '.png');
  document.getElementById('day-four-icon').setAttribute('src', icon + resp.list['4'].weather['0'].icon + '.png');
  document.getElementById('day-five-icon').setAttribute('src', icon + resp.list['5'].weather['0'].icon + '.png');
  document.getElementById('day-six-icon').setAttribute('src', icon + resp.list['6'].weather['0'].icon + '.png');

  document.getElementById('day-one-temperature').innerHTML = resp.list['1'].temp.day + '*C';
  document.getElementById('day-two-temperature').innerHTML = resp.list['2'].temp.day + '*C';
  document.getElementById('day-tree-temperature').innerHTML = resp.list['3'].temp.day + '*C';
  document.getElementById('day-four-temperature').innerHTML = resp.list['4'].temp.day + '*C';
  document.getElementById('day-five-temperature').innerHTML = resp.list['5'].temp.day + '*C';
  document.getElementById('day-six-temperature').innerHTML = resp.list['6'].temp.day + '*C';
  
  document.getElementById('day-one').innerHTML = getDayName(resp.list['1'].dt);
  document.getElementById('day-two').innerHTML = getDayName(resp.list['2'].dt);
  document.getElementById('day-tree').innerHTML = getDayName(resp.list['3'].dt);
  document.getElementById('day-four').innerHTML = getDayName(resp.list['4'].dt);
  document.getElementById('day-five').innerHTML = getDayName(resp.list['5'].dt);
  document.getElementById('day-six').innerHTML = getDayName(resp.list['6'].dt);

};