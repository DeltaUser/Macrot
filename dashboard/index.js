function addHandler(event, handler) {
    return $(document).on(event, handler);
}

function triggerHandler(event, callback) {
    const dispatched = document.dispatchEvent(event);
    return callback ? callback() : dispatched;
}

function removeHandler(event) {
    return $(document).off(event);
}

function replaceHandler(event, handler) {
    removeEvent(event);
    return addHandler(event, handler);
}

function getHandlers(event, name) {
    return !name ? $._data($(document)[0], 'events')[event] : $._data($(document)[0], 'events')[event].filter(e => e.type === event && e.namespace && e.namespace === name);
}

$(document).ready(async () => {
    $('[id="status"]')[0].innerText = 'Loading dashboard..';
    await new Promise((resolve) => setTimeout(resolve, 250));
    Particles.init({
        selector: '.backgroundW',
        color: 'black'
    });
    await new Promise((resolve) => setTimeout(resolve, 250));
    $('[class="loader-container"]').fadeOut();
    $('[id="status"]').fadeOut();
    $('[id="statusMessage"]').fadeOut();
    await new Promise((resolve) => setTimeout(resolve, 500));
    $('.background').fadeOut();
    await new Promise((resolve) => setTimeout(resolve, 250));
    $('.backgroundW').remove();
    $('.backgroundB').fadeIn();
    Particles.init({
        selector: '.backgroundB',
        color: 'white'
    });
    await new Promise((resolve) => setTimeout(resolve, 250));
    $('.button-container').fadeIn();
    $('.button-container').css('background-color', 'white');
    $('button').css('background-color', 'white');
    $('button').css('color', 'black');
    $('[id="createMacro"]').click(async () => {
        $('[class="button-container"]').fadeOut();
        await new Promise((resolve) => setTimeout(resolve, 250));
    });
});