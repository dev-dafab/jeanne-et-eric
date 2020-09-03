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
<div class="flex bg-landing-page">
    <div class="entry ml-8 entry-color text-center">
        <h1 class="headline font-bold text-6xl antialiased">Jeanne & Eric</h1>
        <h2 class="text-5xl entry"> 11. Septembre 2020, 10:30 </h2>
        <h2 class="text-5xl entry"> Vigneux-sur-Seine, France </h2>
        <button onclick="navigate('programme')" class="text-5xl entry mt-8 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-2 rounded"
                type="button">
          Programme
        </button>
    </div>
    <div id="countdown"
         class="countdown location text-3xl entry entry-color absolute bottom-0 right-0 ml-0 mt-0 mr-8"></div>
</div>
    `;
    }
}
const ProgrammComponent = {
    render: () => {
        return `
<div class="flex bg-programme-page">
<h3>
Nous avons le plaisir de vous convier à notre mariage
<br/>
qui aura lieu le vendredi 11 septembre 2020
</h3>

<br/>
<br/>
<br/>

<div>
    <span>Cerémonie civille 10h30:</span>
    <span>mairie de Vigneux-Sur-Seine</span>
    <span>75 Rue Pere moi , 91270 Vigneux-sur-seine</span>
</div>
<div>
    <span>Reception 12h00:</span>
    <span>mairie de Vigneux-Sur-Seine</span>
    <span>75 Rue Pere moi , 91270 Vigneux-sur-seine</span>
</div>

<br/>
<br/>
<br/>

<div>
Merci de partarger avec nous ce joyeux evenement sur un
thème chick et glamour.
</div>
</div>
        `;
    }
}
const ErrorComponent = {
    render: () => {
        return `
<div>
<h3> Error </h3>
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
