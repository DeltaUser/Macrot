$(document).ready(async () => {
    $('[id="status"]')[0].innerText = 'Loading background..';
    await new Promise((resolve) => setTimeout(resolve, 250));
    Particles.init({
        selector: '.background',
        color: 'black'
    });
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
});