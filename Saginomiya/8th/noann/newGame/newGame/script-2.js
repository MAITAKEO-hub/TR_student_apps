document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  let playerHp = 100;

  startButton.addEventListener("click", () => {
    document.body.innerHTML = `
          <div class="game-container">
              <h1>あなたのHPは<span id="player-hp">${playerHp}</span>です</h1>
              <p>Please tap keyboard</p>
          </div>
      `;
  });

  class Enemy {
    constructor(name, hp, isBoss = false) {
      this.name = name;
      this.hp = hp;
      this.isBoss = isBoss;
    }

    takeDamage(damage) {
      this.hp -= damage;
      if (this.hp < 0) this.hp = 0;
    }

    isAlive() {
      return this.hp > 0;
    }
  }

  const enemies = [
    new Enemy("スライム", 10),
    new Enemy("ゴブリン", 20),
    new Enemy("ドラゴン", 30),
    new Enemy("魔王", 40, true),
    new Enemy("エルフ", 10)
  ];

  const riddles = [
    { question: "What has to be broken before you can use it?", answer: "an egg" },
    { question: "I’m tall when I’m young, and I’m short when I’m old. What am I?", answer: "a candle" },
    { question:"What has an eye but can’t see?",answer:"a needle"},
    { question:""}



  ];

  const words = [
    { question: "consoleの意味は？", answer: "慰める" },
    { question: "philosopherの意味は？", answer: "哲学者" },
    { question: "anthropologistの意味は？", answer: "人類学者" },
    { question: "archeologistの意味は？", answer: "考古学者" },
    { question: "Abandonの意味は？", answer: "放棄する" },
    { question: "Absurdの意味は？", answer: "不合理な" },
    { question: "の意味は？", answer: "" },
    { question: "の意味は？", answer: "" },
    { question: "の意味は？", answer: "" },
    { question: "の意味は？", answer: "" },
    { question: "の意味は？", answer: "" },
    { question: "の意味は？", answer: "" },
  ];

  function startBattle() {
    const enemy = enemies[Math.floor(Math.random() * enemies.length)];


    document.body.innerHTML = `
        <div class="game-container battle-screen">
            <h1>敵があらわれた！</h1>
            <p class="enemy">🆚 ${enemy.name}</p>
            <div class="command-box">
                <button id="attack-button">▶ たたかう</button>
                <button id="escape-button">▶ にげる</button>
            </div>
        </div>
    `;

    document.getElementById("attack-button").addEventListener("click", () => askQuestion(enemy));
    document.getElementById("escape-button").addEventListener("click", escape);
  }

  function askQuestion(enemy) {
    let quiz;
    if (enemy.isBoss) {
      quiz = riddles[Math.floor(Math.random() * riddles.length)];
    } else {
      quiz = words[Math.floor(Math.random() * words.length)];
    }
    
    let answer = prompt(quiz.question);
    if (answer === quiz.answer) {
      alert("正解！こうげき！");
      enemy.takeDamage(10);
      if (enemy.isAlive()) {
        alert(`${enemy.name}のHP:${enemy.hp}`);
      } else {
        alert(`${enemy.name}を倒した！`);
        location.reload();
      }
    } else {
      alert("不正解！ダメージを受けた！");
      playerHp -= 10;
      document.getElementById("player-hp").textContent = playerHp;
      if (playerHp <= 0) {
        alert("ゲームオーバー！");
        location.reload();
      }
    }
  }

  function escape() {
    alert("にげた！");
    location.reload();
  }

  document.addEventListener("keydown", (event) => {
    if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
      return;
    }

    if (event.key === "Enter") {
      startBattle();
    }
  });
});
