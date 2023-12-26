import { useState } from "react";
import { postNewCommission } from "../../api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCommission = () => {
  const [commission, setCommission] = useState("");
  const [commission_image, setCommission_Img] = useState("");

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
}

  const handleCommission = (e) => {
    setCommission(e.target.value);
  };

  const handleCommissionImg = (e) => {
    setCommission_Img(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
        commission,
        commission_image
    }
    postNewCommission(postData).then((commission) => {
        notify(`${commission.commission} created`)
    }).catch(({ response: { data } }) => {
        notify(data.msg);
      });
  };

  return (
    <section className="form-container">
      <h1>Create a commission</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="commission" className="form-label">
          Commission:
        </label>
        <input
          type="text"
          value={commission}
          name="commission"
          id="commission"
          className="form-input"
          placeholder="Commission Name..."
          onChange={handleCommission}
          required
        />
        <label htmlFor="image" className="form-label">
          Commission Image:
        </label>
        <input
          type="text"
          name="image"
          value={commission_image}
          id="image"
          className="form-input"
          placeholder="Commission Image Link..."
          onChange={handleCommissionImg}
          required
        />
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

export default CreateCommission;
