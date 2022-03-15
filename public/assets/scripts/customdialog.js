let dialog = document.querySelector('dialog');

export function clearAndRender(cb, clearFunc){
    // tell browser to clear output before next repaint
    window.requestAnimationFrame(()=>{
        dialog.innerHTML = ''; 
        if (typeof clearFunc === 'function'){
            clearFunc();
        }
        // tell browser to execute callback after first frame
        window.requestAnimationFrame(()=>setTimeout(cb));
    });
};

/**
 * 
 * @param {string} templateId 
 * @param {function} handleAction 
 * @param {function} clearFunc 
 * @returns 
 */
export function createAlert(templateId, handleAction, clearFunc){
    const alertTemplate = document.getElementById(templateId);
    return function(event) {
        clearAndRender(()=>{
            const clone = alertTemplate.content.firstElementChild.cloneNode(true);
            dialog.appendChild(clone);
            dialog.showModal();
            const submitButton = document.getElementById('submit');
            submitButton.value = true;
            submitButton.onclick = () => {
                window.requestAnimationFrame(()=>{
                    if (typeof handleAction === 'function'){
                        handleAction(dialog.returnValue, event, true);
                    }
                });
            };
        }, clearFunc);
    }
}

/**
 * 
 * @param {string} templateId 
 * @param {function} handleAction 
 * @param {function} clearFunc 
 * @returns {function}
 */
export function createConfirm(templateId, handleAction, clearFunc){
    const confirmTemplate = document.getElementById(templateId);
    return function(event) {
        clearAndRender(()=>{
            const clone = confirmTemplate.content.firstElementChild.cloneNode(true);
            dialog.appendChild(clone);
            dialog.showModal();
            const cancelButton = document.getElementById('cancel');
            const submitButton = document.getElementById('submit');
            cancelButton.value = false;
            submitButton.value = true;
            cancelButton.onclick = () => {
                window.requestAnimationFrame(()=>{
                    if (typeof handleAction === 'function'){
                        handleAction(dialog.returnValue, event, false);
                    }
                })        
            }
            submitButton.onclick = () => {
                window.requestAnimationFrame(()=>{
                    if (typeof handleAction === 'function'){
                        handleAction(dialog.returnValue, event, true);
                    }
                })
            }
        }, clearFunc);
    }
}

/**
 * 
 * @param {string} templateId 
 * @param {string[]} inputIds 
 * @param {function} handleAction 
 * @returns {function}
 */
export function createPrompt(templateId, inputIds, initVals, handleAction, clearFunc, initFunc){
    const promptTemplate = document.getElementById(templateId);
    return function(event) {
        let inputVals = initVals;
        if (typeof initFunc === 'function'){
            inputVals = initFunc(event);
        }
        clearAndRender(()=>{
            const clone = promptTemplate.content.firstElementChild.cloneNode(true);
            dialog.appendChild(clone);
            dialog.showModal();
            const cancelButton = document.getElementById('cancel');
            const submitButton = document.getElementById('submit');
            if (inputIds.length > 1){
                submitButton.value = '{}';
                for (let id of inputIds){
                    let inputField = document.getElementById(id);
                    let inputKey = inputField.name || id;
                    inputField.value = inputVals[inputKey];
                    let valObj = JSON.parse(submitButton.value);
                    valObj[inputKey] = inputField.value;
                    submitButton.value = JSON.stringify(valObj);
                    inputField.onchange = (e) => {
                        let valObj = JSON.parse(submitButton.value);
                        valObj[inputKey] = e.target.value;
                        submitButton.value = JSON.stringify(valObj);
                    }
                }
            } else if (inputIds.length == 1) {
                let inputField = document.getElementById(inputIds[0]);
                inputField.value = inputVals[inputField.name || id] || '';
                submitButton.value = inputField.value;
                inputField.onchange = (e) => {
                    submitButton.value = e.target.value;
                }
            }
            cancelButton.value = submitButton.value;

            cancelButton.onclick = () => {
                window.requestAnimationFrame(()=>{
                    if (typeof handleAction === 'function'){
                        handleAction(dialog.returnValue, event, false);
                    }
                })        
            }
            submitButton.onclick = () => {
                window.requestAnimationFrame(()=>{
                    if (typeof handleAction === 'function'){
                        handleAction(dialog.returnValue, event, true);
                    }
                })
            }  
        }, clearFunc);
    }
}
