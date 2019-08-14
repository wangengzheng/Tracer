'use strict';
var trig = function (trigger, value) {
    var newTr = logTable.insertRow(-1);
    var newTd0 = newTr.insertCell();
    var newTd1 = newTr.insertCell();
    var newTd2 = newTr.insertCell();
    newTd0.innerText = new Date();
    newTd1.innerText = trigger;
    newTd2.innerText = value;
};


var ctx = document.getElementById('httpChart').getContext('2d');
var downloadChartCtx = document.getElementById('downloadChart').getContext('2d');
var uploadChartCtx = document.getElementById("uploadChart").getContext('2d');
var wsChartCtx = document.getElementById('wsChart').getContext('2d');

var chartData = {
    labels: [],
    datasets: [{
        label: "HTTP 简单请求",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
        data: []
    }]
};

var downloadchartData = {
    labels: [],
    datasets: [{
        label: "下载速度",
        backgroundColor: 'rgb(70, 170, 252)',
        borderColor: 'rgb(70, 170, 252)',
        fill: true,
        data: []
    }]
};

var uploadchartData = {
    labels: [],
    datasets: [{
        label: "上传速度",
        backgroundColor: 'rgb(70, 170, 252)',
        borderColor: 'rgb(70, 170, 252)',
        fill: true,
        data: []
    }]
};


var wschartData = {
    labels: [],
    datasets: [{
        label: "WebSocket 连接速度",
        backgroundColor: 'rgb(2, 232, 99)',
        borderColor: 'rgb(2, 232, 99)',
        fill: false,
        data: []
    }]
};

var chartOption = {
    responsive: true,
    tooltips: {
        mode: 'index',
        intersect: false
    },
    hover: {
        mode: 'nearest',
        intersect: true
    },
    scales: {
        xAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Time'
            }
        }],
        yAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Value'
            }
        }]
    }
};

window.myLine = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: chartOption
});

window.myDownloadLine = new Chart(downloadChartCtx, {
    type: 'line',
    data: downloadchartData,
    options: chartOption
});


window.myUploadLine = new Chart(uploadChartCtx, {
    type: 'line',
    data: uploadchartData,
    options: chartOption
});

window.myWSLine = new Chart(wsChartCtx, {
    type: 'line',
    data: wschartData,
    options: chartOption
});

var startAll = function () {
    $('#startAllButton').attr('disabled', 'disabled');
    WsTest();
    ping();
    download();
    upload();
};

var stopAll = function () {
    $('#startAllButton').removeAttr('disabled', 'disabled');
    stopPing();
    stopDownload();
    stopUpload();
    stopWsTest();
};

var restLag = function () {

    chartData.datasets[0].data = [];
    chartData.labels = [];
    myLine.update();

    downloadchartData.datasets[0].data = [];
    downloadchartData.labels = [];
    myDownloadLine.update();

    uploadchartData.datasets[0].data = [];
    uploadchartData.labels = [];
    myUploadLine.update();
        
    wschartData.datasets[0].data = [];
    wschartData.labels = [];
    myWSLine.update();    
};