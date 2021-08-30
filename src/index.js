module.exports = function solveSudoku(matrix) {
  let size = 9;

  // проверяем горизонталь, вертикаль и блоки
  const check = (matrix, row, col, digit) => {
      for (let x = 0; x < size; x++) if (matrix[row][x] === digit) return false;
      for (let y = 0; y < size; y++) if (matrix[y][col] === digit) return false;

      for (let y = 0; y < 3; y++) {
          for (let x = 0; x < 3; x++)
              if (matrix[y + row - row % 3][x + col - col % 3] === digit) return false;
      }
      return true;
  }

  // рекурсивная часть для перебора
  const sudoku = (matrix, row, col) => {
      if (row === size - 1 && col === size) return true;
      if (col === size) {
          row++;
          col = 0;
      }
      if (matrix[row][col] > 0) return sudoku(matrix, row, col + 1);

      for (let digit = 1; digit <= size; digit++) {
          if (check(matrix, row, col, digit)) {
              matrix[row][col] = digit;
              if (sudoku(matrix, row, col + 1)) return true;
          }
          matrix[row][col] = 0;
      }
      return false;
  }
  
  if (sudoku(matrix, 0, 0)) return matrix
  else return false;

}
