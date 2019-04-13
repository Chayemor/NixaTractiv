export const required = () => { throw Error("Parameter is required"); };

export const GET = (url=this.required()) => {
  return  fetch(url)
            .then((response) => Promise.all([response, response.json()]))
            .then( ([response, responseJson]) => {
                if (!response.ok) {
                    throw responseJson; // Errors would be handled here
                }
                return responseJson;
            });
};

export const POST = (url = this.required(), postData = this.required()) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: postData
    })
        .then((response) => Promise.all([response, response.json()]))
        .then(([response, responseJson]) => {
            if (!response.ok) {
                throw responseJson; // Errors would be handled here
            }
            return responseJson;
        });
};

export const dbDateFormat = (date=this.required()) => {
    const date_iso = date.toISOString().split(":");
    return `${date_iso[0]}:${date_iso[1]}`;
};