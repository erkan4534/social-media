import { Table } from "antd";
import "./Admin.css";
import { useSelector } from "react-redux";

export const Admin = () => {
  const { userDataArray } = useSelector((state) => state.auth);

  const columns = [
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
      pagination={{
        pageSize: 50,
      }}
      scroll={{
        y: 240,
      }}
    />
  );
};
