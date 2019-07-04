import Choice from './../models/ChoiceModel';
import Utils from './../utils';

export default class Game {
  /**
   * @param {Choice[]} choices
   * Order in Array is crucial for game to work.
   * You need to have Array of Choices ordered in a way, that next Choice will win over previous Choice.
   */
  constructor(choices = []) {
    this.resultRef = document.querySelector('.js-result');
    this.initTitleRef = document.querySelector('.js-initTitle');
    this.gameTitleRef = document.querySelector('.js-gameTitle');
    this.choicesRef = document.querySelector('.js-choices');
    this.restartRoundBtn = document.querySelector('.js-restart');

    this.score = {
      p1: 0,
      p2: 0
    };
    this.choices = choices;
    this.gameMap = {};

    this.registerListeners();
    this.onInit();
  }

  registerListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      this.onRoundStart();
      this.onRestartGame();
    });
  }

  onInit() {
    this.generateGameMap();
    this.generateChoicesButtons();
    this.createGameTitle();
  }

  onRoundStart() {
    const startRoundBtns = this.choicesRef.querySelectorAll('.js-roundStart');

    startRoundBtns.forEach(startRoundBtn => {
      startRoundBtn.addEventListener('click', e => {
        const choice = e.currentTarget.getAttribute('data-choice');

        this.gameRound(choice);
      });
    });
  }

  onRestartGame() {
    const hide = 'h-hide';

    this.restartRoundBtn &&
      this.restartRoundBtn.addEventListener('click', () => {
        for (const key in this.score) {
          this.score[key] = 0;
        }

        Utils.classAdd(this.restartRoundBtn, hide);
        Utils.classAdd(this.resultRef, hide);
        Utils.classRem(this.initTitleRef, hide);
      });
  }

  /**
   * Creates an map of all possible results
   */
  generateGameMap() {
    const choices = this.choices;

    choices.forEach((choice, i) => {
      this.gameMap[choice.name] = {};

      choices.forEach((concurrentChoice, j) => {
        const opponentChoice = (i + j) % choices.length;
        const firstHalf = (choices.length - 1) / 2;
        const choiceName = choice.name;
        const opponentChoiceName = choices[opponentChoice].name;

        if (!j) {
          this.gameMap[choiceName][choiceName] = 0;
        } else if (j <= firstHalf) {
          this.gameMap[choiceName][
            opponentChoiceName
          ] = `${opponentChoiceName}`;
        } else {
          this.gameMap[choiceName][opponentChoiceName] = `${choiceName}`;
        }
      });
    });
  }

  generateChoicesButtons() {
    let template = '';

    this.choices.forEach(choice => {
      template += `
                <a class="js-roundStart game__choice col" data-choice="${
                  choice.name
                }">
                    <img src="${choice.imgPath}">
                </a>
            `;
    });

    this.choicesRef.innerHTML = template;
  }

  compareChoices(choice1 = new Choice(), choice2 = new Choice()) {
    const p1ResultRef = document.querySelector('.js-player1Result');
    const p1ScoreRef = document.querySelector('.js-p1Score');
    const p2ResultRef = document.querySelector('.js-player2Result');
    const p2ScoreRef = document.querySelector('.js-p2Score');
    const arrowRef = document.querySelector('.js-arrow');
    const match = (this.gameMap[choice1.name] || {})[choice2.name];

    p1ResultRef.setAttribute('src', choice1.imgPath);
    p2ResultRef.setAttribute('src', choice2.imgPath);
    Utils.classRem(arrowRef, 'a0 a1 a2');

    if (match == 0) {
      Utils.classAdd(arrowRef, 'a2');
    } else if (choice1.name == match) {
      this.score.p1 += 1;
      Utils.classAdd(arrowRef, 'a0');
    } else {
      this.score.p2 += 1;
      Utils.classAdd(arrowRef, 'a1');
    }

    p1ScoreRef.textContent = this.score.p1;
    p2ScoreRef.textContent = this.score.p2;
  }

  /**
   * @param {String} myChoiceName
   */
  gameRound(myChoiceName) {
    const initTitleRef = this.initTitleRef;
    const resultRef = this.resultRef;
    const rng = Math.floor(Math.random() * this.choices.length);
    const aiChoice = this.choices[rng];
    const myChoice = this.choices.find(choice => choice.name === myChoiceName);
    const hide = 'h-hide';

    if (myChoice) {
      Utils.classRem(this.restartRoundBtn, hide);
      Utils.classRem(resultRef, hide);
      Utils.classAdd(initTitleRef, hide);
    } else {
      Utils.classAdd(resultRef, hide);
      Utils.classRem(initTitleRef, hide);
    }

    this.compareChoices(myChoice, aiChoice);
  }

  createGameTitle() {
    let title = '';

    this.choices.forEach((choice, i) => {
      if (i === this.choices.length - 1) {
        title += `${choice.formattedName}`;
      } else {
        title += `${choice.formattedName}, `;
      }
    });

    title += ' game!';
    this.gameTitleRef.textContent = title;
  }
}
