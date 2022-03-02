import { useEffect, useRef, useState } from "react";
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
  { field: "state", headerName: "State", width: 250 },
  {
    field: "city",
    headerName: "City",
    width: 300,
    //   format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "treatment",
    headerName: "Treatment",
    width: 300,
    //   format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(name, state, city, treatment) {
  return {
    name,
    state,
    city,
    treatment,
    id: Math.random().toString(36).substring(2, 9),
  };
}

const rows = [
  createData("Nancy Kataria", "Punjab", "Hoshiarpur", "Bladder"),
  createData("Nikhil Srivastava", "Rajasthan", "Jaipur", "Eyes"),
  createData("Maya Sharma", "Chandigarh", "Chandigarh", "Skin"),
  createData("Harjot Singh Gill", "Punjab", "Ludhiana", "Brain"),
  createData("Raveesh Malhotra", "Punjab", "Jalandhar", "Eyes"),
  createData("Jatin Kumar", "Himachal", "Ludhiana", "Allergies"),
  createData("Aman Juyal", "Punjab", "Kharar", "Skin"),
  createData("Negi Karn", "Punjab", "Mohali", "Weakness"),
  createData("Prikshit Saraswat", "Haryana", "Panchkula", "Sinus"),
  createData("Siddharth Bharmoria", "Punjab", "Kharar", "Eyes"),
  createData("Manya Sharma", "Chandigarh", "Chandigarh", "Skin"),
  createData("Sunny Kumar", "Haryana", "Panchkula", "Skin"),
  createData("Scooby Dooby", "Punjab", "Mohali", "Hairfall"),
  createData("Tanmya Viswas", "Gujrat", "Ahemdabad", "Brain Damage"),
  createData("Rishabh Kant", "Uttar Pardesh", "Kanpur", "Depression"),
  createData("Anoop Patel", "Uttar Pardesh", "Mirzapur", "Allergies"),
];

function PatientList({ roleType }) {
  const [patientList, setPatientList] = useState([]);
  const [tableColumn, setTableColumn] = useState([]);
  const [showEditModal, toggleEditModal] = useState(false);
  const [showDeleteConfirmation, toggleDeleteModal] = useState(false);
  const [modalType, setModalType] = useState(undefined);
  const gridTableApiRef = useRef(null);
  const [currentPatientToBeDeleted, setCurrentPatientEditDetails] = useState(undefined);
  const [patientToBeDeleted, setPatientToBeDeleted] = useState(undefined);

  useEffect(() => {
    if (roleType === "staff" && patientList.length) {
      columns.push({
        minWidth: 200,
        field: "actions",
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

    setPatientList(rows);
  }, [roleType, patientList.length]);

  function onEditDoctor(params) {
    toggleEditModal(true);
    setCurrentPatientEditDetails(params.row);
    setModalType("edit");

    if (!gridTableApiRef.current) {
      gridTableApiRef.current = params.api;
    }
  }

  function onDeleteDoctor(params) {
    setPatientToBeDeleted(params.row);
    toggleDeleteModal(true);

    if (!gridTableApiRef.current) {
      gridTableApiRef.current = params.api;
    }
  }

  function handleModalInputChange(e) {
    const { name, value } = e.target;
    const userData = { ...currentPatientToBeDeleted };
    userData[name] = value;
    setCurrentPatientEditDetails(userData);
  }

  function saveEditedData() {
    // TODO: validate data

    const rowIndex = gridTableApiRef.current.getRowIndex(
      currentPatientToBeDeleted.id
    );
    const tableRows = [...patientList];
    tableRows[rowIndex] = currentPatientToBeDeleted;
    setPatientList(tableRows);
    toggleEditModal(false);
    setCurrentPatientEditDetails(undefined);
  }

  function discardEditChanges() {
    toggleEditModal(false);
    setCurrentPatientEditDetails(undefined);
  }

  function discardDelete() {
    toggleDeleteModal(false);
    setPatientToBeDeleted(undefined);
  }

  function deleteUser() {
    const rowIndex = gridTableApiRef.current.getRowIndex(patientToBeDeleted.id);
    const tableRows = [...patientList];
    tableRows.splice(rowIndex, 1);
    setPatientList(tableRows);
    toggleDeleteModal(false);
    setPatientToBeDeleted(undefined);
  }

  function onAddNew() {
    toggleEditModal(true);
    setModalType("new");
    setCurrentPatientEditDetails(createData("", "", "", ""));
  }

  function addNewUser() {
    const tableRows = [...patientList];
    tableRows.push(currentPatientToBeDeleted);
    setPatientList(tableRows);
    toggleEditModal(false);
    setCurrentPatientEditDetails(undefined);
  }

  return (
    <div className="patient-list">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={patientList}
            columns={tableColumn}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
          />

          {roleType === "staff" && (
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
                value={currentPatientToBeDeleted.name}
                onChange={handleModalInputChange}
              />
              <TextField
              className="edit-fields"
                id="outlined-basic"
                name="state"
                label="State"
                variant="outlined"
                value={currentPatientToBeDeleted.state}
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
                value={currentPatientToBeDeleted.city}
                onChange={handleModalInputChange}
              />
              <TextField
              className="edit-fields"
                id="outlined-basic"
                type="number"
                name="treatment"
                label="Treatment"
                variant="outlined"
                value={currentPatientToBeDeleted.treatment}
                onChange={handleModalInputChange}
              />
              </div>
              <div className="edit-modal-action">
                {modalType === "edit" && (
                  <div className="modal-buttons">
                    <Button id="safe" variant="contained" onClick={saveEditedData}>
                      Save Details
                    </Button>
                    <Button id="danger" variant="contained" onClick={discardEditChanges}>
                      Discard
                    </Button>
                  </div>
                )}
                {modalType === "new" && (
                  <div className="modal-buttons">
                    <Button id="safe" variant="contained" onClick={addNewUser}>
                      Add
                    </Button>
                    <Button id="danger" variant="contained" onClick={discardEditChanges}>
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

export default PatientList;
