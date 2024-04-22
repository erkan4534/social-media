import "./Admin.css";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeMember } from "../../redux/action/authActions";

export const Admin = () => {
  const { userDataArray } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteMember = (memberId, event) => {
    event.stopPropagation();
    dispatch(removeMember(memberId));
  };

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
      width: "10%",
      align: "center",
      render: (text, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={record.profilePicture || "no picture"}
            alt="Profile"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
          />
        </div>
      ),
    },

    {
      title: "Remove Member",
      dataIndex: "",
      width: "17%",
      align: "center",
      render: (text, record) => (
        <button
          onClick={(event) => deleteMember(record.id, event)}
          className="deleteButton"
        >
          Remove
        </button>
      ),
    },
  ];

  return (
    <Table
      className="mt-10"
      columns={columns}
      dataSource={userDataArray}
      onRow={(record) => {
        return {
          onClick: () => {
            navigate(`/admin/profile/${record.id}`);
          },
        };
      }}
      pagination={{
        pageSize: 50,
      }}
      scroll={{ x: "max-content", y: "100%" }}
    />
  );
};
