/*
    Autor: AndrésR.Dev
    Description: Componente HTML CARD
    Logic: Se crea una clase reutilizable para la creación de un componente article[card]

 */

class Card {
    constructor() {
        this._imgURL = '. . .'
        this._titleCard = '...';
        this._comics = 'Comics: ...';
        this._series = 'Series: ...';
        this._stories = 'Stories: ...';
        this._events = 'Events: ...';
        // Elementos
        this.$CARD = document.createElement('article');
        this.$CONTAINER_IMG = document.createElement('section');
        this.$CONTAINER_DATA = document.createElement('section');
        this.$TITLE_CARD = document.createElement('p');
        this.$COMICS = document.createElement('p');
        this.$SERIES = document.createElement('p');
        this.$STORIES = document.createElement('p');
        this.$EVENTS = document.createElement('p');
    }
    // Getters - Setters
    get titleCard() {
        return this._titleCard;
    }
    set titleCard(newTitle) {
        this._titleCard = newTitle;
    }
    get comics() {
        return this._comics;
    }
    set comics(newComic) {
        this._comics = `Comics: ${newComic}`;
    }
    get series() {
        return this._series;
    }
    set series(newSeries) {
        this._series = `Series: ${newSeries}`;
    }
    get stories() {
        return this._stories;
    }
    set stories(newStories) {
        this._stories = `Stories: ${newStories}`;
    }
    get events() {
        return this._events;
    }
    set events(newEvents) {
        this._events = `Events: ${newEvents}`;
    }
    get imgURL() {
        return this._imgURL;
    }
    set imgURL(newImgURL) {
        this._imgURL = '';
        // Creamos backgroundIMG del contenedor 
        this.$CONTAINER_IMG.style.backgroundImage = `url('${newImgURL}')`;
    }
    get card() {
        return this.generateCard();
    }
    // Methods
    generateCard() {
        this.$TITLE_CARD.setAttribute('class', 'buscarvel-results__card--title');
        this.$TITLE_CARD.textContent = this._titleCard;
        this.$COMICS.setAttribute('class', 'buscarvel-results__card-data--text');
        this.$COMICS.textContent = this._comics;
        this.$SERIES.setAttribute('class', 'buscarvel-results__card-data--text');
        this.$SERIES.textContent = this._series;
        this.$STORIES.setAttribute('class', 'buscarvel-results__card-data--text');
        this.$STORIES.textContent = this._stories;
        this.$EVENTS.setAttribute('class', 'buscarvel-results__card-data--text');
        this.$EVENTS.textContent = this._events;
        this.$CONTAINER_IMG.textContent = this._imgURL;
        this.$CONTAINER_IMG.setAttribute('class', 'buscarvel-results__card-img')
        this.$CONTAINER_DATA.setAttribute('class', 'buscarvel-results__card-data')
        this.$CONTAINER_DATA.appendChild(this.$TITLE_CARD);
        this.$CONTAINER_DATA.appendChild(this.$COMICS);
        this.$CONTAINER_DATA.appendChild(this.$SERIES);
        this.$CONTAINER_DATA.appendChild(this.$STORIES);
        this.$CONTAINER_DATA.appendChild(this.$EVENTS);
        this.$CARD.appendChild(this.$CONTAINER_IMG);
        this.$CARD.appendChild(this.$CONTAINER_DATA);
        this.$CARD.setAttribute('class', 'buscarvel-results__card')
        return this.$CARD;
    }

}

export { Card };