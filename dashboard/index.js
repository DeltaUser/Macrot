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

$(document).ready(async () => {
    Particles.init({
        selector: '.backgroundB',
        color: 'white'
    });
    $('[class="backgroundB"]').show();
    await new Promise((resolve) => setTimeout(resolve, 250));
    $('[class="tv"]').addClass('_off');
    await new Promise((resolve) => setTimeout(resolve, 250));
    $('[id="status"]')[0].innerText = 'Coming soon.';
    $('[id="status"]').fadeIn();
    $('[id="statusMessage"]')[0].innerText = 'Inshallah';
    $('[id="statusMessage"]').fadeIn();
});