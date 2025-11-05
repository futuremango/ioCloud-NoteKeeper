import React from "react";

function Alert(props) {
  const Captalize = (word) => {
    let str = word.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{Captalize(props.alert.type)}</strong>: {props.alert.message}
        </div>
      )}
    </div>
  );
}

export default Alert;
