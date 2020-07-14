$(document).ready(async () => {
    $('[id="status"]')[0].innerText = 'Loading dashboard..';
    await new Promise((resolve) => setTimeout(resolve, 250));
    Particles.init({
        selector: '.background',
        color: 'black'
    });
    await new Promise((resolve) => setTimeout(resolve, 250));
    $('[class="loader-container"]').fadeOut();
    $('[id="status"]').fadeOut();
    $('[id="statusMessage"]').fadeOut();
    await new Promise((resolve) => setTimeout(resolve, 500));
    $('[id="statusMessage"]')[0].innerText = 'DeltaUser#7836 (Discord)';
    $('[id="status"]')[0].innerText = 'Dashboard is currently being worked on.';
    $('[id="status"]').fadeIn();
    $('[id="statusMessage"]').fadeIn();
});