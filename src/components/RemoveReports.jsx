import {useState, useEffect} from 'react'
import { deleteAllReports, getAllCommissions } from '../../api'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RemoveReports = () => {

    const [commissions, setCommissions] = useState([])
    const [chosenCommission, setChosenCommission] = useState('')
    const [showModal, setShowModal] = useState(false)

    useEffect(()=>{
        getAllCommissions().then((commissions)=>{
            setCommissions(commissions)
        })
    }, [])

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

    const handleCancel = (e) => {
        setShowModal(false)
    }

    const handleConfirm = () => {
        const data = {commission: chosenCommission}
        deleteAllReports(data).then(()=>{
            notify('All reports deleted')
            setChosenCommission('')
            setShowModal(false)
        }).catch(({ response: { data } }) => {
            notify(data.msg);
            setShowModal(false)
          });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setShowModal(true)
    }

    return(
        <section className="form-container">
            <h1>Remove all reports:</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="commissions" className="form-label"></label>
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
            {showModal ? 
      <div className="modal-wrapper">
      <div className="modal-content">
        <h1 className="modal-header">Are you sure you want to delete all {chosenCommission} reports</h1>
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
    )
}

export default RemoveReports