// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { Suspense, useState, useRef } from "react";
import { Router, Redirect, navigate } from "@reach/router";
import IdleTimer from "react-idle-timer";
import loadable from "@loadable/component";

import Xl8 from "./components/xl8/Xl8";

import UserProvider from "./context/user/UserContext";
import LiveEditProvider from "./context/translation/LiveEditContext";
import LookupProvider from "./context/data/LookupContext";

//login bundle
import Login from "./pages/login/Login";
import SignUp from "./pages/login/SignUp";
import ResetPassword from "./pages/login/ResetPassword";
import ForgotPassword from "./pages/login/ForgotPassword";
import Page404 from "./pages/page404/Page404";
import Loading from "./components/loading/Loading";

import { hasData } from "./utils/utils";
import { ROLE, TIME, FULLPATH_TO } from "./utils/constants";
import "./App.scss";
import "font-awesome/css/font-awesome.min.css";

const Authenticator = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./context/authenticator/Authenticator")
);
const RoleAuthenticator = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./context/roleAuthenticator/RoleAuthenticator")
);
const Flights = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/flights/Flights")
);
const PriorityVetting = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/vetting/Vetting")
);
const Home = loadable(() => import(/* webpackChunkName: "authed" */ "./pages/home/Home"));
const PaxDetail = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/paxDetail/PaxDetail")
);
const Summary = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/paxDetail/summary/Summary")
);
const APIS = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/paxDetail/apis/APIS")
);
const PNR = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/paxDetail/pnr/PNR")
);
const FlightHistory = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/paxDetail/flightHistory/FlightHistory")
);
const FlightPax = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/flightPax/FlightPax")
);
const LinkAnalysis = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/paxDetail/linkAnalysis/LinkAnalysis")
);
const Rules = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/tools/queryrules/Rules")
);
const Queries = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/tools/queryrules/Queries")
);
const QRDetails = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/tools/queryrules/QRDetails")
);
const POE = loadable(() => import(/* webpackChunkName: "authed" */ "./pages/poe/POE"));
const Tools = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/tools/Tools")
);
const Watchlist = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/tools/watchlist/Watchlist")
);
const About = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/tools/about/About")
);
const GModal = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./components/modal/GModal")
);
const PageUnauthorized = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/pageUnauthorized/PageUnauthorized")
);
const SeatChart = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./components/seatChart/SeatChart")
);
const UploadAttachment = loadable(() =>
  import(
    /* webpackChunkName: "authed" */ "./pages/paxDetail/uploadAttachment/UploadAttachment"
  )
);

const Search = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/search/Search")
);

const MessageDiff = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/messageDiff/MessageDiff")
);

//Admin bundle imports
const Admin = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/Admin")
);
const ManageUser = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/manageUsers/ManageUsers")
);
const FileDownload = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/fileDownload/FileDownload")
);
const AuditLog = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/auditLog/AuditLog")
);
const ErrorLog = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/errorLog/ErrorLog")
);
const CodeEditor = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/codeEditor/CodeEditor")
);
const Airport = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/codeEditor/airport/Airport")
);
const Carrier = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/codeEditor/carrier/Carrier")
);
const Country = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/codeEditor/country/Country")
);
const CreditCardType = loadable(() =>
  import(
    /* webpackChunkName: "admin" */ "./pages/admin/codeEditor/creditcardtype/CreditCardType"
  )
);
const LoaderStats = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/loaderStats/LoaderStats")
);
const Settings = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/settings/Settings")
);
const HitCats = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/hitCats/HitCats")
);
const NoteCats = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/noteCats/NoteCats")
);
const SignUpRequests = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/signUpRequests/SignUpRequests")
);
const Auxiliary = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./components/auxiliary/Auxiliary")
);
const LanguageEditor = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/lang/LanguageEditor")
);

const NEO4JURL = window?._env_
  ? window._env_.REACT_APP_NEO4J_BROWSER
  : process.env.REACT_APP_NEO4J_BROWSER;

const KIBANAURL = window?._env_
  ? window._env_.REACT_APP_BASE_KIBANA_LOGIN
  : process.env.REACT_APP_KIBANA_LOGIN;

const App = props => {
  const [showModal, setShowModal] = useState(false);
  const idleTimer = useRef(null);

  const onAction = e => {
    // console.log('user did something', e)
  };

  const onActive = e => {
    // console.log('user is active', e)
    // console.log('time remaining', idleTimer.getRemainingTime())
  };

  const onIdle = e => {
    console.log("user is idle", e);
    // console.log("last active", idleTimer.current.getLastActiveTime());

    // toggleModal();

    // Logout and redirect to login page
    // this.setState({ redirect: true });
    navigate(FULLPATH_TO.LOGIN);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const UNAUTHED = <PageUnauthorized path="pageUnauthorized"></PageUnauthorized>;
  const NF404 = <Page404 path="page404"></Page404>;

  return (
    <React.StrictMode>
      <>
        <UserProvider>
          <LookupProvider>
            <LiveEditProvider>
              <Suspense fallback="loading">
                <Router>
                  {NF404}
                  <Redirect from="/" to={FULLPATH_TO.LOGIN} noThrow />
                  <ResetPassword
                    path={`${FULLPATH_TO.RESETPWD}/:username/:resetToken`}
                  ></ResetPassword>
                  <ForgotPassword path={FULLPATH_TO.FORGOTPWD}></ForgotPassword>
                  <Login path={FULLPATH_TO.LOGIN}></Login>
                  <SignUp path={FULLPATH_TO.SIGNUP}></SignUp>
                </Router>
              </Suspense>

              {/* <Modal show={showModal} onHide={toggleModal}>
          <ModalHeader closeButton>
            <ModalTitle>
              <Xl8 xid="time001">Session timeout</Xl8>
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Xl8 xid="time002">
              Your session is about to expire. Click OK to continue.
            </Xl8>
            {idleTimer.current && idleTimer.current.getElapsedTime()}
            <button onClick={toggleModal}>OK</button>
          </ModalBody>
        </Modal> */}
              <div className="App">
                <IdleTimer
                  ref={idleTimer}
                  element={document}
                  onActive={onActive}
                  onIdle={onIdle}
                  onAction={onAction}
                  debounce={250}
                  timeout={TIME.MINUTES_25}
                />
                <Suspense fallback={<Loading></Loading>}>
                  <Router>
                    <Authenticator path="/gtas">
                      <RoleAuthenticator
                        path="/"
                        roles={[
                          ROLE.ADMIN,
                          ROLE.PAXVWR,
                          ROLE.RULEMGR,
                          ROLE.WLMGR,
                          ROLE.HITMGR,
                          ROLE.QRYMGR,
                          ROLE.FLIGHTVWR
                        ]}
                      >
                        {UNAUTHED}
                        <Home path="/">
                          <Redirect from="/" to={FULLPATH_TO.FLIGHTS} noThrow />
                          <MessageDiff path="diff"></MessageDiff>
                          <RoleAuthenticator
                            path="flights"
                            roles={[ROLE.ADMIN, ROLE.FLIGHTVWR]}
                          >
                            <Flights path="/"></Flights>
                          </RoleAuthenticator>
                          <RoleAuthenticator
                            path="flightpax"
                            roles={[ROLE.ADMIN, ROLE.PAXVWR]}
                          >
                            <FlightPax path="/:id"></FlightPax>
                          </RoleAuthenticator>
                          <RoleAuthenticator
                            path="paxDetail/:flightId/:paxId"
                            roles={[ROLE.ADMIN, ROLE.PAXVWR]}
                          >
                            <PaxDetail path="/">
                              <Summary path="summary" default></Summary>
                              <APIS path="apis"></APIS>
                              <PNR path="pnr"></PNR>
                              <FlightHistory path="flighthistory"></FlightHistory>
                              <LinkAnalysis path="linkanalysis"></LinkAnalysis>
                              <UploadAttachment path="uploadattachment"></UploadAttachment>
                            </PaxDetail>
                          </RoleAuthenticator>
                          <POE path="poe"></POE>
                          <RoleAuthenticator
                            path="vetting"
                            roles={[ROLE.ADMIN, ROLE.PAXVWR]}
                          >
                            <PriorityVetting path="/"></PriorityVetting>
                          </RoleAuthenticator>
                          <Tools path="tools">
                            <Rules path="rules"></Rules>
                            <Queries path="queries"></Queries>
                            <QRDetails path="qrdetails"></QRDetails>
                            <RoleAuthenticator
                              path="watchlist"
                              roles={[ROLE.ADMIN, ROLE.WLMGR]}
                            >
                              <Watchlist path="/"></Watchlist>
                              <Watchlist path="/:mode"></Watchlist>
                            </RoleAuthenticator>
                            <About path="about"></About>
                          </Tools>
                          <Search path="search/:searchParam"></Search>
                          <RoleAuthenticator
                            path="seat-chart/:flightId/:paxId/:currentPaxSeat"
                            roles={[ROLE.ADMIN, ROLE.PAXVWR]}
                          >
                            <SeatChart path="/"></SeatChart>
                          </RoleAuthenticator>
                          <RoleAuthenticator path="langEditor" roles={[ROLE.ADMIN]}>
                            <LanguageEditor path="/"></LanguageEditor>
                          </RoleAuthenticator>
                          <RoleAuthenticator path="admin" roles={[ROLE.ADMIN]}>
                            <Admin path="/" default>
                              <ManageUser
                                name={<Xl8 xid="app009">Manage Users</Xl8>}
                                path="manageusers"
                                desc={
                                  <Xl8 xid="app010">
                                    Manage user profiles and privileges
                                  </Xl8>
                                }
                                icon="fa-users"
                              ></ManageUser>
                              <SignUpRequests
                                name={<Xl8 xid="app010">Sign Up Requests</Xl8>}
                                desc={
                                  <Xl8 xid="app011">Manage system access requests</Xl8>
                                }
                                icon="fa-user-plus"
                                path="signuprequests"
                              ></SignUpRequests>
                              <AuditLog
                                name={<Xl8 xid="app012">Audit Log</Xl8>}
                                desc={<Xl8 xid="app013">View the system audit log</Xl8>}
                                path="auditlog"
                                icon="fa-question-circle"
                              ></AuditLog>
                              <ErrorLog
                                name={<Xl8 xid="app014">Error Log</Xl8>}
                                desc={<Xl8 xid="app015">View the system error log</Xl8>}
                                path="errorlog"
                                icon="fa-exclamation-triangle"
                              ></ErrorLog>
                              <Settings
                                name={<Xl8 xid="app016">Settings</Xl8>}
                                desc={
                                  <Xl8 xid="app017">View or edit system settings</Xl8>
                                }
                                path="settings"
                                icon="fa-toggle-on"
                              ></Settings>
                              <FileDownload
                                name={<Xl8 xid="app018">Download Logs</Xl8>}
                                desc={<Xl8 xid="app019">Download system log files</Xl8>}
                                icon="fa-download"
                                path="filedownload"
                              ></FileDownload>
                              <CodeEditor
                                name={<Xl8 xid="app020">Code Editor</Xl8>}
                                desc={<Xl8 xid="app021">View or edit system codes</Xl8>}
                                icon="fa-list-ul"
                                path="codeeditor"
                              >
                                <Country
                                  name={<Xl8 xid="app022">Country</Xl8>}
                                  path="country"
                                  default
                                ></Country>
                                <Airport
                                  name={<Xl8 xid="app023">Airport</Xl8>}
                                  path="airport"
                                ></Airport>
                                <Carrier
                                  name={<Xl8 xid="app024">Carrier</Xl8>}
                                  path="carrier"
                                ></Carrier>
                                <CreditCardType
                                  name={<Xl8 xid="app035">Card Types</Xl8>}
                                  path="cctype"
                                ></CreditCardType>
                              </CodeEditor>
                              <LoaderStats
                                name={<Xl8 xid="app025">Loader Statistics</Xl8>}
                                desc={
                                  <Xl8 xid="app026">
                                    View current message loading statistics
                                  </Xl8>
                                }
                                icon="fa-bar-chart"
                                path="loaderstats"
                              ></LoaderStats>
                              <HitCats
                                name={<Xl8 xid="app027">Hit Categories</Xl8>}
                                desc={<Xl8 xid="app028">View or edit Hit categories</Xl8>}
                                icon="fa-user-secret"
                                path="hitcats"
                              ></HitCats>
                              <NoteCats
                                name={<Xl8 xid="app029">Note Categories</Xl8>}
                                desc={
                                  <Xl8 xid="app030">View or edit Note categories</Xl8>
                                }
                                icon="fa-comment"
                                path="notecats"
                              ></NoteCats>
                              {hasData(KIBANAURL) && (
                                <Auxiliary
                                  name={<Xl8 xid="app031">Kibana Dashboard</Xl8>}
                                  desc={
                                    <Xl8 xid="app032">Go to the Kibana Dashboard</Xl8>
                                  }
                                  icon="kibana"
                                  path={KIBANAURL}
                                  hasExternalLink={true}
                                ></Auxiliary>
                              )}
                              {hasData(NEO4JURL) && (
                                <Auxiliary
                                  name={<Xl8 xid="app033">Neo4j</Xl8>}
                                  desc={<Xl8 xid="app034">Browse the Neo4j database</Xl8>}
                                  path={NEO4JURL}
                                  icon="neo4j"
                                  hasExternalLink={true}
                                ></Auxiliary>
                              )}
                            </Admin>
                          </RoleAuthenticator>
                          {UNAUTHED}
                        </Home>
                      </RoleAuthenticator>
                    </Authenticator>
                  </Router>
                </Suspense>
              </div>
            </LiveEditProvider>
          </LookupProvider>
        </UserProvider>
      </>
    </React.StrictMode>
  );
};

export default App;
