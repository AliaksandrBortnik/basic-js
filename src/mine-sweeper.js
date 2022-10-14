/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const result = matrix.map(m => m.map(_ => 0));

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      result[y][x] = countMinesAround(matrix, x, y);
    }
  }

  return result;
}

function countMinesOfCells(matrix, x, y) {
  // Adjust params if the cell is close to a border
  const startX = x > 1 ? x - 1 : 0;
  const cellsCount = x > 1 ? 3 : 2;
  // Extract and analyze cells
  return matrix[y].slice(startX, cellsCount).filter(cell => cell).length;
}

function countMinesAround(matrix, x , y) {
  let result = 0;

  // 1. Top 3 cells (or 2 if cell is in a corner)
  if (y > 0) {
    result += countMinesOfCells(matrix, x, y - 1 );
  }

  // 2. Bottom 3 cells (or 2 if cell is in a corner)
  if (y < matrix.length - 1) {
    result += countMinesOfCells(matrix, x, y + 1 );
  }

  // 3. Left-side cell
  if (x > 0) {
    result += matrix[y][x - 1];
  }

  // 4. Right-side cell
  if (x < matrix[y].length - 1) {
    result += matrix[y][x + 1];
  }

  return result;
}

module.exports = {
  minesweeper
};
