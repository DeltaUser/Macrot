const settings = {
    keyboard: null,
    mouse: null,
    keyboardCompanies: ['SteelSeries', 'Logitech', 'Razer', 'Ducky', 'Corsair', 'HP'],
    mouseCompanies: ['Logitech', 'Razer', 'SteelSeries', 'Zowie', 'Roccat', 'HP']
}

async function timeout(time) {
    return await new Promise((resolve) => setTimeout(resolve, time));
}

$(document).ready(() => {
    Particles.init({
        selector: '.background',
        color: 'black'
    });
    for (const company of settings.keyboardCompanies) {
        $('[id="buttons"]')[0].innerHTML += `<button>${company}</button>`;
    }
    $('[id="buttons"]')[0].innerHTML += `<button>Not Shown</button>`;
    $('[id="buttons"]').children().click(async (e) => {
        const keyboardCompany = e.currentTarget.innerText;
        settings.keyboard = keyboardCompany;
        $('[id="items"]').fadeOut('slow');
        await timeout(500);
        $('[id="Q"]')[0].innerText = 'Pick your mouse company.';
        $('[id="buttons"]').empty();
        $('[id="items"]').fadeIn('slow');
        for (const company of settings.mouseCompanies) {
            $('[id="buttons"]')[0].innerHTML += `<button>${company}</button>`;
        }
        $('[id="buttons"]')[0].innerHTML += `<button>Not Shown</button>`;
        $('[id="buttons"]').children().unbind('click').click(async (e) => {
            const mouseCompany = e.currentTarget.innerText;
            settings.mouse = mouseCompany;
            $('[id="items"]').fadeOut('slow');
            await timeout(500);
            $('[id="Q"]')[0].innerText = `Test your${settings.keyboard === 'Not Shown' ? '' : ` ${settings.keyboard}`} keyboard and${settings.mouse === 'Not Shown' ? '' : ` ${settings.mouse}`} mouse macros now.`;
            $('[id="QM"]')[0].innerText = `Mouse macros not decected.`;
            $('[id="QK"]')[0].innerText = `Keyboard macros not decected.`;
            $('[id="buttons"]').hide();
            $('[id="items"]').fadeIn('slow');
            let seconds = 0;
            let keys = 0;
            let clicks = 0;
            $(document).click(() => {
                clicks += 1;
                if(clicks > 60) {
                    $('[id="QM"]')[0].innerText = `Mouse macros decected, ${clicks} clicks in ${seconds} seconds.`;
                }
            });
            $(document).keyup(() => {
                keys += 1;
                if(keys > 200) {
                    $('[id="QK"]')[0].innerText = `Keyboard macros decected, ${keys} keys pressed in ${seconds} seconds.`;
                }
                console.log(keys);
            });
            setInterval(async () => {
                seconds += 1;
                if(seconds === 6) {
                    await fetch('https://macrot.herokuapp.com/api/stats', {method: "POST", headers: {'Content-Type': 'application/json'}, mode: 'cors', body: JSON.stringify({clicks, keys})});
                    clicks = 0;
                    seconds = 0;
                    keys = 0;
                    $('[id="QM"]')[0].innerText = `Mouse macros not decected.`;
                    $('[id="QK"]')[0].innerText = `Keyboard macros not decected.`;
                }
            }, 1000);
        });
    });
});