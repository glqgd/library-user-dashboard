import { Button } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function LogOutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div>
      <Button onClick={handleLogout} color={"failure"}>
        Logout
      </Button>
    </div>
  );
}

export default LogOutButton;
