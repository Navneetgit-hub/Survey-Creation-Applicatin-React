const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
var { Client } = require("pg");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Nitin@2229",
  database: "postgres",
});

pool.connect();

app.post("/signin", (req, res) => {
  const user = req.body;
  let insertQuery = `insert into signin(firstname, lastname, email, password, role)
    values('${user.fname}', '${user.lname}', '${user.email}', '${user.password}', '${user.role}') `;

  pool.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insertion was successful");
    } else {
      console.log(err.message);
    }
  });
  pool.end;
});

app.post("/login", (req, res) => {
  const user = req.body;
  const email = user.email;
  const password = user.password;
  const role = user.role;
  console.log(email, password, role);

  let insertQuery = `insert into logins(email)
    values('${user.email}')`;

  pool.query(insertQuery, (err, result) => {
    if (!err) {
      console.log("insertion successfull");
    } else {
      console.log(err.message);
    }
  });
  let searchQuery = `Select count(email) from signin where email = '${email}'`;
  pool.query(searchQuery, (err, result) => {
    if (!err) {
      if (result.rows[0].count == 1) {
        let passQuery = `Select password, role from signin where email = '${email}'`;
        pool.query(passQuery, (err, result1) => {
          let passdb = result1.rows[0].password;
          if (passdb == password) {
            res.send({
              sucess: "True",
              password: result1.rows[0].password,
              role: user.role,
            });
            console.log(res);
          } else {
            res.send({
              sucess: "False",
            });
          }
        });
      }
    } else {
      console.log(err.message);
    }
  });
});


app.get("/list", (req, res) => {
  let selectQuery = `select * from Survey where status = 'Created'`;
  pool.query(selectQuery, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err.message);
    }
  });
  pool.end;
});

app.get("/adminlist", (req, res) => {
  let selectQuery = `select * from Survey`;
  pool.query(selectQuery, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err.message);
    }
  });
  pool.end;
});

app.post("/response", (req, res) => {
  const user = req.body;

  let searchQuery = `SELECT email FROM logins ORDER BY logtime DESC LIMIT 1;`;

  pool.query(searchQuery, (err, result) => {
    if (!err) {
      const user_email = result.rows[0].email;
      let insertQuery = `insert into response(surveyName, users) values('${user.sname}', '${user_email}')`;

      pool.query(insertQuery, (err, result) => {
        if (!err) {
          console.log("insertion successfull");
        } else {
          console.log(err.message);
        }
      });
    } else {
      console.log(err.message);
    }
  });
});

app.get("/users", (req, res) => {
  let selectQuery = `Select firstname, email from signin where role='User'`;
  pool.query(selectQuery, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err.message);
    }
  });
  pool.end;
});

app.post("/getresponse", (req, res) => {
  const user = req.body;

  let selectQuery = `Select distinct users from response where surveyname in ('${user.sname}')`;
  pool.query(selectQuery, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err.message);
    }
  });
  pool.end;
});

app.get("/question", (req, res) => {
  let selectQuery = `Select * from Questions`;
  pool.query(selectQuery, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err.message);
    }
  });
  pool.end;
});

app.post("/drafted", (req, res) => {
  const user = req.body;
  const questions = user.questions;
  const status = user.status;
  const n = questions.length;
  let insertSurvey = `Insert into Survey(surveyname, status) values('${user.surveyname}', '${status}')`;
  pool.query(insertSurvey, (err, result) => {
    if (!err) {
      console.log("insertion successfull");
    } else {
      console.log(err.message);
    }
  });

  let SelectQuery = `Select id from Survey where surveyname='${user.surveyname}'`;
  pool.query(SelectQuery, (err, result) => {
    if (!err) {
      const surveyid = result.rows[0].id;
      for (let i = 0; i < n; i++) {
        let matchInsert = `Insert Into Matching(surveyid, questionid) values('${surveyid}', '${questions[i]}')`;
        pool.query(matchInsert, (err, result) => {
          if (!err) {
            console.log("insertion successfull");
          } else {
            console.log(err.message);
          }
        });
      }
    } else {
      console.log(err.message);
    }
  });
});

app.post("/match", (req, res) => {
  const user = req.body;
  const questions = user.questions;
  const status = user.status;
  const n = questions.length;
  let insertSurvey = `Insert into Survey(surveyname, status) values('${user.surveyname}', '${status}')`;
  pool.query(insertSurvey, (err, result) => {
    if (!err) {
      console.log("insertion successfull");
    } else {
      console.log(err.message);
    }
  });

  let SelectQuery = `Select id from Survey where surveyname='${user.surveyname}'`;
  pool.query(SelectQuery, (err, result) => {
    if (!err) {
      const surveyid = result.rows[0].id;
      for (let i = 0; i < n; i++) {
        let matchInsert = `Insert Into Matching(surveyid, questionid) values('${surveyid}', '${questions[i]}')`;
        pool.query(matchInsert, (err, result) => {
          if (!err) {
            console.log("insertion successfull");
          } else {
            console.log(err.message);
          }
        });
      }
    } else {
      console.log(err.message);
    }
  });
});

app.post("/matching", (req, res) => {
  var Questions = [];
  let ques_ans = [];
  const user = req.body;
  let selectquery = `Select id from Survey where surveyname='${user.sname}'`;
  pool.query(selectquery, (err, result) => {
    if (!err) {
      // res.send(result.rows)
      const qid = result.rows[0].id;
      let matchingSelect = `Select questionid from Matching where surveyid='${qid}'`;
      pool.query(matchingSelect, (err, result1) => {
        if (!err) {
          Questions = result1.rows;
          var qid=[];
          let n = Questions.length;
          for(let i=0; i<n; i++){
              qid.push(Questions[i].questionid)
          }
          let selectQuestions = `Select question,answer from Questions where id in (${qid})`;
          pool.query(selectQuestions, (err, result) => {
            if (!err) {
              res.send(result.rows);
            } else {
              console.log(err.message);
            }
          });
          pool.end;
          
        } else {
          console.log(err.message);
        }
      });
    } else {
      console.log(err.message);
    }
  });
});

app.post("/target", (req, res)=>{
  console.log(req.body.surveyid,req.body.usermail)
  let insertQuery = `Insert into user_survey(surveyid, usermail) values('${req.body.surveyid}', '${req.body.usermail}')`;
  pool.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("inserted")
    } else {
      console.log(err.message);
    }
  });
})

app.listen(9000, (req, res) => {
  console.log("Server is running on the port 9000");
});

