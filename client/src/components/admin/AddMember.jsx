import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { register } from "../../features/auth/authSlice";
import { tokens } from "../../theme";

export default function AddMember({ submit, open, onClose }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const initialValues = {
    username: "",
    password: "",
    access: "",
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("*required"),
    password: yup.string().required("*required"),
    access: yup.string().required("*required"),
  });

  async function handleFormSubmit(values) {
    const { username, password, access } = values;

    const userData = {
      username,
      password,
      access,
    };

    await dispatch(register(userData));
    submit();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          bgcolor: colors.primary[400],
          backgroundImage: "none",
          maxWidth: "900px",
          width: "400px",
          p: isNonMobile ? "10px" : undefined,
        },
      }}
    >
      <DialogTitle sx={{ fontSize: "26px" }}>Add Team Member</DialogTitle>
      <DialogContent>
        <Box>
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
                  justifyContent="left"
                  flexDirection="column"
                  gap="20px"
                  width="100%"
                >
                  <TextField
                    variant="filled"
                    label="Username"
                    type="text"
                    name="username"
                    onBlur={handleBlur}
                    value={values.username}
                    onChange={handleChange}
                    error={!!touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                    sx={{}}
                  />
                  <TextField
                    variant="filled"
                    onBlur={handleBlur}
                    label="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{}}
                  />
                  <TextField
                    variant="filled"
                    onBlur={handleBlur}
                    label="Access"
                    select
                    name="access"
                    value={values.access}
                    onChange={handleChange}
                    error={!!touched.access && !!errors.access}
                    helperText={touched.access && errors.access}
                    sx={{}}
                  >
                    <MenuItem value="Member">Member</MenuItem>
                  </TextField>
                </Box>
                <Box display="flex" justifyContent="right" mt="20px">
                  <Button
                    type="submit"
                    sx={{
                      backgroundColor: colors.greenAccent[500],
                      ":hover": {
                        backgroundColor: colors.greenAccent[600],
                      },
                      fontSize: "18px",
                      width: "100px",
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
