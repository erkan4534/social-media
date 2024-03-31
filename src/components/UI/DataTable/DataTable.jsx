import "./DataTable.css";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";

function DataTable({ rows, setRows, setComment }) {
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 350,
      renderCell: (params) => (
        <div className="dataTableCell">{params.value}</div>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 10,
      getActions: (params) => [
        <div key={params.id}>
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
    setComment(rows.find((row) => row.id === id));
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
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

DataTable.propTypes = {
  rows: PropTypes.array,
  setRows: PropTypes.func,
  setComment: PropTypes.func,
};

export default DataTable;
