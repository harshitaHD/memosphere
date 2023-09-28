import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import "../App.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const loadData = async () => {
    try {
      const response = await axios.get("https://memosphere-backend.vercel.app/");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    console.error("Error status:", error.response?.status);
    console.error("Error message:", error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteNote = (id) => {
    axios
      .delete(`https://memosphere-backend.vercel.app/api/remove/${id}`)
      .then(() => {
        toast.success("Deleted Successfully");
        loadData();
      })
      .catch((error) => {
        toast.error("An error occurred while deleting.");
      });
  };

  const togglePin = (noteId, isPinned) => {
  const action = isPinned ? "unpin" : "pin";

  axios
    .get(`https://memosphere-backend.vercel.app/api/${action}/${noteId}`)
    .then((response) => {
      toast.success(
        isPinned ? "Unpinned Successfully" : "Pinned Successfully"
      );
      loadData(); 
    })
    .catch((error) => {
      toast.error("An error occurred while pinning/unpinning.");
    });
};


  const downloadNoteAsTxt = (note) => {
    // Create a Blob containing the note data
    const blob = new Blob(
      [
        `Title: ${note.title}\nTagline: ${note.tagline}\nContent: ${note.content}`,
      ],
      { type: "text/plain" }
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "note.txt";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // pinned and unpinned notes
  const pinned = data.filter((item) => item.isPinned);
  const unpinned = data.filter((item) => !item.isPinned);

  // pinned and unpinned notes
  const sortedNotes = [...pinned, ...unpinned];

  // start and end indices for pagination
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  const currentData = sortedNotes.slice(startIndex, endIndex);

  return (
    <div>
      <div className="container-fluid">
        <Navbar />
        <div className="col mb-3 d-flex justify-content-center">
          <Link
            to="/addNotes"
            style={{
              textDecoration: "none",
              color: "purple",
              fontSize: "18px",
              fontWeight: "bold",
              border: "2px dashed purple",
              padding: "20px",
              display: "inline-block",
              marginTop: "10px",
            }}
          >
            <i className="fa-solid fa-circle-plus"></i> Add new note
          </Link>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {currentData.map((item) => (
            <div className="col mb-3" key={item._id}>
              <div className="card">
                {/* Wrap the card content in an <a> with onClick for editing */}
                <Link
                  to={`/update/${item._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontWeight: "bold" }}>
                      {item.title}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {item.tagline}
                    </h6>
                    <p className="card-text">{item.content}</p>
                  </div>
                </Link>

                {/* Buttons for download, delete, and pin */}
                <div
                  className="btn-group mt-4"
                  role="group"
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "10px",
                    marginTop: "0px",
                  }}
                >
                  <Link
                    onClick={() => downloadNoteAsTxt(item)}
                    title="Download"
                  >
                    <i
                      className="fa-solid fa-download"
                      style={{ marginLeft: "12px", fontSize: "21px" }}
                    ></i>
                  </Link>
                  <Link
                    onClick={() => deleteNote(item._id)}
                    style={{ textDecoration: "none" }}
                    title="Trash"
                  >
                    <i
                      className="fa-solid fa-trash-can"
                      style={{
                        color: "red",
                        fontSize: "20px",
                      }}
                    ></i>
                  </Link>
                  <Link
                    onClick={() => togglePin(item._id, item.isPinned)}
                    title="Pin/Unpin"
                  >
                    {item.isPinned ? (
                      <i
                        className="fa-solid fa-star"
                        style={{
                          color: "yellow",
                          fontSize: "21px",
                        }}
                      ></i>
                    ) : (
                      <i
                        className="fa-regular fa-star"
                        style={{ fontSize: "20px" }}
                      ></i>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination buttons */}
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {Array(Math.ceil(sortedNotes.length / cardsPerPage))
                .fill()
                .map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Home;
