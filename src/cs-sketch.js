/** Quick Sort Init Data. */
var qs_state = {
  sorted: false,
  data: ['F', 'D', 8, 'A', 1, 5, 9, 3, 4, 7, 9, 5],
}
/** <Sort Algo #2> Init Data. */
var sort2_data = ['F', 'D', 8, 'A', 1, 5, 9, 3, 4, 7, 9, 5];
/** <Sort Algo #3> Init Data. */
var sort3_data = ['F', 'D', 8, 'A', 1, 5, 9, 3, 4, 7, 9, 5];

// General vars.
var rows = 50;
var cols = 70;
var cell_size = 20;
var grid = [];
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 6; // Update ever 'mod' frames (Change this to speed/slow animation)
var g_stop = 0; // Go by default.

// Vars that keep track of current cell state.
var currRow = 1, currCol = 0;
var prevCell = {
  row: 0,
  col: 0
}

// Draw initial state of each sorting algorithm in their respective columns.
function setup() {
  // Grid with 3 columns of 10 cells wide 
  //      with 2 sets of 2 cells wide empty columns for spacers.
  // Total Cols: (3 * 12) + (2 * 2) = 40 columns
  // Total Rows: 50 rows

  createCanvas(1400, 1000);
  background('white');

  for (let row = 0; row < rows; row++) {
    grid[row] = new Array(72);
  }

  // Init quick sort in column 1 here (cols: 0-9).
  for (let dataIndex = 0; dataIndex < qs_state.data.length; dataIndex++) {
    grid[0][dataIndex] = qs_state.data[dataIndex];
  }

  // Init algo 2 in column 2 here (cols: 12-21).


  // Init algo 3 in column 3 here (cols: 24-33).


  // Need to draw entire grid during setup.
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (col == 22 || col == 23 || col == 46 || col == 47) continue; // Skip these cells.
      setup_DrawCell(row, col, grid[row][col]);
    }
  }
}

/**
 * Draw cell with the appropriate number as passed in number property.
 * @param {*} row 
 * @param {*} col 
 * @param {*} number The text to draw in the cell.
 */
function setup_DrawCell(row, col, number) {
  var x = col * cell_size;
  var y = row * cell_size;

  // Draw the white square.
  fill("white");
  stroke(0);
  rect(x, y, 20, 20);

  // Draw the number in the previous square.
  fill("black");
  if (number) {
    text(String(number), x + 2, y + 14);
  }
}

function draw()  // P5 Frame Re-draw Fcn, Called for Every Frame.
{
  ++g_frame_cnt;
  if (0 == g_frame_cnt % g_frame_mod) {
    //draw_Cella150(); (Project #1 Code)

    if (RaceManager() == true) {
      // End looping, (finshed sorting).
    }
  }
}

function RaceManager() {
  // Draw Next Step of Sort Algo #1
  if (draw_QuickSort(qs_state) == null) {
    // Finished sorting, end loop.
    qs_state.sorted = true;
  }

  // Draw Next Step of Sort Algo #2
  draw_PoreSort();

  // Draw Next Step of Sort Algo #3
  draw_Algo3();

  if (qs_state.sorted) {
    // Sorting is done.
    return true;
  }
}

// Quick Sort Algo code for every draw instance.
function draw_QuickSort(state) {
  // Write your code here.

  // Return null when finished.
}

// Sorting algorithm #2 code.
function draw_PoreSort() {
  // Write your code here.
  /* Use your own data: */ sort2_data;

}

// Sorting algorithm #3 code.
function draw_Algo3() {
  // Write your code here.
  /* Use your own data: */ sort3_data;

}



// -- OLD: Project #1 Code \/\/\/ Below for Reference --

function draw_Cella150() {
  // Check if current row is a valid row.
  if (currRow != rows) {
    // Check if current col is a valid col.
    if (currCol != cols) {
      // Remove highlight border from previous cell

      // Add highlight border to current cell (maybe just mark current cell)

      drawCell(currRow, currCol);
      currCol++;  // Move to the next col (to the right)
    } else {
      currRow++;    // Move to next row
      currCol = 0;  // Move to far left column
    }
  } else {
    // Done.
    console.log('Done!')
  }
  //if (!g_stop) draw_update();

  // Remove highlight border from previous cell (maybe)
}

function drawCell(row, col) {
  console.log(`Drawing cell at row: ${row} col: ${col}`)
  removeRedBorder(prevCell);

  grid[row][col] = cellaRules(row, col, grid);

  var x = col * cell_size;
  var y = row * cell_size;

  fill(getColor(grid[row][col]));
  stroke("red");
  rect(x, y, 20, 20);

  prevCell.row = row;
  prevCell.col = col;
}

function removeRedBorder(prevCell) {
  var x = prevCell.col * cell_size;
  var y = prevCell.row * cell_size;

  // -- Next 4 lines may not work -- //
  erase();
  rect(x, y, 20, 20);
  noErase();
  // -- This is supposed to remove the previous cell's rectangle and replace it with next 3 lines

  stroke(0);
  fill(getColor(grid[prevCell.row][prevCell.col]));
  rect(x, y, 20, 20);
}

function cellaRules(row, col, grid) {
  // Look at row above and three cells above current column.
  let rowAbove = grid[row - 1];

  // Get combination of cells (i.e. (black, white, black)/(white, white, black)/etc...).
  let leftCell, rightCell, midCell = rowAbove[col];

  // If the column is far left, set the upper left column to 0.
  if (col == 0) {
    leftCell = 0;
  }
  else {
    leftCell = rowAbove[col - 1];
  }

  // If the column is far right, set the upper right column to 0.
  if (col == cols - 1) {
    rightCell = 0;
  }
  else {
    rightCell = rowAbove[col + 1];
  }

  // Return appropriate color for current cell (i.e. w/switch statement).
  switch (true) {
    case (leftCell == 0 && midCell == 0 && rightCell == 0):
      return 0;
    case (leftCell == 0 && midCell == 0 && rightCell == 1):
      return 1;
    case (leftCell == 0 && midCell == 1 && rightCell == 0):
      return 1;
    case (leftCell == 0 && midCell == 1 && rightCell == 1):
      return 0;
    case (leftCell == 1 && midCell == 0 && rightCell == 0):
      return 1;
    case (leftCell == 1 && midCell == 0 && rightCell == 1):
      return 0;
    case (leftCell == 1 && midCell == 1 && rightCell == 0):
      return 0;
    case (leftCell == 1 && midCell == 1 && rightCell == 1):
      return 1;
    default:
      console.log('No Valid Combination')
  }
}

// This will get the color the cell should be (0 -> black, 1 -> white).
function getColor(isAlive) {
  if (isAlive == 1) {
    console.log('Black Momba!')
    return "black"
  } else {
    return "white"
  }
}
