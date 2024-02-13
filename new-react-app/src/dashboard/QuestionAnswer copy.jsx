import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Button, Typography, Radio } from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";

const QuestionAnswer = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState({});

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
            <h2>{notice.document_name}</h2>
            <p>{notice.doc_desc}</p>
          </div>
          {notice.questions.map((question, qIndex) => (
            <div className="card-body" key={qIndex}>
              <Typography>
                {question?.options?.map((op, index) => (
                  <div key={index}>
                    <div className="d-flex">
                      <div>

                     
                      {question.questionType !== "radio" ? (
                        question.questionType !== "text" ? (
                          <label htmlFor="">
                            <input
                              type={question.questionType}
                              value={op.optionsText}
                              required={question.required}
                              name={qIndex}
                            />
                            {op.optionsText}
                          </label>
                        ) : (
                          <label htmlFor="">
                            <input
                              type={question.questionType}
                              value={op.optionsText}
                              required={question.required}
                              name={qIndex}
                            />
                            {op.optionsText}
                          </label>
                        )
                      ) : (
                        <label htmlFor="">
                          <input
                            type={question.questionType}
                            value={op.optionsText}
                            required={question.required}
                            name={qIndex}
                          />
                          {op.optionsText}
                        </label>
                      )}
                    </div>
                  </div>
                  </div>
                ))}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuestionAnswer;
