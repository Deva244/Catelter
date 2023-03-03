import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { addCat } from "../../features/cat/catSlice";
import { tokens } from "../../theme";

export default function AddCat({ submit, open, onClose }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const initialValues = {
    name: "",
    image: "",
    gender: "",
    age: "",
    breed: "",
    health: "",
    neutered: "",
    about: "",
    state: "",
  };

  // Yup Validation Schema
  const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    image: yup.string(),
    gender: yup.string().required("required"),
    age: yup.string().required("required"),
    health: yup.string().required("required"),
    breed: yup.string().required("required"),
    neutered: yup.string().required("required"),
    about: yup.string().required("required"),
    state: yup.string().required("required"),
  });

  async function handleFormSubmit(values) {
    const formData = new FormData();

    formData.append("image", values.image);
    formData.append("name", values.name);
    formData.append("gender", values.gender);
    formData.append("age", values.age);
    formData.append("health", values.health);
    formData.append("breed", values.breed);
    formData.append("neutered", values.neutered);
    formData.append("about", values.about);
    formData.append("state", values.state);

    await dispatch(addCat(formData));
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
          width: "900px",
          p: isNonMobile ? "10px" : undefined,
        },
      }}
    >
      <DialogTitle sx={{ fontSize: "26px" }}>Add Cat</DialogTitle>
      <DialogContent>
        <Box>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {({
              values,
              setFieldValue,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="25px"
                  gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 6",
                    },
                  }}
                >
                  <TextField
                    variant="filled"
                    label="Name"
                    type="text"
                    name="name"
                    onBlur={handleBlur}
                    value={values.name}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{
                      gridColumn: "span 3",
                    }}
                  />
                  <TextField
                    variant="filled"
                    onBlur={handleBlur}
                    label="Age"
                    type="text"
                    name="age"
                    value={values.age}
                    onChange={handleChange}
                    error={!!touched.age && !!errors.age}
                    helperText={touched.age && errors.age}
                    sx={{ gridColumn: "span 3" }}
                  />
                  <TextField
                    label="Health"
                    multiline
                    variant="filled"
                    onBlur={handleBlur}
                    name="health"
                    value={values.health}
                    onChange={handleChange}
                    error={!!touched.health && !!errors.health}
                    helperText={touched.health && errors.health}
                    sx={{ gridColumn: "span 3" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    onBlur={handleBlur}
                    label="Breed"
                    type="text"
                    name="breed"
                    value={values.breed}
                    onChange={handleChange}
                    error={!!touched.breed && !!errors.breed}
                    helperText={touched.breed && errors.breed}
                    sx={{ gridColumn: "span 3" }}
                  />
                  <TextField
                    onBlur={handleBlur}
                    multiline
                    variant="filled"
                    label="About"
                    name="about"
                    value={values.about}
                    onChange={handleChange}
                    error={!!touched.about && !!errors.about}
                    helperText={touched.about && errors.about}
                    sx={{ gridColumn: "span 6" }}
                  />
                  <TextField
                    select
                    variant="outlined"
                    onBlur={handleBlur}
                    label="Gender"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    error={!!touched.gender && !!errors.gender}
                    helperText={touched.gender && errors.gender}
                    sx={{ gridColumn: "span 2" }}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </TextField>
                  <TextField
                    select
                    onBlur={handleBlur}
                    variant="outlined"
                    label="Neutered?"
                    name="neutered"
                    value={values.neutered}
                    onChange={handleChange}
                    error={!!touched.neutered && !!errors.neutered}
                    helperText={touched.neutered && errors.neutered}
                    sx={{ gridColumn: "span 2" }}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </TextField>
                  <TextField
                    select
                    variant="outlined"
                    onBlur={handleBlur}
                    label="State"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    error={!!touched.state && !!errors.state}
                    helperText={touched.state && errors.state}
                    sx={{ gridColumn: "span 2" }}
                  >
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Unavailable">Unavailable</MenuItem>
                    <MenuItem value="Lost">Lost</MenuItem>
                  </TextField>
                  <TextField
                    focused
                    variant="outlined"
                    label="Image"
                    type="file"
                    name="image"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      setFieldValue("image", e.currentTarget.files[0])
                    }
                    error={!!touched.image && !!errors.image}
                    helperText={touched.image && errors.image}
                    sx={{
                      gridColumn: "span 3",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: `currentColor !important`,
                        opacity: "0.2",
                        borderWidth: `1px !important`,
                      },
                      "& .MuiFormLabel-root": {
                        color: `currentColor !important`,
                        opacity: "0.7",
                        fontSize: "14px",
                      },
                      "& .MuiInputBase-input": {
                        cursor: "pointer",
                      },
                    }}
                  />
                </Box>
                <Box display="flex" justifyContent="right" mt="20px">
                  <Button
                    type="submit"
                    color="primary"
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
