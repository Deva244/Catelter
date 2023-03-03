import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { tokens } from "../theme";
import { reset, sendMessage } from "../features/message/messageSlice";
import { toast } from "react-toastify";

export default function MessageForm() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const { message, isSuccess, isError } = useSelector((store) => store.message);

  const Desktop = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    if (isSuccess) {
      toast.success("message");
    }
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isSuccess, isError]);

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("*required"),
    email: yup.string().email().required("*required"),
    message: yup.string().required("*required"),
  });

  function handleFormSubmit(values) {
    const data = {
      name: values.name,
      email: values.email,
      message: values.message,
    };

    dispatch(sendMessage(data));
    setMessageData("");
  }

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Contact Us
      </Typography>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              width={Desktop ? "25rem" : "90vw"}
            >
              <TextField
                fullWidth
                variant="filled"
                label="Your name"
                type="text"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{
                  mb: 2,
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Your email"
                type="email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{
                  mb: 2,
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Type the message here"
                type="text"
                maxRows={7}
                multiline
                name="message"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.message}
                error={!!touched.message && !!errors.message}
                helperText={touched.message && errors.message}
                sx={{
                  mb: 2,
                }}
              />
            </Box>
            <Box>
              <Button
                type="submit"
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  bgcolor: colors.blueAccent[500],
                  ":hover": {
                    bgcolor: colors.blueAccent[600],
                  },
                }}
              >
                <Typography variant="h5">Send Us a Message</Typography>
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}
