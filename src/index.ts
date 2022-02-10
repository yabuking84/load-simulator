import url from "./url"
import axios, { AxiosRequestConfig } from "axios"
import minimist from "minimist"


function startInterceptor (config: any) {
  // console.log("startInterceptor config = ",config);
  config.metadata = { startTime: new Date() }
  return config;
};

function endInterceptor (response: any) {
  // console.log("endInterceptor response = ",response);
  response.config.metadata.endTime = new Date()
  response.duration = response.config.metadata.endTime - response.config.metadata.startTime
  return response;
};

function isError(error: any){
  throw error;
}

interface Res {
  status: number,
  duration: any,
  config: {
    metadata : {
      startTime: any,
      endTime: any
    }
  }
}

(async()=>{
  try { 
    axios.interceptors.request.use(startInterceptor,isError)
    axios.interceptors.response.use(endInterceptor,isError)
    const res = await axios.get(url) as Res
    console.log(`URL: ${url}`);
    console.log(`Status: ${res.status}`);
    // console.log(`Time Start: ${res.config.metadata.startTime}`);
    // console.log(`Time End: ${res.config.metadata.endTime}`);
    console.log(`Duration: ${res.duration }ms`);
    console.log();
  } catch (error: any) {
    console.error("ERROR: "+error.message);
    console.log();
  }
})()