import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminPanel = () => {
  const { user, setUser } = useContext(UserContext);

  const [commissions, setCommissions] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://cheshire-youth-server.onrender.com/api/commission/user/${user.user_id}`
      )
      .then(({ data }) => {
        setCommissions(data.commissions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(commissions);

  return (
    <section className="commissions-container">
      {commissions.map((commission) => {
        return (
          <Link
            key={commission.commission.commission_id}
            to={`/admin/${commission.commission.commission}`}
          >
            <div className="commissions-selector">
              <h1>{commission.commission.commission}</h1>
              <img
                className="commission-image"
                src={commission.commission.commission_image}
                alt="picture of commission"
              />
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default AdminPanel;
