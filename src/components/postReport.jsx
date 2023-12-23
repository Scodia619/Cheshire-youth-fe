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
  const [chosenTopic, setChosenTopic] = useState("")

  useEffect(() => {
    getTopicsByCommission(commission)
      .then((topics) => {
        setTopics(topics);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const notify = () => {
    toast.success('Posted Successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  }

  const handleBodyExperience = (e) => {
    setBodyExp(e.target.value);
  };

  const handleBodyImprovement = (e) => {
    setBodyImp(e.target.value);
  };

  const handleChosenTopic = (e) => {
    setChosenTopic(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const postData = {
        commission_name: commission,
        topic_name: chosenTopic,
        body_experience: bodyExp,
        body_improvement: bodyImp
    }
    postReport(postData)
    .then((report)=>{
        notify()
        setBodyExp('')
        setBodyImp('')
        setChosenTopic('')
    }).catch(err => {
        console.log(err)
    })
  }

  return (
    <section className="report-container">
      <h1>Posting Report</h1>
      <form className="report-form" onSubmit={handleSubmit}>
        <label htmlFor="topics">Select a Topic:</label>
        <select name="topics" id="topics" value={chosenTopic} onChange={handleChosenTopic}>
          {topics.map(({ topic: { topic } }) => {
            return <option key={topic} value={topic}>{topic}</option>;
          })}
        </select>
        <label htmlFor="body_experience">Experience:</label>
        <textarea
          value={bodyExp}
          name="body_experience"
          id="body_experience"
          cols="30"
          rows="10"
          onChange={handleBodyExperience}
          required={true}
        ></textarea>
        <label htmlFor="body_improvement">Improvement:</label>
        <textarea
          value={bodyImp}
          name="body_improvement"
          id="body_improvement"
          cols="30"
          rows="10"
          onChange={handleBodyImprovement}
          required={true}
        ></textarea>
        <button>Submit Report</button>
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
