import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import AccordionSummary from "@mui/material/AccordionSummary";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import SortTextIcon from "@mui/icons-material/ShortText";
import SortNumericIcon from "@mui/icons-material/NumbersSharp";
import SubjectIcon from "@mui/icons-material/Subject";
import NumericIcon from "@mui/icons-material/Numbers";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Typography } from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";
import AccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
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
  const [range, setRange] = useState(null);
  const [startDadeline, setStartDadeline] = useState(null);
  const [endDadeline, setEndDadeline] = useState(null);
  const [error, setError] = useState();
  const [timeSelect, setTimeSelect] = useState(null);
  const [thana, setThana] = useState(false);
  const [branch, setBranch] = useState(false);
  const [zonal, setZonal] = useState(false);

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
            timeSelect: timeSelect,
            startDadeline: startDadeline,
            endDadeline: endDadeline,
            thana: thana,
            branch: branch,
            zonal: zonal,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 422) {
        setError({});
        let tempErrors = {
          questions: [],
          range: [],
          startDedeline: [],
          endDadeline: [],
          timeSelect: [],
          thana: [],
          branch: [],
          zonal: [],
        };
        console.log(data);
        data.errors.forEach((e, index) => {
          console.log(e.path);
          if (!tempErrors[e.path]) {
            tempErrors[e.path] = []; // Initialize the array if it doesn't exist
          }
          tempErrors[e.path].push(
            <li key={index} className="text-danger">
              {e.msg}
            </li>
          );
        });
        setError(tempErrors);
      }

      if (response.ok) {
        // window.location.href = "/dashboard";
        window.location.replace("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const dateHandler = () => {
    const date = new Date(startDadeline);
    let day = date.getDate();
    let newDate = +day + (+range - 1);
    date.setDate(newDate);
    const viewDate = new Date(date);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedDate = `${viewDate.getDate()}-${
      months[viewDate.getMonth()]
    }-${viewDate.getFullYear()}`;
    setEndDadeline(formattedDate);
  };
  // useEffect(() => {
  //   console.log(zonal, "zone");
  //   console.log(branch, "branch");
  //   console.log(thana, "thana");
  // }, [thana, branch, zonal]);

  useEffect(() => {
    dateHandler();
  }, [startDadeline, range]);
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
                    {/* <Button size="small" className="footerButton fw-bold">
                      <FcRightUp className="fcRightUp" />
                      Answer Key
                    </Button> */}
                  </div>
                  <div className="add_question_bottom">
                    <IconButton
                      aria-label="copy"
                      title="copy"
                      onClick={() => {
                        copyQuestion(i);
                      }}
                    >
                      <FilterNoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      title="delete"
                      onClick={() => {
                        deleteQuestion(i);
                      }}
                    >
                      <BsTrash />
                    </IconButton>
                    <IconButton aria-label="copy">
                      <span className="text-secondary fs-4">required</span>
                      <Switch
                        name="checked"
                        color="primary"
                        title="required"
                        onClick={() => requiredQuestion(i)}
                      />
                    </IconButton>
                    <IconButton aria-label="More Item">
                      <MoreVertIcon />
                    </IconButton>
                  </div>
                </div>
              </AccordionDetails>
              <div className="question_edit d-flex flex-column gap-3 ms-3 h-75 py-3 px-2 rounded">
                <AddCircleOutlineIcon
                  className="edit"
                  titleAccess="New Question"
                  onClick={() => addMoreQuestion(i)}
                />
                {/* <OndemandVideoIcon className="edit" />
                <CropOriginalIcon className="edit" />
                <TextFieldsIcon className="edit" /> */}
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
      <div className="card shadow col-md-8 m-auto ">
        <br /> <br />
        <div className="card-header">
          <div className="document-header">
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
          </div>
          <div className="notice-type-range-dadeline">
            <div className="d-flex justify-content-around align-items-center gap-3">
              <div class="mb-3 w-25">
                <label for="" class="form-label">
                  Notice Type
                </label>
                <select
                  className="form-select"
                  onChange={rangeHandler}
                  name="noticeType"
                  id="noticeType"
                >
                  <option selected>Open this Select Menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="7">Weackly</option>
                  <option value="15">De-Weackly</option>
                  <option value="10">Occation</option>
                </select>

                <ul className="list-unstyled">{error?.range}</ul>
              </div>
              <div class="mb-3 w-25">
                <label for="" class="form-label">
                  Start Dadeline
                </label>
                <input
                  type="Date"
                  class="form-control"
                  name="startDadeline"
                  id="startDadeline"
                  onChange={(e) => setStartDadeline(e.target.value)}
                />
                <ul className="list-unstyled">{error?.startDadeline}</ul>
              </div>
              <div class="mb-3 w-25">
                <label for="" class="form-label">
                  Time Dadeline
                </label>
                <input
                  type="time"
                  class="form-control"
                  name="dadelineTime"
                  id="dadelineTime"
                  min="00:00"
                  max="22:00"
                  onChange={(e) => setTimeSelect(e.target.value)}
                />
                <ul className="list-unstyled">{error?.timeSelect}</ul>
              </div>
            </div>
          </div>
          <div className="notice-dadeline-show">
            <div className="d-flex justify-content-around align-items-center gap-3">
              <div className="data-permission">
                <div className="notice-data-permission">
                  <label class="form-label">Notice Data permission</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="thana"
                    name="thana"
                    onChange={(e) => setThana(e.target.checked)}
                  />
                  <label class="form-check-label" for="thana">
                    Thana
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="branch"
                    name="branch"
                    onChange={(e) => setBranch(e.target.checked)}
                  />
                  <label class="form-check-label" for="branch">
                    Branch
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="zonal"
                    name="zonal"
                    onChange={(e) => setZonal(e.target.checked)}
                  />
                  <label class="form-check-label" for="zonal">
                    Zonal
                  </label>
                </div>
                <ul>
                  {error?.zonal}
                </ul>
              </div>

              <div class="mb-3 w-25">
                <label for="" class="form-label">
                  Notice Range
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="No Value"
                  value={range}
                  disabled
                />
              </div>

              <div class="mb-3 w-25">
                <label for="" class="form-label">
                  End Dadeline
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="endDadeline"
                  id="endDadeline"
                  disabled
                  value={endDadeline}
                />
              </div>
            </div>
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
        </div>
      </div>
    </>
  );
};

export default Notice;
