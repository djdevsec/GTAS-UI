import React, { useState } from "react";
import Table from "../../../components/table/Table";
import { errorlog, flights } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import { Col, Container } from "react-bootstrap";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import FilterForm from "../../../components/filterForm2/FilterForm";
import Main from "../../../components/main/Main";
import LabelledDateTimePickerStartEnd from "../../../components/inputs/LabelledDateTimePickerStartEnd/LabelledDateTimePickerStartEnd";
import SidenavContainer from "../../../components/sidenavContainer/SidenavContainer";

const ErrorLog = ({ name }) => {
  const cb = function(result) {};
  const [data, setData] = useState();
  const [refreshKey, setRefreshKey] = useState(1);
  let sDate = new Date();
  let eDate = new Date();
  eDate.setDate(eDate.getDate() + 1);
  sDate.setDate(sDate.getDate() - 1);
  const [startDate, setStartDate] = useState(sDate);
  const [endDate, setEndDate] = useState(eDate);

  const visibleCols = ["errorId", "errorCode", "errorDescription", "errorTimestamp"];

  const preFetchCallback = params => {
    let parsedParams = "";
    if (params) {
      if (params.dateRange) {
        parsedParams +=
          "?startDate=" +
          params.dateRange.etaStart.toISOString() +
          "&endDate=" +
          params.dateRange.etaEnd.toISOString();
      }
      if (params.errorCode) {
        parsedParams += "&code=" + params.errorCode;
      }
    }
    return parsedParams;
  };

  const setDataWrapper = res => {
    setData(res);
    setRefreshKey(refreshKey + 1);
  };

  return (
    <>
      <SidenavContainer>
        <Col>
          <FilterForm
            service={errorlog.get}
            paramCallback={preFetchCallback}
            callback={setDataWrapper}
          >
            <br />
            <LabelledInput
              labelText={<Xl8 xid="el001">Error Code</Xl8>}
              datafield="errorCode"
              name="code"
              inputType="text"
              callback={cb}
              alt="Error Code"
            />
            <LabelledDateTimePickerStartEnd
              labelText={<Xl8 xid="el002">Date Range</Xl8>}
              inputType="date"
              name="datepicker"
              datafield={["dateRange"]}
              inputVal={{ etaStart: startDate, etaEnd: endDate }}
              callback={cb}
              startDate={startDate}
              endDate={endDate}
              endMut={cb}
              startMut={cb}
              alt="datepicker"
            />
          </FilterForm>
        </Col>
      </SidenavContainer>
      <Main>
        <Title title={name}></Title>

        <Table
          data={data}
          id="errorLog"
          callback={cb}
          header={visibleCols}
          key={refreshKey}
        ></Table>
      </Main>
    </>
  );
};

export default ErrorLog;
