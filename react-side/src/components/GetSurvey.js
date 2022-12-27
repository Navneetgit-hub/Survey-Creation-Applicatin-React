import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./GetSurvey.css";

function GetSurvey() {
  const [id, setId] = useState([]);

  const location = useParams();
  const surveyname = location.new;

  const url = "http://localhost:9000/matching";
  function getId() {
    axios
      .post(url, {
        sname: surveyname,
      })
      .then((res) => {
        setId(res.data);
      });
  }

  const url1 = "http://localhost:9000/response";
  function submit() {
    axios
      .post(url1, {
        sname: surveyname,
      })
      .then((res) => {
        console.log(res.data);
      });
  }
  useEffect((res, req) => {
    getId();
  }, []);

  return (
    <div id="survey-div">
      <h1>{surveyname}</h1>
      {id &&
        id.length > 0 &&
        id.map((obj, index) => (
          <div>
            <div>
              <h2>{obj.question}</h2>
              {/* <h2>{console.log(obj.answer)}</h2> */}
              <h2>{console.log(obj.answer)}</h2>
            </div>
            {Array.isArray(obj.answer) ? (
              <>
                <div>
                  <input type="checkbox" />
                  <label class="container">
                    {obj.answer[0]}
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div>
                  <input type="checkbox" />
                  <label class="container">
                    {obj.answer[1]}

                    <span class="checkmark"></span>
                  </label>
                </div>
                <div>
                  <input type="checkbox" />
                  <label class="container">
                    {obj.answer[2]}

                    <span class="checkmark"></span>
                  </label>
                </div>
                <div>
                  <input type="checkbox" />
                  <label class="container">
                    {obj.answer[3]}
                    <span class="checkmark"></span>
                  </label>
                </div>
              </>
            ) : (
              <>
                <input type="text" />
              </>
            )}
          </div>
        ))}
      <div id="survey-submit">
        <Link onClick={submit} to="/submit">
          Submit
        </Link>
      </div>
    </div>
  );
}

export default GetSurvey;


