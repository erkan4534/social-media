import "./Admin.css";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { removeMember } from "../../redux/action/authActions";

export const Admin = () => {
  const { user, userDataArray } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const outletContext = useOutletContext();
  const searchTerm = outletContext ? outletContext.searchTerm : "";

  const deleteMember = (memberId, event) => {
    event.stopPropagation();
    dispatch(removeMember(memberId));
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
    userDataNewArray = userDataArray.filter(
      (userData) => userData.id !== user?.id
    );
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
      width: "10%",
      align: "center",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={record.profilePicture || "no picture"}
            alt="Profile"
            style={{
              width: "30px",
              height: "30px",
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
      className="adminTable"
      columns={columns}
      dataSource={userDataNewArray}
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
        y: "70vh",
        x: "max-content",
      }}
    />
  );
};
