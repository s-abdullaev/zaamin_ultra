const translations = {
  ru: {
    noData: 'N/A',
    airQuality: 'Качество воздуха:',
    aboveSeaLevel: 'м над уровнем море',
    temperature: 'Температура',
    humidity: 'Bлажность',
    precipitation: 'Ocaдки',
    windspeed: 'Скорость ветра',
    winddirection: 'Направление ветра',
    atmPressure: 'Атм. давление',
    today: 'Сегодня',
    tomorrow: 'Завтра',
    startFinish: 'Старт / Финиш',
    bakhmal: 'Бахмал (25км)',
    aqi: {
      good: 'Xopoшoe',
      moderate: 'Умеренное',
      unhealthy: 'Нездаровое',
      unhealthyForSG: 'Нездаровое',
      veryUnhealthy: 'Вредное',
      hazardous: 'Опасное',
    },
    weekday: {
      sun: 'Bc',
      mon: 'Пн',
      tue: 'Вт',
      wed: 'Cp',
      thu: 'Чт',
      fri: 'Пт',
      sat: 'Cб',
    },
  },
  uz: {
    noData: 'N/A',
    airQuality: 'Havo sifati:',
    aboveSeaLevel: 'm dengiz sathidan',
    temperature: 'Harorat',
    humidity: 'Nisbiy namlik',
    precipitation: "Yog'ingarchilik",
    windspeed: 'Shamol tezligi',
    winddirection: "Shamol yo'nalishi",
    atmPressure: 'Atm. bosimi',
    today: 'Bugun',
    tomorrow: 'Ertaga',
    startFinish: 'Start / Finish',
    bakhmal: 'Baxmal (25km)',
    aqi: {
      good: 'Yaxshi',
      moderate: "O'rtacha",
      unhealthyForSG: "Nosog'lom",
      unhealthy: "Nosog'lom",
      veryUnhealthy: 'Zararli',
      hazardous: 'Xavfli',
    },
    weekday: {
      sun: 'Yak',
      mon: 'Du',
      tue: 'Se',
      wed: 'Chor',
      thu: 'Pay',
      fri: 'Ju',
      sat: 'Sha',
    },
  },
  en: {
    noData: 'N/A',
    airQuality: 'Air quality:',
    aboveSeaLevel: 'm above sea level',
    temperature: 'Air temperature',
    humidity: 'Humidity',
    precipitation: 'Precipitation',
    windspeed: 'Wind speed',
    winddirection: 'Wind direction',
    atmPressure: 'Atm. pressure',
    today: 'Today',
    tomorrow: 'Tomorrow',
    startFinish: 'Start / Finish',
    bakhmal: 'Bakhmal (25km)',
    aqi: {
      good: 'Good',
      moderate: 'Moderate',
      unhealthyForSG: 'Unhealthy',
      unhealthy: 'Unhealthy',
      veryUnhealthy: 'Very Unhealthy',
      hazardous: 'Hazardous',
    },
    weekday: {
      sun: 'Sun',
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat',
    },
  },
};
const AQI = {
  default: {
    description: `No Data`,
    description_full: `No Data.`,
    img: 'ic-face-gray.svg',
    backgroundColor: '#90ee92',
    fontColor: '#607631',
    iLow: 0,
    iHigh: 50,
  },
  good: {
    description: `Good`,
    description_full: `Enjoy your usual outdoor activities.`,
    img: 'ic-face-green.svg',
    backgroundColor: '#90ee92',
    fontColor: '#607631',
    iLow: 0,
    iHigh: 50,
  },
  moderate: {
    description: `Moderate`,
    description_full: `May cause minor breathing discomfort to sensitive people.`,
    img: 'ic-face-yellow.svg',
    backgroundColor: 'rgba(255,242,71,0.8)',
    fontColor: '#8C6C1D',
    iLow: 51,
    iHigh: 100,
  },
  unhealthyForSG: {
    description: `Unhealthy for Sensitive Groups`,
    description_full: `May cause breathing discomfort to people with lung disease such as asthma, and discomfort to people with heart disease, children and older adults.`,
    img: 'ic-face-orange.svg',
    backgroundColor: '#f5bc99',
    fontColor: '#974A20',
    iLow: 101,
    iHigh: 150,
  },
  unhealthy: {
    description: `Unhealthy`,
    description_full: `May cause breathing discomfort to people on prolonged exposure, and discomfort to people with heart disease.`,
    img: 'ic-face-red.svg',
    backgroundColor: 'rgb(239,146,146)',
    fontColor: '#942431',
    iLow: 151,
    iHigh: 200,
  },
  veryUnhealthy: {
    description: `Very Unhealthy`,
    description_full: `May cause respiratory illness to the people on prolonged exposure. Effect may be more pronounced in people with lung and heart diseases.`,
    img: 'ic-face-purple.svg',
    backgroundColor: '#b290ee',
    fontColor: '#543B63',
    iLow: 201,
    iHigh: 300,
  },
  hazardous: {
    description: `Hazardous`,
    description_full: `May cause respiratory impact even on healthy people, and serious health impacts on people with lung/heart disease.`,
    img: 'ic-face-maroon.svg',
    backgroundColor: 'rgb(227,162,162)',
    fontColor: '#573344',
    iLow: 301,
    iHigh: 400,
  },
};

const tashkentCityToken = 'Bearer 19|LPFBmcdmbXhR02izysneHsgkMz4ObWC9DJQw81Cc';
const tashkentCityStationId = '036112022';
const zaminToken = 'Bearer 23|Sgu8NP1r1jt7t6qrd8ilI8f58MBdJC0UajPE0pgu';
const zaminStationId = '068062023';
const zaminStationIdEnd = '12345678';
const comAmudarIO = {
  language: 'en',
  _dustColor: '',
  _forecastData: [],
  _headers_tashkent: {
    Authorization: tashkentCityToken,
    'Content-Type': 'application/json;charset=utf-8',
  },
  _headers_zamin: {
    Authorization: zaminToken,
    'Content-Type': 'application/json;charset=utf-8',
  },

  start: async function () {
    this.setTitle();
    const forecastData = await this.getForecastData();
    this._forecastData = forecastData;
    const currentForecastStart = forecastData.find(
      (d) => new Date(d.time).getHours() === new Date().getHours()
    );
    const forecastFinish = await this.getForecastFinishData();
    const currForecastFinish = forecastFinish.find(
      (d) => new Date(d.time).getHours() === new Date().getHours()
    );
    const meteostationData = await this.getMeteostationData();
    const first4Days = this.getLast4Days(forecastData);
    // const temperatures = this.getTemperature(forecastData);
    const [deviceStart, deviceEnd] = await this.getDevice();
    const imgSrcStart = this.getImgSrc(
      currentForecastStart.pictocode,
      currentForecastStart.isdaylight
    );
    const imgSrcFinish = this.getImgSrc(
      currForecastFinish.pictocode,
      currForecastFinish.isdaylight
    );

    this.setASL(deviceStart, deviceEnd);

    this.addMeteostationData(meteostationData[meteostationData.length - 1]);
    this.addMeteostationFinishData(currForecastFinish);

    // this.addCurrentAQI(meteostationData);
    // this.addCurrentAQIFinish(currForecastFinish);
    this.setCurrentTemperature(meteostationData, imgSrcStart);
    this.setCurrentTemperatureFinish(forecastFinish, imgSrcFinish);
    this.generateForecastCards(first4Days);
  },

  setTitle: function () {
    const titleStart = document.querySelector('.title-start');
    const titleEnd = document.querySelector('.title-end');
    titleStart.innerHTML = translations[this.language].startFinish;
    titleEnd.innerHTML = translations[this.language].bakhmal;
  },

  getImgSrc: function (pictocode, isDayLight) {
    pictocode = pictocode < 10 ? '0' + pictocode : pictocode;
    const src = pictocode + (isDayLight ? '_day.svg' : '_night.svg');
    return 'assets/meteoblue_weather_pictograms_2016-11-04/svg/' + src;
  },

  getDevice: async function () {
    const response = await fetch('https://oxus.amudar.io/api/meteoDevices', {
      method: 'GET',
      headers: this._headers_zamin,
    });
    const devices = (await response.json()).data;
    return devices;
  },

  getMeteostationData: async function () {
    const resp = await fetch('https://oxus.amudar.io/api/influx/meteostation', {
      method: 'POST',
      headers: this._headers_tashkent,
      body: JSON.stringify({
        stationId: '068062023',
        start: '-1d',
        end: 'now()',
        interval: '1h',
      }),
    });
    const data = await resp.json();
    return data.data;
  },

  getForecastData: async function () {
    const response = await fetch(
      'https://oxus.amudar.io/api/forecasts/device/068062023',
      {
        method: 'GET',
        headers: this._headers_zamin,
      }
    );
    const responseJSON = await response.json();
    const data = responseJSON.data;
    return data;
  },

  getForecastFinishData: async function () {
    const response = await fetch(
      'https://oxus.amudar.io/api/forecasts/device/01234567',
      {
        method: 'GET',
        headers: this._headers_zamin,
      }
    );
    const responseJSON = await response.json();
    const data = responseJSON.data;
    return data;
  },

  getLast4Days: function (data) {
    const day = 24;
    const currentHour = new Date().getHours();
    const targetDate = Date.now() - (Date.now() % (3600 * 1000));
    const now = data.findIndex(
      (obj) => new Date(obj.time).valueOf() === targetDate
    );
    const the17th = data.findIndex((d) => {
      const date = new Date(d.time);
      return date.getDate() === 17 && date.getHours() === currentHour;
    });
    const the18th = data.findIndex((d) => {
      const date = new Date(d.time);
      return date.getDate() === 18 && date.getHours() === currentHour;
    });
    const filtered = [data[now], data[now + day], data[the17th], data[the18th]];
    return filtered;
  },

  setASL: function (deviceStart, deviceEnd) {
    const aslStartContainer = document.querySelector('.asl-start');
    aslStartContainer.innerHTML =
      deviceStart.asl + translations[this.language].aboveSeaLevel;

    const aslEndContainer = document.querySelector('.asl-end');
    aslEndContainer.innerHTML =
      deviceEnd.asl + translations[this.language].aboveSeaLevel;
  },

  setCurrentTemperature: function (data, imgSrc) {
    const currentTemperature = Math.round(data[data.length - 1].AirT);
    const temperatures = data.map((d) => d.AirT);
    const max = Math.max(...temperatures);
    const min = Math.min(...temperatures);
    const picElement = document
      .querySelector('.meteostation-start')
      .querySelector('.pictocode')
      .querySelector('img');
    picElement.setAttribute('src', imgSrc);
    document.querySelector('.max-temp').innerHTML = Math.round(max) + '°C';
    document.querySelector('.min-temp').innerHTML = Math.round(min) + '°C';
    document.querySelector('.temperature-big').innerHTML =
      currentTemperature + '°';
  },

  setCurrentTemperatureFinish: function (data, imgSrc) {
    const todayData = data.slice(0, 24);
    const currentTemperature = todayData.find(
      (d) => new Date(d.time).getHours() === new Date().getHours()
    ).temperature;
    const temperatures = todayData.map((d) => d.temperature);
    const max = Math.max(...temperatures);
    const min = Math.min(...temperatures);
    const picElement = document
      .querySelector('.meteostation-finish')
      .querySelector('.pictocode')
      .querySelector('img');
    picElement.setAttribute('src', imgSrc);

    document
      .querySelector('.meteostation-finish')
      .querySelector('.max-temp').innerHTML = Math.round(max) + '°C';
    document
      .querySelector('.meteostation-finish')
      .querySelector('.min-temp').innerHTML = Math.round(min) + '°C';
    document
      .querySelector('.meteostation-finish')
      .querySelector('.temperature-big').innerHTML =
      Math.round(currentTemperature) + '°';
  },

  generateForecastCards: function (data) {
    const forecastStartContainer = document.querySelector('.forecast-start');
    const forecastEndContainer = document.querySelector('.forecast-end');
    let lastAQI = 0;
    let lastDust = 0;
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      lastAQI =
        i > 0
          ? data[i - 1].airqualityindex
            ? data[i - 1].airqualityindex
            : lastAQI
          : 0;
      lastDust = i > 0 ? (data[i - 1].pm25 ? data[i - 1].pm25 : lastDust) : 0;
      let forecastCard = document.createElement('div');
      forecastCard.setAttribute('class', 'forecast-card col-12 col-sm-6 p-1');
      forecastCard.innerHTML = `<div class="card-wrapper">
          ${this.getDateElement(element.time, i)}
          ${this.getTemperatureElement(element.time)}
          ${this.getWindElement(element)}
          ${this.getUVElement(element.uvindex)}
          ${this.getRainElement(element)}
          ${this.getAQIElement(element.airqualityindex, lastAQI)}
          ${this.getDustElement(element.pm25, lastDust)}
          </div>
        `;
      if (i == 0 || i == 1) {
        forecastStartContainer.append(forecastCard);
      } else {
        forecastEndContainer.append(forecastCard);
      }
    }
  },

  getTemperature: function (data) {
    const day = 24;
    let temperatures = [];
    for (let i = 0; i < 96; i += day) {
      const dayData = data.slice(i, i + day).map((d) => d.temperature);
      const hot = Math.max(...dayData);
      const cold = Math.min(...dayData);
      temperatures.push({ hot, cold });
    }
    return temperatures;
  },

  getDay: function (time) {
    const dayNumber = new Date(time).getDay();
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const dayTranslated = translations[this.language].weekday[days[dayNumber]];
    return dayTranslated;
  },

  getDate: function (time) {
    const dateObj = new Date(time);
    const day = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    const years = dateObj.getFullYear();
    month = month < 10 ? '0' + month : month;
    return `${day}.${month}.${years}`;
  },

  getWindDirections: function (degree) {
    if (degree >= 0 && degree <= 22.5) {
      return '↓';
    }
    if (degree >= 22.5 && degree <= 67.5) {
      return '<b>↙</b>';
    }
    if (degree >= 67.5 && degree <= 112.5) {
      return '←';
    }
    if (degree >= 112.5 && degree <= 157.5) {
      return '<b>↖</b>';
    }
    if (degree >= 157.5 && degree <= 202.5) {
      return '↑';
    }
    if (degree >= 202.5 && degree <= 247.5) {
      return '<b>↗</b>';
    }
    if (degree >= 247.5 && degree <= 292.5) {
      return '→';
    }
    if (degree >= 292.5 && degree <= 337.5) {
      return '<b>↘</b>';
    }
    if (degree >= 337.5 && degree <= 360) {
      return '↓';
    }
  },

  addMeteostationData: function (data, imgSrc) {
    const temperatureElem = document.querySelector('.c-temperature');
    temperatureElem.innerHTML = `<span>
      <i class="fa-solid fa-temperature-three-quarters me-2"></i>${
        translations[this.language].temperature
      }</span
    ><span class="temperature-value value">${Math.round(data.AirT)}°C</span>`;

    const humidityElem = document.querySelector('.c-humidity');
    humidityElem.innerHTML = `<span
      ><i class="fa-solid fa-droplet me-2"></i>${
        translations[this.language].humidity
      }</span
    ><span class="humidity-value value">${Math.round(data.AirH)}%</span>`;

    const rainElem = document.querySelector('.c-rain');
    rainElem.innerHTML = `<span><i class="fa-solid fa-cloud-rain me-2"></i>${
      translations[this.language].precipitation
    }</span
      ><span class="rain-value value">${Math.round(data.Rain)}mm</span>`;

    const windspeedElem = document.querySelector('.c-windspeed');
    windspeedElem.innerHTML = `<span
      ><i class="fa-solid fa-wind me-2"></i>${
        translations[this.language].windspeed
      }</span
    ><span class="windspeed-value value">${Math.round(data.WindMax)}m/c</span>`;
    const winddirectionElem = document.querySelector('.c-winddirection');
    winddirectionElem.innerHTML = `<span
      ><i class="fa-solid fa-location-arrow me-2"></i>${
        translations[this.language].winddirection
      }</span
    ><span class="winddirection-value value">${this.getWindDirections(
      data.WindD
    )}</span>`;

    const atmPressureElem = document.querySelector('.c-air-pressure');
    atmPressureElem.innerHTML = `<span
      ><i class="fa-solid fa-arrow-down me-2"></i>${
        translations[this.language].atmPressure
      }</span
    ><span class="atm-pressure-value value">${
      Math.round(data.AirP) + 'mBar'
    }</span>`;
  },

  addMeteostationFinishData: function (data) {
    const temperatureElem = document
      .querySelector('.meteostation-finish')
      .querySelector('.c-temperature');
    temperatureElem.innerHTML = `<span>
      <i class="fa-solid fa-temperature-three-quarters me-2"></i>${
        translations[this.language].temperature
      }</span
    ><span class="temperature-value value">${Math.round(
      data.temperature
    )}°C</span>`;

    const humidityElem = document
      .querySelector('.meteostation-finish')
      .querySelector('.c-humidity');
    humidityElem.innerHTML = `<span
      ><i class="fa-solid fa-droplet me-2"></i>${
        translations[this.language].humidity
      }</span
    ><span class="humidity-value value">${Math.round(
      data.relativehumidity
    )}%</span>`;

    const rainElem = document
      .querySelector('.meteostation-finish')
      .querySelector('.c-rain');
    rainElem.innerHTML = `<span><i class="fa-solid fa-cloud-rain me-2"></i>${
      translations[this.language].precipitation
    }</span
      ><span class="rain-value value">${Math.round(
        data.precipitation
      )}mm</span>`;

    const windspeedElem = document
      .querySelector('.meteostation-finish')
      .querySelector('.c-windspeed');
    windspeedElem.innerHTML = `<span
      ><i class="fa-solid fa-wind me-2"></i>${
        translations[this.language].windspeed
      }</span
    ><span class="windspeed-value value">${Math.round(
      data.windspeed
    )}m/c</span>`;
    const winddirectionElem = document
      .querySelector('.meteostation-finish')
      .querySelector('.c-winddirection');
    winddirectionElem.innerHTML = `<span
      ><i class="fa-solid fa-location-arrow me-2"></i>${
        translations[this.language].winddirection
      }</span
    ><span class="winddirection-value value">${this.getWindDirections(
      data.winddirection
    )}</span>`;

    const atmPressure = this.convertPressureByAltitude(
      data.sealevelpressure,
      1949,
      data.temperature
    );

    const atmPressureElem = document
      .querySelector('.meteostation-finish')
      .querySelector('.c-air-pressure');
    atmPressureElem.innerHTML = `<span
      ><i class="fa-solid fa-arrow-down me-2"></i>${
        translations[this.language].atmPressure
      }</span
    ><span class="atm-pressure-value value">${
      Math.round(atmPressure) + 'mBar'
    }</span>`;
  },

  getDateElement: function (time, i) {
    let html = `<span>${this.getDate(time)}</span>`;
    if (i === 0) html = `<span>${translations[this.language].today}</span>`;
    if (i === 1) html = `<span>${translations[this.language].tomorrow}</span>`;
    const dateElemContainer = document.createElement('div');
    dateElemContainer.classList.add('date-part', 'part');
    dateElemContainer.innerHTML = html;
    return dateElemContainer.outerHTML;
  },

  getTemperatureMaxMin: function (time) {
    const day = 24;
    const date = new Date(time).getDate();
    const dayStartIndex = this._forecastData.findIndex(
      (d) => new Date(d.time).getDate() === date
    );
    const dayForecast = this._forecastData.slice(
      dayStartIndex,
      dayStartIndex + day
    );
    const temperatures = dayForecast.map((d) => d.temperature);
    const hot = Math.max(...temperatures);
    const cold = Math.min(...temperatures);
    return { hot, cold };
  },

  getTemperatureElement: function (time) {
    const temperatureContainer = document.createElement('div');
    temperatureContainer.classList.add('temperature-part', 'part');
    const temperature = this.getTemperatureMaxMin(time);

    const hotDiv = document.createElement('div');
    hotDiv.style = `background-color: yellow`;
    hotDiv.innerHTML = Math.round(temperature.hot) + ' <span>°C</span>';
    temperatureContainer.append(hotDiv);

    const coldDiv = document.createElement('div');
    coldDiv.style = `color: white; background-color: lightblue`;
    coldDiv.innerHTML = Math.round(temperature.cold) + ' <span>°C</span>';
    temperatureContainer.append(coldDiv);
    return temperatureContainer.outerHTML;
  },

  getWindElement: function (element) {
    const windContainer = document.createElement('div');
    windContainer.classList.add('wind-part', 'part');
    const windElement = document.createElement('div');
    windElement.innerHTML =
      this.getWindDirections(element.winddirection) +
      ' ' +
      Math.round(element.windspeed) +
      ' <span>м/c</span>';
    windContainer.append(windElement);
    return windContainer.outerHTML;
  },

  getWindSpeedElement: function (windspeed) {
    const windContainer = document.createElement('div');
    windContainer.classList.add('wind-part', 'part');
    const windElement = document.createElement('div');
    windElement.innerHTML = Math.round(windspeed) + ' <span>м/c</span>';
    windContainer.append(windElement);
    return windContainer.outerHTML;
  },

  getWindDirectionElement: function (winddirection) {
    const windDrctElemContainer = document.createElement('div');
    windDrctElemContainer.classList.add('wind-direction-part', 'part');

    const windDrctElement = document.createElement('div');
    windDrctElement.innerHTML = this.getWindDirections(winddirection);
    windDrctElemContainer.append(windDrctElement);
    return windDrctElemContainer.outerHTML;
  },

  getUVElement: function (uvindex) {
    const uvElemContainer = document.createElement('div');
    uvElemContainer.classList.add('uv-part', 'part');

    const uvElement = document.createElement('div');
    uvElement.innerHTML = '☀️ ';
    if (uvindex > 11) {
      uvElement.innerHTML += '11+';
      uvElement.style = 'background-color: #998CFF';
    } else {
      uvElement.innerHTML += uvindex + '<span>/11 UV</span>';
    }
    uvElemContainer.append(uvElement);
    return uvElemContainer.outerHTML;
  },

  getRainElement: function (element) {
    const precipitation = element.precipitation;
    const rainElemContainer = document.createElement('div');
    rainElemContainer.classList.add('rain-part', 'part');

    const rainElement = document.createElement('div');
    if (precipitation > 0) {
      const isBelowOne = precipitation < 1;
      rainElement.innerHTML = `<img src="assets/raindrop.png">${
        isBelowOne ? '< 1' : precipitation
      }<span>mm</span>`;
    } else {
      rainElement.innerHTML = '<img src="assets/raindrop.png"> -';
    }
    rainElement.innerHTML += ` (${element.precipitation_probability}%)`;
    rainElemContainer.append(rainElement);
    return rainElemContainer.outerHTML;
  },

  getHumidityElement: function (relativehumidity) {
    const humidityContainer = document.createElement('div');
    humidityContainer.classList.add('humidity-part', 'part');

    const humidityElement = document.createElement('div');
    humidityElement.innerHTML =
      Math.round(relativehumidity) + ' <span>%</span>';
    humidityContainer.append(humidityElement);
    return humidityContainer.outerHTML;
  },

  getAQIElement: function (airqualityindex, lastAQI) {
    const aqi = airqualityindex || lastAQI;
    const status = this.getStatusByForAQI(aqi);
    const config = AQI[status];
    let imgSrc = config.img;
    let bgColor = config.backgroundColor;
    this._dustColor = config.fontColor;

    const aqiContainer = document.createElement('div');
    aqiContainer.classList.add('aqi-part', 'part');

    const aqiValue = document.createElement('div');
    aqiValue.classList.add('aqi-value');
    aqiValue.innerHTML = `<span class='aqi-icon'>AQI</span>${aqi}`;
    aqiValue.style = `color: ${this._dustColor};`;

    const aqiImgWrapper = document.createElement('div');
    aqiImgWrapper.classList.add('aqi-img-wrapper');
    aqiImgWrapper.style = `background-color: ${bgColor};`;
    aqiImgWrapper.innerHTML = `<img src='assets/${imgSrc}'>`;
    aqiContainer.append(aqiValue);
    aqiContainer.append(aqiImgWrapper);
    return aqiContainer.outerHTML;
  },

  getDustElement: function (dustV, lastDust) {
    const dust = dustV || lastDust;
    const dustElemContainer = document.createElement('div');
    dustElemContainer.classList.add('dust-part', 'part');
    const dustElement = document.createElement('div');
    dustElement.style = `color: ${this._dustColor}`;
    dustElement.innerHTML =
      "<span class='aqi-icon'>PM2.5</span>" +
      Math.round(dust) +
      ' <span>μg/m3</span>';
    dustElemContainer.append(dustElement);
    return dustElemContainer.outerHTML;
  },

  addCurrentAQI: function (data) {
    const categoryRange = {
      good: 83,
      moderate: 66.4,
      unhealthyForSG: 49.8,
      unhealthy: 33.2,
      veryUnhealthy: 16.6,
      hazardous: 0,
    };

    const readings = data.map((d) => d['PM2.5']);
    const aqiService = new ComputingAQIService();
    const lastPM25 = readings[readings.length - 1];
    const category = aqiService.getCategory(lastPM25, 'PM2.5');
    const breakpoints = aqiService.breakpoints['PM2.5'][category];
    const AQIPercentage =
      categoryRange[category] +
      (1 -
        (lastPM25 - breakpoints.cLow) /
          (breakpoints.cHigh - breakpoints.cLow)) *
        16.6;
    const aqiPercentElem = document.querySelector('.aqi-percentage');
    aqiPercentElem.innerHTML = `<div class="aqi-percentage">
      <b>${
        translations[this.language].airQuality
      }</b> <span class="aqi-percent">${Math.round(AQIPercentage)}%</span>
    </div>`;
    const aqiStatusElem = document.querySelector('.aqi-status');
    aqiStatusElem.style = `color: ${AQI[category].fontColor}; background-color: ${AQI[category].backgroundColor}`;
    aqiStatusElem.innerHTML = translations[this.language].aqi[category];

    const pm25 = document.querySelector('.pm25-start');
    pm25.innerHTML = '<span>PM 2.5: </span>' + lastPM25 + ' <span>μg/m3</span>';
    pm25.style = `color: ${AQI[category].fontColor};`;

    const config = AQI[category];

    let imgSrc = config.img;
    let bgColor = config.backgroundColor;
    this._dustColor = config.fontColor;

    const aqiImgContainer = document.querySelector('.aqi-img');
    aqiImgContainer.innerHTML = `<img src='assets/${imgSrc}'>`;
    aqiImgContainer.style = `background-color: ${bgColor};`;
  },

  addCurrentAQIFinish: function (data) {
    const lastPM25 = Math.round(data.pm25);
    const categoryRange = {
      good: 83,
      moderate: 66.4,
      unhealthyForSG: 49.8,
      unhealthy: 33.2,
      veryUnhealthy: 16.6,
      hazardous: 0,
    };

    const aqiService = new ComputingAQIService();
    const category = aqiService.getCategory(lastPM25, 'PM2.5');
    const breakpoints = aqiService.breakpoints['PM2.5'][category];
    const AQIPercentage =
      categoryRange[category] +
      (1 -
        (lastPM25 - breakpoints.cLow) /
          (breakpoints.cHigh - breakpoints.cLow)) *
        16.6;
    const aqiPercentElem = document
      .querySelector('.meteostation-finish')
      .querySelector('.aqi-percentage');
    aqiPercentElem.innerHTML = `<div class="aqi-percentage">
      <b>${
        translations[this.language].airQuality
      }</b> <span class="aqi-percent">${Math.round(AQIPercentage)}%</span>
    </div>`;
    const aqiStatusElem = document
      .querySelector('.meteostation-finish')
      .querySelector('.aqi-status');
    aqiStatusElem.style = `color: ${AQI[category].fontColor}; background-color: ${AQI[category].backgroundColor}`;
    aqiStatusElem.innerHTML = translations[this.language].aqi[category];

    const pm25 = document.querySelector('.pm25-end');
    pm25.innerHTML = '<span>PM 2.5: </span>' + lastPM25 + ' <span>μg/m3</span>';
    pm25.style = `color: ${AQI[category].fontColor};`;

    const config = AQI[category];
    let imgSrc = config.img;
    let bgColor = config.backgroundColor;
    this._dustColor = config.fontColor;

    const aqiImgContainer = document
      .querySelector('.meteostation-finish')
      .querySelector('.aqi-img');
    aqiImgContainer.innerHTML = `<img src='assets/${imgSrc}'>`;
    aqiImgContainer.style = `background-color: ${bgColor};`;
  },

  getStatusByForAQI: function (aqi) {
    let status = '';
    if (aqi > 0) {
      switch (true) {
        case aqi < 50:
          status = 'good';
          break;
        case aqi < 100:
          status = 'moderate';
          break;
        case aqi < 150:
          status = 'unhealthyForSG';
          break;
        case aqi < 200:
          status = 'unhealthy';
          break;
        case aqi < 300:
          status = 'veryUnhealthy';
          break;
        case aqi < 500:
          status = 'hazardous';
          break;
        default:
          status = 'unknown';
      }
    } else {
      status = 'unknown';
    }
    return status;
  },

  convertPressureByAltitude: function (
    seaLevelPressure,
    altitude,
    temperatureCelsius
  ) {
    const g0 = 9.80665; // acceleration due to gravity at sea level (m/s^2)
    const M = 0.0289644; // molar mass of Earth's air (kg/mol)
    const R = 8.31432; // universal gas constant (N·m/(mol·K))
    const lapseRate = 0.0065; // temperature lapse rate (K/m)

    // Convert temperature from Celsius to Kelvin
    const altitudeTemperature = temperatureCelsius + 273.15;

    // Calculate the pressure at the given altitude
    const pressure =
      seaLevelPressure *
      Math.pow(
        1 - (lapseRate * altitude) / altitudeTemperature,
        (g0 * M) / (R * lapseRate)
      );

    return pressure;
  },
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const lang = urlParams.get('lang') || 'en';
comAmudarIO.language = lang;
comAmudarIO.start();

// don't touch this
class ComputingAQIService {
  breakpoints = {
    'PM1.0': {
      good: {
        cLow: 0,
        cHigh: 10,
        description: `Good`,
      },
      moderate: {
        cLow: 10.1,
        cHigh: 30.4,
        description: `Moderate`,
      },
      unhealthyForSG: {
        cLow: 30.5,
        cHigh: 50.4,
        description: `Unhealthy for Sensitive Groups`,
      },
      unhealthy: {
        cLow: 50.5,
        cHigh: 140.4,
        description: `Unhealthy`,
      },
      veryUnhealthy: {
        cLow: 140.5,
        cHigh: 200.4,
        description: `Very Unhealthy`,
      },
      hazardous: {
        cLow: 200.5,
        cHigh: 400.4,
        description: `Hazardous`,
      },
    },
    'PM2.5': {
      good: {
        cLow: 0,
        cHigh: 12,
        description: `Good`,
      },
      moderate: {
        cLow: 12.1,
        cHigh: 35.4,
        description: `Moderate`,
      },
      unhealthyForSG: {
        cLow: 35.5,
        cHigh: 55.4,
        description: `Unhealthy for Sensitive Groups`,
      },
      unhealthy: {
        cLow: 55.5,
        cHigh: 150.4,
        description: `Unhealthy`,
      },
      veryUnhealthy: {
        cLow: 150.5,
        cHigh: 250.4,
        description: `Very Unhealthy`,
      },
      hazardous: {
        cLow: 250.5,
        cHigh: 500.4,
        description: `Hazardous`,
      },
    },
    PM10: {
      good: {
        cLow: 0,
        cHigh: 54,
        description: `Good`,
      },
      moderate: {
        cLow: 55,
        cHigh: 154,
        description: `Moderate`,
      },
      unhealthyForSG: {
        cLow: 155,
        cHigh: 254,
        description: `Unhealthy for Sensitive Groups`,
      },
      unhealthy: {
        cLow: 255,
        cHigh: 354,
        description: `Unhealthy`,
      },
      veryUnhealthy: {
        cLow: 355,
        cHigh: 424,
        description: `Very Unhealthy`,
      },
      hazardous: {
        cLow: 425,
        cHigh: 604,
        description: `Hazardous`,
      },
    },
    AQI: {
      good: {
        description: `Good`,
        description_full: `Enjoy your usual outdoor activities.`,
        img: 'ic-face-green.svg',
        backgroundColor: '#90ee92',
        fontColor: '#607631',
        iLow: 0,
        iHigh: 50,
      },
      moderate: {
        description: `Moderate`,
        description_full: `May cause minor breathing discomfort to sensitive people.`,
        img: 'ic-face-yellow.svg',
        backgroundColor: 'rgba(255,242,71,0.8)',
        fontColor: '#8C6C1D',
        iLow: 51,
        iHigh: 100,
      },
      unhealthyForSG: {
        description: `Unhealthy for Sensitive Groups`,
        description_full: `May cause breathing discomfort to people with lung disease such as asthma, and discomfort to people with heart disease, children and older adults.`,
        img: 'ic-face-orange.svg',
        backgroundColor: '#f5bc99',
        fontColor: '#974A20',
        iLow: 101,
        iHigh: 150,
      },
      unhealthy: {
        description: `Unhealthy`,
        description_full: `May cause breathing discomfort to people on prolonged exposure, and discomfort to people with heart disease.`,
        img: 'ic-face-red.svg',
        backgroundColor: 'rgb(239,146,146)',
        fontColor: '#942431',
        iLow: 151,
        iHigh: 200,
      },
      veryUnhealthy: {
        description: `Very Unhealthy`,
        description_full: `May cause respiratory illness to the people on prolonged exposure. Effect may be more pronounced in people with lung and heart diseases.`,
        img: 'ic-face-purple.svg',
        backgroundColor: '#b290ee',
        fontColor: '#543B63',
        iLow: 201,
        iHigh: 300,
      },
      hazardous: {
        description: `Hazardous`,
        description_full: `May cause respiratory impact even on healthy people, and serious health impacts on people with lung/heart disease.`,
        img: 'ic-face-maroon.svg',
        backgroundColor: 'rgb(227,162,162)',
        fontColor: '#573344',
        iLow: 301,
        iHigh: 400,
      },
    },
    CO2: {
      good: {
        description: `Good`,
        cLow: 0,
        cHigh: 750,
      },
      moderate: {
        description: `Moderate`,
        cLow: 751,
        cHigh: 1500,
      },
      unhealthyForSG: {
        description: `Unhealthy for Sensitive Groups`,
        cLow: 1501,
        cHigh: 2250,
      },
      unhealthy: {
        description: `Unhealthy`,
        cLow: 2251,
        cHigh: 3000,
      },
      veryUnhealthy: {
        description: `Very Unhealthy`,
        cLow: 3001,
        cHigh: 3750,
      },
      hazardous: {
        description: `Hazardous`,
        cLow: 3751,
        cHigh: 5000,
      },
    },
    co: {
      good: {
        description: `Good`,
        cLow: 0,
        cHigh: 4.4,
      },
      moderate: {
        description: `Moderate`,
        cLow: 4.5,
        cHigh: 9.4,
      },
      unhealthyForSG: {
        description: `Unhealthy for Sensitive Groups`,
        cLow: 9.5,
        cHigh: 12.4,
      },
      unhealthy: {
        description: `Unhealthy`,
        cLow: 12.5,
        cHigh: 15.4,
      },
      veryUnhealthy: {
        description: `Very Unhealthy`,
        cLow: 15.5,
        cHigh: 30.4,
      },
      hazardous: {
        description: `Hazardous`,
        cLow: 30.5,
        cHigh: 50.4,
      },
    },
    so2: {
      good: {
        description: `Good`,
        cLow: 0,
        cHigh: 35,
      },
      moderate: {
        description: `Moderate`,
        cLow: 36,
        cHigh: 75,
      },
      unhealthyForSG: {
        description: `Unhealthy for Sensitive Groups`,
        cLow: 76,
        cHigh: 185,
      },
      unhealthy: {
        description: `Unhealthy`,
        cLow: 186,
        cHigh: 304,
      },
      veryUnhealthy: {
        description: `Very Unhealthy`,
        cLow: 305,
        cHigh: 604,
      },
      hazardous: {
        description: `Hazardous`,
        cLow: 605,
        cHigh: 1004,
      },
    },
    no2: {
      good: {
        description: `Good`,
        cLow: 0,
        cHigh: 53,
      },
      moderate: {
        description: `Moderate`,
        cLow: 54,
        cHigh: 100,
      },
      unhealthyForSG: {
        description: `Unhealthy for Sensitive Groups`,
        cLow: 101,
        cHigh: 360,
      },
      unhealthy: {
        description: `Unhealthy`,
        cLow: 361,
        cHigh: 649,
      },
      veryUnhealthy: {
        description: `Very Unhealthy`,
        cLow: 650,
        cHigh: 1249,
      },
      hazardous: {
        description: `Hazardous`,
        cLow: 1250,
        cHigh: 2049,
      },
    },
  };

  constructor() {}

  getDescriptionFor1h(parameter, value) {
    const currentParameter = this.breakpoints[parameter];
    for (const currentParameterKey in currentParameter) {
      if (currentParameter.hasOwnProperty(currentParameterKey)) {
        const breakpoint = currentParameter[currentParameterKey];
        if (value >= breakpoint.cLow && breakpoint.cHigh >= value) {
          return breakpoint.description;
        }
      }
    }
    return '';
  }

  getAQIndex(readings, pollutant) {
    const average = this.calculateAverage(readings);
    const category = this.getCategory(average, pollutant);
    const iLow = this.breakpoints.AQI[category].iLow;
    const iHigh = this.breakpoints.AQI[category].iHigh;
    const cLow = this.breakpoints[pollutant][category].cLow;
    const cHigh = this.breakpoints[pollutant][category].cHigh;
    const index =
      Math.round(((iHigh - iLow) * (average - cLow)) / (cHigh - cLow)) + iLow;
    return index;
  }

  getIndexDescription(index) {
    const aqiCategory = this.getAQICategory(index);
    return this.breakpoints.AQI[aqiCategory].description;
  }

  getAQIDescriptions(aqi) {
    const aqiCategory = this.getAQICategory(aqi);
    if (aqi === 0) {
      return {
        description: `No data`,
        description_full: '',
        img: 'ic-face-gray.svg',
        aqi: 0,
        backgroundColor: 'lightgray',
        fontColor: 'gray',
      };
    }
    const general = {
      description: this.breakpoints.AQI[aqiCategory].description,
      description_full: this.breakpoints.AQI[aqiCategory].description_full,
      img: this.breakpoints.AQI[aqiCategory].img,
      aqi: aqi,
      backgroundColor: this.breakpoints.AQI[aqiCategory].backgroundColor,
      fontColor: this.breakpoints.AQI[aqiCategory].fontColor,
    };
    return general;
  }

  getAQICategory(index) {
    let category = '';
    const currentBreakpoint = this.breakpoints.AQI;
    const good = currentBreakpoint.good;
    const moderate = currentBreakpoint.moderate;
    const unhealthyForSG = currentBreakpoint.unhealthyForSG;
    const unhealthy = currentBreakpoint.unhealthy;
    const veryUnhealthy = currentBreakpoint.veryUnhealthy;
    const hazardous = currentBreakpoint.hazardous;

    if (good.iLow <= index && index <= good.iHigh) {
      category = 'good';
    } else if (moderate.iLow <= index && index <= moderate.iHigh) {
      category = 'moderate';
    } else if (unhealthyForSG.iLow <= index && index <= unhealthyForSG.iHigh) {
      category = 'unhealthyForSG';
    } else if (unhealthy.iLow <= index && index <= unhealthy.iHigh) {
      category = 'unhealthy';
    } else if (veryUnhealthy.iLow <= index && index <= veryUnhealthy.iHigh) {
      category = 'veryUnhealthy';
    } else if (hazardous.iLow <= index && index <= hazardous.iHigh) {
      category = 'hazardous';
    }
    return category;
  }

  getCategory(average, pollutant) {
    let category = '';
    const currentBreakpoint = this.breakpoints[pollutant];
    const good = currentBreakpoint.good;
    const moderate = currentBreakpoint.moderate;
    const unhealthyForSG = currentBreakpoint.unhealthyForSG;
    const unhealthy = currentBreakpoint.unhealthy;
    const veryUnhealthy = currentBreakpoint.veryUnhealthy;
    const hazardous = currentBreakpoint.hazardous;
    if (good.cLow <= average && average <= good.cHigh) {
      category = 'good';
    } else if (moderate.cLow <= average && average <= moderate.cHigh) {
      category = 'moderate';
    } else if (
      unhealthyForSG.cLow <= average &&
      average <= unhealthyForSG.cHigh
    ) {
      category = 'unhealthyForSG';
    } else if (unhealthy.cLow <= average && average <= unhealthy.cHigh) {
      category = 'unhealthy';
    } else if (
      veryUnhealthy.cLow <= average &&
      average <= veryUnhealthy.cHigh
    ) {
      category = 'veryUnhealthy';
    } else if (hazardous.cLow <= average && average <= hazardous.cHigh) {
      category = 'hazardous';
    }
    return category;
  }

  calculateAverage(readings) {
    const avg = Math.round(
      readings.reduce((s, reading) => s + reading) / readings.length
    );
    return avg;
  }
}
