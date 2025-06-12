import React from "react";
import "../styling/components/panel.scss";

function Panel({ title, columns }) {
  return (
    <div className="panel-container">
      <div className="panel-top">
        <h1 className="title">{title}</h1>
        <div className="divisor"></div>
      </div>
      <div className="panel-bottom">
        <div className="panel-list">
          {columns?.map((column, idx) => {
            return <div className=""></div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Panel;
