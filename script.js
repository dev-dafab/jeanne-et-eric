const countDownDate = new Date("09.11.2020 8:30:00").getTime();

function navigate(path) {
    window.location = `${window.location.href}#/${path}`;
}

const x = setInterval(function () {
    const now = new Date().getTime();
    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdown = document.querySelector("#countdown");

    countdown.innerHTML = `${days} jours ${hours}h:${minutes}m:${seconds}s`;

    if (distance < 0) {
        clearInterval(x);
        countdown.innerHTML = "EXPIRED";
    }
}, 1000);


const HomeComponent = {
    render: () => {
        return `
<div id="bg-landing-page" class="bg-landing-page content">
<div class="h-full flex flex-col w-full">
        <div class="-px-4 -py-4 flex flex-col ml-auto mr-auto md:flex-row">
            <div class="jeanne-eric-title flex ml-auto mr-auto font-bold">Jeanne</div>
            <div class="jeanne-eric-title flex ml-auto mr-auto font-bold">&</div>
            <div class="jeanne-eric-title flex ml-auto mr-auto font-bold">Eric</div>
        </div>
        <button
        class="text-5xl mt-24 ml-auto mr-auto px-20 entry bg-gray-500  hover:bg-gray-600 text-white font-bold py-2 rounded"
        onclick="navigate('programme')"  type="button">
          Programme
        </button>
        <div id="countdown" class="color-mintcream font-bold ml-auto mr-auto mt-auto">FFFFF</div>
        </div>
 </div>
</div>
    `;
    }
}
const ProgrammComponent = {
    render: () => {
        return `
<div class="flex text-red-500 bg-programme-page flex-col">
<h3 class="entry-font-family text-2xl mt-16 text-center">
    Nous avons le plaisir de vous convier à notre mariage
    qui aura lieu le vendredi 11 septembre 2020.
</h3>

<div class="text-center mt-10">
<ul class="edward-script-font">
<li>
    Cérémonie civile, 10h30 :<br>
    mairie de Vigneux-Sur-Seine <br>
    75 rue Pierre Marin, Vigneux-sur-Seine 
</li>
<li class="mt-4">
    Réception, 12h00 : <br>
    73 rue Des Moulins, Savigny-sur-Orge<br>
</li>
<ul>
</div>

<div class="absolute bottom-0 entry-font-family text-2xl programm-footer text-center">
Merci de partarger avec nous ce joyeux événement sur un
thème chic et tendance.
</div>
</div>
        `;
    }
}

const routes = [
    {path: '/', component: HomeComponent},
    {path: '/programme', component: ProgrammComponent},
];

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const router = () => {
    // Find the component based on the current path
    const path = parseLocation();
    // If there's no matching route, get the "Error" component
    const {component = HomeComponent} = findComponentByPath(path, routes) || {};
    document.getElementById('app').innerHTML = component.render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
