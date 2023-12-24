import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Link } from "react-router-dom";
import { getCommissionsByUser } from "../../api";

const ViewReports = () => {
    const { user, setUser } = useContext(UserContext);

  const [commissions, setCommissions] = useState([]);

  useEffect(() => {
    getCommissionsByUser(user.user_id)
      .then((commissions) => {
        setCommissions(commissions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="commissions-container">
      {commissions.map((commission) => {
        return (
          <Link
            key={commission.commission.commission_id}
            to={`/admin/reports/${commission.commission.commission}`}
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
  )
}

export default ViewReports;