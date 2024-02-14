import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NoticeBoard = () => {
  const [noticeData, setNoticeData] = useState([]);

  const getNoticeData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/all-notice`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "myworld " + window.localStorage.getItem("gsmToken"),
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch");
      } else {
        // console.log(data);
        setNoticeData(data);
      }
    } catch (error) {
      console.error("Error fetching notice data:", error);
      // Handle error
    }
  };

  const deleteItem = async (e, id) => {
    e.preventDefault();
    if (window.confirm("Are you sure to Delete Item ?")) {
      const response = await fetch(`http://localhost:5000/delete-notice/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "myworld " + window.localStorage.getItem("gsmToken"),
        },
      });
      const data = await response.json();
      console.log(data);
      // if (response.ok) {
      //   setNoticeData(data);
      // }
    }
  };

  async function checkAuthentication() {
    try {
      await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "myworld " + window.localStorage.getItem("gsmToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => data);
    } catch (error) {
      console.error("Error fetching notice data:", error);
      // Handle error
    }
  }

  useEffect(() => {
    checkAuthentication();
    getNoticeData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="card ">
          <div className="card-header my-5">
            <h2>Welcome to Dashboard</h2>
          </div>
          <div className="card body">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th>Serial</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {noticeData.map((notice, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{notice.document_name}</td>
                    <td>{}</td>
                    <td>
                      <div className="d-flex justify-content-between gap-3">
                        <Link
                          className="btn btn-sm btn-info"
                          to={`notice-answer/${notice._id}`}
                        >
                          <i class="fa fa-eye" aria-hidden="true"></i>
                        </Link>
                        <a className="btn btn-sm btn-success" href="/">
                          <i class="fa fa-edit" aria-hidden="true"></i>
                        </a>
                        <a
                          className="btn btn-sm btn-danger"
                          onClick={(e) => deleteItem(e, notice._id)}
                          href="/dashboard"
                        >
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeBoard;
