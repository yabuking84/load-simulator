import axios from "axios"
import url from "./url"


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



export default async function() {
  try { 
    // console.log(`URL: ${url}`);

    axios.interceptors.request.use(startInterceptor,isError)
    axios.interceptors.response.use(endInterceptor,isError)
    const res = await axios.get(url) as Res
    console.log(`Status: ${res.status} | Duration: ${res.duration }ms`);
    // console.log(`Time Start: ${res.config.metadata.startTime}`);
    // console.log(`Time End: ${res.config.metadata.endTime}`);
    // console.log(`Duration: ${res.duration }ms`);
    process.exitCode = 0;    
  } catch (error: any) {
    console.log();
    console.error("ERROR: "+error.message);
    console.error("ERROR RESPONSE: ",error.response);
    console.log();
  }
}