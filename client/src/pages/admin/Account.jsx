import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import {
  Box,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Modal,
  Avatar,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import {
  deleteUser,
  getAllUsers,
  getUserData,
  logout,
  reset,
  updateUser,
} from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { userData, isSuccess, isError, message } = useSelector(
    (store) => store.auth
  );

  useEffect(() => {
    if (userData.length === 0) {
      dispatch(getUserData());
    }
  }, [userData]);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [deleteModal, setDeleteModal] = useState(false);

  const openDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const handleDelete = () => {
    openDeleteModal();
  };

  const confirmDelete = async () => {
    await dispatch(deleteUser(userData.id));
    dispatch(logout());
    navigate("/");
  };

  const initialValues = {
    nickname: userData.nickname,
    image: "",
  };

  const validationSchema = yup.object().shape({
    nickname: yup.string(),
    image: yup.string(),
  });

  async function handleFormSubmit(values) {
    const formData = new FormData();

    formData.append("nickname", values.nickname);
    formData.append(
      "image",
      values.image.length === 0 ? userData.image : values.image
    );
    formData.append("id", userData.id);
    formData.append("type", "update details");

    await dispatch(updateUser(formData));
    navigate("/admin");
    dispatch(getUserData());
    dispatch(getAllUsers());
  }

  const passwordInitialValues = {
    oldPassword: "",
    confirmOldPassword: "",
    newPassword: "",
  };

  const passwordValidationSchema = yup.object().shape({
    oldPassword: yup.string().required("*required"),
    confirmOldPassword: yup
      .string()
      .required("*required")
      .oneOf([yup.ref("oldPassword"), null], "Passwords do not match"),
    newPassword: yup.string().required("*required"),
  });

  function handleChangePassword(values) {
    const formData = new FormData();

    formData.append("oldPassword", values.oldPassword);
    formData.append("newPassword", values.newPassword);
    formData.append("id", userData.id);
    formData.append("type", "change password");

    dispatch(updateUser(formData));
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    }
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isSuccess, isError]);

  return (
    <Box sx={{ m: isNonMobile ? "0 10vw" : "15px 20px" }}>
      <Header title="Account" />
      <Modal open={deleteModal} onClose={closeDeleteModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: colors.primary[400],
            border: "0px solid #000",
            borderRadius: "5px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: colors.grey[100], textAlign: "center" }}
          >
            Are you sure you want to delete your account? This action is
            irreversible.
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            p="15px 15px 0 15px"
          >
            <Button
              onClick={confirmDelete}
              sx={{
                m: "5px",
                backgroundColor: colors.redAccent[500],
                ":hover": {
                  backgroundColor: colors.redAccent[600],
                },
              }}
            >
              Delete
            </Button>
            <Button
              sx={{
                m: "5px",
                backgroundColor: colors.greenAccent[500],
                ":hover": {
                  backgroundColor: colors.greenAccent[600],
                },
              }}
              onClick={closeDeleteModal}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        p="20px 0"
        bgcolor={isNonMobile ? colors.primary[400] : undefined}
      >
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{
            bgcolor: colors.primary[600],
            width: isNonMobile ? "80%" : "100%",
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" sx={{ width: "33%", flexShrink: 0 }}>
              Account Details
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Your account details
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              ml: isNonMobile ? "2rem" : undefined,
              display: isNonMobile ? "flex" : "grid",
              gridTemplateColumns: "repeat(2, minmax(0,1fr))",
              flexDirection: "row",
              alignItems: "center",
              "& p": {
                mb: 1,
              },
            }}
          >
            {userData.image === "image" ? (
              <Avatar sx={{ width: 140, height: 140, gridColumn: "span 2" }} />
            ) : (
              <Avatar
                src={userData.imageUrl}
                sx={{ width: 140, height: 140, gridColumn: "span 2" }}
              />
            )}
            <Box
              ml={isNonMobile ? "2rem" : undefined}
              mt="20px"
              gridColumn="span 2"
            >
              <Typography>Username: {userData.username}</Typography>
              <Typography>Nickname: {userData.nickname}</Typography>
              <Typography>Joined: {userData.joined}</Typography>
              <Typography>Access: {userData.access}</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={{
            bgcolor: colors.primary[600],
            width: isNonMobile ? "80%" : "100%",
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" sx={{ width: "33%", flexShrink: 0 }}>
              Edit Details
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Edit your details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
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
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    flexDirection="column"
                    gap="25px"
                    width={isNonMobile ? "30%" : "95%"}
                    ml={isNonMobile ? "2rem" : undefined}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      label="Nickname"
                      type="text"
                      name="nickname"
                      onBlur={handleBlur}
                      value={values.nickname}
                      onChange={handleChange}
                      error={!!touched.nickname && !!errors.nickname}
                      helperText={touched.nickname && errors.nickname}
                      sx={{}}
                    />
                    <TextField
                      fullWidth
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
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: `currentColor !important`,
                          opacity: "0.2",
                          borderWidth: `1px !important`,
                          cursor: "pointer",
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
                        fontSize: "16px",
                        width: "80px",
                      }}
                    >
                      Update
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          sx={{
            bgcolor: colors.primary[600],
            width: isNonMobile ? "80%" : "100%",
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" sx={{ width: "33%", flexShrink: 0 }}>
              Change Password
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Change your password
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Formik
              onSubmit={handleChangePassword}
              initialValues={passwordInitialValues}
              validationSchema={passwordValidationSchema}
            >
              {({
                touched,
                errors,
                values,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    flexDirection="column"
                    gap="25px"
                    width={isNonMobile ? "30%" : "95%"}
                    ml={isNonMobile ? "2rem" : undefined}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      label="Old Password"
                      type="password"
                      name="oldPassword"
                      onBlur={handleBlur}
                      value={values.oldPassword}
                      onChange={handleChange}
                      error={!!touched.oldPassword && !!errors.oldPassword}
                      helperText={touched.oldPassword && errors.oldPassword}
                      sx={{}}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      label="Confirm Old Password"
                      type="password"
                      name="confirmOldPassword"
                      onBlur={handleBlur}
                      value={values.confirmOldPassword}
                      onChange={handleChange}
                      error={
                        !!touched.confirmOldPassword &&
                        !!errors.confirmOldPassword
                      }
                      helperText={
                        touched.confirmOldPassword && errors.confirmOldPassword
                      }
                      sx={{}}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      label="New Password"
                      type="password"
                      name="newPassword"
                      onBlur={handleBlur}
                      value={values.newPassword}
                      onChange={handleChange}
                      error={!!touched.newPassword && !!errors.newPassword}
                      helperText={touched.newPassword && errors.newPassword}
                      sx={{}}
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
                        fontSize: "16px",
                        width: "80px",
                      }}
                    >
                      Update
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </AccordionDetails>
        </Accordion>
        <Button
          sx={{
            color: colors.redAccent[400],
            ":focus": {
              outline: "none",
            },
            mr: "auto",
            mt: "20px",
            pl: "20px",
          }}
          onClick={handleDelete}
        >
          <DeleteIcon />
          <Typography>Delete your account</Typography>
        </Button>
      </Box>
    </Box>
  );
}
