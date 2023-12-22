import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

const Header = () => {

    const {user, setUser} = useContext(UserContext)

  return (
    <nav>
      <h1>Youth Commission</h1>
      <Link to="/login">
        <h1 id='login'>{
            user !== '' ? user : 'Login'
        }</h1>
      </Link>
    </nav>
  );
};

export default Header;
