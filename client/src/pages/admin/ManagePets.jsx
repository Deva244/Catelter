import {
  Box,
  Typography,
  useTheme,
  Button,
  Modal,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getCats, resetCat } from "../../features/cat/catSlice";
import { useEffect } from "react";
import { useState } from "react";
import { deleteCat } from "../../features/cat/catSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../../components/Header";
import AddCat from "../../components/admin/AddCat";
import UpdateCat from "../../components/admin/UpdateCat";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export default function Pets() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const isNonMobile = useMediaQuery("(min-width:750px)");

  const { cats, isSuccess, isError, message } = useSelector(
    (state) => state.cat
  );

  const [catsData, setCatsData] = useState([]);

  useEffect(() => {
    if (cats.length === 0) {
      dispatch(getCats());
    }
    if (cats.length > 0) {
      setCatsData(cats);
    }
  }, [cats]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const openDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelectedRow("");
    setSelectedCat("");
  };

  const [editModal, setEditModal] = useState(false);

  const openEditModal = () => setEditModal(true);
  const closeEditModal = () => {
    setEditModal(false);
    setSelectedRow("");
    setSelectedCat("");
  };

  const [selectedRow, setSelectedRow] = useState("");

  const [selectedCat, setSelectedCat] = useState("");

  useEffect(() => {
    if (selectedRow.length != 0) {
      const cat = catsData.filter((cat) => cat._id === selectedRow);
      setSelectedCat(cat[0]);
    }
  }, [selectedRow]);

  function handleSubmit() {
    dispatch(getCats());
    setCatsData(cats);
    handleClose();
  }

  function handleUpdate() {
    dispatch(getCats());
    setCatsData(cats);
    closeEditModal();
  }

  const handleDelete = async () => {
    await dispatch(deleteCat(selectedRow));
    dispatch(getCats());
    setCatsData(cats);
    closeDeleteModal();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    }
    if (isError) {
      toast.error(message);
    }
    dispatch(resetCat());
  }, [isSuccess, isError, message]);

  // Table columns
  const columns = [
    {
      field: "imageUrl",
      headerName: "",
      maxWidth: 50,
      renderCell: ({ row: { imageUrl, name } }) => {
        return (
          <Avatar alt={name} src={imageUrl} sx={{ width: 35, height: 35 }} />
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 80,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      maxWidth: 100,
      minWidth: 80,
    },
    {
      field: "age",
      headerName: "Age",
      flex: 1,
      maxWidth: 120,
      minWidth: 80,
    },
    {
      field: "breed",
      headerName: "Breed",
      flex: 1,
      maxWidth: 250,
      minWidth: 80,
    },
    {
      field: "neutered",
      headerName: "Neutered",
      flex: 1,
      maxWidth: 90,
      minWidth: 80,
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
      maxWidth: 110,
      minWidth: 80,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      maxWidth: 150,
      minWidth: 150,
      renderCell: () => {
        return (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              sx={{
                color: colors.blueAccent[500],
                ":hover": {
                  backgroundColor: colors.primary[450],
                },
                ":focus": {
                  outline: "none",
                },
              }}
              onClick={openEditModal}
            >
              <EditIcon />
            </Button>
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
              onClick={openDeleteModal}
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
          >{`Delete "${selectedCat.name}"?`}</Typography>
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
      {/* Update Cat */}
      <UpdateCat
        submit={handleUpdate}
        cat={selectedCat}
        open={editModal}
        onClose={closeEditModal}
      />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PETS" subtitle="Manage pets" />
        {/* Add Cat */}
        <Box>
          <Button
            sx={{
              backgroundColor: colors.greenAccent[500],
              ":hover": {
                backgroundColor: colors.greenAccent[600],
              },
            }}
            onClick={handleOpen}
          >
            <AddOutlinedIcon />
            <Typography variant="h5" sx={{ color: colors.primary[500] }}>
              Add
            </Typography>
          </Button>
          <AddCat submit={handleSubmit} open={open} onClose={handleClose} />
        </Box>
      </Box>
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
          "& .name-column--cell": {
            color: colors.greenAccent[300],
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
          rows={catsData}
          columns={columns}
          getRowId={(row) => row._id}
          onSelectionModelChange={(ids) => {
            if (ids.length === 1) {
              if (selectedRow.length >= 0 && selectedRow != ids[0]) {
                setSelectedRow(ids[0]);
              }
            }
          }}
        />
      </Box>
    </Box>
  );
}
