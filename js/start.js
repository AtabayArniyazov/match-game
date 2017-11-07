"use strict"

class Start {
	constructor() {
		this.gameRules = '<section class="grid-for-greeting"><h1>Welcome to the Match game!</h1><h2>How to play:</h2><p>Memory is a counter game where the object is to find pair. When the game begins, all the pictures are hidden.</p><h2>To Play:</h2><ol><li>Select two cards to try to match the pictures.</li><li>If you match the pictures you can go again.</li><li>If they do not match it is the computer turn them.</li><li>The player that finds all pairs wins!</li><li>Have fun!</li></ol></section><section><article><img src="img/1.png"></article><article><img src="img/2.png"></article><article><img src="img/3.png"></section>';
		this.skirt = 1;
		this.level = 'easy';
	}

	build() {
		main.innerHTML = this.gameRules;
	}

	handler() {
		let level = document.querySelector('#selectDifficulty');
		let skirt = document.querySelector('#selectSkirt');
		let startGame = document.querySelector('#startNewGame');

		level.addEventListener('click', (event) => {
			this.level = event.target.value;
		});

		skirt.addEventListener('click', (event) => {
			this.skirt = Number(event.target.value);
		});

		startGame.addEventListener('click', (event) => {
			event.stopPropagation();
			main.innerHTML = '';
			main.removeAttribute("class");
			main.className = 'main-style';
			let initializeGame = new Game(this.level, this.skirt);
			initializeGame.init();
		});
	}
}

let go = new Start();
go.build();
go.handler();