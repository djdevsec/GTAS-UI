// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import { Row } from "react-bootstrap";
import { alt, hasData } from "../../utils/utils";
import "./CountdownBadge.css";
import Xl8 from "../xl8/Xl8";

//TODO - refactor. clean and possibly move the calcs to utils.
const CountdownBadge = props => {
  if (!props.future) return <></>;

  const incoming = new Date(props.future);
  const now = props.now || new Date();
  const deltaRaw = (incoming - now) / 1000;
  const isPos = deltaRaw >= 0;
  const delta = Math.abs(deltaRaw);

  const getIconClass = () => {
    const dir = props.direction;
    if (!dir) return "";

    return dir === "I" ? "img-arrival" : dir === "O" ? "img-departure" : "";
  };

  const pad = val => {
    if (isNaN(val)) return 0;

    const sign = val < 0 ? "-" : "";
    const res = alt(Math.abs(val), "0")
      .toString()
      .padStart(2, "0");
    return `${sign}${res}`;
  };

  const altZero = (val, alt = "") => {
    if (+val === 0 || isNaN(+val)) return alt;
    return val;
  };

  const sign = isPos ? "" : "-";
  const parse = (val, alt) => altZero(pad(val), alt);

  const dayraw = Math.floor(delta / 86400);
  const hrsraw = Math.floor(delta / 3600) % 24;
  const minraw = Math.floor(delta / 60) % 60;
  const days = altZero(dayraw);
  const hours = !days ? parse(hrsraw) : pad(Math.abs(hrsraw));
  const minutes = !days && !hours ? parse(minraw, "00") : pad(Math.abs(minraw));

  const d = <Xl8 xid="cdb001">d</Xl8>;
  const h = <Xl8 xid="cdb002">h</Xl8>;
  const m = <Xl8 xid="cdb003">m</Xl8>;
  const formatedDays = days ? (
    <span className="">
      {days}
      {d}
    </span>
  ) : (
    days
  );
  const formatedHours = hours ? (
    <span className="">
      {hours}
      {h}
    </span>
  ) : (
    hours
  );
  const formatedMinutes = minutes ? (
    <span className="">
      {minutes}
      {m}
    </span>
  ) : (
    minutes
  );

  const getStyle = () => {
    if (dayraw > 1) return "bordered cdb-white";

    if (!isPos) return "bordered cdb-gray";
    if (dayraw === 1) return "bordered cdb-green";
    if (hrsraw >= 12) return "bordered cdb-yellow";
    if (hrsraw >= 1) return "bordered cdb-orange";

    return "bordered cdb-red";
  };

  const getSpanStyle = val => {
    if (hasData(val)) return "cdb-days-div";
    return "";
  };

  return (
    <div className="text-center">
      <Row flex="true" no-wrap="true" className={`cdb-row sm ${getStyle()}`}>
        <span className={getIconClass()}></span>
        <span>{sign}</span>
        <span className={getSpanStyle(formatedDays)}>{formatedDays}</span>
        <span className={getSpanStyle(formatedHours)}>{formatedHours}</span>
        <span className={getSpanStyle(minutes)}>{formatedMinutes}</span>
      </Row>
    </div>
  );
};

export default CountdownBadge;
