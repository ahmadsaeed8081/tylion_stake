import React, { useState } from "react";

const Toggle = ({toggleOn, setToggleOn}) => {
  // const [toggleOn, setToggleOn] = useState(true);
  return (
    <div className="toggle-btn flex aic jc">
      <button
        onClick={() => setToggleOn(!toggleOn)}
        className={`btn button cleanbtn flex aic jc rel anim ${
          toggleOn ? "on" : ""
        }`}
      >
        <div className="circle flex aic jc abs anim">
          {toggleOn ? "ON" : "OFF"}
        </div>
      </button>
    </div>
  );
};
export default Toggle;
