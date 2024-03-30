import "./DataTable.css";
import { useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 350,
    renderCell: (params) => <div className="dataTableCell">{params.value}</div>,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 10,
    getActions: (params) => [
      <div key={params.id} className="actionPosition">
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(params.id)}
          color="inherit"
        />

        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.id)}
          color="inherit"
        />
      </div>,
    ],
  },
];

const initialRows = [
  {
    id: "1",
    name: "John Doeyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
  },
  { id: "2", name: "Jane Smith" },
  // Diğer satırlar...
];

function DataTable() {
  const [rows, setRows] = useState(initialRows);

  const handleProcessRowUpdate = (newRow) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === newRow.id ? { ...row, ...newRow } : row
      )
    );
    return newRow;
  };

  const handleDelete = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleEdit = (id) => {
    // Düzenleme işlevi için bu fonksiyonu kullanabilirsiniz
    console.log(`Edit row with id: ${id}`);
    // Not: Bu örnek gerçek bir düzenleme işlevi içermiyor
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        autoHeight
        processRowUpdate={handleProcessRowUpdate}
        onProcessRowUpdateError={(error) => console.error(error)}
        headerHeight={0}
        hideFooter
        getRowHeight={() => "auto"}
      />
    </div>
  );
}

export default DataTable;
