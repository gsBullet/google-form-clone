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
  const [hours,setHours] = useState(null)
const [minutes, setMinutes] = useState(null);
const [seconds, setSeconds] = useState(null);




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

  const myTime = async()=>{
     function calculateRemainingTime() {
       const now = new Date();
       const targetTime = new Date(now);
   
       // Extract hours and minutes from notice.timeSelect
       const fixTime =  notice.timeSelect;
       // console.log(fixTime);
       const selectTime = fixTime || "00:00";
       const [hours, minutes] =  selectTime.split(":").map(Number);
   
       // Set target time using hours and minutes from notice.timeSelect
        targetTime.setHours(hours, minutes, 0, 0);
   
       // If current time is after the target time, set target time to the next day
       if (
         now.getHours() > hours ||
         (now.getHours() === hours && now.getMinutes() > minutes)
       ) {
          targetTime.setDate(targetTime.getDate() + 1);
       }
   
       // Calculate remaining time in milliseconds
       const remainingTimeMs = targetTime - now;
   
       // Convert remaining time from milliseconds to hours, minutes, and seconds
       const hoursRemaining = Math.floor(remainingTimeMs / (1000 * 60 * 60));
       const minutesRemaining =  Math.floor(
         (remainingTimeMs % (1000 * 60 * 60)) / (1000 * 60)
       );
       const secondsRemaining = Math.floor((remainingTimeMs % (1000 * 60)) / 1000);
   
       return {
         hours: hoursRemaining,
         minutes: minutesRemaining,
         seconds: secondsRemaining,
       };
     }
     // Example usage:
   
     // const noticeData = {
     //   selectTime: (notice?.timeSelect || "").toString(), // Handle null or undefined case
     // };
   
      function updateClock() {
       const timer =  calculateRemainingTime();
       setHours(timer.hours)
       setMinutes(timer.minutes)
       setSeconds(timer.seconds)
   
     
     }
     setInterval(updateClock, 1000);
       updateClock();

  }
 







  
  useEffect(() => {
    // dayCount();
    myTime()
  }); // Empty dependency array for running once on mount




  

  return (
    <>
      <div className="container">
        <div className="hp my-5">{JSON.stringify(notice)}</div>
        <div className="card">
          <div className="card-header">
            <Typography className="text-center">
              {notice.document_name}
            </Typography>
            <Typography className="text-center">{notice.doc_desc}</Typography>
            <div className="styke d-flex flex-nowrap gap-3">
              <div id="clock">
                <span id="hours">{hours}</span>:<span id="minutes">{minutes}</span>:
                <span id="seconds">{seconds}</span>
              </div>
              <div className="text-primary">
                Notice Start: {notice?.startDadeline}
              </div>
              <div className="text-primary">Notice Range:{notice?.range}</div>
              <div className="text-primary">
                Notice End:{notice?.endDadeline}
              </div>
            </div>
          </div>
          {notice?.questions?.map((question, qIndex) => (
            <div
              className="card-body col-lg-6 col-md-8 col-sm-12 m-auto border  shadow mt-3"
              key={qIndex}
            >
              <Typography>
                {qIndex + 1}. {question?.questionText}{" "}
              </Typography>
              {question?.options?.map((opText, index) => (
                <div key={index}>
                  <div className="d-flex align-items-center">
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
                          <Typography className="text-capitalize text-center">
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
          <div className="col-lg-6 col-md-8 col-sm-10 m-auto">
            <button
              onClick={submit}
              className="btn btn-sm btn-success text-uppercase text-light hover my-5 mx-5 btn"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionAnswer;

<script src="script.js"></script>;
