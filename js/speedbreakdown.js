let speedbreakdown;

window.addEventListener("csvLoaded1", () => {
  const exact = parseInt(document.getElementById("csv1-c12").textContent) || 0;
  const adjacent = parseInt(document.getElementById("csv1-c13").textContent) || 0;
  const within = parseInt(document.getElementById("csv1-c14").textContent) || 0;
  const miss = parseInt(document.getElementById("csv1-c15").textContent) || 0;

  const ctx = document.getElementById("speedbreakdown").getContext("2d");
  const total = exact + adjacent + within + miss;

  if (speedbreakdown) speedbreakdown.destroy();

  speedbreakdown = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Exact", "Adjacent", "Within", "Miss"],
      datasets: [{
        data: [exact, adjacent, within, miss],
      backgroundColor: [
        'rgba(33, 150, 243, 1)',
        'rgba(76, 175, 80, 1)',
        'rgba(255, 152, 0, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderColor: 'white',
      borderWidth: 3,
      cutout: '50%'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: "black", font: { size: 14, family: "" } }
        },
        datalabels: {
          color: "#fff",
          font: { size: 12, weight: "bold" },
          textAlign: "center",
          formatter: function(value, context) {
            const percent = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return [
              percent + "%",
              value
            ];
          }
        }
      }
    },
    plugins: [ChartDataLabels]
  });
});