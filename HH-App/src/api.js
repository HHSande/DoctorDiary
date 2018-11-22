// API CALLS


var enc = "Basic " + window.btoa("CasperL"+":"+"District1-");

const dhis2 = {
  baseUrl: 'https://course.dhis2.org/dhis/api/29/',
};


const headers = new Headers({
  'Content-type' : 'application/json',
  Authorization: enc,
  Accept: 'application/json',
});

const headersForMe = new Headers({  // brukes for api/me, fordi Content-Type ikke funke for det
  Authorization: enc,
  Accept: 'application/json',
});



const getMe = () => {

  var headers = headersForMe;

  return fetch(`${dhis2.baseUrl}me`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers,
  })
  .catch(error => error)
  .then(response => response.json());
};

const getInstanceAndEnrollment = hospital => { // for random requests

  return fetch(`${dhis2.baseUrl}events?orgUnit=${hospital}`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers,
  })
  .catch(error => error)
  .then(response => response.json());
};


const getSelectedData = spec => { // for random requests

  return fetch(`${dhis2.baseUrl}${spec}.json?ou=vwvDblM3MNX`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers,
  })
  .catch(error => error)
  .then(response => response.json());
};


const getTrackedEntityInstances = orgUnit => {

  return fetch(`${dhis2.baseUrl}trackedEntityInstances.json?ou=${orgUnit}&
    ?filter=trackedEntityTypes:eq:nEenWmSyUEp`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers,
  })
  .catch(error => error)
  .then(response => response.json());
};


const getMetaData = () => { // for doctors, orgUnits

  return fetch(`${dhis2.baseUrl}programs/r6qGL4AmFV4/metadata.json`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers,
  })
  .catch(error => error)
  .then(response => response.json());
};


const getReports = () => { // pass orgUnit

  console.log("Kjører");
  return fetch(`${dhis2.baseUrl}events.json?program=r6qGL4AmFV4&paging=false`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers,
  })
  .catch(error => error)
  .then(response => response.json());

};


const enrollments = spec => { // pass orgUnit
  fetch(`${dhis2.baseUrl}${spec}.json?ou=u3rHGQGLLP7`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers,
  })
  .catch(error => error)
  .then(response => response.json());
};


const getAttributes = id => {

  return fetch(`${dhis2.baseUrl}/trackedEntityAttributes/${id}`, {  // GET trackedEntityAttributes
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers,
  })
  .catch(error => error)
  .then(response => response.json());
};


const getDataElement = id => {

  return fetch(`${dhis2.baseUrl}dataElements/${id}`, {  //  Search for data element
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers,
  })
  .catch(error => error)
  .then(response => response.json());
}

const postEvent = event => {
  console.log("Event som blir sendt med i postEvent", event);
  return fetch(`${dhis2.baseUrl}events/`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers,
    body: JSON.stringify(event),
  })
  .catch(error => error)
  .then(response => response.json());
};

const getEntryFromDoctor = eventID => {
  console.log("Kjører");
  console.log("Inn i getFromDoc", eventID);
  return fetch(`${dhis2.baseUrl}events/${eventID}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers,
  })
  .catch(error => error)
  .then(response => response.json());
}

const getEvent = event => {
  console.log("HALLO??");
  return fetch(`${dhis2.baseUrl}events?program=r6qGL4AmFV4`, {  //  Search for data element
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers,
  })
  .catch(error => error)
  .then(response => response.json());
}


export default {
  getSelectedData,
  getDataElement,
  getMetaData,
  getReports,
  getEvent,
  postEvent,
  getEntryFromDoctor,
  getTrackedEntityInstances,
  dhis2,
  headers,
  getMe,
  getInstanceAndEnrollment
};


// -K
