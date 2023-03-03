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
import { useEffect } from "react";
import { useState } from "react";
import { getAllUsers, reset } from "../../features/auth/authSlice";
import { deleteUser } from "../../features/auth/authSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import AddModeratorOutlinedIcon from "@mui/icons-material/AddModeratorOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import Header from "../../components/Header";
import AddMember from "../../components/admin/AddMember";

export default function Team() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const isNonMobile = useMediaQuery("(min-width:750px)");

  const { users, userData, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getAllUsers());
    }
    if (users.length > 0) {
      setUsersData(users);
    }
  }, [users]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
    }
    dispatch(reset());
  }, [isSuccess, isError]);

  const [open, setOpen] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const openDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [usersData, setUsersData] = useState([]);

  const [selectedRow, setSelectedRow] = useState("");

  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (selectedRow.length != 0) {
      const selectedUser = usersData.filter((cat) => cat._id === selectedRow);
      setNickname(selectedUser[0].nickname);
    }
  }, [selectedRow]);

  function handleSubmit() {
    dispatch(getAllUsers());
    setUsersData(users);
    handleClose();
  }

  const handleDelete = () => {
    openDeleteModal();
  };

  const confirmDelete = async () => {
    await dispatch(deleteUser(selectedRow));
    dispatch(getAllUsers());
    closeDeleteModal();
    setUsersData(users);
  };

  const actionColumn = {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    headerAlign: "center",
    maxWidth: 150,
    minWidth: 100,
    renderCell: ({ row: { access } }) => {
      return (
        <Box display="flex" justifyContent="center" m="0 auto">
          {access === "Member" && (
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
              onClick={handleDelete}
            >
              <DeleteIcon />
            </Button>
          )}
        </Box>
      );
    },
  };

  // Table columns
  const columns = [
    {
      field: "image",
      headerName: "",
      maxWidth: 50,
      renderCell: ({ row: { image, imageUrl, name } }) => {
        if (image === "image") {
          return <Avatar sx={{ width: 35, height: 35 }} />;
        } else {
          return <Avatar src={imageUrl} sx={{ width: 35, height: 35 }} />;
        }
      },
    },
    {
      field: "nickname",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 80,
    },
    {
      field: `joined`,
      headerName: "Joined",
      flex: 1,
      maxWidth: 250,
      minWidth: 120,
    },
    {
      field: "access",
      headerName: "Access",
      headerAlign: "center",
      flex: 1,
      maxWidth: 180,
      minWidth: 110,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="100px"
            m="0 auto"
            display="flex"
            justifyContent="center"
            p="5px"
            bgcolor={
              access === "Admin"
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="5px"
          >
            {access === "Admin" ? (
              <AdminPanelSettingsOutlinedIcon />
            ) : (
              <VerifiedUserOutlinedIcon />
            )}
            <Typography
              variant="h5"
              sx={{ ml: "6px", color: colors.grey[100] }}
            >
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  if (userData.access === "Admin") {
    columns.push(actionColumn);
  }

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
          >{`Delete "${nickname}"?`}</Typography>
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TEAM" subtitle="Manage team members" />
        {userData.access === "Admin" && (
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
              <AddModeratorOutlinedIcon />
              <Typography
                variant="h5"
                sx={{
                  color: colors.primary[500],
                  display: "flex",
                  alignItems: "center",
                  ml: "5px",
                }}
              >
                Add
              </Typography>
            </Button>
            <AddMember
              submit={handleSubmit}
              open={open}
              onClose={handleClose}
            />
          </Box>
        )}
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
          rows={usersData}
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
