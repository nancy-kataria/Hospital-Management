import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Modal, Paper, TextField } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Edit, Delete } from "@material-ui/icons";

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
  { field: "speciality", headerName: "Speciality", width: 300 },
  {
    field: "city",
    headerName: "City",
    width: 300,
  },
  {
    field: "experience",
    headerName: "Experience(years)",
    width: 250,
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(name, speciality, city, experience) {
  return {
    name,
    speciality,
    city,
    experience,
    id: Math.random().toString(36).substring(2, 9),
  };
}

const rows = [
  createData("Nancy Kataria", "Neurologist", "Hoshiarpur", 1),
  createData("Nikhil Srivastava", "Cardio surgeon", "Jaipur", 9),
  createData("Maya Sharma", "Gynecologist", "Chandigarh", 3),
  createData("Harjot Singh Gill", "Neurosurgeon", "Ludhiana", 2),
  createData("Raveesh Malhotra", "Pediatrician", "Jalandhar", 5),
  createData("Jatin Kumar", "Oncologist", "Ludhiana", 1),
  createData("Aman Juyal", "Dermatologist", "Kharar", 5),
  createData("Negi Karn", "General Surgeon", "Mohali", 2),
  createData("Prikshit Saraswat", "Dentist", "Panchkula", 7),
  createData("Siddharth Bharmoria", "Cardiologist", "Kharar", 0),
  createData("Manya Sharma", "Diagnosis", "Chandigarh", 0),
  createData("Sunny Kumar", "Neurologist", "Panchkula",4),
  createData("Scooby Dooby", "Gastrologist", "Mohali", 1),
  createData("Tanmya Viswas", "Orthodontist", "Ahemdabad", 4),
  createData("Rishabh Kant", "Cardiologist", "Kanpur", 7),
  createData("Anoop Patel", "Dentist", "Mirzapur", 1),
];

function DoctorList({ roleType }) {
  const [doctorsList, setDoctorsList] = useState([]);
  const [tableColumn, setTableColumn] = useState([]);
  const [showEditModal, toggleEditModal] = useState(false);
  const [showDeleteConfirmation, toggleDeleteModal] = useState(false);
  const [modalType, setModalType] = useState(undefined);
  const gridTableApiRef = useRef(null);
  const [currentDoctorEditDetails, setCurrentDoctorEdit] = useState(undefined);
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
              <Button onClick={() => onDeleteDoctor(params)}>
                <Delete />
              </Button>
            </>
          );
        },
      });
    }

    setTableColumn(columns);

    setDoctorsList(rows);
  }, [roleType]);

  function onEditDoctor(params) {
    toggleEditModal(true);
    setCurrentDoctorEdit(params.row);
    setModalType("edit");

    if (!gridTableApiRef.current) {
      gridTableApiRef.current = params.api;
    }
  }

  function onDeleteDoctor(params) {
    setUserToBeDeleted(params.row);
    toggleDeleteModal(true);

    if (!gridTableApiRef.current) {
      gridTableApiRef.current = params.api;
    }
  }

  function handleModalInputChange(e) {
    const { name, value } = e.target;
    const userData = { ...currentDoctorEditDetails };
    userData[name] = value;
    setCurrentDoctorEdit(userData);
  }

  function saveEditedData() {
    // TODO: validate data

    const rowIndex = gridTableApiRef.current.getRowIndex(
      currentDoctorEditDetails.id
    );
    const tableRows = [...doctorsList];
    tableRows[rowIndex] = currentDoctorEditDetails;
    setDoctorsList(tableRows);
    toggleEditModal(false);
    setCurrentDoctorEdit(undefined);
  }

  function discardEditChanges() {
    toggleEditModal(false);
    setCurrentDoctorEdit(undefined);
  }

  function discardDelete() {
    toggleDeleteModal(false);
    setUserToBeDeleted(undefined);
  }

  function deleteUser() {
    const rowIndex = gridTableApiRef.current.getRowIndex(userToBeDeleted.id);
    const tableRows = [...doctorsList];
    tableRows.splice(rowIndex, 1);
    setDoctorsList(tableRows);
    toggleDeleteModal(false);
    setUserToBeDeleted(undefined);
  }

  function onAddNew() {
    toggleEditModal(true);
    setModalType("new");
    setCurrentDoctorEdit(createData("", "", "", ""));
  }

  function addNewUser() {
    const tableRows = [...doctorsList];
    tableRows.push(currentDoctorEditDetails);
    setDoctorsList(tableRows);
    toggleEditModal(false);
    setCurrentDoctorEdit(undefined);
  }

  return (
    <div className="doctor-list">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={doctorsList}
            columns={tableColumn}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
          />

          {roleType === "admin" && (
            <Button
              id="safe"
              className="add-button"
              variant="contained"
              onClick={onAddNew}
            >
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
                  value={currentDoctorEditDetails.name}
                  onChange={handleModalInputChange}
                />
                <TextField
                  className="edit-fields"
                  id="outlined-basic"
                  name="speciality"
                  label="Speciality"
                  variant="outlined"
                  value={currentDoctorEditDetails.speciality}
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
                  value={currentDoctorEditDetails.city}
                  onChange={handleModalInputChange}
                />
                <TextField
                  className="edit-fields"
                  id="outlined-basic"
                  type="number"
                  name="experience"
                  label="Experience"
                  variant="outlined"
                  value={currentDoctorEditDetails.experience}
                  onChange={handleModalInputChange}
                />
              </div>
              <div className="edit-modal-action">
                {modalType === "edit" && (
                  <div className="modal-buttons">
                    <Button
                      className="modal-button"
                      id="safe"
                      variant="contained"
                      onClick={saveEditedData}
                    >
                      Save Details
                    </Button>
                    <Button
                      className="modal-button"
                      id="danger"
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
                      id="safe"
                      variant="contained"
                      onClick={addNewUser}
                    >
                      Add
                    </Button>
                    <Button
                      className="modal-button"
                      id="danger"
                      variant="contained"
                      onClick={discardEditChanges}
                    >
                      Cancel
                    </Button>
                  </div>
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

export default DoctorList;
