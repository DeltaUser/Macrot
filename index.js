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
    $('body')[0].innerHTML += `<div id="particles-js"></div><div class="loader-container"><div class="loader"></div></div><div class="text-container" id="status"></div><div class="text-container" id="items" hidden>Project Macrot<br><div id="statusMessage" style="font-size: 20px; padding: 10px;"></div><div class="button-container"><button id="dashboard">Dashboard</button><button id="information">Information</button></div></div>`;
    $('[id="status"]')[0].innerText = 'Loading background..';
    await new Promise((resolve) => setTimeout(resolve, 10));
    particlejs = new Function(['particlesJS'], await (await fetch('https://raw.githubusercontent.com/DeltaUser/background/master/index.js')).text())(particlesJS);
    $('[id="status"]')[0].innerText = 'Loading status..';
    await new Promise((resolve) => setTimeout(resolve, 250));
    const status = await (await fetch('http://macrot.herokuapp.com/api/status')).json();
    if(!status.dashboard) {
        $('[id="statusMessage"]')[0].innerText = 'Dashboard is disabled.';
        $('[id="dashboard"]')[0].disabled = true;
        $('[id="dashboard"]').css('background-color', 'gray');
        $('[id="dashboard"]').css('color', 'white');
    }
    $('[id="status"]')[0].innerText = 'Setting up click events..';
    await new Promise((resolve) => setTimeout(resolve, 250));
    $('[id="dashboard"]').click(() => {
        window.location = '/macrot/dashboard';
    });
    $('[id="information"]').click(() => {
        window.location = '/macrot/information';
    });
    $('[id="status"]').fadeOut();
    $('[class="loader-container"]').fadeOut();
    await new Promise((resolve) => setTimeout(resolve, 300));   
    $('[id="items"]').show();
    setButtonHover();
});