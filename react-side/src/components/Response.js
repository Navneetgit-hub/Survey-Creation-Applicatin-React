import React, { useEffect, useState } from 'react'
import { useParams} from "react-router-dom"
import axios from 'axios';
import './Response.css';


function Response() {
  const location = useParams();
  const[data,setdata] = useState([])
  const surveyname = location.name;
  console.log(surveyname)
  const url = "http://localhost:9000/getresponse"
  
  
  useEffect(() => {
    //Runs only on the first render
    axios.post(url, {
      sname: surveyname
    }).then(res => {
      setdata(res.data)
  })
  }, []);

  return (
    <div id="response-div">
      <h1> {surveyname}</h1>
      <ul>
      {data && data.length > 0 && data.map((obj, index)=>(
        <li>{obj.users}</li>
    ))} 
      </ul>
    </div>
  )
}

export default Response