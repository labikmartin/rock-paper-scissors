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
        this.gameRound('rock');
    }

    onRoundStart() {
        let startRoundBtns = this.choicesRef.querySelectorAll('.js-roundStart');
        for (let i = 0; i < startRoundBtns.length; i++) {
            let startRoundBtn = startRoundBtns[i];
            startRoundBtn && startRoundBtn
                .addEventListener('click', (e) => {
                    let choice = e.target.getAttribute('data-choice');
                    console.log(choice);
                    console.log(e);
                });
        }
    }

    generateChoicesButtons() {
        let template = '';
        this.choices.forEach((choice = 'string') => {
            template += `
                <a class="js-roundStart btn" data-choice="${choice}">${choice.toUpperCase()}</a>
            `
        });
        console.log(template);
        this.choicesRef.innerHTML = template;
    }

    generateGameMap(choices = []) {
        choices.forEach((choice, i) => {
            this.gameMap[choice] = {};
            for (let j = 0; j < choices.length; j++) {
                let choice2 = (i + j) % choices.length
                let firstHalf = (choices.length - 1) / 2;
                if (!j) {
                    this.gameMap[choice][choice] = 'Tie!';
                }
                else if (j <= firstHalf) {
                    this.gameMap[choice][choices[choice2]] = `${choices[choice2]}`;
                }
                else {
                    this.gameMap[choice][choices[choice2]] = `${choice}`;
                }
            }
        });
    }

    compareChoices(choice1 = 'string', choice2 = 'string') {
        let match = (this.gameMap[choice1] || {})[choice2];
        if (choice1 == match) {
            console.log('You win!');
        }
        else {
            console.log('Computer wins');
        }
    }

    gameRound(myChoice = 'string') {
        let rng = Math.floor(Math.random() * this.choices.length);
        let aiChoice = this.choices[rng];
        this.compareChoices(myChoice, aiChoice);
    }

}
