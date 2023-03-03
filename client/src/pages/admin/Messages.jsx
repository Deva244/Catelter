import {
  Box,
  useTheme,
  Typography,
  Button,
  IconButton,
  Badge,
  useMediaQuery,
  Dialog,
  DialogContent,
  DialogTitle,
  Modal,
  Divider,
} from "@mui/material";
import {
  deleteMessage,
  getAllMessages,
  getUnreadCount,
  updateMessage,
  reset,
} from "../../features/message/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function Messages() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:750px)");

  const { data, unreadCount } = useSelector((store) => store.message);

  const [messages, setMessages] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setSelectedMessage("");
    setSelectedRow("");
  };

  const [selectedRow, setSelectedRow] = useState("");

  const [selectedMessage, setSelectedMessage] = useState("");

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getAllMessages());
    }
    if (data.length > 0) {
      setMessages(data);
    }
    dispatch(getUnreadCount());
    dispatch(reset());
  }, [data]);

  useEffect(() => {
    if (selectedRow.length != 0) {
      const message = messages.filter((message) => message._id === selectedRow);
      setSelectedMessage(message[0]);
      if (!message[0].read) {
        const change = {
          type: "read",
          id: message[0]._id,
        };
        dispatch(updateMessage(change));
      }
    }
  }, [selectedRow]);

  const [deleteModal, setDeleteModal] = useState(false);

  const openDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelectedRow("");
    setSelectedMessage("");
  };

  const handleDelete = async () => {
    await dispatch(deleteMessage(selectedRow));
    dispatch(getAllMessages());
    setMessages(data);
    closeDeleteModal();
  };

  const columns = [
    {
      field: "read",
      headerName: "",
      maxWidth: 40,
      renderCell: ({ row: { read, handled } }) => {
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
            {!read ? (
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
      headerName: "From",
      flex: 1,
      maxWidth: 200,
      minWidth: 80,
      renderCell: ({ row: { name, read } }) => {
        return (
          <Box>
            {!read ? (
              <Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
            ) : (
              <Typography sx={{ fontSize: "0.75rem" }}>{name}</Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "message",
      headerName: "Context",
      flex: 1,
      minWidth: 80,
      renderCell: ({ row: { message, read } }) => {
        return (
          <Box sx={{ overflow: "hidden", whiteSpace: "nowrap" }}>
            {!read ? (
              <Typography
                sx={{
                  fontWeight: "bold",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {message}
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {message}
              </Typography>
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
      <Header title="Messages" subtitle="Manage and View Messages" />
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
        <DialogTitle sx={{ fontSize: "26px" }}>Message</DialogTitle>
        <DialogContent>
          <Box mb="15px">
            <Typography>From: {selectedMessage.name}</Typography>
            <Typography>email: {selectedMessage.email}</Typography>
          </Box>
          <Divider />
          <Typography sx={{ mt: "15px" }}>{selectedMessage.message}</Typography>
          <IconButton
            onClick={() => {
              const change = {
                type: "handle",
                id: selectedMessage._id,
              };
              dispatch(updateMessage(change));
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
            {!selectedMessage.handled ? (
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
                type: "read",
                id: selectedMessage._id,
              };
              dispatch(updateMessage(change));
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

      {selectedMessage != 0 && (
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
            >{`Delete message from "${selectedMessage.name}"?`}</Typography>
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
      )}
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
          rows={messages}
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
