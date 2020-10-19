import React from "react";
import Title from "../../components/title/Title";
import Xl8 from "../../components/xl8/Xl8";
import Main from "../../components/main/Main";
import { Card, CardDeck } from "react-bootstrap";
import RoleAuthenticator from "../../context/roleAuthenticator/RoleAuthenticator";
import { getEndpoint } from "../../utils/utils";
import { ROLE } from "../../utils/constants";
import { Link } from "@reach/router";
import "./Tools.css";

const Tools = props => {
  const tiles = [
    {
      name: <Xl8 xid="app001">Rules</Xl8>,
      desc: <Xl8 xid="app002">View or edit rules for generating hits</Xl8>,
      path: "rules",
      icon: "fa-address-book-o",
      roles: [ROLE.ADMIN, ROLE.RULEMGR]
    },
    {
      name: <Xl8 xid="app003">Queries</Xl8>,
      desc: <Xl8 xid="app004">View or edit queries of system data</Xl8>,
      path: "queries",
      icon: "fa-search",
      roles: [ROLE.ADMIN, ROLE.QRYMGR]
    },
    {
      name: <Xl8 xid="app005">Watchlist</Xl8>,
      desc: <Xl8 xid="app006">View or add passenger and document watchlists</Xl8>,
      path: "watchlist",
      icon: "fa-user-secret",
      roles: [ROLE.ADMIN, ROLE.WLMGR]
    },
    {
      name: <Xl8 xid="app007">About</Xl8>,
      desc: <Xl8 xid="app008">View system information details</Xl8>,
      path: "about",
      icon: "fa-info-circle",
      roles: [
        ROLE.ADMIN,
        ROLE.PAXVWR,
        ROLE.RULEMGR,
        ROLE.CASEMGR,
        ROLE.WLMGR,
        ROLE.HITMGR,
        ROLE.QRYMGR,
        ROLE.FLIGHTVWR
      ]
    }
  ];

  if (getEndpoint(props.location?.pathname) === "tools")
    return (
      <>
        <Main className="full-cards">
          <Title title={<Xl8 xid="too001">Tools</Xl8>} />
          <CardDeck className="page-deck">
            {tiles.map(data => {
              return (
                <RoleAuthenticator alt={<></>} roles={data.roles}>
                  <Card className="page-tiles card-shadow" key={data.path}>
                    <Link to={data.path} className="card-link">
                      <Card.Body>
                        <Card.Title className="nowrap">
                          <i className={`fa fa-3x ${data.icon}`}></i>
                        </Card.Title>
                        <div className="card-overlay">{data.name}</div>
                        <div className="card-description">
                          <Card.Text>{data.desc}</Card.Text>
                        </div>
                      </Card.Body>
                    </Link>
                  </Card>
                </RoleAuthenticator>
              );
            })}
          </CardDeck>
        </Main>
      </>
    );

  return <>{props.children}</>;
};

export default Tools;
