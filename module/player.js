import * as map from './map.js';
import showUI from './ui.js';


function isWin() {
    for (const prop of map.correct) {
        if (map.content[prop.row][prop.col] !== map.BOX) {
            return false;
        }
    }
    return true;
}

/**
 * 返回下一个位置的信息
 * @param row  当前位置的行数
 * @param col  当前位置的列数
 * @param direction 准备移动的方向
 * @returns {{col, row: number, value: number}|{col: number, row, value: number}|{col: *, row, value: number}|{col, row: *, value: number}}
 */
function getNextPosition(row, col, direction) {
    if (direction === 'left') {
        return {
            row: row,
            col: col - 1,
            value: map.content[row][col - 1]
        }
    } else if (direction === 'right') {
        return {
            row: row,
            col: col + 1,
            value: map.content[row][col + 1]
        }
    } else if (direction === 'up') {
        return {
            row: row - 1,
            col: col,
            value: map.content[row - 1][col]
        }
    } else if (direction === 'down') {
        return {
            row: row + 1,
            col: col,
            value: map.content[row + 1][col]
        }
    }
}

/**
 * 返回当前玩家的位置
 * @returns {{col: number, row: number}}
 */
function getPlayerPosition() {
    for (let i = 0; i < map.rowNumber; i++) {
        for (let j = 0; j < map.colNumber; j++) {
            if (map.content[i][j] === map.PLAYER) {
                return {
                    row: i,
                    col: j
                }
            }
        }
    }
}

/**
 * 交换两个点
 * @param point1
 * @param point2
 */
function exchange(point1, point2) {
    let temp = map.content[point1.row][point1.col];
    map.content[point1.row][point1.col] = map.content[point2.row][point2.col];
    map.content[point2.row][point2.col] = temp;
}

/**
 * 主角移动函数
 * @param direction
 */
function playerMove(direction) {
    let playerPoint = getPlayerPosition();

    let nextPointInfo = getNextPosition(playerPoint.row, playerPoint.col, direction);
    if (nextPointInfo.value === map.WALL) {
        return;
    } else if (nextPointInfo.value === map.SPACE) {
        exchange(playerPoint, nextPointInfo);
    } else if (nextPointInfo.value === map.BOX) {
        let nextNextPointInfo = getNextPosition(nextPointInfo.row, nextPointInfo.col, direction);
        if (nextNextPointInfo.value === map.SPACE) {
            exchange(nextNextPointInfo, nextPointInfo);
            exchange(nextPointInfo, playerPoint);
        }
    }
    showUI();
}

export {playerMove, isWin};