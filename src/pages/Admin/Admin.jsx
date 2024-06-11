import "./Admin.css";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { changeStatus } from "../../redux-toolkit/slices/userSlice";
import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

export const Admin = () => {
  const { user, userDataArray } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const outletContext = useOutletContext();
  const searchTerm = outletContext ? outletContext.searchTerm : "";
  const [loadingStates, setLoadingStates] = useState(false);

  const changeMemberStatus = (memberId, memberStatus, event) => {
    event.stopPropagation();
    setLoadingStates((prev) => !prev);
    dispatch(changeStatus({ memberId, memberStatus })).finally(() => {
      setLoadingStates((prev) => !prev);
    });
  };

  let userDataNewArray;
  if (searchTerm) {
    userDataNewArray = userDataArray
      .filter((userData) => userData.id !== user?.id)
      .filter((userData) =>
        `${userData.name} ${userData.surname}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
  } else {
    userDataNewArray =
      userDataArray &&
      userDataArray.filter((userData) => userData.id !== user?.id);
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: "10%",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "15%",
      align: "center",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      width: "15%",
      align: "center",
    },
    {
      title: "Username",
      dataIndex: "username",
      width: "15%",
      align: "center",
    },

    {
      title: "Email",
      dataIndex: "email",
      width: "18%",
      align: "center",
    },

    {
      title: "Picture",
      dataIndex: "profilePicture",
      width: "6%",
      align: "center",
      render: (text, record) => (
        <div
          style={{
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={record.profilePicture || "no picture"}
            alt={`${record.name} ${record.surname}`}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
      ),
    },

    {
      title: "Member Operation",
      dataIndex: "",
      width: "17%",
      align: "center",
      render: (text, record) => (
        <div>
          <Stack direction="row" spacing={2}>
            <Button
              size="small"
              onClick={(event) => changeMemberStatus(record.id, 0, event)}
              disabled={record.status === 0}
              variant="outlined"
              className="statusButton"
            >
              Inactive
            </Button>

            <Button
              size="small"
              onClick={(event) => changeMemberStatus(record.id, 1, event)}
              disabled={record.status === 1}
              variant="outlined"
              className="statusButton"
            >
              Active
            </Button>

            {loadingStates && (
              <CircularProgress size={100} className="circular-progress" />
            )}
          </Stack>
        </div>
      ),
    },
  ];

  return (
    <Table
      className="adminTable"
      columns={columns}
      dataSource={userDataNewArray}
      rowKey={(record) => record.id}
      onRow={(record) => {
        return {
          onClick: (event) => {
            const isButton = event.target.innerText === "INACTIVE\nACTIVE";

            if (!isButton) {
              navigate(`/admin/profile/${record.id}`);
            }
          },
        };
      }}
      pagination={{
        pageSize: 50,
      }}
      scroll={{
        x: "max-content",
        y: "70vh",
      }}
    />
  );
};
