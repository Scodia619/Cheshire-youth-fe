import { useState, useEffect } from "react"
import axios from 'axios';

const ReportsList = () => {

    const [reports, setReports] = useState([])

    useEffect(()=>{
        axios.get("https://cheshire-youth-server.onrender.com/api/reports/cheshire").then(({data})=>{
            setReports(data.reports)
        })
    },[])

    console.log(reports)

    return (
        <table>
            <tr>
                <th>Report Id</th>
                <th>Commission</th>
                <th>Experience</th>
                <th>Improvement</th>
                <th>Topic</th>
            </tr>
            {reports.map(report => {
                return <tr key={report.report_id}>
                    <th>{report.report_id}</th>
                    <th>{report.commission_name}</th>
                    <th>{report.body_experience}</th>
                    <th>{report.body_improvement}</th>
                    <th>{report.topic_name}</th>
                </tr>
            })}
        </table>
        )
}

export default ReportsList