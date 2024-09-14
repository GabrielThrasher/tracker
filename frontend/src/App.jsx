import { useState } from "react";
import "./App.css";
import Button from "./components/button.jsx";
import TaskPopup from "./components/task_popup/task_popup.jsx";

function App() {
  let courseName = "Physics with Calculus 2";
  let dueDate = "9/14/24 @ 11:59pm";
  let task = "Read textbook and do practice problems";
  let description =
    "Read ch 21.3-21.6 and do TBP and do the following: have fun, eat, live, laugh, love. Read ch 21.3-21.6 and do TBP and do the following: have fun, eat, live, laugh, love. Read ch 21.3-21.6 and do TBP and do the following: have fun, eat, live, laugh, love.";

  return (
    <>
      <TaskPopup
        courseName={courseName}
        dueDate={dueDate}
        task={task}
        description={description}
        color="purple"
        bgImg="./src/img/physics.jpg"
      />
    </>
  );
}

export default App;
