import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTopicsByCommission, postReport } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostReport = () => {
  const { commission } = useParams();
  const [bodyExp, setBodyExp] = useState("");
  const [bodyImp, setBodyImp] = useState("");
  const [topics, setTopics] = useState([]);
  const [chosenTopic, setChosenTopic] = useState("");

  useEffect(() => {
    getTopicsByCommission(commission)
      .then((topics) => {
        setTopics(topics);
      })
      .catch((err) => {
        console.log(err);
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

  const handleBodyExperience = (e) => {
    setBodyExp(e.target.value);
    if (bodyExp.length >= 50) {
      e.target.id;
    }
  };

  const handleBodyImprovement = (e) => {
    setBodyImp(e.target.value);
  };

  const handleChosenTopic = (e) => {
    setChosenTopic(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(chosenTopic === ''){
      notify('Please choose a topic')
    }else if(bodyExp === ''){
      notify('More information need for experience')
    }else if(bodyExp === ''){
      notify('More information need for improvement')
    }else{

      const postData = {
        commission_name: commission,
        topic_name: chosenTopic,
        body_experience: bodyExp,
        body_improvement: bodyImp,
      };
      postReport(postData)
        .then((report) => {
          notify('Posted Successfully');
          setBodyExp("");
          setBodyImp("");
          setChosenTopic("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <section className="form-container">
      <h1>Posting Report</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="topics">Select a Topic:</label>
        <select
          name="topics"
          id="topics"
          value={chosenTopic}
          onChange={handleChosenTopic}
        >
          <option value="" disabled selected>
            Choose an option
          </option>
          {topics.map(({ topic: { topic } }) => {
            return (
              <option key={topic} value={topic}>
                {topic}
              </option>
            );
          })}
        </select>
        <label htmlFor="body_experience" className="form-label">Experience (min 50 characters):</label>
        <textarea
          value={bodyExp}
          name="body_experience"
          id="body_experience"
          cols="30"
          rows="10"
          onChange={handleBodyExperience}
          placeholder="Experience"
          className={bodyExp.length <= 50 ? "fail form-input" : "success form-inputl"}
          required={true}
        ></textarea>
        <label htmlFor="body_improvement" className="form-label">
          Improvement (min 50 characters):
        </label>
        <textarea
          value={bodyImp}
          name="body_improvement"
          id="body_improvement"
          cols="30"
          rows="10"
          onChange={handleBodyImprovement}
          className={bodyImp.length <= 50 ? "fail form-input" : "success form-input"}
          placeholder="Improvement"
          required={true}
        ></textarea>
        <button className='submit'>Submit Report</button>
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

export default PostReport;
