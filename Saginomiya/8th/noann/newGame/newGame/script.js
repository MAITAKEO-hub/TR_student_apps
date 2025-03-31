document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");

  startButton.addEventListener("click", () => {
    console.log("hp display");
    document.body.innerHTML = `
          <div class="game-container">
              <h1>あなたのHPは100です</h1>
              <p>Please tap keyboard
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


  function startBattle() {
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];

    const battleScreen = document.createElement("div");
    battleScreen.classList.add("game-container", "battle-screen");

    battleScreen.innerHTML = `
        <h1>敵があらわれた！</h1>
        <p class="enemy">🆚 ${randomEnemy.name}</p>
        <div class="command-box">
            <button id="attack-button">▶ たたかう</button>
            <button id="escape-button">▶ にげる</button>
        </div>
    `;

    document.body.innerHTML = ""; // 既存の要素を削除
    document.body.appendChild(battleScreen);

    // イベントリスナーを再度設定
    document.getElementById("attack-button").addEventListener("click", attack);
    document.getElementById("escape-button").addEventListener("click", escape);
  }

  function attack(enemy) {
    alert("こうげき！");
    enemy.takeDamage(10);

    if (enemy.isAlive()) {
      alert(`${enemy.name}のHP:${enemy.hp}`);
    } else {
      alert(`${enemy.name}を倒した！`);
      location.reload();//初期画面に戻る
    }
  }

  function escape() {
    alert("にげた！");
    location.reload();//初期画面に戻る
  }

  document.addEventListener("keydown", (event) => {
    if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
      return; // フォーム入力中は無視
    }

    if (event.key === "Enter") {
      console.log("Enter key pressed - starting battle");
      startBattle();
    }
  });




   });