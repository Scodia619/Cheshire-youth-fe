import { useState, useEffect } from "react";
import { getAllCommissions, getUsers, linkUser } from "../../api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LinkUser = () => {
  const [commissions, setCommissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [chosenCommission, setChosenCommission] = useState([]);
  const [chosenUser, setChosenUser] = useState([]);

  useEffect(() => {
    getAllCommissions()
      .then((commissions) => {
        setCommissions(commissions);
        return getUsers();
      })
      .then((users) => {
        setUsers(users);
      })
      .catch((err) => console.log(err));
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

  const handleCommission = (e) => {
    setChosenCommission(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
        username: chosenUser,
        commission: chosenCommission
    }
    linkUser(data).then(()=>{
        notify(`${chosenUser} added to ${chosenCommission}`)
        setChosenCommission('')
        setChosenUser('')
    }).catch(({ response: { data } }) => {
        notify(data.msg);
      });
  }

  return (
    <section className="form-container">
      <h1>Link User:</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="users" className="form-label">
          Users
        </label>
        <select
          name="users"
          id="users"
          value={chosenUser}
          onChange={handleUser}
          required
        >
          <option value="" disabled selected>
            Choose an option
          </option>
          {users.map((user) => {
            return (
              <option key={user.user_id} value={user.username}>
                {user.username}
              </option>
            );
          })}
        </select>
        <label htmlFor="commissions" className="form-label">
          Commissions
        </label>
        <select
          name="commissions"
          id="commission"
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

export default LinkUser;
