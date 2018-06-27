import Choice from './../models/ChoiceModel';

import _ from 'lodash';

import Utils from './../utils';


export default class Game {
    constructor(choices = []) {
        this.choicesRef = document.querySelector('.js-choices');
        this.choices = choices;
        this.gameMap = {};
        this.registerListeners();
        this.onInit();
    }

    registerListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.onRoundStart();
        })
    }

    onInit() {
        this.generateGameMap(this.choices);
        this.generateChoicesButtons();
    }

    onRoundStart() {
        let startRoundBtns = this.choicesRef.querySelectorAll('.js-roundStart');
        for (let i = 0; i < startRoundBtns.length; i++) {
            let startRoundBtn = startRoundBtns[i];
            startRoundBtn && startRoundBtn
                .addEventListener('click', (e) => {
                    let choice = e.target.getAttribute('data-choice');
                    this.gameRound(choice);
                });
        }
    }

    generateChoicesButtons() {
        let template = '';
        this.choices.forEach((choice = Choice) => {
            template += `
                <a class="js-roundStart btn" data-choice="${choice.name}">${choice.formattedName}</a>
            `
        });
        this.choicesRef.innerHTML = template;
    }

    generateGameMap(choices = []) {
        choices.forEach((choice = new Choice(), i) => {
            this.gameMap[choice.name] = {};
            for (let j = 0; j < choices.length; j++) {
                let choice2   = (i + j) % choices.length;
                let firstHalf = (choices.length - 1) / 2;
                if (!j) {
                    this.gameMap[choice.name][choice.name] = 0;
                }
                else if (j <= firstHalf) {
                    this.gameMap[choice.name][choices[choice2].name] = `${choices[choice2].name}`;
                }
                else {
                    this.gameMap[choice.name][choices[choice2].name] = `${choice.name}`;
                }
            }
        });
        console.log(this.gameMap);
    }

    compareChoices(choice1 = new Choice(), choice2 = new Choice()) {
        console.log(choice1);
        console.log(choice2);
        let p1ResultRef = document.querySelector('.js-player1Result');
        let p2ResultRef = document.querySelector('.js-player2Result');
        let match       = (this.gameMap[choice1.name] || {})[choice2.name];
        p1ResultRef.setAttribute('src', choice1.imgPath);
        p2ResultRef.setAttribute('src', choice2.imgPath);
        if (match == 0) {
            console.log('Tie!');
        }
        else if (choice1.name == match) {
            console.log('You win!');
        }
        else {
            console.log('Computer wins');
        }
    }

    gameRound(myChoiceName = 'string') {
        let rng      = Math.floor(Math.random() * this.choices.length);
        let aiChoice = this.choices[rng];
        let myChoice = _.find(this.choices, {name: myChoiceName});
        this.compareChoices(myChoice, aiChoice);
    }

}
