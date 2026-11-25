import React, { useEffect, useState } from 'react'
import "./App.css"


import searchicon from "./assets/search.png";
import sunicon from "./assets/sun.png";
import windicon from "./assets/wind.png";
import humicon from "./assets/Humidity Icon.png";
import rainicon from "./assets/rain.png";
import drizzleicon from "./assets/Drizzle Icon.png";
import cloudicon from "./assets/cloud.png"
import snowicon from "./assets/snow.png"



const Weatherdetails = ({icon ,temp,city,country,lat,log,humitity,wind}) => {
  return (
    <>
        <div className="image">
      <img src={icon} alt="Sun" />
    </div>
    <div className='temp'>{temp}°C</div>
    <div className='location'>{city}</div>
    <div className='country'>{country}</div>
    <div className='cord'>
      <div> 
        <span className='lat'>latitude </span>
        <span>{lat}</span> 
      </div>

        <div> 
        <span className='log'>longitude</span>
        <span>{log}</span>
      </div>
    </div>
      
    <div className='dada-container'>

      <div className='element'>
        <img src={humicon } alt="humitity" className='icon' />
        <div className='data'>
          <div className='humpercentage'>{humitity}%</div>
          <div className='text'>Humidity</div>
        </div>
      </div>
        <div className='element'>
        <img src={windicon } alt="wind" className='icon' />
        <div className='data'>
          <div className='humpercentage'>{wind} km/h</div>
          <div className='text'>WindSpeed</div>
        </div>
      </div>
    </div>
    
    </>


  );
};



const App = () => {

  let Api_Key="636478713315e759d72c2f8d05d3f36a"

  const[text,settext]= useState("chennai");
  const [icon,seticon]=useState(snowicon);
  const[temp ,setemp]=useState(0);
  const[city,setcity]=useState("chennai");
  const [country,setcountry]= useState("in")
  const [lat,setlat]= useState(0);
  const [log,setlog]= useState(0);

  const[humitity,sethumidity]= useState(0);
  const[wind,setwind]= useState(0);

const[loading,setloading]=useState(false)
const[citynotfound,setcitynotfound]=useState(false)
const[ error,seterror]=useState(null);
const WeatherIconMap ={
  "01d":sunicon,
  " 01n":sunicon,
   "02d":cloudicon,
   "02n":cloudicon,
   "03d":drizzleicon,
   "03n":drizzleicon,
   "04d":drizzleicon,
   "05d":drizzleicon,
   "05n":drizzleicon,
   "09d":rainicon,
   "09n":rainicon,
   "10d":rainicon,
   "10n":rainicon,
   "12d":snowicon,
   "12n":snowicon,
   "13d":snowicon,
   "13n":snowicon
}

  const search =async ( ) =>{
    setloading(true);

  // let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}i&appid=${Api_Key}&units=metric`
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${text.trim()}&appid=${Api_Key}&units=metric`;
console.log("Request URL:", url);

try{


let res = await fetch(url);
let data = await res.json();

// console.log(data);
if (!res.ok) {
  console.log("Search text:", text);
  console.log("API response:", data);
  setcitynotfound(true);
  setloading(false);
  return;
}
sethumidity(data.main.humidity);
setwind(data.wind.speed);
setemp(Math.floor(data.main.temp));
setcity(data.name);

setcountry(data.sys.country);
setlat(data.coord.lat);
setlog(data.coord.lon);
const WeatherIconCode =data.weather[0].icon;
seticon(WeatherIconMap  [WeatherIconCode] || sunicon);
setcitynotfound(false);




} catch (error) {
  console.error("An error occurred:", error.message);
  setcitynotfound(true);
  seterror("An Error occured while fetcing the weather data")
} finally {
  setloading(false);
}



};

const handlecity=(e)=> {
  settext(e.target.value);
};

const handlekeydown=( e)=>{
  if(e.key === "enter") {
    search( )
  }
}

useEffect (function ( ){
  search( );
},[ ]);
 
  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          className="cityinput"
          placeholder="Search city"
          onChange={handlecity}
          value={text}
          onKeyDown={handlekeydown}

        />
        <div className='search_icon'  onClick={()=>
          search() }>
            <img
          src={searchicon}
          alt="Search"
          className="search-icon"
        /> 
        </div>
       
      </div>

   {!loading && !citynotfound &&   <Weatherdetails icon={ icon}  temp={temp}
       city={city}   country={country}  lat={lat  }  log={log}  humitity={humitity}  wind={wind}/>}

      { loading &&<div className='loading'>Loading.....</div>}
      {Error && <div className='errormsg'>{error}</div>}
       {citynotfound &&<div className='citynotfound'>City Not Found</div>}

       <p className='copyright'>
        Designed by <span>rams </span>
       </p>
    </div>
  );
};

export default App;
