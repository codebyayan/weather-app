const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "584946e77emshe708aa30097a9d8p168589jsn860d144f02c2",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

const getWeather = (city) => {
  cityName.innerHTML = city;
  const url =
    "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city;
  fetch(url, options)
    .then((response) => response.json())
    .then((res) => {
      console.log("res", res);
      temp.innerHTML = res.temp;
      temp.innerHTML = `${res.temp} <sup style="left:-11px">°</sup> <span style="position:relative;left:-14px">c</span> `;
      var tempIcon = document.getElementsByClassName("tempIcon");
      Array.from(tempIcon).map(function (tempIcon) {
        tempIcon.innerHTML = `${getWeatherIcon(res.temp)}`;
      });
      //  tempIcon.innerHTML = `${getWeatherIcon(86)}`;
      feels_like.innerHTML = res.feels_like;
      humidity.innerHTML = res.humidity;
      min_temp.innerHTML = res.min_temp;
      max_temp.innerHTML = res.max_temp;
      wind_speed.innerHTML = res.wind_speed;
      wind_degrees.innerHTML = res.wind_degrees;
      sunrise.innerHTML = formatTime(res.sunrise);
      sunset.innerHTML = formatTime(res.sunset);
    });
};

function getWeatherIcon(temperature) {
    console.log("temp",temperature)
  if (parseInt(temperature) >= 85) {
    return `<i class="bi bi-brightness-high" style="font-size:4em; color:#e8e805" ></i>`;
  } else if (temperature >= 70) {
    return `<i class="bi bi-cloudy" style="font-size:4em; color:#412f17"></i>`;
  } else if (temperature >= 50) {
    return `<i class="bi bi-cloud-drizzle" style="font-size:4em; color:deepskyblue"></i>`;
  } else if (temperature >= 32) {
    return `<i class="bi bi-snow2"style="font-size:4em; color:slategray"></i>`;
  } else if (temperature >= 20) {
    return `<i class="bi bi-wind"style="font-size:4em; color:cadetblue"></i>`;
  } else if (temperature >= 10) {
    return `<i class="bi bi-cloud-sleet"style="font-size:4em; color:mediumaquamarine"></i>`;
  } else {
    return `<i class="bi bi-cloud-fog2-fill"style="font-size:4em; color:#e8e805"></i>`;
  }
}

formatTime = (d) => {
  const date = new Date(d * 1000); // Convert from seconds to milliseconds

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour format to 12-hour format
  const formattedHours = hours % 12 || 12;

  const formattedTime = `${formattedHours}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;

  return formattedTime;
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(queryValue.value);
  queryValue.value = ""
});

queryValue.addEventListener('keyup', function(e) {
   
    submit.disabled = e.target.value.length > 0 ? false :true;
});
submit.disabled = queryValue.value.length > 0 ? false :true;

getWeather("Delhi");
