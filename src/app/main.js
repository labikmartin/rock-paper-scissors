//- ### ### ### ### ### ### ### ###
//- BUILD
//- ### ### ### ### ### ### ###

//- ### TEMPLATES BUILD
function requireAll (r) { r.keys().forEach(r); }
requireAll(require.context('../templates/', false, /\.pug$/));


//- ### ### ### ### ### ### ### ###
//- APP
//- ### ### ### ### ### ### ###

//- ### JAVASCRIPT MODULES
import Utils from './utils';

//- ### ### ### IMPORT APPLICATION COMPONENTS

//- ### ### ### MAIN APPLICATION

const appMain = {

    //- ### INSTANCIATE COMPONENTS + INICIALIZE EVENTS + FUNCTIONS
    initialize() {
      console.log('Hello world');
    }
};

//- ### ### ### INITIALIZE APPLICATION
appMain.initialize();
