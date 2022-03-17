let alertButton = document.getElementById('alert');
let confirmButton = document.getElementById('confirm');
let promptButton = document.getElementById('prompt');
let saferPromptButton = document.getElementById('safer-prompt');

/**
 * 
 * @param {string[]} strings 
 * @param  {...string} values 
 * @returns {string}
 */
function sanitize(strings, ...values) {
    const dirty = strings.reduce((prev, next, i) => {
        return `${prev}${next}${values[i] || ''}`;
    }, '');
    return DOMPurify.sanitize(dirty);
}

alertButton.addEventListener('click', (e)=>{
    alert('Alert message');
});

function onConfirmBttnClicked() {
        let result = window.confirm('Confirm?');
        let output = document.querySelector('output');
        output.innerHTML = `The value returned by the confirm method is : (${result})`;
        result = null;
        output = null;
}

function onPromptBttnClicked(){
    let result = window.prompt('Enter something:', '') || 'User didn\'t enter anything';
    let output = document.querySelector('output');
    output.innerHTML = `Prompt result: ${result}`;
    result = null;
    output = null;
} 

function onSafePromptBttnClicked(){
    let result = window.prompt('Enter something:', '') || 'User didn\'t enter anything';
    let output = document.querySelector('output');
    output.innerHTML = sanitize`Prompt result: ${result}`;
    result = null;
    output = null;    
}

function clearAndRender(cb){
    // tell browser to clear output before next repaint
    window.requestAnimationFrame(()=>{
        let output = document.querySelector('output');
        output.innerHTML = '';
        output = null;
        // tell browser to execute callback after first frame
        window.requestAnimationFrame(()=>setTimeout(cb));
    });
};

confirmButton.addEventListener('click', (e)=>{
    clearAndRender(onConfirmBttnClicked);
});

promptButton.addEventListener('click', (e)=>{
    clearAndRender(onPromptBttnClicked);
});

saferPromptButton.addEventListener('click', (e)=>{
    clearAndRender(onSafePromptBttnClicked);
});

