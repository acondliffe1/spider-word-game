import React from "react";

const Spider = ({ mistakes }) => {
  const step = Array(mistakes).fill(true);
  return (
    <div className={`spider ${step[8] ? "leave" : ""}`}>
      <div className={`spiderweb ${step[0] ? "" : "hidden"}`}></div>
      <div className={`body ${step[0] ? "" : "hidden"}`}>
        <div className={`eye left ${step[0] ? "" : "hidden"}`}></div>
        <div className={`eye right ${step[0] ? "" : "hidden"}`}></div>
      </div>
      <div className="legs left">
        <div className={`leg ${step[1] ? "" : "hidden"}`}></div>
        <div className={`leg ${step[2] ? "" : "hidden"}`}></div>
        <div className={`leg ${step[3] ? "" : "hidden"}`}></div>
        <div className={`leg ${step[4] ? "" : "hidden"}`}></div>
      </div>
      <div className="legs right">
        <div className={`leg ${step[5] ? "" : "hidden"}`}></div>
        <div className={`leg ${step[6] ? "" : "hidden"}`}></div>
        <div className={`leg ${step[7] ? "" : "hidden"}`}></div>
        <div className={`leg ${step[8] ? "" : "hidden"}`}></div>
      </div>
    </div>
  );
};

export default Spider;
