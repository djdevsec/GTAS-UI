import React, { useState, useEffect } from "react";
import { localeDate, asArray, hasData } from "../../../utils/utils";
import {
  paxdetails,
  paxWatchListLink,
  flightpaxHitSummary,
  paxEventNotesHistory
} from "../../../services/serviceWrapper";
import { Container, CardColumns } from "react-bootstrap";
import "./Summary.scss";
import CardWithTable from "../../../components/cardWithTable/CardWithTable";
import Xl8 from "../../../components/xl8/Xl8";
// import { composeInitialProps } from "react-i18next";

const Summary = props => {
  const headers = {
    documents: {
      documentNumber: "Document Number",
      documentType: "Type",
      issuanceCountry: "Issuance Country",
      expirationDate: "Expiration Date",
      messageType: "Source"
    },
    watchListLinks: {
      watchlistCategory: "Category",
      watchListLastName: "Last Name",
      watchListFirstName: "First Name",
      watchListDOB: "DOB",
      percentMatch: "Match %"
    },
    paxHitSummary: {
      status: "Status",
      severity: "Severity",
      author: "Author",
      category: "Category",
      ruleDesc: "Title",
      ruleConditions: "Conditions"
    },
    eventNotes: {
      plainTextNote: "Note",
      noteType: "Note Type",
      createdBy: "Created By",
      createdAt: "Created At"
    }
  };

  const setHasOpenHit = props.setHasOpenHit;
  const setHasHit = props.setHasHit;
  const [documents, setDocuments] = useState([]);
  const [watchListLinks, setWatchListLinks] = useState([]);
  const [paxHitSummary, setPaxHitSummary] = useState([]);
  const [eventNotes, setEventNotes] = useState([]);
  const [historicalEventNotes, setHistoricalEventNotes] = useState([]);

  useEffect(() => {
    paxdetails.get(props.flightId, props.paxId).then(res => {
      setDocuments(res.documents);
    });
  }, []);

  useEffect(() => {
    paxWatchListLink.get(null, props.paxId).then(res => {
      const data = asArray(res).map(pwl => {
        return {
          ...pwl,
          percentMatch: `${pwl.percentMatch * 100}%`
        };
      });
      setWatchListLinks(data);
    });
  }, []);

  useEffect(() => {
    flightpaxHitSummary.get(props.flightId, props.paxId).then(res => {
      setPaxHitSummary(res);
      const openHit = hasData(res)
        ? res.find(hit => hit.status === "New" || hit.status === "Re_Opened")
        : undefined;
      setHasHit(hasData(res));
      setHasOpenHit(openHit !== undefined);
    });
  }, [props.hitSummaryRefreshKey]);

  useEffect(() => {
    paxEventNotesHistory.get(props.paxId, false).then(res => {
      const notesData = res.paxNotes?.map(note => {
        const type = (note.noteType || []).map(t => {
          return t.noteType;
        });
        return {
          ...note,
          createdAt: localeDate(note.createdAt),
          noteType: type.toString()
        };
      });
      setEventNotes(notesData);
    });
    paxEventNotesHistory.get(props.paxId, true).then(res => {
      const notesData = res.paxNotes
        ?.map(note => {
          const type = (note.noteTypes || []).map(t => {
            return t.noteType;
          });
          return {
            ...note,
            createdAt: localeDate(note.createdAt),
            noteType: type.toString()
          };
        })
        .slice(0, 10);
      setHistoricalEventNotes(notesData);
    });
  }, [props.eventNoteRefreshKey]);

  return (
    <Container fluid className="summary-container">
      <CardColumns>
        <CardWithTable
          data={paxHitSummary}
          headers={headers.paxHitSummary}
          title={<Xl8 xid="8">Passenger Current Hits summary</Xl8>}
          // title="Passenger Current Hits summary"
        />

        <CardWithTable
          data={documents}
          headers={headers.documents}
          title={<Xl8 xid="8">Documents</Xl8>}
        />
        <CardWithTable
          data={watchListLinks}
          headers={headers.watchListLinks}
          title={<Xl8 xid="8">Watchlist Name Comparison</Xl8>}
        />

        <CardWithTable
          data={eventNotes}
          headers={headers.eventNotes}
          title={<Xl8 xid="8">Event Note History</Xl8>}
        />
        <CardWithTable
          data={historicalEventNotes}
          headers={headers.eventNotes}
          title={<Xl8 xid="8">Previous Note History</Xl8>}
        />
      </CardColumns>
    </Container>
  );
};

export default Summary;
