
// Peter Kaufinger / 889113973
// Eric Du / 891357550
// Naoki Atkins / 890468754

// Description:
//
// Inside this file are 3 algorithms, namely, Quick Sort, Pore Sort, and Merge Sort
// Each of these algorithms has their own objects declared at the top of the program.
//
// Race Manager is a function that will call each algorithm's stepper function
// until the algorithm is finished sorting the array. Once the algorithm is finished,
// it will let the Race Manager know by sending a null value.
//
// Each step of the algorithm is displayed on a newline on the webpage.

/** Quick Sort Init Data. */
var qs_state = {
  sorted: false,
  data: ['F', 'D', 8, 'A', 1, 5, 9, 3, 4, 7, 9, 5],
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
  // Write your code here.
  if (currRow == 5) return null;
  return 1;

  // Return null when finished.
}

// Author: Naoki Atkins / 890468754
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

