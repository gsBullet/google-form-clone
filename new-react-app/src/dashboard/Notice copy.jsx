import React, { useState } from "react";
import AccordionSummary from "@mui/material/AccordionSummary";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import SortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextFieldsIcon from "@mui/icons-material/TextFields";
// import Typography from "@mui/material/Typography";
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
    const [question, setQuestion] = useState([
        {
            questionText: "which is the capital city of bangladesh?",
            questionType: "radio",
            options: [
                { optionsText: "Dhaka" },
                { optionsText: "Rangpur" },
                { optionsText: "CTG" },
                { optionsText: "Rajshahi" },
            ],
            open: true,
            required: false,
        },
    ]);

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
                optionsText: "options" + (addNewOptions[i].options.length + 1),
            });
            setQuestion(addNewOptions);
        } else {
            console.log("Maximum number of options reached.");
        }
    }

    function copyQuestion(i) {
        // expandcloseAll();
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
            <div key={i}>
                
                <Accordion
                    expanded={que.open}
                    className={que.open ? "add_border" : ""}
                    onChange={() => handleExpandHandler(i)}
                >
                    <AccordionSummary
                        arrial-controlls="panella-centent"
                        id="panella-header"
                        elevation={1}
                        className="w-100"
                    >
                        {!que.open ? (
                            <div className="saved_question">
                           
                                <Typography className="fs-5 lh-base pb-1">
                                    {i + 1} {que.questionText}
                                </Typography>
                                {que.options.map((opText, j) => (
                                    <div key={j}>
                                        
                                        <div className="d-flex">
                                            <FormControlLabel
                                                className="m-1 text-primary"
                                                disabled
                                                control={
                                                    <input
                                                        type={que.questionType}
                                                        className="text-dark"
                                                        color="primary"
                                                        required={que.type}
                                                       
                                                        
                                                    />
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
                    {que.open ? (
                        <div className="questionBox d-flex flex-row justify-content-center">
                            <AccordionDetails className="text-light border rounded p-3 text-capitalize d-flex flex-column pt-0 w-100 ms-1">
                                <div className="d-flex flex-row align-items-center justify-content-between">
                                    <input
                                        type="text"
                                        className="questionCSS fw-medium text-black "
                                        placeholder="Question"
                                        onChange={(e) => inputChangeHandler(e.target.value, i)}
                                        value={que.questionText}
                                    />
                                    <CropOriginalIcon className="text-primary fs-4 mx-2" />
                                    <Select className="select mt-2 ">
                                        <MenuItem
                                            id="text"
                                            value="text"
                                            onClick={() => addQuestionType(i, "text")}
                                        >
                                            <SubjectIcon className="me-1" />
                                            Paragraph
                                        </MenuItem>
                                        <MenuItem
                                            id="checkbox"
                                            value="checkbox"
                                            onClick={() => addQuestionType(i, "checkbox")}
                                        >
                                            <Checkbox className=" me-1 text-secondary" checked />
                                            Checkbox
                                        </MenuItem>
                                        <MenuItem
                                            id="radio"
                                            value="Radio"
                                            onClick={() => addQuestionType(i, "radio")}
                                        >
                                            <Radio className=" me-1 text-secondary" checked />
                                            Multiple choice
                                        </MenuItem>
                                    </Select>
                                </div>
                                {que.options.map((op, j) => (
                                    <div
                                        key={j}
                                        className="add_questions_body fw-medium text-dark d-flex align-items-center"
                                    >
                                        {que.questionType !== "text" ? (
                                            <input type={que.questionType} className="me-1" />
                                        ) : (
                                            <SortTextIcon className="me-1" />
                                        )}
                                        <div>
                                            <input
                                                type="text"
                                                className="text_input"
                                                placeholder="option"
                                                value={que.options[j].optionsText}
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
                                                que.questionType !== "text" ? (
                                                    <input
                                                        type={que.questionType}
                                                        className="text-primary mx-1"
                                                        inputProps={{ "arial-label": "secondary checkbox" }}
                                                        disabled
                                                    />
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
                                                        disabled
                                                    />
                                                    <Button
                                                        onClick={() => addOptions(i)}
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
                            class="fw-bold form-control fs-1 border-0"
                            name="form"
                            id="form"
                            placeholder="Form Title"
                        />
                    </div>

                    <div class="mb-3">
                        <input
                            type="text"
                            class="form-control w-100 fs-5 border-0"
                            name="description"
                            id="description"
                            placeholder="sort description"
                        />
                    </div>
                </div>
                {questionUI()}
            </div>
        </>
    );
};

export default Notice;
