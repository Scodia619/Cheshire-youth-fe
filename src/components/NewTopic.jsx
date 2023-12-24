import { useState } from "react";
import { postNewTopic } from "../../api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewTopic = () => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  const notify = (msg) => {
    toast(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleTopic = (e) => {
    setTopic(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      topic_name: topic,
      topic_description: description,
    };
    postNewTopic(postData)
      .then(() => {
        notify("Topic Created");
      })
      .catch(({ response: { data } }) => {
        notify(data.msg);
      });
  };

  return (
    <section className="form-container">
      <h1>Create a new topic</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="topic" className="form-label">
          Topic:
        </label>
        <textarea
          name="topic"
          id="topic"
          cols="1"
          rows="1"
          className="form-input"
          placeholder="Topic..."
          onChange={handleTopic}
          required
        ></textarea>
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          cols="1"
          rows="2"
          className="form-input"
          placeholder="Description..."
          onChange={handleDescription}
          required
        ></textarea>
        <button className="submit">Submit</button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
};

export default NewTopic;
