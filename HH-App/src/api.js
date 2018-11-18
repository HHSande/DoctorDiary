// API CALLS


var enc = "Basic " + window.btoa("BjarneB"+":"+"District1-");

const dhis2 = {
  baseUrl: 'https://course.dhis2.org/dhis/api/29/',
};


const headers = new Headers({
  'Content-type' : 'application/json',
  Authorization: enc,
  Accept: 'application/json',
});


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

  console.log("Kjører")
  return fetch(`${dhis2.baseUrl}events.json?orgUnit=vwvDblM3MNX`, {
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
  return fetch(`${dhis2.baseUrl}events?orgUnit=DUDHgE5DECu`, {  //  Search for data element
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
};


// -K
