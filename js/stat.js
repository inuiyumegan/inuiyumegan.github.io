let cellMap1 = {};
let csvLoaded1 = false;

async function loadCSV1() {
  try {
    const res = await fetch("/csv/dan est-stat.csv");
    const text = await res.text();
    const rows = text.split(/\r?\n/).filter(row => row.trim() !== "");

    cellMap1 = {};
    rows.forEach((row, rowIndex) => {
      const cells = row.split(",");
      cells.forEach((cell, colIndex) => {
        const colLetter = String.fromCharCode(65 + colIndex);
        const cellId = `${colLetter}${rowIndex + 1}`;
        cellMap1[cellId] = cell.trim();
      });
    });

    csvLoaded1 = true;
    window.dispatchEvent(new CustomEvent("csvLoaded1"));
  } catch (err) {
    console.error("csv load failed QWQ：", err);
  }
}

function getCell1(cellId) {
  if (!csvLoaded1) return "";
  return cellMap1[cellId] || "";
}

document.addEventListener("DOMContentLoaded", () => {
  loadCSV1();
});

window.getCell1 = getCell1;
window.loadCSV1 = loadCSV1;