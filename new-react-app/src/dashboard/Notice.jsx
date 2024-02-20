import React, { useState } from "react";
import { useParams } from "react-router";
import AccordionSummary from "@mui/material/AccordionSummary";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import SortTextIcon from "@mui/icons-material/ShortText";
import SortNumericIcon from "@mui/icons-material/NumbersSharp";
import SubjectIcon from "@mui/icons-material/Subject";
import NumericIcon from "@mui/icons-material/Numbers";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import { Typography } from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";
import AccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";

import { FcRightUp } from "react-icons/fc";
import { BsTrash } from "react-icons/bs";
import { Button, IconButton, MenuItem, Radio, Switch } from "@mui/material";
import Select from "@mui/material/Select";

const Notice = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState([
    {
      questionText: "Question",
      questionType: "radio",
      options: [{ optionsText: "option 1" }],
      open: true,
      required: false,
    },
  ]);
  const [documentDescription, setdocumentDescription] = useState(
    "Add Sort Desctiption"
  );
  const [documentName, setdocumentName] = useState("Untitled Document");
  const [range, setRange] = useState();
  const [startDadeline, setStartDadeline] = useState();
  const [endDadeline, setEndDadeline] = useState();
  const [error, setError] = useState([]);

  const submitHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/create-notice/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "myworld " + window.localStorage.getItem("gsmToken"),
          },
          body: JSON.stringify({
            document_name: documentName,
            doc_desc: documentDescription,
            question: question,
            range: range,
            startDadeline: startDadeline,
            endDadeline: endDadeline,
          }),
        }
      );
      let data = await response.json();
      let jData = JSON.stringify(data?.errors);
      console.log(error);
      if (!response.ok) {
        setError(jData);
        throw new Error("Failed to fetch");
      } else {
        // window.location.href = "/dashboard";
        window.location.replace("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const rangeHandler = (e) => {
    setRange(e.target.value);
  };
  function inputChangeHandler(text, i) {
    let newQuestion = [...question];
    newQuestion[i].questionText = text;
    setQuestion(newQuestion);
  }

  function addQuestionType(i, type) {
    let newType = [...question];
    newType[i].questionType = type;
    setQuestion(newType);
  }

  function changeValueHandler(text, i, j) {
    // let newOption = [...question];
    // console.log(text);
    const newOption = JSON.parse(JSON.stringify(question));
    newOption[i].options[j].optionsText = text;
    setQuestion(newOption);
  }

  function removeOption(i, j) {
    let deleteOption = [...question];
    if (deleteOption[i].options.length > 1) {
      deleteOption[i].options.splice(j, 1);
      setQuestion(deleteOption);
    }
  }

  function addOptions(i) {
    let addNewOptions = [...question];
    if (addNewOptions[i].options.length < 5) {
      addNewOptions[i].options.push({
        optionsText: "options " + (addNewOptions[i].options.length + 1),
      });
      setQuestion(addNewOptions);
    } else {
      console.log("Maximum number of options reached.");
    }
  }

  function copyQuestion(i) {
    expandcloseAll();
    let copyQ = [...question];
    let newCopy = { ...copyQ[i] };
    setQuestion([...question, newCopy]);
  }

  function deleteQuestion(i) {
    if (question.length > 1) {
      let delQuestion = [...question];
      delQuestion.splice(i, 1);
      setQuestion(delQuestion);
    }
  }

  function requiredQuestion(i) {
    let reqQuestion = [...question];
    reqQuestion[i].required = !reqQuestion[i].required;
    setQuestion(reqQuestion);
  }

  function addMoreQuestion(i) {
    expandcloseAll();
    let newQuestion = [
      ...question,
      {
        questionText: "Question",
        questionType: "radio",
        options: [{ optionsText: "option 1" }],
        open: true,
        required: false,
      },
    ];
    setQuestion(newQuestion);
  }

  function expandcloseAll() {
    let expandsQuestion = [...question];
    for (let index = 0; index < expandsQuestion.length; index++) {
      expandsQuestion[index].open = false;
    }
    setQuestion(expandsQuestion);
  }

  function handleExpandHandler(i) {
    const handleQuestion = [...question];
    for (let index = 0; index < handleQuestion.length; index++) {
      if (index === i) {
        handleQuestion[i].open = true;
      } else {
        handleQuestion[index].open = false;
      }
    }
    setQuestion(handleQuestion);
  }

  function questionUI() {
    return question.map((que, i) => (
      <div>
        <Accordion
          key={i}
          expanded={question[i].open}
          className={question[i].open ? "add_border" : ""}
          onChange={() => {
            handleExpandHandler(i);
          }}
        >
          <AccordionSummary
            arrial-controlls="panella-centent"
            id="panella-header"
            elevation={1}
            className="w-100"
          >
            {!question[i].open ? (
              <div className="saved_question">
                <Typography className="fs-5 lh-base pb-1">
                  {i + 1}. {question[i].questionText}
                </Typography>
                {que.options.map((opText, j) => (
                  <div key={j}>
                    <div className="d-flex">
                      <FormControlLabel
                        disabled
                        control={
                          que.questionType !== "text" &&
                          que.questionType !== "number" ? (
                            <input
                              type={que.questionType}
                              className="text-primary mx-1"
                              inputProps={{
                                "arial-label": "secondary checkbox",
                              }}
                              required={que.type}
                              disabled
                            />
                          ) : question[i].questionType === "number" ? (
                            <SortNumericIcon className="me-1" />
                          ) : (
                            <SortTextIcon className="me-1" />
                          )
                        }
                        label={
                          <Typography className="fs-6 fw-medium lh-1 text-dark px-2">
                            {opText.optionsText}
                          </Typography>
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </AccordionSummary>
          {question[i].open ? (
            <div className="questionBox d-flex flex-row justify-content-center">
              <AccordionDetails className="addQuestion text-light border rounded p-3 text-capitalize d-flex flex-column pt-0 w-100 ms-1">
                <div className="addQuestionTop d-flex flex-row align-items-center justify-content-between">
                  <input
                    type="text"
                    className="questionCSS fw-medium text-black "
                    onChange={(e) => inputChangeHandler(e.target.value, i)}
                    placeholder={que.questionText}
                  />
                  <CropOriginalIcon className="text-primary fs-4 mx-2" />
                  <Select className="select mt-2 ">
                    <MenuItem
                      id="text"
                      value="Text"
                      onClick={() => addQuestionType(i, "text")}
                    >
                      <SubjectIcon className="me-1" />
                      Paragraph
                    </MenuItem>

                    <MenuItem
                      id="number"
                      value="Number"
                      onClick={() => addQuestionType(i, "number")}
                    >
                      <NumericIcon className="me-1" />
                      Number
                    </MenuItem>
                    <MenuItem
                      id="radio"
                      value="Radio"
                      onClick={() => addQuestionType(i, "radio")}
                    >
                      <Radio
                        className=" me-1 text-secondary text-capitalize"
                        checked
                      />
                      Single check
                    </MenuItem>
                    <MenuItem
                      id="checkbox"
                      value="Checkbox"
                      onClick={() => addQuestionType(i, "checkbox")}
                    >
                      <Checkbox className=" me-1 text-secondary" checked />
                      Multiple choice
                    </MenuItem>
                  </Select>
                </div>
                {que.options.map((op, j) => (
                  <div
                    key={j}
                    className="add_questions_body fw-medium text-dark d-flex align-items-center"
                  >
                    {question[i].questionType !== "text" &&
                    question[i].questionType !== "number" ? (
                      <input type={question[i].questionType} className="me-1" />
                    ) : question[i].questionType === "number" ? (
                      <SortNumericIcon className="me-1" />
                    ) : (
                      <SortTextIcon className="me-1" />
                    )}
                    <div>
                      <input
                        type="text"
                        className="text_input"
                        placeholder={op.optionsText}
                        onChange={(e) => {
                          changeValueHandler(e.target.value, i, j);
                        }}
                      />
                    </div>
                    <div className="ps-3">
                      <CropOriginalIcon className="text-info" />
                      <IconButton aria-label="delete">
                        <CloseIcon onClick={() => removeOption(i, j)} />
                      </IconButton>
                    </div>
                  </div>
                ))}
                {que.options.length < 5 ? (
                  <div className="add_questions_body px-2">
                    <FormControlLabel
                      disabled
                      control={
                        que.questionType !== "text" &&
                        que.questionType !== "number" ? (
                          <input
                            type={que.questionType}
                            className="text-primary mx-1"
                            inputProps={{ "arial-label": "secondary checkbox" }}
                            disabled
                          />
                        ) : question[i].questionType === "number" ? (
                          <SortNumericIcon className="me-1" />
                        ) : (
                          <SortTextIcon className="me-1" />
                        )
                      }
                      label={
                        <div>
                          <input
                            type="text"
                            className="text_input h-25 w-25 fs-5 fw-medium text-secondary"
                            placeholder="add other"
                          />
                          <Button
                            size="small"
                            onClick={() => {
                              addOptions(i);
                            }}
                            className="fw-bold fs-5"
                          >
                            add option
                          </Button>
                        </div>
                      }
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="add_footer d-flex justify-content-between align-items-center">
                  <div className="add_question_bottom_left">
                    <Button size="small" className="footerButton fw-bold">
                      <FcRightUp className="fcRightUp" />
                      Answer Key
                    </Button>
                  </div>
                  <div className="add_question_bottom">
                    <IconButton
                      aria-label="copy"
                      onClick={() => {
                        copyQuestion(i);
                      }}
                    >
                      <FilterNoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        deleteQuestion(i);
                      }}
                    >
                      <BsTrash />
                    </IconButton>
                    <IconButton aria-label="copy">
                      <span className="text-secondary fs-4">required</span>
                      <Switch
                        name="checkedA"
                        color="primary"
                        onClick={() => requiredQuestion(i)}
                      />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <MoreVertIcon />
                    </IconButton>
                  </div>
                </div>
              </AccordionDetails>
              <div className="question_edit d-flex flex-column gap-3 ms-3 h-75 py-3 px-2 rounded">
                <AddCircleOutlineIcon
                  className="edit"
                  onClick={() => addMoreQuestion(i)}
                />
                <OndemandVideoIcon className="edit" />
                <CropOriginalIcon className="edit" />
                <TextFieldsIcon className="edit" />
              </div>
            </div>
          ) : (
            ""
          )}
        </Accordion>
      </div>
    ));
  }

  return (
    <>
      <div className="card shadow col-md-8 m-auto mt-5">
        <br /> <br />
        <div className="card-header my-4">
          <div class="mb-3">
            <input
              type="text"
              class="fw-bold form-control fs-1 border-0 text-capitalize"
              name="form"
              id="form"
              // value={documentName}
              placeholder={documentName}
              onChange={(e) => setdocumentName(e.target.value)}
            />
          </div>

          <div class="mb-3">
            <input
              type="text"
              class="form-control w-100 fs-5 border-0 text-capitalize"
              name="description"
              id="description"
              // value={documentDescription}
              placeholder={documentDescription}
              onChange={(e) => setdocumentDescription(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-around align-items-center gap-3">
            <div class="mb-3 w-25">
              <label for="" class="form-label">
                Notice Type
              </label>
              <select
                class="form-select"
                name="noticeType"
                id="noticeType"
                required
                value={range}
                onChange={rangeHandler}
              >
                <option selected>Select one</option>
                <option value="1">Ones</option>
                <option value="7">Weekly</option>
                <option value="10">Occation</option>
              </select>
            </div>
            <div class="mb-3 w-25">
              <label for="" class="form-label">
                Start Dadeline
              </label>
              <input
                type="date"
                class="form-control"
                name="startDadeline"
                id="startDadeline"
                onChange={(e) => setStartDadeline(e.target.value)}
              />
            </div>
            <div class="mb-3 w-25">
              <label for="" class="form-label">
                End Dadeline
              </label>
              <input
                type="date"
                class="form-control"
                name="endDadeline"
                id="endDadeline"
                placeholder=""
                onChange={(e) => setEndDadeline(e.target.value)}
              />
            </div>
          </div>
        <div>
          {error?.map((err, index) => (
            <div key={index}>
              <p>Type: {err.type}</p>
              <p>Message: {err.msg}</p>
              <p>Path: {err.path}</p>
              <p>Location: {err.location}</p>
            </div>
          ))}
        </div>
        </div>
        <div className="card-body ">{questionUI()}</div>
        <div className=" py-3 px-3">
          <button
            className="btn btn-primary fw-bold fs-5"
            onClick={submitHandler}
          >
            Save
          </button>
          <Button></Button>
        </div>
      </div>
    </>
  );
};

export default Notice;
