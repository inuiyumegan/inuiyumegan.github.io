fetch('/csv/dan est-jack.csv')
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

    const jacksongs = dataArray.map(item => item.song);
    const jacktargetdiff = dataArray.map(item => item.targetdiff);
    const jackestdiff = dataArray.map(item => item.estdiff);
    const jackdiffdelta = dataArray.map(item => item.diffdelta);
    const jackabsdiffdelta = dataArray.map(item => item.absdiffdelta);

    const ctx = document.getElementById('jackestdiff').getContext('2d');
    new Chart(ctx, {
    type: 'scatter',
    data: {
        labels: jacksongs,
        datasets: [
        {
            label: 'jack Target Diff',
            data: jacktargetdiff.map((y, index) => ({ x: index, y })), 
            backgroundColor: 'rgba(33, 150, 243, 0.8)',
            borderColor: 'rgba(33, 150, 243, 1)',
            borderWidth: 1,
            pointRadius: 4,  
            pointHoverRadius: 2,
            showLine: false
        },
        {
            label: 'jack Est Diff',
            data: jackestdiff.map((y, index) => ({ x: index, y })),
            backgroundColor: 'rgba(76, 175, 80, 0.8)',
            borderColor: 'rgba(76, 175, 80, 1)',
            borderWidth: 1,
            pointRadius: 4,
            pointHoverRadius: 2,
            showLine: false
        },
        {
            label: 'jack Diff Delta',
            data: jackdiffdelta.map((y, index) => ({ x: index, y })),
            backgroundColor: 'rgba(255, 152, 0, 0.8)',
            borderColor: 'rgba(255, 152, 0, 1)',
            borderWidth: 1,
            pointRadius: 4,
            pointHoverRadius: 2,
            showLine: false
        },
        {
            label: 'jack Abs Diff Delta',
            data: jackabsdiffdelta.map((y, index) => ({ x: index, y })),
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
                return jacksongs[context[0].dataIndex];
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
                return jacktargetdiff[index];
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