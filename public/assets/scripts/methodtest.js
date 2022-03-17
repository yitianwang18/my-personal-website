import {splitID, createPostRequest, createGetRequest, createPutRequest, createDeleteRequest, makeRequest} from "/assets/scripts/basicCrud.js";

function getForm(){
    const formEl = document.getElementById('myForm');
    let formData = new FormData(formEl);
    formData.set('date', (new Date()).toString());
    return formData;
}

function response(data){
    const output = document.getElementById('response');
    output.value = JSON.stringify(data, null, 4);
}

function catchError(error){
    console.error(error);
}

document.getElementById('postBtn').addEventListener('click', ()=>{
    let formData = getForm();
    let req = createPostRequest('https://httpbin.org/post', formData);
    makeRequest(req, response, catchError);
});

document.getElementById('getBtn').addEventListener('click', ()=>{
    let formData = getForm();
    let [id, data] = splitID(formData);
    let queryString = `?id=${id}`;
    let req = createGetRequest('https://httpbin.org/get', queryString);
    makeRequest(req, response, catchError);
});

document.getElementById('putBtn').addEventListener('click', ()=>{
    let formData = getForm();
    let [id, data] = splitID(formData);
    let queryString = `?id=${id}`;
    let req = createPutRequest('https://httpbin.org/put', queryString, data);
    makeRequest(req, response, catchError);
});

document.getElementById('deleteBtn').addEventListener('click', ()=>{
    let formData = getForm();
    let [id, data] = splitID(formData);
    let queryString = `?id=${id}`;
    let req = createDeleteRequest('https://httpbin.org/delete', queryString);
    makeRequest(req, response, catchError);
});
