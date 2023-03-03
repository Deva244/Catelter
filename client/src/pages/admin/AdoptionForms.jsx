import {
  Box,
  useTheme,
  Modal,
  Typography,
  Button,
  IconButton,
  Badge,
  useMediaQuery,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import {
  deleteForm,
  getAllForms,
  getUnviewedCount,
  updateForm,
  reset,
} from "../../features/form/formSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function AdoptionForm() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:750px)");

  const { forms, unviewedCount } = useSelector((store) => store.form);

  const [formsData, setForms] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setSelectedForm("");
    setSelectedRow("");
  };

  const [selectedRow, setSelectedRow] = useState("");

  const [selectedForm, setSelectedForm] = useState("");

  useEffect(() => {
    if (forms.length === 0) {
      dispatch(getAllForms());
    }
    if (forms.length > 0) {
      setForms(forms);
    }
    dispatch(getUnviewedCount());
    dispatch(reset());
  }, [forms]);

  useEffect(() => {
    if (selectedRow.length != 0) {
      const form = formsData.filter((form) => form._id === selectedRow);
      setSelectedForm(form[0]);
      if (!form[0].viewed) {
        const change = {
          type: "view",
          id: form[0]._id,
        };
        dispatch(updateForm(change));
      }
    }
  }, [selectedRow]);

  const [deleteModal, setDeleteModal] = useState(false);

  const openDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelectedRow("");
    setSelectedForm("");
  };

  const handleDelete = async () => {
    await dispatch(deleteForm(selectedRow));
    dispatch(getAllForms());
    setForms(forms);
    closeDeleteModal();
  };

  const columns = [
    {
      field: "viewed",
      headerName: "",
      maxWidth: 40,
      renderCell: ({ row: { viewed, handled } }) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            m="0 auto"
            sx={{
              "& .MuiBadge-badge": {
                p: "6px",
                borderRadius: "50%",
              },
            }}
          >
            {!viewed ? (
              <Badge badgeContent="" color="error" variant="dot"></Badge>
            ) : handled ? (
              <CheckCircleOutlineIcon
                sx={{
                  bgcolor: "green",
                  borderRadius: "50%",
                  color: colors.grey[900],
                }}
              />
            ) : null}
          </Box>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 80,
      renderCell: ({ row: { name, viewed } }) => {
        return (
          <Box>
            {!viewed ? (
              <Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
            ) : (
              <Typography sx={{ fontSize: "0.75rem" }}>{name}</Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 80,
      renderCell: ({ row: { email, viewed } }) => {
        return (
          <Box>
            {!viewed ? (
              <Typography sx={{ fontWeight: "bold" }}>{email}</Typography>
            ) : (
              <Typography sx={{ fontSize: "0.75rem" }}>{email}</Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      minWidth: 80,
      renderCell: ({ row: { phone, viewed } }) => {
        return (
          <Box>
            {!viewed ? (
              <Typography sx={{ fontWeight: "bold" }}>{phone}</Typography>
            ) : (
              <Typography sx={{ fontSize: "0.75rem" }}>{phone}</Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "recievedAt",
      headerName: "Recieved",
      flex: 1,
      maxWidth: 180,
      minWidth: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      maxWidth: 150,
      minWidth: 100,
      renderCell: () => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            m="0 auto"
          >
            <Button
              sx={{
                color: colors.redAccent[500],
                ":hover": {
                  backgroundColor: colors.primary[450],
                },
                ":focus": {
                  outline: "none",
                },
              }}
              onClick={async () => {
                await openDeleteModal();
                setOpen(false);
              }}
            >
              <DeleteIcon />
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ m: isNonMobile ? "20px 40px" : "15px 20px" }}>
      <Header title="Forms" subtitle="Manage and View Forms" />
      <Dialog
        open={open}
        onClose={handleClose}
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
        <DialogTitle sx={{ fontSize: "26px" }}>Adoption Form</DialogTitle>
        <DialogContent>
          <Typography>Name: {selectedForm.name}</Typography>
          <Typography>Email: {selectedForm.email}</Typography>
          <Typography>Phone: {selectedForm.phone}</Typography>
          <Typography sx={{ mb: "15px" }}>
            Contact: {selectedForm.contact}
          </Typography>
          <Divider />
          <Box mb="1rem" mt="15px">
            <Typography>
              <b>Already a pet Owner:</b> {selectedForm.petOwner}
            </Typography>
            {selectedForm.petOwner === "Yes" && (
              <Typography sx={{ ml: "1.5rem", mt: "0.2rem" }}>
                <b>What pets and how many:</b> {selectedForm.pets}
              </Typography>
            )}
            {selectedForm.petOwner === "Yes" && (
              <Typography sx={{ ml: "1.5rem" }}>
                <b>What's their character:</b> {selectedForm.character}
              </Typography>
            )}
          </Box>
          <Typography sx={{ mb: "1rem" }}>
            <b>Where are you planning to keep your new cat:</b>{" "}
            {selectedForm.living}
          </Typography>
          <Typography>
            <b>Has children:</b> {selectedForm.children}
          </Typography>
          <Typography sx={{ mt: "1rem" }}>
            <b>Desired cat:</b> {selectedForm.selectedCat}
          </Typography>
          <IconButton
            onClick={() => {
              const change = {
                type: "handle",
                id: selectedForm._id,
              };
              dispatch(updateForm(change));
              handleClose();
            }}
            sx={{
              position: "absolute",
              top: 25,
              right: 60,
              ":focus": {
                outline: "none",
              },
            }}
          >
            {!selectedForm.handled ? (
              <CheckCircleOutlineIcon />
            ) : (
              <CheckCircleOutlineIcon
                sx={{
                  bgcolor: "green",
                  borderRadius: "50%",
                  color: colors.grey[900],
                }}
              />
            )}
          </IconButton>
          <IconButton
            onClick={() => {
              const change = {
                type: "view",
                id: selectedForm._id,
              };
              dispatch(updateForm(change));
              handleClose();
            }}
            sx={{
              position: "absolute",
              top: 25,
              right: 20,
              ":focus": {
                outline: "none",
              },
            }}
          >
            <VisibilityOffOutlinedIcon />
          </IconButton>
        </DialogContent>
      </Dialog>
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
            variant="h4"
            sx={{ textAlign: "center" }}
          >{`Delete message from "${selectedForm.name}"?`}</Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            p="15px 15px 0 15px"
          >
            <Button
              onClick={handleDelete}
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
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            ":focus": {
              outline: "none !important",
            },
            ":focus-within": {
              outlineOffset: "0 !important",
              outlineWidth: "0 !important",
            },
            cursor: "pointer",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
            "& p": {
              m: 0,
            },
          },
          "& .css-nea34w-MuiInputBase-root-MuiTablePagination-select .MuiTablePagination-select":
            {
              pl: 0,
              mt: 0.3,
            },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={formsData}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            sorting: {
              sortModel: [{ field: "recievedAt", sort: "desc" }],
            },
          }}
          onSelectionModelChange={(ids) => {
            if (ids.length === 1) {
              if (selectedRow.length >= 0 && selectedRow != ids[0]) {
                setSelectedRow(ids[0]);
              }
            }
            handleOpen();
          }}
        />
      </Box>
    </Box>
  );
}
