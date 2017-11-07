"use strict"
const main = document.querySelector('#main');
const header = document.querySelector('#header');

class Game {
	constructor(level, skirt) {
		this.level = level;
		this.skirt = skirt;
		this.skirtUrl = null;
		this.cardFace = null;
		this.arrayForCardsValue = null;
		this.sizeForCards = null;
		this.levelValue = null;
		this.cardValue = null;
		this.count = 0;
		this.current = null;
		this.point = null;
		this.recordTime = null;
	}

	skirtChoice() {
		switch (this.skirt) {
			case 1:
				this.skirtUrl = 'skirt-1'
				break;
			case 2:
				this.skirtUrl = 'skirt-2'
				break;
			case 3:
				this.skirtUrl = 'skirt-3'
				break;
		}
	}

	levelChoice() {
		switch (this.level) {
			case 'easy':
				this.levelValue = 10;
				this.point = 10;
				this.arrayForCardsValue = ['card-back-bg-1', 'card-back-bg-1', 'card-back-bg-2', 'card-back-bg-2', 'card-back-bg-3', 'card-back-bg-3', 'card-back-bg-4', 'card-back-bg-4', 'card-back-bg-5', 'card-back-bg-5'];
				this.sizeForCards = 'large-size';
				break;
			case 'normal':
				this.levelValue = 18;
				this.point = 18;
				this.arrayForCardsValue = ['card-back-bg-1', 'card-back-bg-1', 'card-back-bg-2', 'card-back-bg-2', 'card-back-bg-3', 'card-back-bg-3', 'card-back-bg-4', 'card-back-bg-4', 'card-back-bg-5', 'card-back-bg-5', 'card-back-bg-6', 'card-back-bg-6', 'card-back-bg-7', 'card-back-bg-7', 'card-back-bg-8', 'card-back-bg-8', 'card-back-bg-9', 'card-back-bg-9'];
				this.sizeForCards = 'medium-size';
				break;
			case 'hard':
				this.levelValue = 24;
				this.point = 24;
				this.arrayForCardsValue = ['card-back-bg-1', 'card-back-bg-1', 'card-back-bg-2', 'card-back-bg-2', 'card-back-bg-3', 'card-back-bg-3', 'card-back-bg-4', 'card-back-bg-4', 'card-back-bg-5', 'card-back-bg-5', 'card-back-bg-6', 'card-back-bg-6', 'card-back-bg-7', 'card-back-bg-7', 'card-back-bg-8', 'card-back-bg-8', 'card-back-bg-9', 'card-back-bg-9', 'card-back-bg-10', 'card-back-bg-10', 'card-back-bg-11', 'card-back-bg-11', 'card-back-bg-12', 'card-back-bg-12'];
				this.sizeForCards = 'small-size';
				break;
		}
	}

	build() {
		main.classList.add(`grid-${this.sizeForCards}`);
		main.innerHTML += '<div class="timer"><span id="minute"></span>:<span id="second"></span></div>';
		
		while (this.levelValue > 0) {
			this.cardValue = Math.round(Math.random() * (this.arrayForCardsValue.length - 1));
			main.innerHTML += `<div class="wrapper item-${this.sizeForCards}"><div class="card" data-value=${this.arrayForCardsValue[this.cardValue]}><div class="front ${this.skirtUrl}"></div><div class="back ${this.arrayForCardsValue[this.cardValue]}"></div></div></div>`;
            this.arrayForCardsValue.splice(this.cardValue, 1);
            this.levelValue = this.levelValue - 1;
		}
	}

	handler() {
		main.addEventListener('click', (event) => {
			let target = event.target;
			while (target !== main) {
				if (target.classList.contains('card')) {
					if (this.count === 2) {
						return false;
					};

					target.classList.add('flipped');
					this.count = this.count + 1;

					if (this.count === 1) {
						this.current = target;
					};

					if (target === this.current) {
						this.count = 1;
					};

					if (this.count === 2) {
						if (this.current.getAttribute('data-value') === target.getAttribute('data-value')) {
							setTimeout(() => {
								this.current.classList.add('hidden');
								target.classList.add('hidden');
								this.point = this.point - 2;
								this.count = 0;
								if (this.point === 0) {
									this.victory();
								}
							}, 1000);
						} else {
							setTimeout(() => {
								this.current.classList.remove('flipped');
								target.classList.remove('flipped');
								this.count = 0;
							}, 1000);
						}
					}
					return;
				}
				target = target.parentNode;
			}
		});
	}

	timer() {
		const minute = document.querySelector('#minute');
		const second = document.querySelector('#second');
		let min = 0;
		let sec = 0;
		setInterval(() => {
			sec = sec + 1;
			if (sec === 60) {
				min = min + 1;
				sec = 0;
			};
			second.innerHTML = this.formatNumber(sec);
			minute.innerHTML = this.formatNumber(min);
			this.recordTime = `${this.formatNumber(min)}:${this.formatNumber(sec)}`;
		}, 1000)
	}

    formatNumber(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

	victory() {
		main.classList.remove(`grid-${this.sizeForCards}`);
		main.innerHTML = `<div class="victory"><h1 class="victory">Great job, our congratulations. You win!</h1><h2>Your time is <span class="info">${this.recordTime}</span></h2><h3>Not bad, good. But I know You can better!</h3></div><button class="restart">Play again</button>`;

		const restart = document.querySelector('.restart');
		restart.addEventListener('click', () => {
			main.innerHTML = '';
			go = new Start();
			go.build();
			go.handler();
		});
	}

	init() {
		this.skirtChoice();
		this.levelChoice();
		this.build();
		this.handler();
		this.timer();
	}
}