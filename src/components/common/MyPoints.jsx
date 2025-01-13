import React from "react";

function MyPoints({ icon, text, value }) {
  return (
    <div className="my-points d-flex al-center jc-center gap-1 m-auto f-tangoSansItalic">
      <img className="w-6vw" src={icon} alt="" /> <span>{text}</span>: <span>{value}</span>
    </div>
  );
}

export default MyPoints;
