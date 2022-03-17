export function splitID(formData){
    let id = formData.get('id');
    formData.delete('id');
    return [id, formData];
}

export function createPostRequest(endpoint, formData){
    let myHeaders = new Headers();
    return new Request(endpoint, {
        method: 'POST',
        headers: myHeaders,
        body: formData
    });
}

export function createGetRequest(endpoint, queryString){
    let url = queryString ? `${endpoint}${queryString}` : endpoint;
    return new Request(url, {
        method: 'GET'
    });
}

export function createPutRequest(endpoint, queryString, formData){
    let url = queryString ? `${endpoint}${queryString}` : endpoint;
    let myHeaders = new Headers();
    return new Request(url, {
        method: 'PUT',
        headers: myHeaders,
        body: formData
    });
}

export function createDeleteRequest(endpoint, queryString){
    let url = queryString ? `${endpoint}${queryString}` : endpoint;
    return new Request(url, {
        method: 'DELETE'
    });
}

export function makeRequest(request, funcRes, funcErr){
    fetch(request)
    .then((response)=>response.json())
    .then(funcRes)
    .catch(funcErr);
}
