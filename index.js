$(document).ready(async () => {
    const status = await (await fetch('http://macrot.herokuapp.com/api/status')).json();
    if(!status.dashboard) {
        $('[id="statusMessage"]')[0].innerText = 'Dashboard is disabled.';
        $('[id="dashboard"]')[0].disabled = true;
        $('[id="dashboard"]').css('background-color', 'gray');
        $('[id="dashboard"]').css('color', 'white');
    }
    Particles.init({
        selector: '.background',
        color: 'black'
    });
    $('[id="dashboard"]').click(() => {
        window.location = '/src/dashboard';
    });
});