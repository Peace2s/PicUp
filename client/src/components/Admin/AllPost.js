import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export default function AllPost({ userData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = () => {
    fetch("http://localhost:5000/mypost", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };

  const deleteP = (postId) => {
    if (window.confirm(`Bạn muốn xóa bài đăng`)) {
      fetch("http://localhost:5000/deleteP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          PostId: postId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllPost();
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    } else {
      // Handle the case where the user cancels the deletion
    }
  };

  const formatCreatedAt = (timestamp) => {
    const dateObject = new Date(timestamp);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    return `${day}/${month}/${year} \u00a0    ${hours}:${minutes}:${seconds}`;
  };

  const exportToPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Danh sach dang anh", 20, 10);

    const columns = ["Nguoi dang", "Ngay dang", "Tags", "Luot thich"];
    const rows = data.map((i) => [
      i.name,
      formatCreatedAt(i.createdAt),
      i.tags,
      i.likes.length.toString(),
    ]);

    pdf.autoTable({ startY: 20, head: [columns], body: rows });
    pdf.save("posts.pdf");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner" style={{ width: "auto" }}>
        <h2 style={{ textAlign: "center" }}>Danh sách đăng ảnh</h2>
        <Button variant="contained" color="primary" onClick={exportToPDF} style={{ marginLeft: "1035px" }}>
          Xuất PDF
        </Button>
        <table style={{ width: 1100 }} id="user">
          <thead>
            <tr>
              <th>Người đăng</th>
              <th>Ngày đăng</th>
              <th>Tags</th>
              <th>Luợt thích</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i) => (
              <tr key={i._id}>
                <td>{i.name}</td>
                <td>{formatCreatedAt(i.createdAt)}</td>
                <td>{i.tags}</td>
                <td>{i.likes.length}</td>
                <td>
                  <Button onClick={() => deleteP(i._id)}>
                    <Delete />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
