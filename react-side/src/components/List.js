import './List.css';
import React, {useEffect, useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import {Link} from "react-router-dom";
const List = ()=> {
    const [surveyName, setSurveyName] = useState([]);
    const fetchData = () => {
        return fetch("http://localhost:9000/adminlist").then((response)=> response.json()).then((data)=>setSurveyName(data))
    }
    useEffect(()=>{
        fetchData();
    }, [])
    const columns = [{
      dataField: 'id',
      text: 'Survey'
    }, {
      dataField: 'name',
      text: 'Status'
    }];
    console.log(surveyName);
    return (
        <div id="list-div">
      <main>
        <h1> Survey List</h1>
        <table className='table table-bordered shadow-lg'>
          <thead className='table-dark'>
            <tr>
              <th>Survey</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {surveyName && surveyName.length > 0 && surveyName.map((obj, index) => (
            <tr>
            <td>
              <Link to={`/response/${obj.surveyname}`}>{obj.surveyname}</Link>
            </td>
            <td className='status-font'>
              {obj.status}
            </td>
            </tr>
          ))}
          </tbody>
        </table>
      </main>
    </div>
    );
}
export default List;