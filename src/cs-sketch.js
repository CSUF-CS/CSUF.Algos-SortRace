/** Quick Sort Init Data. */
var qs_state = {
  sorted: false,
  data: ['F', 'D', 8, 'A', 1, 5, 9, 3, 4, 7, 9, 5],
  StepList: [],
  CurrStep: 0,
}
/** Poresort Init Data. */
var ps_state = {
  sorted: false,
  data: ['F', 'D', 8, 'A', 1, 5, 9, 3, 4, 7, 9, 5],
}
/** <Sort Algo #3> Init Data. */
var ms_state = {
  sorted: false,
  data: ['F', 'D', 8, 'A', 1, 5, 9, 3, 4, 7, 9, 5],
  StepList: [],
  CurrStep: 0,
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
  for (let dataIndex = 0; dataIndex < ms_state.data.length; dataIndex++) {
    grid[0][dataIndex + 28] = ms_state.data[dataIndex];
  }

  // Need to draw entire grid during setup.
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (col == 12 || col == 13 || col == 26 || col == 27) continue; // Skip these cells.
      drawCell(row, col, grid[row][col]);
    }
  }

  // Recursive model:
  algo_QuickSort(0, qs_state.data.length - 1);

  algo_MergeSort(0, ms_state.data.length - 1);
  // End Recursive model.
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
    }else{
      console.log('-- Done sorting');
    }
  }
}

function RaceManager() {
  // Draw Next Step of Sort Algo #1 (Used for Iterative model of QS)
  // if (algo_QuickSort(qs_state) == null) {
  //   // Finished sorting, end loop.
  //   qs_state.sorted = true;
  // }
  // Recursive model:
  if (qs_state.CurrStep >= qs_state.StepList.length) {
    // Done.
    ps_state.sorted = true;
  }
  // End Recursive model.


  // Draw Next Step of Sort Algo #2
  if (algo_PoreSort(ps_state) == null) {
    // Finished sorting, end loop.
    ps_state.sorted = true;
  }

  // Draw Next Step of Sort Algo #3
  // if (algo_MergeSort(ms_state) == null) {
  //   // Finished sorting, end loop.
  //   ms_state.sorted = true;
  // }
  // Recursive model:
  if (ms_state.CurrStep >= ms_state.StepList.length) {
    // Done.
    ms_state.sorted = true;
  }
  // End.

  if (qs_state.sorted && ps_state.sorted && ms_state.sorted) {
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
  // Quick Sort (Iterative model)
  // if (!qs_state.sorted) {
  //   for (index = 0; index < qs_state.data.length; index++) {
  //     let col = index;
  //     grid[currRow][col] = qs_state.data[index];
  //     drawCell(currRow, col, grid[currRow][col]);
  //   }
  // }
  // Recursive model:
  if (qs_state.CurrStep < qs_state.StepList.length) {
    for (index = 0; index < qs_state.StepList[qs_state.CurrStep].length; index++) {
      let col = index;
      grid[currRow][col] = qs_state.StepList[qs_state.CurrStep][col];
      drawCell(currRow, col, grid[currRow][col]);
    }

    qs_state.CurrStep++;
  }
  // End Recursive model.


  // Poresort
  if (!ps_state.sorted) {
    for (index = 0; index < ps_state.data.length; index++) {
      let col = index + 14;
      grid[currRow][col] = ps_state.data[index];
      drawCell(currRow, col, grid[currRow][col]);
    }
  }

  // Merge Sort (Iterative model)
  // if (!ms_state.sorted) {
  //   for (index = 0; index < ms_state.data.length; index++) {
  //     let col = index + 28;
  //     grid[currRow][col] = ms_state.data[index];
  //     drawCell(currRow, col, grid[currRow][col]);
  //   }
  // }
  // Recursive model:
  if (ms_state.CurrStep < ms_state.StepList.length) {
    for (index = 0; index < ms_state.StepList[ms_state.CurrStep].length; index++) {
      let col = index + 28;
      grid[currRow][col] = ms_state.StepList[ms_state.CurrStep][col - 28];
      drawCell(currRow, col, grid[currRow][col]);
    }

    ms_state.CurrStep++;
  }
  // End.

  // Increment current row for next update.
  currRow++;
}

function RaceManager() {
  // Draw Next Step of Sort Algo #1 (Used for Iterative model of QS)
  // if (algo_QuickSort(qs_state) == null) {
  //   // Finished sorting, end loop.
  //   qs_state.sorted = true;
  // }
  // Recursive model:
  if (qs_state.CurrStep >= qs_state.StepList.length) {
    // Done.
    qs_state.sorted = true;
  }
  // End Recursive model.


  // Draw Next Step of Sort Algo #2
  if (algo_PoreSort(ps_state) == null) {
    // Finished sorting, end loop.
    ps_state.sorted = true;
  }

  // Draw Next Step of Sort Algo #3
  // if (algo_MergeSort(ms_state) == null) {
  //   // Finished sorting, end loop.
  //   ms_state.sorted = true;
  // }
  // Recursive model:
  if (ms_state.CurrStep >= ms_state.StepList.length) {
    // Done.
    ms_state.sorted = true;
  }
  // End.

  if (qs_state.sorted && ps_state.sorted && ms_state.sorted) {
    // Sorting is done.
    return { DoneSorting: true };
  } else {
    return { DoneSorting: false };
  }
}

// Quick Sort Algo code for every draw instance.
function algo_QuickSort(start, end) {
  if (start < end) {
    var pivPos = qs_Partition(start, end);

    // Recursive model:
    let update = [...qs_state.data];
    qs_state.StepList.push(update);
    // End Recursive model.

    algo_QuickSort(start, pivPos - 1); // Sort the left side of pivot
    algo_QuickSort(pivPos + 1, end); // Sort the right side of pivot
  }

}

/**
 * Quick Sort helper.
 * @param {*} start Start index
 * @param {*} end End index
 */
function qs_Partition(start, end) {
  // Select the pivot (first element)
  var newPivotIndex = start + 1;
  var pivot = qs_state.data[start];

  // Find the sorted index for pivot
  for (let currIndex = start + 1; currIndex <= end; currIndex++) {
    // If current index element is smaller than pivot
    if (String(qs_state.data[currIndex]) < String(pivot)) {
      // Swap elements
      swap(qs_state.data, newPivotIndex, currIndex);

      // Increment the new pivot index
      newPivotIndex++;
    }
  }

  // Put pivot in sorted place in array
  swap(qs_state.data, start, newPivotIndex - 1);

  // Return the new index of the pivot
  return newPivotIndex - 1;
}

/**
 * Will swap position of two elements in an array.
 * @param {*} arr Raw array used to swap values.
 * @param {*} firstIndex Index of first element to be swapped.
 * @param {*} secondIndex Index of second element to be swapped.
 */
function swap(arr, firstIndex, secondIndex) {
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

function algo_MergeSort(start, end) {
  if (start < end) {
    let mid = Math.floor((start + end) / 2)

    algo_MergeSort(start, mid);
    algo_MergeSort(mid + 1, end);

    merge(ms_state.data, start, mid, end);
  }
}

function merge(A, start, mid, end) {
  //stores the starting position of both parts in temporary variables.
  var p = start, q = mid + 1;

  var Arr = new Array(end - start + 1), k = 0;

  for (let i = start; i <= end; i++) {
    if (p > mid)      //checks if first part comes to an end or not .
      Arr[k++] = A[q++];

    else if (q > end)   //checks if second part comes to an end or not
      Arr[k++] = A[p++];

    else if (String(A[p]) < String(A[q]))     //checks which part has smaller element.
      Arr[k++] = A[p++];

    else
      Arr[k++] = A[q++];
  }
  for (let p = 0; p < k; p++) {
    /* Now the real array has elements in sorted manner including both 
         parts.*/
    ms_state.data[start++] = Arr[p];
  }

  var temp = [...ms_state.data];
  ms_state.StepList.push(temp);
}