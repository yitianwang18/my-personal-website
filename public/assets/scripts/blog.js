import {createConfirm, createPrompt} from '/assets/scripts/customdialog.js';

const main = document.querySelector('main');
let today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
let todayString = today.toJSON().slice(0,10);

const attrList = ['title', 'date', 'summary'];

const initValues = {
    'title': 'Some post',
    'date': todayString,
    'summary': 'A short summary'
}

function sanitize(strings, ...values) {
    const dirty = strings.reduce((prev, next, i) => {
        return `${prev}${next}${values[i] || ''}`;
    }, '');
    return DOMPurify.sanitize(dirty);
}

function deleteHandler(value, event, submit){
    if (submit) {
        let pid = event.target.parentElement.pid;
        let posts = JSON.parse(localStorage.getItem('posts'));
        posts.splice(pid,1);
        localStorage.setItem('posts', JSON.stringify(posts));
        event.target.parentElement.remove();
    }
}

function editHandler(value, event, submit){
    if (!submit){ // canceled
        return;
    }
    let pid = event.target.parentElement.pid;
    let posts = JSON.parse(localStorage.getItem('posts'));
    let clone = event.target.parentElement;
    let valObj = JSON.parse(value);
    posts[pid] = valObj;
    localStorage.setItem('posts', JSON.stringify(posts));
    clone.children[0].innerText = sanitize`${valObj.title}`;
    clone.children[1].innerText = sanitize`${valObj.date}`;
    clone.children[2].innerText = sanitize`${valObj.summary}`;
}

function editInitValueHandler(event){
    let pid = event.target.parentElement.pid;
    let posts = JSON.parse(localStorage.getItem('posts'));
    return posts[pid];
}

function createPost(valObj, id){
    const onDelete = createConfirm('confirm-delete', deleteHandler);
    const onEdit = createPrompt('prompt-edit', attrList, initValues, editHandler, null, editInitValueHandler);

    const postTemplate = document.getElementById('post-template');
    const clone = postTemplate.content.firstElementChild.cloneNode(true);
    clone.pid = id;

    clone.children[0].innerText = sanitize`${valObj.title}`;
    clone.children[1].innerText = sanitize`${valObj.date}`;
    clone.children[2].innerText = sanitize`${valObj.summary}`;
    clone.children[3].addEventListener('click', onEdit);
    clone.children[4].addEventListener('click', onDelete);
    main.appendChild(clone);
}

function createHandler(value, event, submit){
    if (!submit){ // nothing created
        return;
    }

    let valObj = JSON.parse(value);
    let posts = JSON.parse(localStorage.getItem('posts'));
    let id = 0;
    if (Array.isArray(posts)){
        id = posts.length;
    } else {
        posts = [];
    }
    createPost(valObj, id);
    posts.push(valObj);
    localStorage.setItem('posts', JSON.stringify(posts));
}

let posts = JSON.parse(localStorage.getItem('posts'));
if (Array.isArray(posts)){
    for (let i = 0; i < posts.length; i++){
        createPost(posts[i], i);
    }
}

let createBtn = document.getElementById('create');
const onCreate = createPrompt('prompt-create', attrList, initValues, createHandler);
createBtn.addEventListener('click', onCreate);
