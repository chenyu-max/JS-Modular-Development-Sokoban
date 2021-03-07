import showUI from "./ui.js";
import {playerMove, isWin} from './player.js';

showUI();
let over = false
//完成整个游戏

window.onkeydown = function (e) {
    if (over) {
        showUI();
        return;
    }
    let result = false;
    if (e.key === "ArrowUp") {
        playerMove("up");
    } else if (e.key === "ArrowDown") {
        playerMove("down")
    } else if (e.key === "ArrowLeft") {
        playerMove("left")
    } else if (e.key === "ArrowRight") {
        playerMove("right")
    }


    if (isWin()) {
        showUI();
        over = true;
        setTimeout(() => {
            alert('游戏已结束');
        }, 0)
    }

}