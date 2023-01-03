import React from "react";

function Persoana({ nume, faculta, text, img }) {
  return (
    <div className="alumn" data-aos="fade-left">
      <div className="top">
        <div className="imgs">
          <img src={img} alt="" />
          <img
            className="svg"
            src={require("../../../img/over_alumni_img.svg").default}
            alt=""
          />
        </div>

        <div className="ttext">
          <h1>{nume}</h1>
          <h3>{faculta}</h3>
        </div>
      </div>
      <div className="text">
        <p>{text}</p>
      </div>
      <img
        src={require("../../../img/absolute_alumni.svg").default}
        alt=""
        className="abs first"
      />
      <img
        src={require("../../../img/absolute_alumni.svg").default}
        alt=""
        className="abs second"
      />
    </div>
  );
}

export default Persoana;