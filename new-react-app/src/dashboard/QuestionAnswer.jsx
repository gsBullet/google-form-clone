import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Button, Typography, Radio } from "@mui/material";
import SortTextIcon from "@mui/icons-material/ShortText";
import SortNumericIcon from "@mui/icons-material/NumbersSharp";
import FormControlLabel from "@mui/material/FormControlLabel";

const QuestionAnswer = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState([]);

  const questionReplay = async () => {
    try {
      let response = await fetch(`http://localhost:5000/get-notice/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "myworld " + window.localStorage.getItem("gsmToken"),
        },
      });
      let data = await response.json();
      // console.log(response.status);
      if (!response.ok) {
        throw new Error("get notice data failed");
      }
      if (response.ok) {
        console.log(data);
        setNotice(data);
      }
    } catch (error) {
      console.error("Error fetching notice data:", error);
      // Handle error
    }
  };
  useEffect(() => {
    questionReplay();
  }, []);

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <Typography>{notice.document_name}</Typography>
            <Typography>{notice.doc_desc}</Typography>
          </div>
          {notice?.questions?.map((question, qIndex) => (
            <div className="card-body" key={qIndex}>
              <Typography>
                {qIndex + 1}. {question?.questionText}{" "}
              </Typography>
              {question?.options?.map((opText, index) => (
                <div key={index}>
                  <div className="d-flex">
                    <FormControlLabel
                      
                      control={
                        question.questionType !== "text" &&
                        question.questionType !== "number" ? (
                          <input
                            type={question.questionType}
                            name={qIndex}
                            className="text-primary mx-1"  
                            required={question.required}
                            
                          />
                        ) : question?.questionType === "number" ? (
                          <SortNumericIcon className="me-1" />
                          
                        ) : (
                          <SortTextIcon className="me-1" />
                        )
                      }
                      label={
                        question.questionType !== "text" &&
                        question.questionType !== "number" ? (
                          <Typography className="text-capitalize">
                            {opText?.optionsText}
                          </Typography>
                        )
                        :(
                          <input
                          type={question.questionType}
                          name={qIndex}
                          className="text_input mx-1"
                          required={question.required}
                          placeholder= {opText?.optionsText}
                        />

                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}

          <Button type="button" className="w-25 bg-success text-uppercase text-light hover my-5 btn">Submit</Button>
        </div>
      </div>
    </>
  );
};

export default QuestionAnswer;
