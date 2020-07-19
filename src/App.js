import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import AddRowForm from "./AddRowForm";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Modal, Button } from "react-bootstrap";

function App() {
  const columnDefs = [
    { headerName: "Track", field: "track" },
    { headerName: "Artist", field: "artist" },
    { headerName: "Album", field: "album" },
    { headerName: "Part Label", field: "part" },
    { headerName: "Tuning", field: "tuning" },
    { headerName: "Notes", field: "notes" },
  ];

  const [rowData, setRowData] = useState(null);
  const [modalShown, setModalShown] = useState(false);

  const handleModalClose = () => setModalShown(false);
  const handleModalOpen = () => setModalShown(true);

  useEffect(() => {
    var storedData = localStorage.getItem("tableData");
    if (storedData) {
      setRowData(JSON.parse(storedData));
    } else {
      setRowData([]);
    }
  }, []);

  const addRow = (data) => {
    let newData;
    if (rowData === null) {
      newData = [data];
    } else {
      newData = [...rowData, data];
    }
    setRowData(newData);
    localStorage.setItem("tableData", JSON.stringify(newData));
  };

  const inputRef = React.useRef();

  const saveData = () => {
    const fileData = JSON.stringify(rowData);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "tunings.json";
    link.href = url;
    link.click();
  };

  const handleDataUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        var jsonString = e.target.result;
        try {
          var json = JSON.parse(jsonString);
          setRowData(json);
          localStorage.setItem("tableData", jsonString);
        } catch (error) {}
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="App">
      <div
        style={{
          margin: "0 auto",
          maxWidth: "1024px",
          width: "100%",
          padding: "0 20px",
        }}
      >
        <h2>Guitar Tuning Browser</h2>
        <hr />
        <div
          className="ag-theme-balham"
          style={{
            height: "512px",
            width: "100%",
          }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            paginationAutoPageSize={true}
            pagination={true}
            defaultColDef={{
              sortable: true,
              filter: true,
              headerComponentParams: {
                menuIcon: "fa-bars",
              },
            }}
          ></AgGridReact>
        </div>
        <div className="py-3">
          <Button onClick={handleModalOpen}>Add Track +</Button>{" "}
          <Button onClick={saveData}>Download Tunings</Button>{" "}
          <label htmlFor="jsonUpload">
            <Button onClick={() => inputRef.current.click()}>
              Upload Tunings
            </Button>
            <input
              ref={inputRef}
              type="file"
              accept="application/JSON"
              onChange={handleDataUpload}
              id="jsonUpload"
              name="jsonUpload"
              tabIndex="-1"
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-0999px",
                left: "-9999px",
              }}
            />
          </label>
        </div>
      </div>
      <Modal show={modalShown} onHide={handleModalClose} size="xl">
        <AddRowForm onSubmit={addRow} handleModalClose={handleModalClose} />
      </Modal>
    </div>
  );
}

export default App;
