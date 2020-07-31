import GenericService from "./genericService";
import { hasData, asArray } from "../utils/utils";

const GET = "get";
const DELETE = "delete";
const POST = "post";
const PUT = "put";
const AJSON = "application/json, text/plain, */*";
const JSONUTF8 = "application/json;charset=UTF-8";
const FORM = "application/x-www-form-urlencoded";

const LOGINHEADER = {
  "X-Login-Ajax-call": "true",
  "Content-Type": FORM,
  "X-Requested-With": "XMLHttpRequest",
  Accept: AJSON,
  "Accept-Encoding": "gzip, deflate, br"
};
const SIGNUPHEADER = {
  "X-Login-Ajax-call": "true",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
  Accept: AJSON
};

const BASEHEADER = { "Content-Type": JSONUTF8, Accept: AJSON };
const PUTBODY = "The put method requires a valid body parameter.";
const POSTBODY = "The post method requires a valid body or data parameter.";
const PUTID = "The put method requires a valid id parameter.";
const PUTPARAMS = "The put method requires parameters.";
const DELETEID = "The delete method requires a valid id parameter.";

function get(uri, headers, id, params) {
  let uricomplete = `${uri}${hasData(id) ? `/${id}` : ""}${
    hasData(params) ? params : ""
  }`;

  return GenericService({ uri: uricomplete, method: GET, headers: headers });
}

function post(uri, headers, body) {
  return GenericService({
    uri: uri,
    method: POST,
    headers: headers,
    body: body
  });
}

function put(uri, headers, id, body) {
  // if (!hasData(body)) throw new TypeError(PUTBODY);

  let uricomplete = `${uri}${hasData(id) ? `/${id}` : ""}`;

  return GenericService({
    uri: uricomplete,
    method: PUT,
    body: body,
    headers: headers
  });
}

function putNoId(uri, headers, body) {
  return put(uri, headers, undefined, body);
}

function del(uri, headers, id) {
  if (!hasData(id)) throw new TypeError(DELETEID);

  let uricomplete = `${uri}${hasData(id) ? `/${id}` : ""}`;

  return GenericService({
    uri: uricomplete,
    method: DELETE,
    headers: headers
  });
}

function stringify(body) {
  return JSON.stringify({ ...body });
}

// APB - ENTITY CONSTANTS and ENTITY METHODS is the only code we should need to touch when adding new endpoints
const BASE_URL = process.env.REACT_APP_BASE_URL;

const LOGIN = `${BASE_URL}gtas/authenticate`;
const USERS = `${BASE_URL}gtas/users`;
const MANAGEUSERS = `${BASE_URL}gtas/manageuser`;
const USERSEMAIL = `${BASE_URL}gtas/users/emails`;
const CHANGEPASSWORD = `${BASE_URL}gtas/user/change-password`;
const WLCATS = `${BASE_URL}gtas/wl/watchlistCategories`;
const WLCATSPOST = `${BASE_URL}gtas/wlput/wlcat/`;
const FLIGHTS = `${BASE_URL}gtas/api/flights`;
const AUDITLOG = `${BASE_URL}gtas/auditlog`;
const ERRORLOG = `${BASE_URL}gtas/errorlog`;
const CASES = `${BASE_URL}gtas/hits`;
const SETTINGSINFO = `${BASE_URL}gtas/settingsinfo`;
const GETRULECATS = `${BASE_URL}getRuleCats`;
const PAX = `${BASE_URL}gtas/passengers/passenger`;
const FLIGHTPAXHITSUMMARY = `${BASE_URL}gtas/hit/flightpassenger`;
const FLIGHTPAX = `${BASE_URL}gtas/api/flights/flightpax`;
const QUERIES = `${BASE_URL}gtas/query`;
const RULES = `${BASE_URL}gtas/udr`;
const RULESALL = `${BASE_URL}gtas/all_udr`;
const LOADERSTATISTICS = `${BASE_URL}gtas/api/statistics`;
const RULE_CATS = `${BASE_URL}gtas/getRuleCats`;
const NOTE_TYPES = `${BASE_URL}gtas/passengers/passenger/notetypes`;
const LOGGEDIN_USER = `${BASE_URL}gtas/user`;
const NOTE_TYPESPOST = `${BASE_URL}gtas/api/noteType`;
const ROLES = `${BASE_URL}gtas/roles/`;
const CODES_AIRPORT = `${BASE_URL}gtas/api/airport`;
const CODES_COUNTRY = `${BASE_URL}gtas/api/country`;
const CODES_CARRIER = `${BASE_URL}gtas/api/carrier`;
const CODES_RESTOREALL_AIRPORT = `${BASE_URL}gtas/api/airport/restoreAll`;
const CODES_RESTOREALL_COUNTRY = `${BASE_URL}gtas/api/country/restoreAll`;
const CODES_RESTOREALL_CARRIER = `${BASE_URL}gtas/api/carrier/restoreAll`;
const CODES_RESTORE_AIRPORT = `${BASE_URL}gtas/api/airport/restore`;
const CODES_RESTORE_CARRIER = `${BASE_URL}gtas/api/carrier/restore`;
const CODES_RESTORE_COUNTRY = `${BASE_URL}gtas/api/country/restore`;

const WLDOCS = `${BASE_URL}gtas/wl/DOCUMENT/Document`;
const WLDOCSPOST = `${BASE_URL}gtas/wl/DOCUMENT`;
const WLPAX = `${BASE_URL}gtas/wl/PASSENGER/Passenger`;
const WLPAXPOST = `${BASE_URL}gtas/wl/PASSENGER`;
const WLITEM = `${BASE_URL}gtas/wl/watchlistItem`;

const PAXDETAILSREPORT = `${BASE_URL}gtas/paxdetailreport`;
const NOTIFICATION = `${BASE_URL}gtas/users/notify`;
const HOST = `${BASE_URL}gtas/api/config/`;
const CYPHER = HOST + "cypherUrl";
const CYPHERAUTH = HOST + "cypherAuth";
const MANUALHIT = `${BASE_URL}gtas/createmanualpvl`;
const LOGFILE = `${BASE_URL}gtas/api/logs/`;
const SIGNUP = `${BASE_URL}gtas/user/signup/new`;
const PHYSICALLOCATIONS = `${BASE_URL}gtas/user/signup/physiclLocations`;
const SIGNUPREQUESTS = `${BASE_URL}gtas/api/signup-requests`;
const SIGNUPREQUESTAPPROVE = `${BASE_URL}gtas/signupRequest/approve`;
const SIGNUPREQUESTSREJECT = `${BASE_URL}gtas/signupRequest/reject`;
// ENTITY METHODS
export const users = {
  get: (id, params) => get(USERS + "/", BASEHEADER, id, params),
  put: body => {
    const id = body.userId;
    return put(MANAGEUSERS, BASEHEADER, id, stringify(body));
  },
  post: body => post(USERS + "/1", BASEHEADER, stringify(body)),
  del: body => post(USERS, BASEHEADER)
};
export const usersemails = {
  get: () => get(USERSEMAIL, BASEHEADER)
};
export const watchlistcats = {
  get: (id, params) => get(WLCATS, BASEHEADER, id, params),
  post: body => post(WLCATS, BASEHEADER, body)
};

export const watchlistcatspost = {
  post: body => {
    return post(WLCATSPOST, BASEHEADER, stringify(body));
  }
};
export const userService = {
  get: (id, params) => get(USERS, BASEHEADER),
  post: body => {
    return post(USERS, BASEHEADER, stringify(body));
  }
};

export const flights = { get: params => get(FLIGHTS, BASEHEADER, undefined, params) };
export const auditlog = { get: params => get(AUDITLOG, BASEHEADER, undefined, params) };
export const errorlog = { get: params => get(ERRORLOG, BASEHEADER, undefined, params) };
export const cases = {
  get: (id, params) => get(CASES, BASEHEADER, undefined, params),
  updateStatus: (paxId, status) => {
    const body = { passengerId: paxId, status: status };
    return post(CASES, BASEHEADER, stringify(body));
  }
};
export const ruleCats = { get: (id, params) => get(RULE_CATS, BASEHEADER) };
export const settingsinfo = {
  get: (id, params) => get(SETTINGSINFO, BASEHEADER),
  put: body => putNoId(SETTINGSINFO, BASEHEADER, stringify(body))
};
export const getrulecats = { get: (id, params) => get(GETRULECATS, BASEHEADER) };
export const paxdetails = {
  get: (flightId, paxId) => {
    const path = `${PAX}/${paxId}/details?flightId=${flightId}`;
    return get(path, BASEHEADER);
  }
};
export const paxFlightHistory = {
  get: (flightId, paxId) => {
    const path = `${PAX}/flighthistory?paxId=${paxId}&flightId=${flightId}`;
    return get(path, BASEHEADER);
  }
};
export const paxFullTravelHistory = {
  get: (flightId, paxId) => {
    const path = `${PAX}/bookingdetailhistory?paxId=${paxId}&flightId=${flightId}`;
    return get(path, BASEHEADER);
  }
};
export const paxWatchListLink = {
  get: (id, params) => {
    const path = `${PAX}/getwatchlistlink?paxId=`;
    return get(path, BASEHEADER, id, params);
  }
};
export const flightpaxHitSummary = {
  get: (flightId, paxId) => {
    const path = `${FLIGHTPAXHITSUMMARY}?passengerId=${paxId}&flightId=${flightId}`;
    return get(path, BASEHEADER);
  }
};
export const paxEventNotesHistory = {
  get: (paxId, historicalNotes) => {
    const path = `${PAX}/notes?paxId=${paxId}&historicalNotes=${historicalNotes}`;
    return get(path, BASEHEADER);
  },
  post: (paxId, body) => {
    const tempBody = {
      ...body,
      noteType: [body.noteType],
      rtfNote: `<div><!--block -->${body.plainTextNote}</div>`, //this should be fixed
      passengerId: paxId
    };
    return post(`${PAX}/note`, BASEHEADER, stringify(tempBody));
  }
};

export const paxdetailsReport = {
  get: (paxId, flightId) => {
    const path = `${PAXDETAILSREPORT}?paxId=${paxId}&flightId=${flightId}`;
    return get(path, BASEHEADER);
  }
};
export const notification = {
  post: (paxId, body) => {
    const selectedEmail = asArray(body.to)
      .filter(email => email.checked === true)
      .map(email => email.key);

    if (body.externalUsersEmail) {
      selectedEmail.push(body.externalUsersEmail);
    }

    const bodyWithPaxId = {
      note: body.note ? body.note : "",
      paxId: paxId,
      to: selectedEmail
    };
    return post(NOTIFICATION, BASEHEADER, stringify(bodyWithPaxId));
  }
};
export const flightPassengers = { get: id => get(FLIGHTPAX, BASEHEADER, id) };
export const loaderStats = { get: (id, params) => get(LOADERSTATISTICS, BASEHEADER) };
export const notetypes = {
  get: (id, params) => get(NOTE_TYPES, BASEHEADER),
  post: body => post(NOTE_TYPESPOST, BASEHEADER, stringify(body))
};
export const loggedinUser = { get: (id, params) => get(LOGGEDIN_USER, BASEHEADER) };
export const roles = { get: () => get(ROLES, BASEHEADER) };
export const codeEditor = {
  get: {
    carrierCodes: () => get(CODES_CARRIER, BASEHEADER),
    countryCodes: () => get(CODES_COUNTRY, BASEHEADER),
    airportCodes: () => get(CODES_AIRPORT, BASEHEADER)
  },
  put: {
    updateCarrier: body => putNoId(CODES_CARRIER, BASEHEADER, stringify(body)),
    updateCountry: body => putNoId(CODES_COUNTRY, BASEHEADER, stringify(body)),
    updateAirport: body => putNoId(CODES_AIRPORT, BASEHEADER, stringify(body)),
    restoreCarriersAll: body => putNoId(CODES_RESTOREALL_CARRIER, BASEHEADER, body),
    restoreCountriesAll: body => putNoId(CODES_RESTOREALL_COUNTRY, BASEHEADER, body),
    restoreAirportsAll: body => putNoId(CODES_RESTOREALL_AIRPORT, BASEHEADER, body),
    restoreCarrier: body => putNoId(CODES_RESTORE_CARRIER, BASEHEADER, stringify(body)),
    restoreCountry: body => putNoId(CODES_RESTORE_COUNTRY, BASEHEADER, stringify(body)),
    restoreAirport: body => putNoId(CODES_RESTORE_AIRPORT, BASEHEADER, stringify(body))
  },
  post: {
    createCarrier: body => post(CODES_CARRIER, BASEHEADER, stringify(body)),
    createCountry: body => post(CODES_COUNTRY, BASEHEADER, stringify(body)),
    createAirport: body => post(CODES_AIRPORT, BASEHEADER, stringify(body))
  },
  delete: {
    deleteCarrier: id => del(CODES_CARRIER, BASEHEADER, id),
    deleteCountry: id => del(CODES_COUNTRY, BASEHEADER, id),
    deleteAirport: id => del(CODES_AIRPORT, BASEHEADER, id)
  }
};

export const login = {
  post: body => {
    const username = body["username"].toUpperCase();
    const password = encodeURIComponent(body["password"]);
    const creds = new URLSearchParams(`username=${username}&password=${password}`);

    return post(LOGIN, LOGINHEADER, creds).then(res => {
      if (!res.ok) return res;

      return get(LOGGEDIN_USER, BASEHEADER);
    });
  }
};

export const query = {
  get: () => {
    return get(QUERIES, BASEHEADER).then(res => {
      if (res.status === "SUCCESS") return res.result;
      return [];
    });
  },
  put: (id, body) => put(QUERIES, BASEHEADER, id, stringify(body)),
  post: body => post(QUERIES, BASEHEADER, stringify(body)),
  del: id => del(QUERIES, BASEHEADER, id)
};

export const rule = {
  get: id => {
    return get(RULES, BASEHEADER, id).then(res => {
      if (res.status === "SUCCESS") return res.result;
      return [];
    });
  },
  put: (id, body) => put(RULES, BASEHEADER, id, stringify(body)),
  post: body => post(RULES, BASEHEADER, stringify(body)),
  del: id => del(RULES, BASEHEADER, id)
};

export const rulesall = {
  get: id => {
    return get(RULESALL, BASEHEADER, id).then(res => {
      if (res.status === "SUCCESS") return res.result;
      return [];
    });
  }
};

export const wldocs = {
  get: () => {
    return get(WLDOCS, BASEHEADER).then(res => {
      if (res.status === "SUCCESS") return res.result?.watchlistItems;
      return [];
    });
  },
  post: body => post(WLDOCSPOST, BASEHEADER, stringify(body)),
  put: body => put(WLDOCSPOST, BASEHEADER, undefined, stringify(body)),
  del: id => del(WLITEM, BASEHEADER, id)
};

export const wlpax = {
  get: () => {
    return get(WLPAX, BASEHEADER).then(res => {
      if (res.status === "SUCCESS") return res.result?.watchlistItems;
      return [];
    });
  },
  post: body => post(WLPAXPOST, BASEHEADER, stringify(body)),
  put: body => put(WLPAXPOST, BASEHEADER, undefined, stringify(body)),
  del: id => del(WLITEM, BASEHEADER, id)
};

export const addWLItems = {
  post: body => {
    // TODO find a cleaner way to handle the respone.
    //Change the backend to accept a list of watchlist items?
    const responses = [];
    const paxItem = JSON.parse(body.passenger.replace("{categoryId}", body.categoryId));
    return post(WLPAXPOST, BASEHEADER, stringify(paxItem)).then(
      asArray(body.documents).forEach(doc => {
        const docItem = JSON.parse(doc.replace("{categoryId}", body.categoryId));
        return post(WLDOCSPOST, BASEHEADER, stringify(docItem)).then(
          res => responses.push[res]
        );
      })
    );
  }
};
export const cypher = { get: () => get(CYPHER, BASEHEADER) };
export const cypherAuth = { get: () => get(CYPHERAUTH, BASEHEADER) };
export const manualHit = {
  post: body => {
    const path = `${MANUALHIT}?paxId=${body.paxId}&flightId=${body.flightId}&hitCategoryId=${body.hitCategoryId}&desc=${body.description}`;
    return post(path, BASEHEADER);
  }
};

export const logfile = {
  get: (id, params) => get(LOGFILE, BASEHEADER, id, params),
  download: params => window.open(LOGFILE + params, "_self")
};

export const changePassword = {
  put: body => put(CHANGEPASSWORD, BASEHEADER, undefined, stringify(body))
};

export const signup = {
  post: body => post(SIGNUP, SIGNUPHEADER, stringify(body))
};
export const physicalLocations = {
  get: () => get(PHYSICALLOCATIONS, SIGNUPHEADER)
};

export const signuprequests = {
  get: params => get(SIGNUPREQUESTS, BASEHEADER, undefined, params),
  approve: id => put(SIGNUPREQUESTAPPROVE, BASEHEADER, id),
  reject: id => put(SIGNUPREQUESTSREJECT, BASEHEADER, id)
};
