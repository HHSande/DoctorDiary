

// Hardcoded logins, change as needed

//var enc = "Basic " + window.btoa("CasperL"+":"+"District1-"); // DOCTOR
//var enc = "Basic " + window.btoa("BjarneB"+":"+"District1-"); // DHO
//var enc = "Basic " + window.btoa("admin"+":"+"district"); //  ADMIN

const dhis2 = {
  baseUrl: 'https://course.dhis2.org/dhis/api/30/',
};


const headers = new Headers({
  'Content-type' : 'application/json',
  //Authorization: enc,
  Accept: 'application/json',
});

const headersForMe = new Headers({  // brukes for api/me, fordi Content-Type ikke funke for det
  //Authorization: enc,
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

  var  headers =  headersForMe;

  return fetch(`${dhis2.baseUrl}me`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers,
  })
  .catch(error => error)
  .then(response => response.json());
};

const getInstanceAndEnrollment = hospital => {

  return fetch(`${dhis2.baseUrl}events?orgUnit=${hospital}`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers,
  })
  .catch(error => error)
  .then(response => response.json());
};


const getReports = () => {

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

  return fetch(`${dhis2.baseUrl}events?program=r6qGL4AmFV4`, {
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
