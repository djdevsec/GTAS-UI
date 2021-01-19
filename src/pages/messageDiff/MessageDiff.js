// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
// import SegmentTable from "../../components/segmentTable/SegmentTable";
// import { asArray, hasData } from "../../utils/utils";
import * as diff from "diff";
// import Xl8 from "../../../components/xl8/Xl8";
import "./MessageDiff.css";

const MessageDiff = props => {
  const [diffedText, setDiffedText] = useState();
  const segmentRef = React.createRef();

  // const segmentTitle = `Reservation Number: `;

  const msg1 = `UNB+UNOA:4+LUFTHANSA:ZZ+HDQCH2X:ZZ+101120:1024+123456789++PAXLST'
  UNH+53371718146010+PAXLST:D:02B:UN:IATA'
  BGM+745'
  NAD+MS+++UNITED HELPDESK SIN'
  COM+044 222 222222:TE'
  TDT+20+SN471'
  LOC+125+BRU'
  DTM+189:2011111124:201'
  LOC+87+EBB'
  DTM+232:2011111950:201'
  NAD+FL+++STRANGE:HENRIETTA:GERALDINE'
  ATT+2++F'
  DTM+329:740423'
  MEA+CT++2'
  MEA+WT++KGM:28'
  FTX+BAG+++2000310:2'
  LOC+178+FRA'
  LOC+179+KWI'
  LOC+174+USA'
  NAT+2+USA'
  RFF+AVF:8C5573'
  RFF+SEA:56F'
  DOC+P+720915106'
  DTM+36:211102'
  LOC+91+USA'
  DOC+V+99685108'
  DTM+36:220427'
  LOC+91+UGA'
  NAD+FL+++INFANTE:ELADIA:ALLYSON'
  ATT+2++F'
  DTM+329:000714'
  MEA+CT++2'
  MEA+WT++KGM:26'
  FTX+BAG+++2000312:2'
  LOC+178+FRA'
  LOC+179+KWI'
  LOC+174+USA'
  NAT+2+USA'
  RFF+AVF:8C5573'
  RFF+SEA:19F'
  DOC+P+650604918'
  DTM+36:190416'
  LOC+91+USA'
  DOC+V+57081269'
  DTM+36:220207'
  LOC+91+UGA'
  CNT+42:200'
  UNT+213+53371718146010'
  UNZ+1+123456789'
  `;

  const msg2 = `UNB+UNOA:4+LUFTHANSA:ZZ+HDQCH2X:ZZ+211120:1120+123456789++PAXLST'
  UNH+53371718146010+PAXLST:D:02B:UN:IATA'
  BGM+745'
  NAD+MS+++UNITED HELPDESK SIN'
  COM+044 222 222222:TE'
  TDT+20+UA988'
  LOC+125+FRA'
  DTM+189:2011221220:201'
  LOC+87+IAD'
  DTM+232:2011221505:201'
  NAD+FL+++STRANGE:HENRIETTA:GERALDINE'
  ATT+2++F'
  DTM+329:740423'
  MEA+CT++2'
  MEA+WT++KGM:28'
  FTX+BAG+++2000310:2'
  LOC+178+FRA'
  LOC+179+KWI'
  LOC+174+USA'
  NAT+2+USA'
  RFF+AVF:615573'
  RFF+SEA:56F'
  DOC+P+720915106'
  DTM+36:211102'
  LOC+91+USA'
  NAD+FL+++INFANTE:ELADIA:ALLYSON'
  ATT+2++F'
  DTM+329:000714'
  MEA+CT++2'
  MEA+WT++KGM:26'
  FTX+BAG+++2000312:2'
  LOC+178+FRA'
  LOC+179+KWI'
  LOC+174+USA'
  NAT+2+USA'
  RFF+AVF:615573'
  RFF+SEA:19F'
  DOC+P+650604918'
  DTM+36:190416'
  LOC+91+USA'
  CNT+42:200'
  UNT+213+53371718146010'
  UNZ+1+123456789'
  `;

  // const raw1 = msg1.split("\'");
  // const raw2 = msg2.split("'");

  // attempt with base functionality - no dep
  /** todo:
   * abstract display component with css, parent page
   * unser paxdetail?
   * concurrent with paxdetail child refac?
   * diff functionality requirements?
   *    by line, word, char?
   *    line #s
   *    meta data?
   *    raw file or parsed data fields?
   *    launchable from paxdetail? elsewhere?
   *    how to select files for comparison?
   *    allow user edits/meta data or read-only?
   *
   *  */

  useEffect(() => {
    if (!diff) return;
    let res = diff["diffWords"](msg1, msg2);

    const updated = res.map(part => {
      // green for additions, red for deletions
      // grey for common parts
      const color = part.added
        ? "diff-added"
        : part.removed
        ? "diff-removed"
        : "diff-same";
      return <span className={color}>{part.value}</span>;
    });

    setDiffedText(updated);
  }, []);

  return (
    <div className="paxdetail-container">
      <Row>
        <Col className="diff-container" md="3" contentEditable="true">
          {/* <SegmentTableLikeComponentHere data={msg1} /> */}
          {msg1}
        </Col>
        <Col className="diff-container" md="3" contentEditable="true">
          {msg2}
        </Col>
        <Col className="diff-container" md="4" contentEditable="true">
          {diffedText}
        </Col>
      </Row>
    </div>
  );
};

export default MessageDiff;
