import { useEffect } from "react";
import { useState } from "react";
import { FaUser, FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserData, login, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";

export default function AdminLogin() {
  const Desktop = useMediaQuery("(min-width: 1000px)");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (store) => store.auth
  );

  const { username, password } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      dispatch(getUserData());
      navigate("/cadmin");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const userData = {
      username,
      password,
    };
    dispatch(login(userData));
  }

  return (
    <Box className="login-page" mt={Desktop ? undefined : "3.7rem"}>
      <Box className="login-container">
        <h2>
          <FaUser /> LOGIN
        </h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formData.username}
            maxLength="30"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            maxLength="30"
            onChange={handleChange}
          />
          <button className="login-btn">
            <FaSignInAlt /> Login
          </button>
        </form>
      </Box>
    </Box>
  );
}
