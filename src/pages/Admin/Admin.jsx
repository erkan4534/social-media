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
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "15%",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      width: "15%",
    },
    {
      title: "Username",
      dataIndex: "username",
      width: "15%",
    },

    {
      title: "Email",
      dataIndex: "email",
      width: "18%",
    },

    {
      title: "Picture",
      dataIndex: "profilePicture",
      width: "10%",
      render: (text, record) => (
        <img
          src={record.profilePicture || "no picture"}
          alt="Profile"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },

    {
      title: "Remove Member",
      dataIndex: "",
      width: "17%",
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
      scroll={{
        y: 240,
      }}
    />
  );
};
