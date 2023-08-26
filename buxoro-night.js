// agar nimadir o'xshamasa o'zgartirib qo'yasiz
import translations from './locale/translations.js';

const buxoroToken = 'Bearer 17|CYwuDZ94aBsuk1baS06icjkKMr2UYFEbDvqnHc16';
const buxoroStationId = '066012023';
const comAmudarIO = {
  language: 'en',
  _dustColor: '',
  _forecastData: [],
  _headers_buxoro: {
    Authorization: buxoroToken,
    'Content-Type': 'application/json;charset=utf-8',
  },

  start: async function () {
    this.setTitle();
    const forecastData = await this.getForecastData();
    this._forecastData = forecastData;
    const currentForecastStart = forecastData.find(
      (d) => new Date(d.time).getHours() === new Date().getHours()
    );
    const meteostationData = await this.getMeteostationData();
    const device = (await this.getDevice()).find(
      (d) => d.serial_number === '066012023'
    );
    const imgSrcStart = this.getImgSrc(
      currentForecastStart.pictocode,
      currentForecastStart.isdaylight
    );
    this.setPictocodeDescription(currentForecastStart.pictocode);
    this.setASL(device);
    this.addMeteostationData(
      meteostationData[meteostationData.length - 1],
      currentForecastStart
    );
    this.setCurrentTemperature(meteostationData, imgSrcStart);
  },

  setTitle: function () {
    const titleStart = document.querySelector('.title-start');
    titleStart.innerHTML = translations[this.language].startFinish;
  },

  setPictocodeDescription: function (pictocode) {
    const pictocodeDescription = document
      .querySelector('.pictocode-description')
      .querySelector('p');
    pictocodeDescription.innerHTML =
      translations[this.language].pictocode[pictocode];
  },

  getImgSrc: function (pictocode, isDayLight) {
    pictocode = pictocode < 10 ? '0' + pictocode : pictocode;
    const src = pictocode + (isDayLight ? '_day.svg' : '_night.svg');
    return 'assets/meteoblue_weather_pictograms_2016-11-04/svg/' + src;
  },

  getDevice: async function () {
    const response = await fetch('https://oxus.amudar.io/api/meteoDevices', {
      method: 'GET',
      headers: this._headers_buxoro,
    });
    const devices = (await response.json()).data;
    return devices;
  },

  getMeteostationData: async function () {
    const resp = await fetch('https://oxus.amudar.io/api/influx/meteostation', {
      method: 'POST',
      headers: this._headers_buxoro,
      body: JSON.stringify({
        stationId: buxoroStationId,
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
      'https://oxus.amudar.io/api/forecasts/device/' + buxoroStationId,
      {
        method: 'GET',
        headers: this._headers_buxoro,
      }
    );
    const responseJSON = await response.json();
    const data = responseJSON.data;
    return data;
  },

  setASL: function (device) {
    const aslStartContainer = document.querySelector('.asl-start');
    aslStartContainer.innerHTML =
      device.asl + translations[this.language].aboveSeaLevel;
  },

  setCurrentTemperature: function (data, imgSrc) {
    const currentTemperature = Math.round(data[data.length - 1].AirT);
    const temperatures = data.map((d) => d.AirT);
    const max = Math.max(...temperatures);
    const min = Math.min(...temperatures);
    const picElement = document
      .querySelector('.bukhara-wrapper')
      .querySelector('.pictocode')
      .querySelector('img');
    picElement.setAttribute('src', imgSrc);
    document.querySelector('.max-temp').innerHTML = Math.round(max) + '°C';
    document.querySelector('.min-temp').innerHTML = Math.round(min) + '°C';
    document.querySelector('.temperature-big').innerHTML =
      currentTemperature + '°';
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

  addMeteostationData: function (data, forecast) {
    const rainElem = document.querySelector('.c-rain');
    rainElem.innerHTML = `<span><i class="fa-solid fa-cloud-rain me-2"></i>${
      translations[this.language].precipitation
    }</span
        ><span class="rain-value value">${Math.round(data.Rain)}mm</span>`;

    const precipitation_probability = document.querySelector(
      '.c-precipitation-probability'
    );
    precipitation_probability.innerHTML = `<span><i class="fa-solid fa-percentage me-2"></i>${
      translations[this.language].precipitation_probability
    }</span>
    <span class="probability-value value">${Math.round(
      forecast.precipitation_probability
    )}%</span>`;

    const humidityElem = document.querySelector('.c-humidity');
    humidityElem.innerHTML = `<span
        ><i class="fa-solid fa-droplet me-2"></i>${
          translations[this.language].humidity
        }</span
      ><span class="humidity-value value">${Math.round(data.AirH)}%</span>`;

    const windspeedElem = document.querySelector('.c-windspeed');
    windspeedElem.innerHTML = `<span
        ><i class="fa-solid fa-wind me-2"></i>${
          translations[this.language].windspeed
        }</span
      ><span class="windspeed-value value">${Math.round(
        data.WindMax
      )}m/c</span>`;

    const winddirectionElem = document.querySelector('.c-winddirection');
    winddirectionElem.innerHTML = `<span
        ><i class="fa-solid fa-location-arrow me-2"></i>${
          translations[this.language].winddirection
        }</span
      ><span class="winddirection-value value">${this.getWindDirections(
        data.WindD
      )}</span>`;

    const uvindexElem = document.querySelector('.c-uvindex');
    uvindexElem.innerHTML = `<span
        ><i class="fa-solid fa-sun me-2"></i>${
          translations[this.language].uvindex
        }</span
      ><span class="atm-pressure-value value">${
        Math.round(forecast.uvindex) || 0
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
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const lang = urlParams.get('lang') || 'en';
comAmudarIO.language = lang;
comAmudarIO.start();
