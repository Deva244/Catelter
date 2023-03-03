import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { tokens } from "../theme";
import { toast } from "react-toastify";
import { getCats } from "../features/cat/catSlice";
import { reset, submitForm } from "../features/form/formSlice";
import { useParams } from "react-router-dom";

export default function AdoptionForm() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const { choose } = useParams();

  const chooseCat = choose.split("=");

  const isNonMobile = useMediaQuery("(min-width: 750px)");

  const { cats } = useSelector((store) => store.cat);

  const [catsData, setCatsData] = useState([]);

  useEffect(() => {
    if (cats.length === 0) {
      dispatch(getCats());
    }
    if (cats.length > 0) {
      setCatsData(cats);
    }
  }, [cats]);

  const { message, isSuccess, isError } = useSelector((store) => store.form);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    }
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [isSuccess, isError]);

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    contact: "",
    petOwner: false,
    pets: "",
    petCharacter: "",
    living: "",
    children: false,
    chooseCat: chooseCat[0] === "yes" ? true : false,
    cat: chooseCat[0] === "yes" ? chooseCat[1] : "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("*required"),
    phone: yup
      .number()
      .required("*required")
      .integer()
      .positive()
      .typeError("Phone can only contain numbers"),
    email: yup.string().email().required("*required"),
    contact: yup.string().required("*required"),
    living: yup.string().required("*required"),
    children: yup.boolean().required("*required"),
    petOwner: yup.boolean().required("*required"),
    pets: yup.string().when("petOwner", {
      is: true,
      then: yup.string().required("*required"),
    }),
    petCharacter: yup.string().when("petOwner", {
      is: true,
      then: yup.string().required("*required"),
    }),
    chooseCat: yup.boolean().required("*required"),
    cat: yup.string().when("chooseCat", {
      is: true,
      then: yup.string().required("*required"),
    }),
  });

  function handleFormSubmit(values) {
    const children = values.children ? "Yes" : "No";
    const petOwner = values.petOwner ? "Yes" : "No";

    const data = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      contact: values.contact,
      petOwner: petOwner,
      pets: values.petOwner ? values.pets : "",
      character: values.petOwner ? values.petCharacter : "",
      living: values.living,
      children: children,
      selectedCat: values.chooseCat ? values.cat : "",
    };

    dispatch(submitForm(data));
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
      mt="7rem"
    >
      <Typography variant="h2" sx={{ mb: 1 }}>
        Adoption Form
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
              width={isNonMobile ? "60vw" : "85vw"}
            >
              <TextField
                fullWidth
                variant="filled"
                label="Your fullname"
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
                label="Your phone number"
                type="text"
                name="phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{
                  mb: 2,
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="When can we reach you?"
                type="text"
                name="contact"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{
                  mb: 2,
                }}
              />
              <TextField
                fullWidth
                select
                variant="filled"
                label="Will your future pet be indoors, outdoors or both?"
                type="text"
                name="living"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.living}
                error={!!touched.living && !!errors.living}
                helperText={touched.living && errors.living}
                sx={{
                  mb: 2,
                  mr: "auto",
                  "& .MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                  },
                }}
              >
                <MenuItem value="Indoors">Indoors</MenuItem>
                <MenuItem value="Outdoors">Outdoors</MenuItem>
                <MenuItem value="Both">Both</MenuItem>
              </TextField>
              <FormControlLabel
                label="Do you have small children in your household? (Some pets are more used to children than others)"
                control={
                  <Checkbox
                    name="children"
                    onChange={handleChange}
                    value={values.children}
                  />
                }
                sx={{
                  mr: "auto",
                  "& .MuiCheckbox-root.Mui-checked": {
                    color: colors.greenAccent[400],
                  },
                }}
              />
              <FormControlLabel
                label="Do you already own any pets?"
                control={
                  <Checkbox
                    name="petOwner"
                    onChange={handleChange}
                    value={values.petOwner}
                  />
                }
                sx={{
                  mr: "auto",
                  "& .MuiCheckbox-root.Mui-checked": {
                    color: colors.greenAccent[400],
                  },
                }}
              />
              {values.petOwner && (
                <TextField
                  fullWidth
                  variant="filled"
                  label="How many and what are they?"
                  type="text"
                  name="pets"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.pets}
                  error={!!touched.pets && !!errors.pets}
                  helperText={touched.pets && errors.pets}
                  sx={{
                    mb: 2,
                  }}
                />
              )}
              {values.petOwner && (
                <TextField
                  fullWidth
                  variant="filled"
                  label="How would you describe their character?"
                  type="text"
                  maxRows={3}
                  multiline
                  name="petCharacter"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.petCharacter}
                  error={!!touched.petCharacter && !!errors.petCharacter}
                  helperText={touched.petCharacter && errors.petCharacter}
                  sx={{
                    mb: 2,
                  }}
                />
              )}
              <FormControlLabel
                label="Do you already have your eyes on one of our cats?"
                control={
                  <Checkbox
                    name="chooseCat"
                    onChange={handleChange}
                    value={values.chooseCat}
                  />
                }
                sx={{
                  mr: "auto",
                  "& .MuiCheckbox-root.Mui-checked": {
                    color: colors.greenAccent[400],
                  },
                }}
              />
              {values.chooseCat && (
                <TextField
                  fullWidth
                  variant="filled"
                  label="Which cat?"
                  select
                  name="cat"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cat}
                  error={!!touched.cat && !!errors.cat}
                  helperText={touched.cat && errors.cat}
                  sx={{
                    mb: 2,
                    mr: "auto",
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                    },
                    "& #menu-cat": {
                      height: "10rem",
                    },
                  }}
                >
                  {catsData.map((cat) => {
                    return (
                      <MenuItem value={cat.name} key={cat._id}>
                        <Avatar alt={cat.name} src={cat.imageUrl} />
                        <Typography sx={{ ml: 2 }}>{cat.name}</Typography>
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
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
                <Typography variant="h5">Submit Form</Typography>
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}
