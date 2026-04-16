let cellMap2 = {};
let csvLoaded2 = false;

async function loadCSV2() {
  try {
    const res = await fetch("/csv/dan est-stat2.csv");
    const text = await res.text();
    const rows = text.split(/\r?\n/).filter(row => row.trim() !== "");

    cellMap2 = {};
    rows.forEach((row, rowIndex) => {
      const cells = row.split(",");
      cells.forEach((cell, colIndex) => {
        const colLetter = String.fromCharCode(65 + colIndex);
        const cellId = `${colLetter}${rowIndex + 1}`;
        const trimmedCell = cell.trim();
        
        const num = parseFloat(trimmedCell);
        let processedCell = trimmedCell;
        if (!isNaN(num)) {
          processedCell = num.toFixed(3);
        }
        
        cellMap2[cellId] = processedCell;
      });
    });

    csvLoaded2 = true;
    window.dispatchEvent(new CustomEvent("csvLoaded2"));
  } catch (err) {
    console.error("csv load failed QWQ", err);
  }
}

function getCell2(cellId) {
  if (!csvLoaded2) return "";
  return cellMap2[cellId] || "";
}

loadCSV2();

window.getCell2 = getCell2;
window.loadCSV2 = loadCSV2;