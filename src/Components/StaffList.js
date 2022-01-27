import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Modal, Paper, TextField } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";

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
  { field: "department", headerName: "Department", width: 300 },
  {
    field: "city",
    headerName: "City",
    width: 300,
  },
  {
    field: "experience",
    headerName: "Experience(months)",
    width: 250,
    //   format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(name, department, city, experience) {
  return {
    name,
    department,
    city,
    experience,
    id: Math.random().toString(36).substring(2, 9),
  };
}

const rows = [
  createData("Nancy Kataria", "Attending physician", "Hoshiarpur", 3),
  createData("Nikhil Srivastava", "Registered nurse", "Jaipur", 7),
  createData("Maya Sharma", "practical nurse", "Chandigarh", 12),
  createData("Harjot Singh Gill", "Nurse practitioner", "Ludhiana", 31),
  createData("Raveesh Malhotra", "Physicians assistant", "Jalandhar", 27),
  createData("Jatin Kumar", "Patient advocate", "Ludhiana", 9),
  createData("Aman Juyal", "Patient care technician", "Kharar", 1),
  createData("Negi Karn", "Physical therapist", "Mohali", 13),
  createData("Prikshit Saraswat", "Occupational therapist", "Panchkula", 20),
  createData("Siddharth Bharmoria", "Speech pathologist", "Kharar", 5),
  createData("Manya Sharma", "Hospital pharmacist", "Chandigarh", 19),
  createData("Sunny Kumar", "Social worker", "Panchkula", 11),
  createData("Scooby Dooby", "Dietitian", "Mohali", 2),
  createData("Tanmya Viswas", "Interpreter", "Ahemdabad", 8),
  createData("Rishabh Kant", "Hospital pharmacist", "Kanpur", 0),
  createData("Anoop Patel", "Occupational therapist", "Mirzapur", 1),
];

function StaffList({ roleType }) {
  const [staffList, setStaffList] = useState([]);
  const [tableColumn, setTableColumn] = useState([]);
  const [showEditModal, toggleEditModal] = useState(false);
  const [showDeleteConfirmation, toggleDeleteModal] = useState(false);
  const [modalType, setModalType] = useState(undefined);
  const gridTableApiRef = useRef(null);
  const [currentStaffEditDetails, setCurrentStaffEdit] = useState(undefined);
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
              <Button onClick={() => onEditDoctor(params)}>
                <Edit />
              </Button>
              <Button onClick={() => onDeleteStaff(params)}>
                <Delete />
              </Button>
            </>
          );
        },
      });
    }
    setTableColumn(columns);
    setStaffList(rows);
  }, [roleType]);

  function onEditDoctor(params) {
    toggleEditModal(true);
    console.log(params);
    setCurrentStaffEdit(params.row);

    if (!gridTableApiRef.current) {
      gridTableApiRef.current = params.api;
    }
  }

  function handleModalInputChange(e) {
    const { name, value } = e.target;
    const userData = { ...currentStaffEditDetails };
    userData[name] = value;
    setCurrentStaffEdit(userData);
  }

  function onDeleteStaff(params) {
    setUserToBeDeleted(params.row);
    toggleDeleteModal(true);

    if (!gridTableApiRef.current) {
      gridTableApiRef.current = params.api;
    }
  }

  function saveEditedData() {
    // TODO: validate data

    const rowIndex = gridTableApiRef.current.getRowIndex(
      currentStaffEditDetails.id
    );
    const tableRows = [...staffList];
    tableRows[rowIndex] = currentStaffEditDetails;
    setStaffList(tableRows);
    toggleEditModal(false);
    setCurrentStaffEdit(undefined);
  }

  function discardEditChanges() {
    toggleEditModal(false);
    setCurrentStaffEdit(undefined);
  }

  function discardDelete() {
    toggleDeleteModal(false);
    setUserToBeDeleted(undefined);
  }

  function deleteUser() {
    const rowIndex = gridTableApiRef.current.getRowIndex(userToBeDeleted.id);
    const tableRows = [...staffList];
    tableRows.splice(rowIndex, 1);
    setStaffList(tableRows);
    toggleDeleteModal(false);
    setUserToBeDeleted(undefined);
  }

  function onAddNew() {
    toggleEditModal(true);
    setModalType("new");
    setCurrentStaffEdit(createData("", "", "", ""));
  }

  function addNewUser() {
    const tableRows = [...staffList];
    tableRows.push(currentStaffEditDetails);
    setStaffList(tableRows);
    toggleEditModal(false);
    setCurrentStaffEdit(undefined);
  }

  return (
    <div className="staff-list">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={staffList}
            columns={tableColumn}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
          />

          {roleType === "admin" && (
            <Button id="safe" className="add-button" variant="contained" onClick={onAddNew}>
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
                  value={currentStaffEditDetails.name}
                  onChange={handleModalInputChange}
                />
                <TextField
                className="edit-fields"
                  id="outlined-basic"
                  name="department"
                  label="Department"
                  variant="outlined"
                  value={currentStaffEditDetails.department}
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
                  value={currentStaffEditDetails.city}
                  onChange={handleModalInputChange}
                />
                <TextField
                className="edit-fields"
                  id="outlined-basic"
                  type="number"
                  name="experience"
                  label="Experience"
                  variant="outlined"
                  value={currentStaffEditDetails.experience}
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
              <div className="edit-modal-action">
                {modalType === "edit" && (
                  <>
                    <Button
                      id="safe"
                      variant="contained"
                      onClick={saveEditedData}
                    >
                      Save Details
                    </Button>
                    <Button
                      id="danger"
                      variant="contained"
                      onClick={discardEditChanges}
                    >
                      Discard
                    </Button>
                  </>
                )}
                {modalType === "new" && (
                  <>
                    <Button id="safe" variant="contained" onClick={addNewUser}>
                      Add
                    </Button>
                    <Button
                      id="danger"
                      variant="contained"
                      onClick={discardEditChanges}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
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
                <Button id="danger" variant="contained" onClick={deleteUser}>
                  Delete
                </Button>
                <Button id="safe" variant="contained" onClick={discardDelete}>
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

export default StaffList;
