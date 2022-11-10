/*
    Autor: AndrésR.Dev
    Description: Manipula el DOM de [index.html]. Consume el API de Marvel y genera [CARDS] dinamicamente
    Logic: Dependiendo de la cantidad de HEROES obtenidos, crea [CARDS] con su respectiva INFO
    Comments: Pinta [CARDS] de 6 en 6
*/

// COMPONENTES
import { Card } from './card.js';

// VARIABLES GLOBALES
let contadorCards = 0,  // Cantidad de CARDS creadas. Aumenta en OBSERVER.
    dataMarvel = '',  // Data recibida de la API. Se resetea en resetScreen().
    countResultsData = 0;  // Cantidad de Heroes devueltos por el API. Se resetea en resetScreen().


// [ELEMENTOS HTML]
const $BOTON_BUSCAR = document.getElementById('buscarvelBuscar'),
    $LOGO = document.getElementById('buscarvelLogo'),
    $FOOTER = document.getElementById('buscarvelFooter'),
    $USER_MESSAGE = document.getElementById('buscarvelMessage'),
    $USER_INPUT = document.getElementById('buscarvelInput'),
    $SECTION_RESULTS = document.getElementById('buscarvelResults');

// [FUNCIONES GENERALES]
// Devuelve una respuesta (roro) controlada dada la solicitud dada
async function solicitudApi({ METHOD = 'GET', URI }) {
    let tempData = undefined;
    let restData = {};
    try {
        tempData = await fetch(URI, {
            method: METHOD,
        });
        restData['statusCode'] = tempData.status;
        if (tempData.status < 400) {
            restData['response'] = await tempData.json();
            restData['errorAlert'] = '';
        } else {
            restData['response'] = tempData;
            restData['statusCode'] = tempData.status;
            restData['errorAlert'] = `Ups... ${tempData.status} - ${tempData.statusText}`;
        }
    } catch (error) {
        restData['response'] = `Ups... ${error.name} | ${error.message}`;
        restData['statusCode'] = 'ERROR';
        restData['errorAlert'] = 'ERROR DESCONOCIDO';
    }
    return restData;
}
async function generateData(valorInput) {
    //parametros
    const URL_APIMARVEL = 'https://gateway.marvel.com:443/v1/public/characters';
    const APIKEY = '88e79e5103514a26416d47c454dd3e87';
    const TIMESTAMP = '1000';
    const PUBLIC_KEY = '88e79e5103514a26416d47c454dd3e87';
    const PRIVATE_KEY = '5dbf3c921249711e490bca9a9d7852e4db00f785';
    const HASH_MD5 = md5(`${TIMESTAMP}${PRIVATE_KEY}${PUBLIC_KEY}`);
    const SEARCHTEXT = valorInput;
    const LIMIT_RESULTS = '100';
    //url consumo
    const URI = `${URL_APIMARVEL}?ts=${TIMESTAMP}&apikey=${APIKEY}&hash=${HASH_MD5}&nameStartsWith=${SEARCHTEXT}&limit=${LIMIT_RESULTS}`;
    //Devolvemos los resultados
    return await solicitudApi({ URI });
}
// Eliminar hijos de contenedor padre
function eliminarHijos(containerPadre) {
    while (containerPadre.firstChild) {
        containerPadre.removeChild(containerPadre.firstChild);
    }
}
// Reset de componentes
function resetScreen() {
    eliminarHijos($SECTION_RESULTS);
    dataMarvel = '';
    countResultsData = 0;
    $USER_MESSAGE.textContent = '';
    $BOTON_BUSCAR.removeAttribute('disabled');
    $BOTON_BUSCAR.classList.remove('no-click');
    $FOOTER.classList.add('position-botton');
    document.getElementById('buscarvelInput').value = '';
}
// Funcion MAIN - [BUTTON-BUSCAR]
async function buscarvelBuscar() {
    const VALUE_INPUT_USER = document.getElementById('buscarvelInput').value;
    resetScreen();
    $USER_MESSAGE.textContent = 'Buscando en el Metaverso...';
    // Bloqueamos boton
    $BOTON_BUSCAR.setAttribute('disabled', '');
    $BOTON_BUSCAR.classList.add('no-click');
    // Generamos la Data
    const { response, statusCode, errorAlert } = await generateData(VALUE_INPUT_USER);
    if (statusCode < 400) {
        if (parseInt(response.data.total, 10) > 100) {
            $USER_MESSAGE.innerHTML = 'Se encontraron más de ' + response.data.total + ' Héroes<br/>Sólo se mostrarán 100';
        } else {
            $USER_MESSAGE.textContent = `Se encontraron ${response.data.total} Héroes`;
        }
        countResultsData = response.data.count;
        if (response.data.count > 0) {
            // Creamos las Cards [Max cards 6] : las demás se crean con el Observer
            dataMarvel = response.data.results;
            Object.keys(response.data.results).forEach(hero => {
                if (hero < 6) {
                    contadorCards = hero;
                    const DATA_HERO = response.data.results[hero];
                    const $CARD = new Card();
                    $CARD.titleCard = `${DATA_HERO.name}`;
                    $CARD.comics = `${DATA_HERO.comics.available}`;
                    $CARD.series = `${DATA_HERO.series.available}`;
                    $CARD.stories = `${DATA_HERO.stories.available}`;
                    $CARD.events = `${DATA_HERO.events.available}`;
                    $CARD.imgURL = `${DATA_HERO.thumbnail.path}.${DATA_HERO.thumbnail.extension}`;
                    $SECTION_RESULTS.appendChild($CARD.card);
                }
            });
            // Desbloqueamos Footer
            $FOOTER.classList.remove('position-botton');
            // Mostramos los resultados
            $SECTION_RESULTS.classList.remove('visually-hidden');
        }
    } else {
        $USER_MESSAGE.innerHTML = (errorAlert + '<br/>Intente nuevamente.');
    }
    // Desbloqueamos boton
    $BOTON_BUSCAR.removeAttribute('disabled', '');
    $BOTON_BUSCAR.classList.remove('no-click');
}
// Funcion OBSERVADORA para el [FOOTER]. Si hay CARDS para crear pinta de 6 en 6
function nuevaCard(entradas) {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting && countResultsData > 0 && contadorCards < Object.keys(dataMarvel).length - 1) {
            // Agregamos más cartas de 6 en 6
            Object.keys(dataMarvel).forEach((hero, index) => {
                if (index < 6 && contadorCards < Object.keys(dataMarvel).length - 1) {
                    contadorCards = parseInt(contadorCards, 10) + 1;
                    const DATA_HERO = dataMarvel[contadorCards];
                    const $CARD = new Card();
                    $CARD.titleCard = `${DATA_HERO.name}`;
                    $CARD.comics = `${DATA_HERO.comics.available}`;
                    $CARD.series = `${DATA_HERO.series.available}`;
                    $CARD.stories = `${DATA_HERO.stories.available}`;
                    $CARD.events = `${DATA_HERO.events.available}`;
                    $CARD.imgURL = `${DATA_HERO.thumbnail.path}.${DATA_HERO.thumbnail.extension}`;
                    $SECTION_RESULTS.appendChild($CARD.card);
                }
            });
        }
    });
}

// [EVENTOS]
$BOTON_BUSCAR.addEventListener('click', buscarvelBuscar);
$USER_INPUT.addEventListener('keyup', event => {
    if (event.key === 'Enter') buscarvelBuscar();
});
$LOGO.addEventListener('click', resetScreen);
const OBSERVADOR = new IntersectionObserver(nuevaCard, {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: .2
});
OBSERVADOR.observe($FOOTER);
