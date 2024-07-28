import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    alert("User is logged Out Successfully!");
    localStorage.removeItem("username");
    window.location.href = "/";
  }, []);
}