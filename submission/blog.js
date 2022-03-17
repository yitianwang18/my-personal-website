import { getBlogAll, postBlog, editBlog, deleteBlog } from './firebaseCrud.js';
import {createConfirm, createPrompt} from '/assets/scripts/customdialog.js';
import { auth, signin, signout, monitorUserState } from '/assets/scripts/firebaseAuth.js';


function dateToString(date){
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toJSON().slice(0,10);
}

const attrList = ['title', 'content'];

const initValues = {
    'title': 'Some post',
    'content': 'A short summary'
}

let postControlVisible = false;

function sanitize(strings, ...values) {
    const dirty = strings.reduce((prev, next, i) => {
        return `${prev}${next}${values[i] || ''}`;
    }, '');
    return DOMPurify.sanitize(dirty);
}

function updateBlogFields(clone, valObj){
    const dateString = dateToString(new Date(valObj.date.seconds*1000));
    valObj.date = dateString;


    clone.dataset.title = sanitize`${valObj.title}`;
    clone.dataset.author = sanitize`${valObj.author}`;
    clone.dataset.date = sanitize`${valObj.date}`;
    clone.dataset.content = sanitize`${valObj.content}`;

    clone.children[0].innerText = clone.dataset.title;
    clone.children[1].innerText = clone.dataset.author;
    clone.children[2].innerText = clone.dataset.date;
    clone.children[3].innerHTML = clone.dataset.content;
}

async function deleteHandler(value, event, submit){
    if (submit) {
        try {
            let id = event.target.parentElement.id;

            // delete data from server
            await deleteBlog(id);
            // end delete data from server
            event.target.parentElement.remove();
        }
        catch (e) {
            console.error("Error in delete blog", e);
        }
 
    }
}

async function editHandler(value, event, submit){
    if (!submit){ // canceled
        return;
    }
    try {
        let clone = event.target.parentElement;
        let valObj = JSON.parse(value);

        let id = event.target.parentElement.id;

        // put updates to server
        const [docRef, fbData] = await editBlog(valObj, id, auth.currentUser.email);

        // end put updates to server
        updateBlogFields(clone, fbData);  

    } catch (e) {
        console.error("Error in edit blog", e);
    }

}

function editInitValueHandler(event){
    let data = event.target.parentElement.dataset;
    return data;
}

function createPost(fbData, id, parent){
    const onDelete = createConfirm('confirm-delete', deleteHandler);
    const onEdit = createPrompt('prompt-edit', attrList, initValues, editHandler, null, editInitValueHandler);

    const postTemplate = document.getElementById('post-template');
    const clone = postTemplate.content.firstElementChild.cloneNode(true);
    clone.id = id;
    updateBlogFields(clone, fbData); 
    clone.children[4].addEventListener('click', onEdit);
    clone.children[5].addEventListener('click', onDelete);
    parent.appendChild(clone);
}

async function createHandler(value, event, submit){
    if (!submit){ // nothing created
        return;
    }
    try {
        let valObj = JSON.parse(value);

        // posting post object to server
        const [docRef, fbData] = await postBlog(valObj, auth.currentUser.email);
        const id = docRef.id;
        // end posting to server
        const main = document.querySelector('main');
        createPost(fbData, id, main);
        togglePostOptions(postControlVisible);
    } catch (e) {
        console.error("Error posting blog", e);
    }
}

let createBtn = document.getElementById('create');
const onCreate = createPrompt('prompt-edit', attrList, initValues, createHandler);
createBtn.addEventListener('click', onCreate);

function getForm(formId){
    const formEl = document.getElementById(formId);
    let formData = new FormData(formEl);
    return formData;
}

const signinBtn = document.getElementById('sign-in');
signinBtn.addEventListener('click', () =>{
    
    let formData = getForm('signin-form');
    let email = formData.get('email');
    let password = formData.get('password');
    signin(email, password);
});

const signOutBtn = document.getElementById('sign-out');
signOutBtn.addEventListener('click', () => {
    signout();
});


function readHandler(id, data){
    const main = document.querySelector('main');
    createPost(data, id, main);
    togglePostOptions(postControlVisible);
}

function toggleSignInOptions(bool){
    const signInElements = document.getElementsByClassName('sign-in');
    for (const el of signInElements){
        el.hidden = !bool;
    }
    const signOutElements = document.getElementsByClassName('sign-out');
    for (const elSO of signOutElements){
        elSO.hidden = bool;
    }
}

function togglePostOptions(bool){
    const postControls = document.getElementsByClassName('post-control');
    for (const el of postControls){
        el.hidden = !bool;
    }
    postControlVisible = bool;
}

monitorUserState((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    toggleSignInOptions(false);
    togglePostOptions(true);
    const userField = document.getElementById('current-user');
    userField.textContent = user.email;
    // ...
  } else {
    // User is signed out
    toggleSignInOptions(true);
    togglePostOptions(false);
    const userField = document.getElementById('current-user');
    userField.textContent = "";
    // ...
  }
});

getBlogAll(readHandler);
