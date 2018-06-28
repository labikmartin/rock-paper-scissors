import Choice from './../models/ChoiceModel';

import _ from 'lodash';

import Utils from './../utils';


/**
 * Order in Array is crucial for game to work.
 * You need to have Array of Choices ordered in a way, that next Choice will win over previous Choice.
 */
export default class Game {
    constructor(choices = []) {
        this.resultRef    = document.querySelector('.js-result');
        this.initTitleRef = document.querySelector('.js-initTitle');
        this.gameTitleRef = document.querySelector('.js-gameTitle');
        this.choicesRef = document.querySelector('.js-choices');
        this.restartRoundBtn = document.querySelector('.js-restart');

        this.score = {
            p1: 0,
            p2: 0
        }
        this.choices = choices;
        this.gameMap = {};
        this.registerListeners();
        this.onInit();
    }

    registerListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.onRoundStart();
            this.onRestartGame();
        })
    }

    onInit() {
        this.generateGameMap(this.choices);
        this.generateChoicesButtons();
        this.createGameTitle();
    }

    onRoundStart() {
        let startRoundBtns = this.choicesRef.querySelectorAll('.js-roundStart');
        for (let i = 0; i < startRoundBtns.length; i++) {
            let startRoundBtn = startRoundBtns[i];
            startRoundBtn && startRoundBtn
                .addEventListener('click', (e) => {
                    let choice = e.currentTarget.getAttribute('data-choice');
                    this.gameRound(choice);
                });
        }
    }

    onRestartGame() {
        let restartRoundBtn = this.restartRoundBtn;
        restartRoundBtn && restartRoundBtn
            .addEventListener('click', (e) => {
                for (const key in this.score) {
                    this.score[key] = 0;
                }
                Utils.classAdd(restartRoundBtn, 'h-hide');
                Utils.classAdd(this.resultRef, 'h-hide');
                Utils.classRem(this.initTitleRef, 'h-hide');
            });
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
    }

    generateChoicesButtons() {
        let template = '';
        this.choices.forEach((choice = Choice) => {
            template += `
                <a class="js-roundStart game__choice col" data-choice="${choice.name}">
                    <img src="${choice.imgPath}">
                </a>
            `
        });
        this.choicesRef.innerHTML = template;
    }

    compareChoices(choice1 = new Choice(), choice2 = new Choice()) {
        let p1ResultRef = document.querySelector('.js-player1Result');
        let p1ScoreRef  = document.querySelector('.js-p1Score');
        let p2ResultRef = document.querySelector('.js-player2Result');
        let p2ScoreRef  = document.querySelector('.js-p2Score');
        let arrowRef    = document.querySelector('.js-arrow');
        let match       = (this.gameMap[choice1.name] || {})[choice2.name];
        p1ResultRef.setAttribute('src', choice1.imgPath);
        p2ResultRef.setAttribute('src', choice2.imgPath);
        Utils.classRem(arrowRef, 'a0 a1 a2');
        if (match == 0) {
            Utils.classAdd(arrowRef, 'a2');
        }
        else if (choice1.name == match) {
            this.score.p1 += 1;
            Utils.classAdd(arrowRef, 'a0');
        }
        else {
            this.score.p2 += 1;
            Utils.classAdd(arrowRef, 'a1');
        }
        p1ScoreRef.textContent = this.score.p1;
        p2ScoreRef.textContent = this.score.p2;
    }

    gameRound(myChoiceName = 'string') {
        let initTitleRef = this.initTitleRef;
        let resultRef    = this.resultRef;
        let rng          = Math.floor(Math.random() * this.choices.length);
        let aiChoice     = this.choices[rng];
        let myChoice     = _.find(this.choices, {name: myChoiceName});
        if (myChoice) {
            Utils.classRem(this.restartRoundBtn, 'h-hide');
            Utils.classRem(resultRef, 'h-hide');
            Utils.classAdd(initTitleRef, 'h-hide');
        }
        else {
            Utils.classAdd(resultRef, 'h-hide');
            Utils.classRem(initTitleRef, 'h-hide');
        }
        this.compareChoices(myChoice, aiChoice);
    }

    createGameTitle() {
        let title = '';
        this.choices.forEach((choice = Choice, i) => {
            if (i === this.choices.length - 1) {
                title += `${choice.formattedName}`
            }
            else {
                title += `${choice.formattedName}, `
            }
        });
        title += ' game!'
        this.gameTitleRef.textContent = title;
    }

}
