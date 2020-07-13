/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?APPID=f74f095c47d9d48e184d7a29c9fffe1e&units=imperial&';
const apiKey = 'f74f095c47d9d48e184d7a29c9fffe1e'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//To fetch the weather
const fetchWeather = async (baseURL, zip, api) => {
    const url = `${baseURL}zip=${zip}`;
    const res = await fetch(url);
    try {
      let userData = await res.json();
      console.log(userData);
      return userData
    } catch (error) {
      console.log("error", error);
    }
  }


//post received and user data to server
  const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        date: data.date,
        temp: data.temp,
        content: data.content
      })
    })
  
    try {
      const newData = await req.json();
      console.log(newData);
      return newData;
    }
    catch (error) {
      console.log(error);
    }
  };
  
  const update = async () => {
    const req = await fetch('/all');
    try {
      const allData = await req.json()
      console.log(allData);
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = (1.8*(allData.temp - 273) + 32).toFixed(1)
      document.getElementById('content').innerHTML = allData.content;
    }
    catch (error) {
      console.log('error', error);
    }
  };

//The Event handlers
const clickGenerate = async () => {
    const newZip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    const form = document.getElementsByTagName('form')
    fetchWeather(baseURL, newZip, apiKey)
      .then(function (userData) {
        postData('/add', {date: newDate, temp: userData.main.temp, content})
      }).then(function (newData) {
        update()
      })
  }

// Event handler for when you click generate button
const generate = document.getElementById('generate')
generate.addEventListener('click', clickGenerate)