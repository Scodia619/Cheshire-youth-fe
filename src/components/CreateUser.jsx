import { useState } from "react"

import { postUser } from "../../api"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateUser = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

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

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        console.log('hello')
        e.preventDefault()
        const postData = {
            username,
            password
        }
        postUser(postData).then((user) => {
            console.log('posted')
            notify(`${user.username} created`)
        }).catch(({ response: { data } }) => {
            notify(data.msg);
          });
    }

    return (
        <section className="form-container">
            <h1>Creating a user</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" className="form-input" name="username" id="username" value={username} onChange={handleUsername}/>
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-input" name="password" id="password" value={password} onChange={handlePassword}/>
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
    )
}

export default CreateUser