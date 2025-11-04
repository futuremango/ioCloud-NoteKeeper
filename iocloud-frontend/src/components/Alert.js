import React, { useEffect } from "react";

const Alert = ({ alert, setAlert }) => {
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert, setAlert]);

  return (
   alert && (
      <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
       <strong>{alert.message}</strong> 
      </div>
   )
  );
};

export default Alert;
