//- ### ### ### ### ### ### ### ###
//- BUILD
//- ### ### ### ### ### ### ###

//- ### TEMPLATES BUILD
function requireAll (r) { r.keys().forEach(r); }
requireAll(require.context('../templates/', false, /\.pug$/));


//- ### ### ### ### ### ### ### ###
//- APP
//- ### ### ### ### ### ### ###

//- ### ### ### IMPORT APPLICATION COMPONENTS
import Game from './controllers/GameController';

//- ### ### ### MAIN APPLICATION

class AppMain {
    constructor() {
        this.game;
        this.initialize();
    }
    //- ### INSTANCIATE COMPONENTS + INICIALIZE EVENTS + FUNCTIONS
    initialize() {
        this.game = new Game(['rock', 'paper', 'scissors']);
    }
};

//- ### ### ### INITIALIZE APPLICATION
const app = new AppMain();
