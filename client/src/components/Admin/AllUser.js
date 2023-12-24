
import React, { useEffect, useState } from 'react';
import './style.css';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { Button } from '@material-ui/core';

export default function AllUser({ userData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => {
    fetch("http://localhost:5000/myuser", {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };

  const deleteUser = (id, name) => {
    fetch("http://localhost:5000/deleteUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        userId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.data);
        getAllUser();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleEditClick = (id) => {
    const userIndex = data.findIndex((user) => user._id === id);
    const newData = [...data];
    newData[userIndex].isEditing = true;
    setData(newData);
  };

  // Trong component React
const handleSaveClick = () => {
  const usersToUpdate = data.filter((user) => user.isEditing);

  // Gửi yêu cầu POST để cập nhật người dùng
  fetch('http://localhost:5000/updateUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      user: usersToUpdate[0], // Giả sử chỉ có một người dùng được cập nhật
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.data);
      getAllUser();
    })
    .catch((error) => {
      console.error('Error updating user:', error);
    });
};

  

  return (
    <div className="auth-wrapper">
      <div className="auth-inner" style={{ width: "auto" }}>
        <h2 style={{ textAlign: "center" }}>Danh sách người dùng</h2>
        <table style={{ width: 1100 }} id="user">
          <thead>
            <tr>
              <th>Tên người dùng</th>
              <th>Email</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user._id}>
                <td
                  contentEditable={user.isEditing}
                  onBlur={(e) => (user.name = e.target.innerText)}
                >
                  {user.name}
                </td>
                <td
                  contentEditable={user.isEditing}
                  onBlur={(e) => (user.email = e.target.innerText)}
                >
                  {user.email}
                </td>
                <td>
                  {user.isEditing ? (
                    <Button onClick={handleSaveClick}>
                      <SaveIcon />
                    </Button>
                  ) : (
                    <>
                      <Button onClick={() => handleEditClick(user._id)}>
                        <Edit />
                      </Button>
                      <Button onClick={() => deleteUser(user._id, user.name)}>
                        <Delete />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
