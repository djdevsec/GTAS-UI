import React from "react";
import { paxdetailsReport } from "../../../services/serviceWrapper";
import { Button } from "react-bootstrap";

const DownloadReport = props => {
  const dowload = () => {
    paxdetailsReport.get(props.paxId, props.flightId).then(res => {
      if (res) {
        let data = new Uint8Array(res);
        let blob = new Blob([data], { type: "application/pdf" });
        let url = window.URL.createObjectURL(blob);
        let a = window.document.createElement("a");
        a.href = url;
        a.download = "gtas_event_report";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        console.log("ERROR! Error in generating GTAS Event Report. No data was retured");
      }
    });
  };

  return (
    <Button variant="outline-info" size="sm" onClick={dowload}>
      <i className="fa fa-download"></i> Report
    </Button>
  );
};

export default DownloadReport;