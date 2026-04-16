fetch('/csv/dan est-stamina.csv')
.then(response => {
    if (!response.ok) throw new Error('fetch csv faild QWQ');
    return response.text();
})
.then(csvText => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    const dataArray = [];

    for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',').map(item => item.trim());
    if (
        !row[0] ||          
        row.length < 5 ||    
        !row[1] || !row[2]    
    ) {
        continue;
    }

    dataArray.push({
        song: row[0],
        targetdiff: Number(row[1]),
        estdiff: Number(row[2]),
        diffdelta: Number(row[3]),
        absdiffdelta: Number(row[4])
    });
    }

    dataArray.sort((a, b) => a.targetdiff - b.targetdiff);

    const staminasongs = dataArray.map(item => item.song);
    const staminatargetdiff = dataArray.map(item => item.targetdiff);
    const staminaestdiff = dataArray.map(item => item.estdiff);
    const staminadiffdelta = dataArray.map(item => item.diffdelta);
    const staminaabsdiffdelta = dataArray.map(item => item.absdiffdelta);

    const ctx = document.getElementById('staminaestdiff').getContext('2d');
    new Chart(ctx, {
    type: 'scatter',
    data: {
        labels: staminasongs,
        datasets: [
        {
            label: 'stamina Target Diff',
            data: staminatargetdiff.map((y, index) => ({ x: index, y })), 
            backgroundColor: 'rgba(33, 150, 243, 0.8)',
            borderColor: 'rgba(33, 150, 243, 1)',
            borderWidth: 1,
            pointRadius: 4,  
            pointHoverRadius: 2,
            showLine: false
        },
        {
            label: 'stamina Est Diff',
            data: staminaestdiff.map((y, index) => ({ x: index, y })),
            backgroundColor: 'rgba(76, 175, 80, 0.8)',
            borderColor: 'rgba(76, 175, 80, 1)',
            borderWidth: 1,
            pointRadius: 4,
            pointHoverRadius: 2,
            showLine: false
        },
        {
            label: 'stamina Diff Delta',
            data: staminadiffdelta.map((y, index) => ({ x: index, y })),
            backgroundColor: 'rgba(255, 152, 0, 0.8)',
            borderColor: 'rgba(255, 152, 0, 1)',
            borderWidth: 1,
            pointRadius: 4,
            pointHoverRadius: 2,
            showLine: false
        },
        {
            label: 'stamina Abs Diff Delta',
            data: staminaabsdiffdelta.map((y, index) => ({ x: index, y })),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            pointRadius: 4,
            pointHoverRadius: 2,
            showLine: false
        }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: {
            position: 'top',
            labels: { font: { size: 10 } }
        },
        tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: 10,
            callbacks: {
            title: function(context) {
                return staminasongs[context[0].dataIndex];
            },
            label: function(context) {
                const value = context.parsed.y.toFixed(1);
                return `${context.dataset.label}: ${value}`;
            }
            }
        }
        },
        scales: {
        x: {
            type: 'linear',
            title: {
            display: true,
            text: '',
            font: { size: 10, weight: 'bold' }
            },
            ticks: {
            callback: function(index) {
                return staminatargetdiff[index];
            },
            rotation: 45,
            maxRotation: 45
            }
        },
        y: {
            title: {
            display: true,
            text: 'Est Diff',
            font: { size: 10, weight: 'bold' }
            },
            beginAtZero: false,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: {
            callback: function(value) {
                return value.toFixed(2);
            }
            }
        }
        }
    }
    });
})
.catch(error => {
    console.error('failed：', error);
    document.body.innerHTML += `<div style="text-align:center;color:red;margin-top:20px;">chart failed：${error.message}</div>`;
});