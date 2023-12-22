import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <h1>Youth Commission</h1>
      <Link to="/login">
        <h1 id='login'>Login</h1>
      </Link>
    </nav>
  );
};

export default Header;
