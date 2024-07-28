import React from "react";
import "./DataTable.css";
import { DataGrid, GridActionsCellItem, GridRowModel } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface DataTableProps {
  rows: GridRowModel[];
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>;
  setComment: React.Dispatch<React.SetStateAction<GridRowModel | undefined>>;
  showComment: () => void;
  removeComment: (row: GridRowModel, post: any) => void;
  post: any;
}

const DataTable: React.FC<DataTableProps> = ({
  rows,
  setRows,
  setComment,
  showComment,
  removeComment,
  post,
}) => {
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 350,
      renderCell: (params: any) => (
        <div className="dataTableCell">{params.value}</div>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 10,
      getActions: (params: any) => [
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

  const handleProcessRowUpdate = (newRow: GridRowModel) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === newRow.id ? { ...row, ...newRow } : row
      )
    );
    return newRow;
  };

  const handleDelete = (params: any) => {
    removeComment(params.row, post);
  };

  const handleEdit = (params: any) => {
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
};

export default DataTable;
