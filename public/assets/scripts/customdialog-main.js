import {createAlert, createConfirm, createPrompt} from '/assets/scripts/customdialog.js';

function sanitize(strings, ...values) {
    const dirty = strings.reduce((prev, next, i) => {
        return `${prev}${next}${values[i] || ''}`;
    }, '');
    return DOMPurify.sanitize(dirty);
}

let alertButton = document.getElementById('alert');
let confirmButton = document.getElementById('confirm');
let promptButton = document.getElementById('prompt');

const onAlertBttnClicked = createAlert('alert-template');

const onConfirmBttnClicked = createConfirm('confirm-template', (value)=>{
    let output = document.querySelector('output');
    output.innerHTML = `The value returned by the confirm method is : (${value})`;
}, ()=>{
    let output = document.querySelector('output');
    output.innerHTML = '';
});

const onPromptBttnClicked = createPrompt('prompt-template', ['name'], {'name': ''}, (value)=>{
    let output = document.querySelector('output');
    output.innerHTML = sanitize`Prompt result: ${value || 'User didn\'t enter anything'}`;
}, ()=>{
    let output = document.querySelector('output');
    output.innerHTML = '';
});



alertButton.addEventListener('click', onAlertBttnClicked);

confirmButton.addEventListener('click', onConfirmBttnClicked);

promptButton.addEventListener('click', onPromptBttnClicked);
