import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

const Header = () => {

    const {user, setUser} = useContext(UserContext)
    console.log(user)

  return (
    <nav>
      <Link to={user.isAdmin ? '/admin' : '/'}>
      <h1>Youth Commission</h1>
      </Link>
      {user.isAdmin && user ? <Link to="/admin"><h1>Admin Panel</h1></Link>: null}
      <Link to="/login">
        <h1 id='login'>{
            user.username ? user.username : "Login"
        }</h1>
      </Link>
    </nav>
  );
};

export default Header;
