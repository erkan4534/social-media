import { Table } from "antd";
import "./Admin.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Admin = () => {
  const { userDataArray } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
  ];

  return (
    <Table
      className="mt-10"
      columns={columns}
      dataSource={userDataArray}
      onRow={(record, rowIndex) => {
        return {
          onClick: () => {
            navigate(`/profile/${record.id}`);
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
