import axios from 'axios'
const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '39998c1660eb41fe56a2988fb94d9acf';


const fetchWeather =async(query) =>{
  
    const {data} = await axios.get(URL,{
        params:{
            q:query,
            units: 'metric',
            APPID: API_KEY

        }
    }) ;
 
    return data ;
}


export default fetchWeather ;