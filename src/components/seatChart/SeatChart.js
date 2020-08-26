import React, { useEffect, useState } from "react";
import Seat from "./seat/Seat";
import { Container, Row, Col } from "react-bootstrap";
import "./SeatChart.scss";
import { seats } from "../../services/serviceWrapper";
import { asArray, hasData } from "../../utils/utils";
import { useParams, navigate, Link } from "@reach/router";
import SeatInfo from "./seatInfo/SeatInfo";
import Legend from "./legend/Legend";

const SeatChart = props => {
  const { flightId, currentPaxSeat } = useParams();
  const [reserevedSeatsInfo, setReservedSeatsInfo] = useState({});
  const [columnWithReservedSeat, setColumnWithReservedSeat] = useState([]);
  const [selectedSeatInfo, setSelectedSeatInfo] = useState();

  const getRow = letter => {
    const row = [];
    columnWithReservedSeat.forEach(col => {
      const seatNumber = `${col}${letter}`;
      row.push(
        <Seat
          seatNumber={seatNumber}
          seatInfo={reserevedSeatsInfo[seatNumber]}
          selected={currentPaxSeat === seatNumber}
          key={seatNumber}
          className={
            selectedSeatInfo.coTravellers.includes(seatNumber) ? "co-traveler" : ""
          }
        />
      );
    });

    return row;
  };

  const seatNumberToSeatInfoMap = seatsInfo => {
    const mappedSeatInfo = {};
    asArray(seatsInfo).map(info => (mappedSeatInfo[info.number] = info));
    setReservedSeatsInfo(mappedSeatInfo);
  };

  const getColumnWithReservedSeat = seatsInfo => {
    const rows = [];
    asArray(seatsInfo).map(info => {
      const number = info.number.slice(0, -1);
      if (rows.indexOf(number) === -1) rows[number] = number;
    });
    rows.sort((x, y) => x - y);
    return rows;
  };

  useEffect(() => {
    seats.get(flightId).then(res => {
      seatNumberToSeatInfoMap(res);
      setColumnWithReservedSeat(getColumnWithReservedSeat(res));
    });
  }, []);

  useEffect(() => {
    setSelectedSeatInfo(reserevedSeatsInfo[currentPaxSeat] || {});
  }, [currentPaxSeat, reserevedSeatsInfo]);

  return (
    <Container fluid>
      <div className="seat-chart">
        <div>
          <Row>{getRow("A")}</Row>
          <Row>{getRow("B")}</Row>
          <Row>{getRow("C")}</Row>
        </div>

        <div className="middle-rows">
          <Row>{getRow("D")}</Row>
          <Row>{getRow("E")}</Row>
          <Row>{getRow("F")}</Row>
          <Row>{getRow("G")}</Row>
        </div>

        <div>
          <Row>{getRow("H")}</Row>
          <Row>{getRow("J")}</Row>
          <Row>{getRow("K")}</Row>
        </div>
      </div>
      <Row className="seat-info-display">
        <Col xs={12} md={6}>
          <Legend />
        </Col>

        <Col xs={12} md={6}>
          <SeatInfo info={selectedSeatInfo} />
        </Col>
      </Row>
    </Container>
  );
};

export default SeatChart;
