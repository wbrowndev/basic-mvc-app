import React, { useState, useEffect } from "react";
import "./css/Analytics.css";
import WeightTrackerGraph from "./WeightTrackerGraph";
function Analytics() {
  const username = localStorage.getItem("username");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/dashboard/${username}/exercises`)
      .then((res) => res.json())
      .then((res) => setExercises(res.exercises))
      .catch((err) => setExercises([]));
  }, [username]);

  const exercisesCopy = [...exercises];
  const completedExercises = exercisesCopy.filter(
    (exercise) => exercise.completed
  ).length;

  const currentDate = new Date();
  const missingExercises = exercisesCopy.filter((exercise) => {
    return new Date(exercise.date).getTime() <= currentDate.getTime();
  }).length;
  const weightDataContent = {
    labels: [],
    datasets: [
      {
        label: "Weight Tracker",
        data: [],
        backgroundColor: ["#3B3B98"],
        borderColor: ["#EAB543"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <aside className="analytics">
      <div className="analytics__wrapperTop">
        <div className="analytics__cardTop">
          <h2 className="analytics__cardTop__heading analytics__cardTop__headingCompleted">
            Completed
          </h2>
          <h3 className="analytics__cardTop__content">{completedExercises}</h3>
        </div>
        <div className="analytics__cardTop">
          <h2 className="analytics__cardTop__heading analytics__cardTop__headingMissing">
            Missing
          </h2>
          <h3 className="analytics__cardTop__content">{missingExercises}</h3>
        </div>
        <div className="analytics__cardTop">
          <h2 className="analytics__cardTop__heading analytics__cardTop__headingTotal">
            Total
          </h2>
          <h3 className="analytics__cardTop__content">{exercises.length}</h3>
        </div>
      </div>
      <div className="analytics__wrapperBottom">
        <div className="analytics__cardBottom analytics__cardBottom">
          <WeightTrackerGraph weightDataContent={weightDataContent} />
        </div>
      </div>
    </aside>
  );
}

export default Analytics;
