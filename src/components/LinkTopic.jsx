import { useState, useEffect } from "react";
import { getAllCommissions, getAllTopics, postNewLink } from "../../api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LinkTopics = () => {
  const [commissions, setCommissions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [chosenCommission, setChosenCommission] = useState("");
  const [chosenTopic, setChosenTopic] = useState("");

  useEffect(() => {
    getAllTopics().then((topics) => {
      setTopics(topics);
    });
    getAllCommissions().then((commissions) => {
      setCommissions(commissions);
    });
  }, []);

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

  const handleCommission = (e) => {
    setChosenCommission(e.target.value)
  }

  const handleChosenTopic = (e) => {
    setChosenTopic(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(chosenCommission === ''){
        notify('Please select a commission')
    }
    if(chosenTopic === ''){
        notify('Please select a topic')
    }

    const postData = {
        topic: chosenTopic,
        commission: chosenCommission
    }

    postNewLink(postData).then(()=>{
        notify('New Link Established')
        setChosenCommission('')
        setChosenTopic('')
    }).catch(({ response: { data } }) => {
        notify(data.msg);
      });
  }

  return (
    <section className="form-container">
      <h1>Linking Topics</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="commission" className="form-label">
          Commission:
        </label>
        <select name="commissions" id="commissions" value={chosenCommission} onChange={handleCommission}>
        <option value="" disabled selected>
            Choose an option
          </option>
          {commissions.map((commission) => {
            return <option
              key={commission.commission_id}
              value={commission.commission}
            >
              {commission.commission}
            </option>;
          })}
        </select>
        <label htmlFor="topics">Topics</label>
        <select name="topics" id="topics" value={chosenTopic} onChange={handleChosenTopic}>
        <option value="" disabled selected>
            Choose an option
          </option>
          {topics.map(topic => {
            return <option key={topic.topic_id} value={topic.topic}>{topic.topic}</option>
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

export default LinkTopics;
