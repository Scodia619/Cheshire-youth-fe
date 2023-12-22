import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [commissions, setCommissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get("https://cheshire-youth-server.onrender.com/api/commission")
      .then(({ data }) => {
        setCommissions(data.commissions);
      }).finally(()=>{
        setIsLoading(false)
      })
  }, []);

  if(isLoading) return <h1>Loading</h1>

  return (
    <section className="commissions-container">
      {commissions.map((commission) => {
        return (
          <Link to={commission.commission} key={commission.commission_id}>
            <div className="commissions-selector">
              <h1>{commission.commission}</h1>
              <img
              className="commission-image"
                src={commission.commission_image}
                alt="picture of commission"
              />
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default Home;
