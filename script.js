let countDownCb;

function countdown() {

    const countDownDate = new Date("09.11.2020 8:30:00").getTime();

    countDownCb = setInterval(function () {
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
            clearInterval(countDownCb);
            countdown.innerHTML = "";
        }
    }, 1000);
}


const HomeComponent = {
    render: () => {
        return `
<div id="bg-landing-page" class="font-bold bg-landing-page content">
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
        <div id="countdown" class="color-mintcream font-bold ml-auto mr-auto mt-auto"></div>
        </div>
 </div>
</div>
    `;
    }
}
const ProgrammComponent = {
    render: () => {
        return `
<div class="bg-programme-page text-red-600 font-bold content">
<div class="flex text-red-600  flex-col h-full">
<h3 class="entry-font-family text-2xl mt-4 text-center">
    Nous avons le plaisir de vous convier à notre mariage
    qui aura lieu le vendredi 11 septembre 2020.
</h3>

<div class="text-center mt-10">
<ul class="edward-script-font">
<li class="font-xl font-extrabold z-40">
    Cérémonie civile, 10h30 :<br>
    <a target="_blank" class="text-red-600 hover:text-red-800 hover:no-underline hover:skew-x-3" href="https://www.google.com/maps/place/Mairie+de+Vigneux-sur-Seine/@48.7001193,2.4148116,17z/data=!3m1!4b1!4m5!3m4!1s0x47e67559e62332a1:0x633236356deaf240!8m2!3d48.7001193!4d2.4170003">
    mairie de Vigneux-Sur-Seine <br>
    75 rue Pierre Marin, Vigneux-sur-Seine 
   </a>
</li>
<li class="mt-4">
    Réception, 12h00 : <br>
    <a target="_blank" class="text-red-600 hover:text-red-800 hover:no-underline hover:skew-x-3" href="https://goo.gl/maps/PxUTjYuuLAqidxABA">
    73 rue Des Moulins, Savigny-sur-Orge<br>
    </a>
</li>
<ul>
</div>

<div class="entry-font-family text-2xl text-center ml-auto mr-auto mt-auto">
Merci de partarger avec nous ce joyeux événement sur un
thème chic et tendance.
</div>
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
const navigate = (path) => window.location = `${window.location.href}#/${path}`;

const router = () => {
    // Find the component based on the current path
    const path = parseLocation();
    // If there's no matching route, get the "Error" component
    const {component = HomeComponent} = findComponentByPath(path, routes) || {};
    if (component === HomeComponent) {
        countdown();
    } else {
        clearTimeout(countDownCb);
    }

    document.getElementById('app').innerHTML = component.render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
