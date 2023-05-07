import {TIMEOUT_PERIOD} from "./config.js";

export const timeout = function(sec){
    return new Promise(
      function(_, reject){
        setTimeout(function(){
           reject(new Error (`Timed out; the request took too much time`)) 
        },sec * 1000)
  
      }
    )
  }

export const getJSON = async function (url) {
    try {
      const res = await Promise.race([fetch(url), timeout(TIMEOUT_PERIOD)]);    
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`There is an error...${data.message} 🔥🔥🔥🔥🔥`)
      }
      return data;
    } catch (err) {
      throw err
    } 
  }

  export const sendJSON = async function (url, uploadData) {
    try {
      fetchDetails = fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(uploadData)
      })
      const res = await Promise.race([fetchDetails, timeout(TIMEOUT_PERIOD)]);    
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`There is an error...${data.message} 🔥🔥🔥🔥🔥`)
      }
      return data;
    } catch (err) {
      throw err
    } 
  }