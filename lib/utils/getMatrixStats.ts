export const getMatrixStatsWithLabels = (
  matrix: number[][],
  labels: string[]
) => {
  console.log("🚀 ~ getMatrixStatsWithLabels ~ matrix:", matrix);
  if (!matrix.length || matrix[0].length !== labels.length) {
    throw new Error("Label length must match number of matrix columns!");
  }

  let highest = -Infinity;
  let lowest = Infinity;

  let highestPos = { row: -1, col: -1 };
  let lowestPos = { row: -1, col: -1 };

  const validValues: number[] = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const value = matrix[i][j];

      if (value >= 100) {
        validValues.push(value);

        if (value > highest) {
          highest = value;
          highestPos = { row: i, col: j };
        }

        if (value < lowest) {
          lowest = value;
          lowestPos = { row: i, col: j };
        }
      }
    }
  }

  const rawAverage =
    validValues.reduce((acc, curr) => acc + curr, 0) / validValues.length;

  const average = parseFloat(rawAverage.toFixed(1));

  return {
    highestValue: highest,
    highestLabel: labels[highestPos.col],
    highestRow: highestPos.row,
    lowestValue: lowest,
    lowestLabel: labels[lowestPos.col],
    lowestRow: lowestPos.row,
    averageValue: average,
  };
};
// export function normalizeData(
//   matrix: any,
//   level: any,
//   type = "top",
//   count = 3
// ) {
//   console.log("🚀 ~ normalizeData ~ matrix:", matrix);
//   const labels = {
//     month: Array.from({ length: 12 }, (_, i) => "M" + (i + 1)),
//     quarter: ["q1", "q2", "q3", "q4"],
//     year: ["y1", "y2", "y3"],
//   }[level];

//   const colLabels = labels; // same size for square matrix
//   const rowLabels = labels;

//   const result = [];

//   for (let col = 0; col < matrix.length; col++) {
//     // extract the entire column for comparison
//     let values = matrix.map((row, rowIndex) => ({
//       rowLabel: rowLabels?.[rowIndex] ?? `Row-${rowIndex + 1}`,
//       colLabel: colLabels?.[col] ?? `Col-${col + 1}`,
//       value: row?.[col],
//     }));

//     // sort column by top/bottom
//     values.sort((a, b) =>
//       type === "top" ? b.value - a.value : a.value - b.value
//     );

//     // pick N results
//     const selected = values.slice(0, count);

//     // build formatted result rows
//     selected.forEach((item, i) => {
//       if (!result[i]) result[i] = { [level]: item.rowLabel };
//       result[i][item.colLabel] = item.value;
//     });
//   }

//   return result;
// }
// export function getTop3ByColumn(matrix, rowNames, colNames) {
//   const result = [];

//   for (let col = 0; col < colNames.length; col++) {
//     // NOTE: matrix[x][y] => x=row, y=column
//     let values = matrix.map((row, rowIndex) => ({
//       month: rowNames[rowIndex], // Jan, Feb, Mar...
//       value: row[col], // matrix[row][column]
//     }));

//     // filter zero values (optional)
//     values = values.filter((v) => v.value !== 0);

//     // sort DESC (highest first)
//     const top3 = values.sort((a, b) => b.value - a.value).slice(0, 3);

//     // convert into desired object
//     const obj = { month: colNames[col] }; // M1, M2, M3...

//     top3.forEach((item) => {
//       obj[item.month] = item.value;
//     });

//     result.push(obj);
//   }

//   return result;
// }
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export function processMatrix(matrix:any, type:any, mode:any, n:any) {
  console.log("🚀 ~ processMatrix ~ n:", n);
  console.log("🚀 ~ processMatrix ~ mode:", mode);
  console.log("🚀 ~ processMatrix ~ type:", type);
  console.log("🚀 ~ processMatrix ~ matrix:", matrix);
  // Auto-set n based on type: 1 for year/quarter, 3 for month
  // if (n === undefined) {
  //   n = type === "month" ? 3 : 1;
  // }
  // const rows = matrix.length;
  // const cols = matrix[0].length;
  // const result = [];

  // // Get labels based on type
  // const getLabel = (idx) => {
  //   if (type === "month") return monthNames[idx];
  //   if (type === "quarter") return `Q${idx + 1}`;
  //   if (type === "year") return `Y${idx + 1}`;
  // };

  // const getKey = (idx) => {
  //   if (type === "month") return `M${idx + 1}`;
  //   if (type === "quarter") return `quarter`;
  //   if (type === "year") return `year`;
  // };

  // // Process each column
  // for (let col = 0; col < cols; col++) {
  //   // Get values where col > row (values to the RIGHT of 100 in each row)
  //   const colValues = [];
  //   for (let row = 0; row < col; row++) {
  //     colValues.push({ value: matrix[row][col], rowIdx: row });
  //   }

  //   // Skip if no values
  //   if (colValues.length === 0) continue;

  //   // Filter out zero values for bottom mode
  //   let filteredValues = colValues;
  //   if (mode === "bottom") {
  //     filteredValues = filteredValues.filter((item) => item.value !== 0);
  //   }

  //   // Skip if no values after filtering
  //   if (filteredValues.length === 0) continue;

  //   // Sort based on mode
  //   if (mode === "top") {
  //     filteredValues.sort((a, b) => b.value - a.value);
  //   } else {
  //     filteredValues.sort((a, b) => a.value - b.value);
  //   }

  //   // Take top/bottom N
  //   const selected = filteredValues.slice(0, n);

  //   // Build result object
  //   const obj = {};
  //   if (type === "month") {
  //     obj.month = `M${col + 1}`;
  //   } else if (type === "quarter") {
  //     obj.quarter = `Q${col + 1}`;
  //   } else {
  //     obj.year = `Y${col + 1}`;
  //   }

  //   // Add each selected value with its row label as key
  //   selected.forEach((item) => {
  //     const label = getLabel(item.rowIdx);
  //     obj[label] = item.value;
  //   });

  //   // Only push if there are values besides the key (month/quarter/year)
  //   if (Object.keys(obj).length > 1) {
  //     result.push(obj);
  //   }
  // }

  // return result;
  if (n === undefined) {
    n = type === "month" ? 3 : 1;
  }
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  // Get labels based on type
  const getLabel = (idx:any) => {
    if (type === "month") return monthNames[idx];
    if (type === "quarter") return `Q${idx + 1}`;
    if (type === "year") return `Y${idx + 1}`;
  };

  const getKey = (idx:any) => {
    if (type === "month") return `M${idx + 1}`;
    if (type === "quarter") return `quarter`;
    if (type === "year") return `year`;
  };

  // Process each column
  for (let col = 0; col < cols; col++) {
    // Get values where col >= row for 'all' mode (include diagonal 100)
    // Get values where col > row for top/bottom (exclude diagonal 100)
    const colValues = [];
    const endRow = mode === "all" ? col + 1 : col;
    for (let row = 0; row < endRow; row++) {
      colValues.push({ value: matrix[row][col], rowIdx: row });
    }

    // Skip if no values
    if (colValues.length === 0) continue;

    // Filter out zero values for bottom mode
    let filteredValues = colValues;
    if (mode === "bottom") {
      filteredValues = filteredValues.filter((item) => item.value !== 0);
    }

    // Skip if no values after filtering
    if (filteredValues.length === 0) continue;

    // Sort based on mode (skip sorting for 'all')
    if (mode === "top") {
      filteredValues.sort((a, b) => b.value - a.value);
    } else if (mode === "bottom") {
      filteredValues.sort((a, b) => a.value - b.value);
    }

    // Take top/bottom N or all values
    const selected =
      mode === "all" ? filteredValues : filteredValues.slice(0, n);

    // Build result object
    const obj =<any> {};
    if (type === "month") {
      obj.month = `M${col + 1}`;
    } else if (type === "quarter") {
      obj.quarter = `Q${col + 1}`;
    } else {
      obj.year = `Y${col + 1}`;
    }

    // Add each selected value with its row label as key
    selected.forEach((item) => {
      const label = getLabel(item.rowIdx);
      if (label !== undefined) {
        obj[label] = item?.value;
      }
    });

    if (Object.keys(obj).length > 1) {
      result.push(obj);
    }
  }

  return result;
}
