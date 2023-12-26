import { useState, useEffect } from "react";
import { getAllCommissions, getTopicsByCommission, removeLink } from "../../api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RemoveTopic = () => {
  const [commissions, setCommissions] = useState([]);
  const [DBtopics, setDBTopics] = useState([]);
  const [chosenCommission, setChosenCommission] = useState("");
  const [chosenTopic, setChosenTopic] = useState("");

  useEffect(() => {
    getAllCommissions().then((commissions) => {
      setCommissions(commissions);
    });
  }, []);

  const handleCommission = (e) => {
    setChosenCommission(e.target.value);
    getTopicsByCommission(e.target.value).then((topics) => {
      setDBTopics(topics);
    });
  };

  const handleChosenTopic = (e) => {
    setChosenTopic(e.target.value)
  }

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const deleteData = {
        commission: chosenCommission,
        topic: chosenTopic
    }
    removeLink(deleteData).then(()=>{
        notify('Deleted Successfully')
    }).catch(({ response: { data } }) => {
        notify(data.msg);
      });
  }

  return (
    <section className="form-container">
      <h1>Remove Topic from commission</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="commission" className="form-label">
          Commission
        </label>
        <select
          name="commissions"
          id="commissions"
          value={chosenCommission}
          onChange={handleCommission}
          required
        >
          <option value="" disabled selected>
            Choose an option
          </option>
          {commissions.map((commission) => {
            return (
              <option
                key={commission.commission_id}
                value={commission.commission}
              >
                {commission.commission}
              </option>
            );
          })}
        </select>
        <label htmlFor="topics">Topics</label>
        <select
          name="topics"
          id="topics"
          value={chosenTopic}
          onChange={handleChosenTopic}
          required
        >
          <option value="" disabled selected>
            Choose an option
          </option>
          {DBtopics.map((topic) => {
            return (
              <option key={topic.topic.topic_id} value={topic.topic.topic}>
                {topic.topic.topic}
              </option>
            );
          })}
        </select>
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

export default RemoveTopic;
