import "./DataTable.css";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";

function DataTable({
  rows,
  setRows,
  setComment,
  showComment,
  removeComment,
  post,
}) {
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
        <div key={params.id} className="flex">
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => handleEdit(params)}
            color="inherit"
          />

          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDelete(params)}
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

  const handleDelete = (params) => {
    removeComment(params.row, post);
  };

  const handleEdit = (params) => {
    showComment();
    setComment(rows.find((row) => row.id === params.id));
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
  showComment: PropTypes.func,
  removeComment: PropTypes.func,
  post: PropTypes.object,
};

export default DataTable;
