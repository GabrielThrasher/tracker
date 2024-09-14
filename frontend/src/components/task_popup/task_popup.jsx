import React, { useEffect } from "react";
import { useState } from "react";
import "./task_popup.css";

function TaskPopup({ courseName, task, description, dueDate, color, bgImg }) {
  const [sliderValue, setSliderValue] = useState(0);
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(true);
  const [dateDiff, setDateDiff] = useState("");
  const [isPastDue, setIsPastDue] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateDiff(generateCountdown());
    }, 1000);

    return () => clearInterval(intervalId);
  });

  let onTaskPopupClose = () => {
    setIsTaskPopupOpen(false);
  };

  let generateHeader = () => {
    let buttons;

    if (isEditing) {
      buttons = (
        <>
          <button className="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
          <button className="button">Save</button>
        </>
      );
    } else {
      buttons = (
        <>
          <button className="button">Delete</button>
          <button className="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </>
      );
    }

    return (
      <>
        <h1 className="task-popup-header-text">{courseName}</h1>
        <button className="close" onClick={onTaskPopupClose}>
          X
        </button>
        {buttons}
      </>
    );
  };

  let generateTaskSection = () => {
    return (
      <>
        <h4 className="section-text section-header">Task</h4>
        <p className="line"></p>

        {isEditing ? (
          <input className="section-text" type="text" value={task}></input>
        ) : (
          <p className="section-text">{task}</p>
        )}
      </>
    );

    // if (isEditing) {
    //   return (
    //     <>
    //       <h4 className="section-text section-header">Task</h4>
    //       <p className="line"></p>
    //       <input className="section-text" type="text" value={task}></input>
    //     </>
    //   );
    // } else {
    //   return (
    //     <>
    //       <h4 className="section-text section-header">Task</h4>
    //       <p className="line"></p>
    //       <p className="section-text">{task}</p>
    //     </>
    //   );
    // }
  };

  let getDecimalPart = (num) => {
    return num - Math.trunc(num);
  };

  let generateCountdown = () => {
    let today = new Date();
    let currMonth = today.getMonth() + 1;
    let currDay = today.getDate();
    let currYear = parseInt(today.getFullYear().toString().substring(2, 4));
    let currHour = today.getHours();
    let currMinute = today.getMinutes();
    let currSecond = today.getSeconds();
    let currDate = new Date(
      currYear,
      currMonth,
      currDay,
      currHour,
      currMinute,
      currSecond
    );

    let slash_idxs = [];
    let at_idx = -1;
    let colon_idx = -1;
    for (let i = 0; i < dueDate.length; i++) {
      if (dueDate[i] === "/") slash_idxs.push(i);
      if (dueDate[i] === "@") at_idx = i;
      if (dueDate[i] === ":") colon_idx = i;
    }

    const dueYear = parseInt(dueDate.substring(slash_idxs[1] + 1, at_idx - 1));
    const dueMonth = parseInt(dueDate.substring(0, slash_idxs[0]));
    const dueDay = parseInt(
      dueDate.substring(slash_idxs[0] + 1, slash_idxs[1])
    );
    let dueHour = parseInt(dueDate.substring(colon_idx - 2, colon_idx));
    if (dueDate.substring(colon_idx + 3, dueDate.length) === "pm")
      dueHour += 12;
    const dueMinute = parseInt(dueDate.substring(colon_idx + 1, colon_idx + 3));

    const dueDateObj = new Date(dueYear, dueMonth, dueDay, dueHour, dueMinute);
    let diffTime = dueDateObj - currDate;
    if (diffTime < 0) {
      setIsPastDue(true);
      diffTime = Math.abs(diffTime);
    }

    let diffDay = diffTime / (1000 * 60 * 60 * 24);
    let diffHour = getDecimalPart(diffDay) * 24;
    let diffMinute = getDecimalPart(diffHour) * 60;
    console.log(getDecimalPart(diffMinute) * 60);
    let diffSecond = Math.round(getDecimalPart(diffMinute) * 60);

    let prefix = "";
    if (isPastDue) prefix = "-";

    let dateDiff =
      prefix +
      Math.floor(diffDay).toString() +
      ":" +
      (Math.floor(diffHour).toString().length === 1
        ? "0" + Math.floor(diffHour).toString()
        : Math.floor(diffHour).toString()) +
      ":" +
      (Math.floor(diffMinute).toString().length === 1
        ? "0" + Math.floor(diffMinute).toString()
        : Math.floor(diffMinute).toString()) +
      ":" +
      (diffSecond.toString().length === 1
        ? "0" + diffSecond.toString()
        : diffSecond.toString());

    return dateDiff;
  };

  let generateDueDateSection = () => {
    let color;
    if (isPastDue) color = "red";
    else color = "green";

    let body;
    if (isEditing) {
      body = (
        <span>
          <input type="date" />
          <input type="time" />
        </span>
      );
    } else {
      body = (
        <>
          {dueDate} (time left: <span style={{ color: color }}>{dateDiff}</span>
          )
        </>
      );
    }

    return (
      <>
        <h4 className="section-text section-header">Due Date</h4>
        <p className="line"></p>
        <p className="section-text">{body}</p>
      </>
    );
  };

  let generateProgressSection = () => {
    return (
      <>
        <h4 className="section-text section-header">Progress</h4>
        <p className="line"></p>
        {generateSlider()}
      </>
    );
  };

  let generateDescriptionSection = () => {
    if (isEditing) {
      return (
        <>
          <h4 className="section-text section-header">Description</h4>
          <p className="line"></p>
          <textarea
            className="section-text"
            type="text"
            value={description}
          ></textarea>
        </>
      );
    } else {
      return (
        <>
          <h4 className="section-text section-header">Description</h4>
          <p className="line"></p>
          <p className="section-text description">{description}</p>
        </>
      );
    }
  };

  let generateSlider = () => {
    return (
      <>
        <p className="slider-value">Completion: {sliderValue}%</p>
        <input
          onChange={() => {
            setSliderValue(document.getElementById("myRange").value);
          }}
          type="range"
          className="slider"
          value={sliderValue}
          min="0"
          max="100"
          id="myRange"
          style={{ accentColor: color }}
        />
      </>
    );
  };

  return (
    isTaskPopupOpen && (
      <>
        <div className="blur"></div>
        <div className="task-popup">
          <div className="task-popup-header" style={{ backgroundColor: color }}>
            {generateHeader()}
          </div>
          <div
            className="task-popup-content"
            style={{ backgroundImage: `url(${bgImg})` }}
          >
            <div className="section">{generateTaskSection()}</div>
            <div className="section">{generateDueDateSection()}</div>
            <div className="section">{generateProgressSection()}</div>
            <div className="section">{generateDescriptionSection()}</div>
          </div>
        </div>
      </>
    )
  );
}

export default TaskPopup;
