const countDownDate = new Date("09.11.2020 8:30:00").getTime();

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
<div class="flex bg-landing-page z-10">
    <div class="entry entry-color ml-auto mr-auto mt-10">
        <h1 class="jeanne-eric-title ml-16 antialiased">Jeanne & Eric</h1>
        <div class="ml-auto mr-auto text-center">
        <button onclick="navigate('programme')" class="text-5xl entry mt-8 bg-gray-500  hover:bg-gray-600 text-white font-bold py-2 px-2 rounded" type="button">
          Programme
        </button>
        </div>
    </div>
    <div id="countdown" class="location entry font-bold absolute bottom-0 ml-0 mt-0 mr-8"></div>
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
const navigate = (path) => window.location = `${window.location.href}#/${path}`

const router = () => {
    // Find the component based on the current path
    const path = parseLocation();
    // If there's no matching route, get the "Error" component
    const {component = HomeComponent} = findComponentByPath(path, routes) || {};
    document.getElementById('app').innerHTML = component.render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
