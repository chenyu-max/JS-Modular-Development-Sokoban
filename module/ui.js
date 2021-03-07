import * as map from "./map.js";

const container = document.getElementById('game');
const pieceWidth = 45; //每一个小块的宽度
const pieceHeight = 45; //每一个小块的高度

/**
 * 设置div的 宽高
 */
function setDivContainer() {
    container.style.width = pieceWidth * map.colNumber + "px";
    container.style.height = pieceHeight * map.rowNumber + "px";
}

/**
 * 判断方块的位置是否为 正确的位置
 * @param row 方块的 行数 从零开始
 * @param col 方块的 列数 从零开始
 */
function isCorrect(row, col) {
    return map.correct.find(p => p.row === row && p.col === col);
}

/**
 * 设置小方块的位置
 * @param row
 * @param col
 * @param oDiv
 */
function setLocation(row, col, oDiv) {
    oDiv.style.left = col * pieceWidth + 'px';
    oDiv.style.top = row * pieceHeight + 'px';
}

/**
 * 添加一个小方块的样式
 * @param row
 * @param col
 * @param value
 */
function addContent(row, col, value) {
    let oDiv = document.createElement('div');
    oDiv.classList.add('item');
    setLocation(row, col, oDiv);
    if (value === map.WALL) {
        oDiv.classList.add('wall');
    } else if (value === map.BOX) {
        if (isCorrect(row, col)) {
            oDiv.classList.add('correct-box');
        } else {
            oDiv.classList.add('box');
        }
    } else if (value === map.SPACE) {
        if (isCorrect(row, col)) {
            oDiv.classList.add('correct');
        } else {
            return;
        }
    } else {
        oDiv.classList.add('player');
    }
    container.appendChild(oDiv);
}

/**
 * 将地图中的所有内容 展示出来
 */
function setContent() {
    container.innerHTML = '';
    for (let i = 0; i < map.rowNumber; i++) {
        for (let j = 0; j < map.colNumber; j++) {
            addContent(i, j, map.content[i][j]);
        }
    }
}

function showUI() {
    setDivContainer();
    setContent();
}

export default showUI;