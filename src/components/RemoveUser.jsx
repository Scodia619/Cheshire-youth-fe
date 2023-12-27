import { useState, useEffect } from "react";
import { getUsers, removeUser } from "../../api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RemoveUser = () => {
  const [users, setUsers] = useState([]);
  const [chosenUser, setChosenUser] = useState("");
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
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

  const handleUser = (e) => {
    setChosenUser(e.target.value);
  };

  const handleCancel = () => {
    setShowModal(false)
  }

  const handleConfirm = () =>{
    const data = {
        username: chosenUser
    }
    removeUser(data).then(()=>{
        notify(`${chosenUser} deleted`)
        setShowModal(false)
        setChosenUser('')
    }).catch(({ response: { data } }) => {
        notify(data.msg);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(true)
  };
  return (
    <section className="form-container">
      <h1>Remove An Admin</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="users" className="form-label">
          Users:
        </label>
        <select name="users" id="users" onChange={handleUser}>
          <option value="" disabled selected>
            Choose an option
          </option>
          {users.map((user) => {
            return (
              <option
                key={user.user_id}
                value={user.username}
              >
                {user.username}
              </option>
            );
          })}
        </select>
        <button className="submit">Submit</button>
      </form>
      {showModal ? 
      <div className="modal-wrapper">
      <div className="modal-content">
        <h1 className="modal-header">Are you sure you want to delete {chosenUser}</h1>
        <div className="button-container">
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
      : null }
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

export default RemoveUser;
