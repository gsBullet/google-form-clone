import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Typography } from "@mui/material";
import SortTextIcon from "@mui/icons-material/ShortText";
import SortNumericIcon from "@mui/icons-material/NumbersSharp";
import FormControlLabel from "@mui/material/FormControlLabel";
// import { actionTypes } from "../components/reducer";
import { useStateValue } from "../components/StateProvider";

const QuestionAnswer = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState([]);
  const [answer, setAnswer] = useState([]);

  const [{ questions, doc_name, doc_desc }, dispatch] = useStateValue();

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

  const selectCheck = (e, que, option) => {
    console.log(e);
    console.log(que);
    console.log(option);
  };


  useEffect(() => {
    questionReplay();
  }, []);

  useEffect(() => {
    questions.map((q) => {
      answer.push({
        question: q.questionText,
        answer: " ",
      });
    });
    questions.map((q,qIndex)=>{
      questionReplay.push({'header':q.questionText, 'key': q.questionText})
    })
  }, []);

  const selectInput = async (qtext, option) => {
    var k = await answer.findIndex((element) => element.question === qtext);
    answer[k].answer = option
    setAnswer(answer)
    console.log(answer);
  };

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
                            onChange={(e) =>
                              selectCheck(
                                e.target?.checked,
                                question?.questionText,
                                opText?.optionsText
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
                                e.target.value
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

          {/* <Button type="button" onClick={submit} className="w-25 bg-success text-uppercase text-light hover my-5 btn">Submit</Button> */}
        </div>
      </div>
    </>
  );
};

export default QuestionAnswer;
