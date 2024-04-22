import "./Admin.css";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeMember } from "../../redux/action/authActions";

export const Admin = () => {
  const { userDataArray } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteMember = (memberId) => {
    dispatch(removeMember(memberId));
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Surname",
      dataIndex: "surname",
      width: 150,
    },
    {
      title: "Username",
      dataIndex: "username",
      width: 150,
    },

    {
      title: "Email",
      dataIndex: "email",
      width: 150,
    },

    {
      title: "Picture",
      dataIndex: "profilePicture",
      width: 150,
      render: (text, record) => (
        <img
          src={record.profilePicture || "no picture"}
          alt="Profile"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },

    {
      title: "",
      dataIndex: "",
      width: 150,
      render: (text, record) => (
        <button
          onClick={() => deleteMember(record.id)}
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
      scroll={{
        y: 240,
      }}
    />
  );
};
