// API CALLS


var enc = "Basic " + window.btoa("CasperL"+":"+"District1-");
//var enc = "Basic " + window.btoa("BjarneB"+":"+"District1-");
//var enc = "Basic " + window.btoa("admin"+":"+"district");

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

const getTrackedEntityInstance = (orgUnit, username) => {
  return fetch(`${dhis2.baseUrl}trackedEntityInstances?ou=${orgUnit}&program=r6qGL4AmFV4&?filter=enrollments.storedBy:eq:${username}&fields=*`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers,
  })
  .catch(error => error)
  .then(response => response.json());
}

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
  getReports,
  getEvent,
  postEvent,
  getEntryFromDoctor,
  dhis2,
  headers,
  getMe,
  getInstanceAndEnrollment,
  getTrackedEntityInstance
};


// -K
