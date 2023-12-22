import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReportsList = () => {

  const {commission} = useParams();

  const [reports, setReports] = useState([]);
  const [noData, setNoData] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    axios
      .get(`https://cheshire-youth-server.onrender.com/api/reports/${commission}`)
      .then(({ data }) => {
        if(data.reports.length){
          setReports(data.reports);
          setNoData(false)
        }
      }).catch(()=>{
        setIsError(true)
      }).finally(()=>{
        setIsLoading(false)
      });
  }, []);

  console.log(reports);

  if(isError){
    return <h1>Error Loading Page</h1>
  }

  if(isLoading){
    return <h1>Loading Data</h1>
  }
  if(noData){
    return <h1>No Data for commission</h1>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Report Id</th>
          <th>Commission</th>
          <th>Experience</th>
          <th>Improvement</th>
          <th>Topic</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => {
          return (
            <tr key={report.report_id}>
              <th>{report.report_id}</th>
              <th>{report.commission_name}</th>
              <th>{report.body_experience}</th>
              <th>{report.body_improvement}</th>
              <th>{report.topic_name}</th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReportsList;
