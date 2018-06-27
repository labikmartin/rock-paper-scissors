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

import Choice from './models/ChoiceModel';

//- ### ### ### MAIN APPLICATION

class AppMain {
    constructor() {
        this.game;
        this.initialize();
    }
    //- ### INSTANCIATE COMPONENTS + INICIALIZE EVENTS + FUNCTIONS
    initialize() {
        this.game = new Game([
                new Choice('rock', '../images/rock.png'),
                new Choice('paper', '../images/paper.png'),
                new Choice('scissors', '../images/scissors.png')
            ]);
    }
};

//- ### ### ### INITIALIZE APPLICATION
const app = new AppMain();
