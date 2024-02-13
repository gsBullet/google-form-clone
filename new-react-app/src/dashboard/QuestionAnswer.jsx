import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Button, Typography, Radio } from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";

const QuestionAnswer = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState([]);

  const questionReplay = async () => {
    try {
      let response = await fetch(`http://localhost:5000/get-notice/${id}`, {
        method: "GET",
        headers: {
          Authorization: "myworld " + window.localStorage.getItem("gsmToken"),
        },
      });
      let data = await response.json();
      // console.log(data);
      setNotice(data);
    } catch (error) {
      console.error("Error fetching notice data:", error);
      // Handle error
    }
  };
  useEffect(() => {
    questionReplay();
  });

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <Typography>{notice.document_name}</Typography>
            <Typography>{notice.doc_desc}</Typography>
          </div>
          {/* {notice.questions.map((que, qIndex) => (
            <div className="card-body" key={qIndex}>
              <Typography>{que.questionText}</Typography>
              <Typography>
                {que.options.map((op, index) => (
                  <div key={index}>
                    <div className="d-flex">
                      <div>

                     {op}
                      
                    </div>
                  </div>
                  </div>
                ))}
              </Typography>
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
};

export default QuestionAnswer;
