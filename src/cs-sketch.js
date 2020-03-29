/** Quick Sort Init Data. */
var qs_state = {
  sorted: false,
  data: ['F', 'D', 8, 'A', 1, 5, 9, 3, 4, 7, 9, 5],
  start: 0,
  end: 1,
  swapedPivot: false,
}
/** <Sort Algo #2> Init Data. */
var ps_state = {
  sorted: false,
  data: ['F', 'D', 8, 'A', 1, 5, 9, 3, 4, 7, 9, 5],
}
/** <Sort Algo #3> Init Data. */
var a3_state = {
  sorted: false,
  data: ['F', 'D', 8, 'A', 1, 5, 9, 3, 4, 7, 9, 5]
}

// General vars.
var rows = 40;
var cols = 40;
var cell_size = 20;
var grid = [];
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 20; // Update ever 'mod' frames (Change this to speed/slow animation)
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

  createCanvas(800, 800);
  background('white');

  for (let row = 0; row < rows; row++) {
    grid[row] = new Array(72);
  }

  // Init quick sort in column 1 here (cols: 0-11).
  for (let dataIndex = 0; dataIndex < qs_state.data.length; dataIndex++) {
    grid[0][dataIndex] = qs_state.data[dataIndex];
  }

  // Init algo 2 in column 2 here (cols: 14-25).
  for (let dataIndex = 0; dataIndex < ps_state.data.length; dataIndex++) {
    grid[0][dataIndex + 14] = ps_state.data[dataIndex];
  }

  // Init algo 3 in column 3 here (cols: 28-39).
  for (let dataIndex = 0; dataIndex < a3_state.data.length; dataIndex++) {
    grid[0][dataIndex + 28] = a3_state.data[dataIndex];
  }

  // Need to draw entire grid during setup.
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (col == 12 || col == 13 || col == 26 || col == 27) continue; // Skip these cells.
      drawCell(row, col, grid[row][col]);
    }
  }
}

/**
 * Draw cell with the appropriate data as passed in data property.
 * @param {*} row 
 * @param {*} col 
 * @param {*} data The text to draw in the cell.
 */
function drawCell(row, col, data) {
  var x = col * cell_size;
  var y = row * cell_size;

  // Draw the white square.
  fill("white");
  stroke(0);
  rect(x, y, 20, 20);

  // Draw the data in the previous square.
  fill("black");
  if (data) {
    text(String(data), x + 2, y + 14);
  }
}

function draw()  // P5 Frame Re-draw Fcn, Called for Every Frame.
{
  ++g_frame_cnt;
  if (0 == g_frame_cnt % g_frame_mod) {
    if (RaceManager().DoneSorting == false && currRow < rows) {
      // Keep looping (not done sorting).
      console.log('-- Keep looping');

      // Draw updated state to webpage.
      draw_UpdateData();
    }
  }
}

function RaceManager() {
  // Draw Next Step of Sort Algo #1
  if (algo_QuickSort(qs_state) == null) {
    // Finished sorting, end loop.
    qs_state.sorted = true;
  }

  // Draw Next Step of Sort Algo #2
  if (algo_PoreSort(ps_state) == null) {
    // Finished sorting, end loop.
    ps_state.sorted = true;
  }

  // Draw Next Step of Sort Algo #3
  if (algo_Algo3(a3_state) == null) {
    // Finished sorting, end loop.
    a3_state.sorted = true;
  }

  if (qs_state.sorted && ps_state.sorted && a3_state.sorted) {
    // Sorting is done.
    return { DoneSorting: true };
  } else {
    return { DoneSorting: false };
  }
}

/**
 * Will draw the updated data for the 3 algos to the screen.
 */
function draw_UpdateData() {
  // Quick Sort
  if (!qs_state.sorted) {
    for (index = 0; index < qs_state.data.length; index++) {
      let col = index;
      grid[currRow][col] = qs_state.data[index];
      drawCell(currRow, col, grid[currRow][col]);
    }
  }

  // Poresort
  if (!ps_state.sorted) {
    for (index = 0; index < ps_state.data.length; index++) {
      let col = index + 14;
      grid[currRow][col] = ps_state.data[index];
      drawCell(currRow, col, grid[currRow][col]);
    }
  }

  // Merge Sort
  if (!a3_state.sorted) {
    for (index = 0; index < a3_state.data.length; index++) {
      let col = index + 28;
      grid[currRow][col] = a3_state.data[index];
      drawCell(currRow, col, grid[currRow][col]);
    }
  }


  // Increment current row for next update.
  currRow++;
}

// Quick Sort Algo code for every draw instance.
function algo_QuickSort(state) {
  // simple:

  if(start < end){
    var piv_pos = qs_Partition(qs_state.data)
  }else{
    if(!qs_state.leftDone){
      // Update start/end for left recusion
    }else if(!qs_state.rightDone){
      // Update start/end for right recusion
    }
  }

  // simple end.



  // Get new pivot index.

  // Dirty bit (called swap)
  //  if false => change 
  
  if(qs_state.start < qs_state.end){
    var piv_pos = qs_Partition

    // After first pass (update end).
    qs_state.end = piv_pos - 1;
    if(!qs_state.finishedLeftSide){
      var piv_pos = qs_Partition(state.data);

    }

    // After 
  }

  var piv_pos = qs_Partition(state.data, state.start, state.end);
  qs_state.start = qs_state.start 

  if(qs_state.doneLeftSide){
    qs_state.start = piv_pos + 1;
    q
  }


  // Write your code here.
  if(start < end){
    // Keep sorting (not done yet)

  }else{
    // Done. Array is sorted.
    return null;
  }
}

function qs_Partition(rawArr){
  // Select the pivot (first element)
  var pivot = rawArr[0];
  var newPivotIndex = start + 1;

  // Find the sorted index for pivot
  for(let currIndex = start + 1; currIndex < rawArr.length; currIndex++){
    // If current index element is smaller than pivot
    if(String(rawArr[currIndex]) < String(pivot)){
      // Swap elements
      swap(rawArr, 0, currIndex);
      
      // Increment the new pivot index
      newPivotIndex++;
    }
  }

  // Put pivot in sorted place in array
  swap(raw, start, newPivotIndex - 1);
  qs_state.swapedPivot = true;

  // Return the new index of the pivot
  return newPivotIndex - 1;
}

/**
 * Will swap position of two elements in an array.
 * @param {*} arr Raw array used to swap values.
 * @param {*} firstIndex Index of first element to be swapped.
 * @param {*} secondIndex Index of second element to be swapped.
 */
function swap(arr, firstIndex, secondIndex){
  let temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}

// Sorting algorithm #2 code.
function algo_PoreSort(state) {
  // Write your code here.
  /* Use your own state: */ //state;

  let swap = false;

  // compare even indexes to their neighbors
  for (let i = 0; i < state.data.length; i += 2) {
    if (String(state.data[i]) > String(state.data[i + 1])) {
      let temp = state.data[i + 1];
      state.data[i + 1] = state.data[i];
      state.data[i] = temp;
      swap = true;
    }
  }

  // compare odd indexes to their neighbors
  for (let i = 1; i < state.data.length - 1; i += 2) {
    if (String(state.data[i]) > String(state.data[i + 1])) {
      let temp = state.data[i + 1];
      state.data[i + 1] = state.data[i];
      state.data[i] = temp;
      swap = true;
    }
  }

  // if no swapping took place, return null to notify raceMgr that the array is sorted
  if (swap == false) {
    return null;
  } else {
    return 1;
  }
}

// Sorting algorithm #3 code.
function algo_Algo3(state) {
  // Write your code here.
  /* Use your own state: */ state;
  return 1;

  // Return null when finished.
}



// -- OLD: Project #1 Code \/\/\/ Below for Reference --

// function draw_Cella150() {
//   // Check if current row is a valid row.
//   if (currRow != rows) {
//     // Check if current col is a valid col.
//     if (currCol != cols) {
//       // Remove highlight border from previous cell

//       // Add highlight border to current cell (maybe just mark current cell)

//       drawCell(currRow, currCol);
//       currCol++;  // Move to the next col (to the right)
//     } else {
//       currRow++;    // Move to next row
//       currCol = 0;  // Move to far left column
//     }
//   } else {
//     // Done.
//     console.log('Done!')
//   }
//   //if (!g_stop) draw_update();

//   // Remove highlight border from previous cell (maybe)
// }

// function drawCell(row, col) {
//   console.log(`Drawing cell at row: ${row} col: ${col}`)
//   removeRedBorder(prevCell);

//   grid[row][col] = cellaRules(row, col, grid);

//   var x = col * cell_size;
//   var y = row * cell_size;

//   fill(getColor(grid[row][col]));
//   stroke("red");
//   rect(x, y, 20, 20);

//   prevCell.row = row;
//   prevCell.col = col;
// }

// function removeRedBorder(prevCell) {
//   var x = prevCell.col * cell_size;
//   var y = prevCell.row * cell_size;

//   // -- Next 4 lines may not work -- //
//   erase();
//   rect(x, y, 20, 20);
//   noErase();
//   // -- This is supposed to remove the previous cell's rectangle and replace it with next 3 lines

//   stroke(0);
//   fill(getColor(grid[prevCell.row][prevCell.col]));
//   rect(x, y, 20, 20);
// }

// function cellaRules(row, col, grid) {
//   // Look at row above and three cells above current column.
//   let rowAbove = grid[row - 1];

//   // Get combination of cells (i.e. (black, white, black)/(white, white, black)/etc...).
//   let leftCell, rightCell, midCell = rowAbove[col];

//   // If the column is far left, set the upper left column to 0.
//   if (col == 0) {
//     leftCell = 0;
//   }
//   else {
//     leftCell = rowAbove[col - 1];
//   }

//   // If the column is far right, set the upper right column to 0.
//   if (col == cols - 1) {
//     rightCell = 0;
//   }
//   else {
//     rightCell = rowAbove[col + 1];
//   }

//   // Return appropriate color for current cell (i.e. w/switch statement).
//   switch (true) {
//     case (leftCell == 0 && midCell == 0 && rightCell == 0):
//       return 0;
//     case (leftCell == 0 && midCell == 0 && rightCell == 1):
//       return 1;
//     case (leftCell == 0 && midCell == 1 && rightCell == 0):
//       return 1;
//     case (leftCell == 0 && midCell == 1 && rightCell == 1):
//       return 0;
//     case (leftCell == 1 && midCell == 0 && rightCell == 0):
//       return 1;
//     case (leftCell == 1 && midCell == 0 && rightCell == 1):
//       return 0;
//     case (leftCell == 1 && midCell == 1 && rightCell == 0):
//       return 0;
//     case (leftCell == 1 && midCell == 1 && rightCell == 1):
//       return 1;
//     default:
//       console.log('No Valid Combination')
//   }
// }

// // This will get the color the cell should be (0 -> black, 1 -> white).
// function getColor(isAlive) {
//   if (isAlive == 1) {
//     console.log('Black Momba!')
//     return "black"
//   } else {
//     return "white"
//   }
// }
