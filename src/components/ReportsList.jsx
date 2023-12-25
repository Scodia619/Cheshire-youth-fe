import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getReportsByCommission } from "../../api";
import jsPDF from "jspdf";
import '../App.css'

import TopicQueries from "../components/TopicQueries";

const ReportsList = () => {
  const { commission } = useParams();

  const [reports, setReports] = useState([]);
  const [noData, setNoData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [params, setParams] = useState({ params: {} });

  useEffect(() => {
    getReportsByCommission(commission, params)
      .then((reports) => {
        if (reports.length) {
          setReports(reports);
          setNoData(false);
        }
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params]);

  function getTextWrapped(doc, text, x, y, maxWidth, lineHeight) {
    let words = text.split(' ');
    let line = '';
    let tempLine = '';
  
    for (let i = 0; i < words.length; i++) {
      tempLine = line + words[i] + ' ';
      const tempWidth = doc.getStringUnitWidth(tempLine) * doc.internal.getFontSize();
  
      if (tempWidth > maxWidth) {
        doc.text(line, x, y);
        line = words[i] + ' ';
        y += lineHeight;
      } else {
        line = tempLine;
      }
    }
  
    doc.text(line, x, y);
  }

  const handlePrint = () => {
    const doc = new jsPDF();
    let yPos = 10;
    const columnWidths = [80, 80, 20]; // Widths for each column
    const lineHeight = 5; // Line height
  
    // Table header
    doc.setFontSize(10); // Set a smaller font size
    doc.text('Experience', 10, yPos);
    doc.text('Improvement', 90, yPos);
    doc.text('Topic', 170, yPos);
    yPos += 5; // Adjust vertical position for content
  
    // Loop through the reports array and create a table-like structure
    reports.forEach((report) => {
      yPos += lineHeight; // Move to the next row
      getTextWrapped(doc, report.body_experience, 10, yPos, 200, lineHeight);
      getTextWrapped(doc, report.body_improvement, 90, yPos, 200, lineHeight);
      getTextWrapped(doc, report.topic_name, 170, yPos, 70, lineHeight);
  
      yPos += lineHeight * 2.5
    });
  
    // Output the PDF document
    doc.output('dataurlnewwindow');
  };

  if (isError) {
    return <h1>Error Loading Page</h1>;
  }

  if (isLoading) {
    return <h1>Loading Data</h1>;
  }
  if (noData) {
    return <h1>No Data for commission</h1>;
  }

  return (
    <section className='reports'>
      <div className="buttons">
      <TopicQueries setParams={setParams} params={params} />
      <button onClick={handlePrint} className="btn btn-success">Print</button>
      </div>
      <table className='custom-table'>
        <thead>
          <tr>
            <th id='report-id'>Report Id</th>
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
                <td>{report.report_id}</td>
                <td>{report.commission_name}</td>
                <td className="long-text-td">{report.body_experience}</td>
                <td className="long-text-td">{report.body_improvement}</td>
                <td>{report.topic_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default ReportsList;
