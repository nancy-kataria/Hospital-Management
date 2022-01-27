import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Modal, Paper, TextField } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Delete, Edit } from "@material-ui/icons";

const boxModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  display: "flex",
  flexDirection: "column",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { field: "name", headerName: "Name", width: 300 },
  { field: "state", headerName: "State", width: 300 },
  {
    field: "city",
    headerName: "City",
    width: 300,
    //   format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "department",
    headerName: "Department",
    width: 250,
    //   format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(name, state, city, department) {
  return {
    name,
    state,
    city,
    department,
    id: Math.random().toString(36).substring(2, 9),
  };
}

const rows = [
  createData("Nancy Kataria", "Punjab", "Hoshiarpur", "Network Security"),
  createData(
    "Nikhil Srivastava",
    "Rajasthan",
    "Jaipur",
    "Website Maintainence"
  ),
  createData("Maya Sharma", "Chandigarh", "Chandigarh", "Website Maintainence"),
  createData("Harjot Singh Gill", "Punjab", "Ludhiana", "Database Management"),
  createData("Raveesh Malhotra", "Punjab", "Jalandhar", "Tech-Specialists"),
  createData("Jatin Kumar", "Himachal", "Ludhiana", "Network Security"),
  createData("Aman Juyal", "Punjab", "Kharar", "Website Maintainence"),
  createData("Negi Karn", "Punjab", "Mohali", "Network Security"),
  createData(
    "Prikshit Saraswat",
    "Haryana",
    "Panchkula",
    "Database Management"
  ),
  createData("Siddharth Bharmoria", "Punjab", "Kharar", "Tech-Specialists"),
  createData(
    "Manya Sharma",
    "Chandigarh",
    "Chandigarh",
    "Website Maintainence"
  ),
  createData("Sunny Kumar", "Haryana", "Panchkula", "Database Management"),
  createData("Scooby Dooby", "Punjab", "Mohali", "HNetwork Security"),
  createData("Tanmya Viswas", "Gujrat", "Ahemdabad", "Database Management"),
  createData("Rishabh Kant", "Uttar Pardesh", "Kanpur", "Database Management"),
  createData(
    "Anoop Patel",
    "Uttar Pardesh",
    "Mirzapur",
    "Website Maintainence"
  ),
];

function AdminList({ roleType }) {
  const [adminList, setAdminList] = useState([]);
  const [tableColumn, setTableColumn] = useState([]);
  const [showEditModal, toggleEditModal] = useState(false);
  const [showDeleteConfirmation, toggleDeleteModal] = useState(false);
  const [modalType, setModalType] = useState(undefined);
  const gridTableApiRef = useRef(null);
  const [currentAdminEditDetails, setCurrentAdminEdit] = useState(undefined);
  const [userToBeDeleted, setUserToBeDeleted] = useState(undefined);

  useEffect(() => {
    if (roleType === "admin") {
      columns.push({
        width: 220,
        field: "",
        headerName: "Actions",
        renderCell: (params) => {
          return (
            <>
              <Button onClick={() => onEditAdmin(params)}>
                <Edit />
              </Button>
              <Button onClick={() => onDeleteAdmin(params)}>
                <Delete />
              </Button>
            </>
          );
        },
      });
    }
    setTableColumn(columns);
    setAdminList(rows);
  }, [roleType]);

  function handleModalInputChange(e) {
    const { name, value } = e.target;
    const userData = { ...currentAdminEditDetails };
    userData[name] = value;
    setCurrentAdminEdit(userData);
  }

  function onEditAdmin(params) {
    toggleEditModal(true);
    console.log(params);
    setCurrentAdminEdit(params.row);

    if (!gridTableApiRef.current) {
      gridTableApiRef.current = params.api;
    }
  }

  function onDeleteAdmin(params) {
    setUserToBeDeleted(params.row);
    toggleDeleteModal(true);

    if (!gridTableApiRef.current) {
      gridTableApiRef.current = params.api;
    }
  }

  function saveEditedData() {
    // TODO: validate data

    const rowIndex = gridTableApiRef.current.getRowIndex(
      currentAdminEditDetails.id
    );
    const tableRows = [...adminList];
    tableRows[rowIndex] = currentAdminEditDetails;
    setAdminList(tableRows);
    toggleEditModal(false);
    setCurrentAdminEdit(undefined);
  }

  function discardEditChanges() {
    toggleEditModal(false);
    setCurrentAdminEdit(undefined);
  }

  function discardDelete() {
    toggleDeleteModal(false);
    setUserToBeDeleted(undefined);
  }

  function deleteUser() {
    const rowIndex = gridTableApiRef.current.getRowIndex(userToBeDeleted.id);
    const tableRows = [...adminList];
    tableRows.splice(rowIndex, 1);
    setAdminList(tableRows);
    toggleDeleteModal(false);
    setUserToBeDeleted(undefined);
  }

  function onAddNew() {
    toggleEditModal(true);
    setModalType("new");
    setCurrentAdminEdit(createData("", "", "", ""));
  }

  function addNewUser() {
    const tableRows = [...adminList];
    tableRows.push(currentAdminEditDetails);
    setAdminList(tableRows);
    toggleEditModal(false);
    setCurrentAdminEdit(undefined);
  }

  return (
    <div className="doctor-list">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={adminList}
            columns={tableColumn}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
          />

          {roleType === "admin" && (
            <Button id='safe' className="add-button" variant="contained" onClick={onAddNew}>
              Add New
            </Button>
          )}
        </div>

        {showEditModal && (
          <Modal
            open={true}
            onClose={() => {
              toggleEditModal(false);
            }}
          >
            <Box sx={boxModal}>
              <div className="text-fields">
                <TextField
                  className="edit-fields"
                  id="outlined-basic"
                  name="name"
                  label="Name"
                  variant="outlined"
                  value={currentAdminEditDetails.name}
                  onChange={handleModalInputChange}
                />
                <TextField
                  className="edit-fields"
                  id="outlined-basic"
                  name="state"
                  label="State"
                  variant="outlined"
                  value={currentAdminEditDetails.state}
                  onChange={handleModalInputChange}
                />
              </div>
              <div className="text-fields">
                <TextField
                  className="edit-fields"
                  id="outlined-basic"
                  name="city"
                  label="City"
                  variant="outlined"
                  value={currentAdminEditDetails.city}
                  onChange={handleModalInputChange}
                />
                <TextField
                  className="edit-fields"
                  id="outlined-basic"
                  name="department"
                  label="Department"
                  variant="outlined"
                  value={currentAdminEditDetails.department}
                  onChange={handleModalInputChange}
                />
              </div>
              {modalType === "edit" && (
                <div className="modal-buttons">
                  <Button
                    className="modal-button"
                    id='safe'
                    variant="contained"
                    onClick={saveEditedData}
                  >
                    Save Details
                  </Button>
                  <Button
                    className="modal-button"
                    id='danger'
                    variant="contained"
                    onClick={discardEditChanges}
                  >
                    Discard
                  </Button>
                </div>
              )}
              {modalType === "new" && (
                <div className="modal-buttons">
                  <Button
                    className="modal-button"
                    id='safe'
                    variant="contained"
                    onClick={addNewUser}
                  >
                    Add
                  </Button>
                  <Button
                    className="modal-button"
                    id='danger'
                    variant="contained"
                    onClick={discardEditChanges}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </Box>
          </Modal>
        )}

        {showDeleteConfirmation && (
          <Modal
            open={true}
            onClose={() => {
              toggleDeleteModal(false);
            }}
          >
            <Box sx={boxModal}>
              <h3>Are you sure that you want to delete this user?</h3>
              <div className="delete-modal-action">
                <Button id='danger' variant="contained" onClick={deleteUser}>
                  Delete
                </Button>
                <Button id='safe' variant="contained" onClick={discardDelete}>
                  Cancel
                </Button>
              </div>
            </Box>
          </Modal>
        )}
      </Paper>
    </div>
  );
}

export default AdminList;
