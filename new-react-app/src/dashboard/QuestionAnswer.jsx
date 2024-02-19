import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Typography } from "@mui/material";
import SortTextIcon from "@mui/icons-material/ShortText";
import SortNumericIcon from "@mui/icons-material/NumbersSharp";
import FormControlLabel from "@mui/material/FormControlLabel";
const QuestionAnswer = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState([]);
  const [answer, setAnswer] = useState([
    {
      questionText: "",
      data: [],
    },
  ]);
  const questionReplay = async () => {
    try {
      let response = await fetch(`http://localhost:5000/get-notice/${id}`, {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          Authorization: "myworld " + window.localStorage.getItem("gsmToken"),
        },
      });
      let data = await response.json();
      // console.log(response.status);
      if (!response.ok) {
        throw new Error("get notice data failed");
      }
      if (response.ok) {
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

  const selectInput = (qText, value, qIndex) => {
    const newAnswer = [...answer]; // Shallow copy of the answer array
    if (!Array.isArray(newAnswer[qIndex])) {
      newAnswer[qIndex] = []; // Initialize as an array if not already
    }
    newAnswer[qIndex].push({
      questionText: qText,
      data: value,
    });

    setAnswer(newAnswer); // Update the state with the modified newAnswer
    // Log the modified newAnswer
  };
  const selectCheck = (qText, value, qIndex) => {
    const newAnswer = [...answer]; // Shallow copy of the answer array
    if (!Array.isArray(newAnswer[qIndex])) {
      newAnswer[qIndex] = []; // Initialize as an array if not already
    }
    newAnswer[qIndex].push({
      questionText: qText,
      data: value,
    });

    setAnswer(newAnswer); // Update the state with the modified newAnswer
  };

  const submit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/create-answer/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "myworld " + window.localStorage.getItem("gsmToken"),
          },
          body: JSON.stringify({
            document_name: notice.document_name,
            doc_desc: notice.doc_desc,
            answers: answer,
          }),
        }
      );
      let data = await response.json();
      if (response.ok) {
        console.log(data);
        window.location.href = "/dashboard";
      } else {
        throw new Error("Failed to fetch");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <Typography className="text-center">
              {notice.document_name}
            </Typography>
            <Typography className="text-center">{notice.doc_desc}</Typography>
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
                            name={opText.optionsText}
                            className="text-primary mx-1"
                            required={question.required}
                            onChange={() =>
                              selectCheck(
                                question?.questionText,
                                opText.optionsText,
                                qIndex
                              )
                            }
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
                        ) : (
                          <input
                            type={question.questionType}
                            name={qIndex}
                            className="text_input mx-1"
                            required={question.required}
                            placeholder={opText?.optionsText}
                            onChange={(e) =>
                              selectInput(
                                question?.questionText,
                                e.target.value,
                                qIndex
                                // question?.questionType
                              )
                            }
                          />
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}

          <button
            type="button"
            onClick={submit}
            className="w-25 bg-success text-uppercase text-light hover my-5 btn"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default QuestionAnswer;
