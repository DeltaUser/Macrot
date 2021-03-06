let particlejs;

function addHandler(event, handler) {
    return $(document).on(event, handler);
}

function triggerHandler(event, callback) {
    const dispatched = document.dispatchEvent(event);
    return callback ? callback() : dispatched;
}

function removeHandler(event) {
    if(!checkEventExists(event)) return;
    return $(document).off(event);
}

function replaceHandler(event, handler) {
    removeHandler(event);
    return addHandler(event, handler);
}

function checkEventExists(event) {
    const events = getEvents();
    if(!events[!event.includes('.') ? event : event.split('.')[0]]) return false;
    return !event.includes('.') ? Array.isArray(events[event]) : (events[event.split('.')[0]].filter(e => e.type === event.split('.')[0] && e.namespace && e.namespace === event.split('.')[1])).length > 0;
}

function getData(data) {
    return $._data($(document)[0], data);
}

function getEvents() {
    return getData('events');
}

function getHandlers(event) {
    const events = getEvents();
    return !event.includes('.') ? events[event] : events[event].filter(e => e.type === event.split('.')[0] && e.namespace && e.namespace === event.split('.')[1]);
}

function removeKeyHandler(keyEvent, key, shiftKey=false) {
    return removeHandler(`${keyEvent}.${key}#${shiftKey}`);
}

function addKeyHandler(keyEvent, key, handler, shiftKey=false, isCustomHandler=false) {
    if(!handler) return;
    if(checkEventExists(`${keyEvent}.${key}#${shiftKey}`)) {
        removeHandler(`${keyEvent}.${key}#${shiftKey}`);
    }
    return addHandler(`${keyEvent}.${key}#${shiftKey}`, isCustomHandler ? handler : (e) => {
        if(e.key === key && e.shiftKey === shiftKey) handler(e);
    });
}

async function timeout(ammount) {
    return await new Promise((resolve) => setTimeout(resolve, ammount));
}

function adjust(color, amount) {
    if(color.includes('rgb')) {
        let hex = '#';
        for (var i = 0; i < color.split('(')[1].split(')')[0].split(',').length; i++) {
            const number = parseInt(color.split('(')[1].split(')')[0].split(',')[i]);
            hex += number.toString(16).length == 1 ? "0" + number.toString(16) : number.toString(16); /** https://stackoverflow.com/a/5624139 */
        }
        color = hex;
    }
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
} /** https://stackoverflow.com/a/57401891 */

function setButtonHover() {
    $('button').unbind('hover').hover(
        (e) => {
            $(`[id="${e.currentTarget.id}"]`).stop().animate({
                "backgroundColor": adjust($(`[id="${e.currentTarget.id}"]`).css('background-color'), -20)
            }, 250);
        },
        (e) => {
            $(`[id="${e.currentTarget.id}"]`).stop().animate({
                "backgroundColor": adjust($(`[id="${e.currentTarget.id}"]`).css('background-color'), 20)
            }, 250);
        }
    )
}

async function transformBackground(color, time=300) {
    await timeout(250);
    $('[id="particles-js"]').stop().animate({
        "backgroundColor": particlejs.particles.color.value
    }, time);
    await timeout(100);
    particlejs.particles.color.value = color;
    particlesJS("particles-js", particlejs);
}

$(document).ready(async () => {
    $('[class="text-container"]').remove();
    $('body')[0].innerHTML += `<div id="particles-js"></div>`;
    particlejs = new Function(['particlesJS'], await (await fetch('https://raw.githubusercontent.com/DeltaUser/background/master/index.js')).text())(particlesJS);    
    await transformBackground('#FFFFFF');
});