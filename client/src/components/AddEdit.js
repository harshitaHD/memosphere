import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const AddEdit = () => {
  const { id } = useParams();
  const isNewNote = !id;

  const initialState = {
    title: "",
    tagline: "",
    content: "",
  };

  const [note, setNote] = useState(initialState);

  useEffect(() => {
    if (!isNewNote) {
      // fetch existing note data only if it's not a new note
      axios.get(`http://localhost:5050/api/get/${id}`).then((resp) => {
        setNote({ ...resp.data[0] });
      });
    }
  }, [id, isNewNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!note.title || !note.tagline || !note.content) {
      toast.error("Please fill in all the fields!");
    } else {
      try {
        if (isNewNote) {
          // Create a new note
          await axios.post("http://localhost:5050/api/post", note);
        } else {
          // Update an existing note
          await axios.put(`http://localhost:5050/api/update/${id}`, note);
        }

        // Clear form inputs on success
        setNote(initialState);
        toast.success(
          isNewNote ? "Note added successfully" : "Note updated successfully"
        );
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } catch (error) {
        toast.error(error.response.data);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="Title here..."
              value={note.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tagline" className="form-label">
              Tagline
            </label>
            <input
              type="text"
              id="tagline"
              name="tagline"
              className="form-control"
              placeholder="Tagline here..."
              value={note.tagline}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              type="text"
              id="content"
              name="content"
              className="form-control"
              placeholder="Add content..."
              value={note.content}
              onChange={handleInputChange}
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary"
            value={isNewNote ? "Save" : "Update"}
            style={{ backgroundColor: "#673ab7", fontWeight: "bold" }}
          />
          <Link
            to="/"
            className="btn btn-secondary ms-2"
            style={{ fontWeight: "bold" }}
          >
            Go Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddEdit;
