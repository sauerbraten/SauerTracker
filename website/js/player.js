import Chart from 'chart.js';
import NProgress from 'nprogress';
import moment from 'moment';

const $ = window.jQuery;

const chartDataMonth = {
  labels: [],
  datasets: [
    {
      label: 'Games/Day',
      backgroundColor: 'rgba(220,220,220,0.2)',
      borderColor: 'rgba(220,220,220,1)',
      pointColor: 'rgba(220,220,220,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(220,220,220,1)',
      data: [],
    },
  ],
};
const monthOptions = {
  scaleShowGridLines: false,
  bezierCurve: false,
  bezierCurveTension: 0.4,
  pointDot: true,
  pointDotRadius: 4,
  pointDotStrokeWidth: 1,
  pointHitDetectionRadius: 5,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: true,

  animationSteps: 60,
  scaleFontColor: '#aaa',
  responsive: true,
  maintainAspectRatio: true,
  scaleBeginAtZero: true,

  tooltipTemplate: '<%if (label){%><%=label%> : <%}%><%= value %> games',
};

function updateMonthChartData(activity) {
  chartDataMonth.datasets[0].data = [];
  chartDataMonth.labels = [];

  let lm = moment()
    .utc()
    .startOf('day')
    .subtract(15, 'days')
    .add(1, 'minute');
  let tsm = lm;
  _.each(activity, day => {
    tsm = moment(day.date).startOf('day'); // , 'YYYY-MM-DD HH:mm:ss'
    lm.add(1, 'days');
    while (lm.isBefore(tsm)) {
      chartDataMonth.labels.push(lm.format('ddd, DD/MM'));
      chartDataMonth.datasets[0].data.push(0);
      lm.add(1, 'days');
    }
    chartDataMonth.labels.push(tsm.format('ddd, DD/MM'));
    chartDataMonth.datasets[0].data.push(day.count);
  });

  lm = moment()
    .utc()
    .startOf('day')
    .add(2, 'minute');
  tsm.add(1, 'days');
  while (tsm.isBefore(lm)) {
    chartDataMonth.labels.push(tsm.format('ddd, DD/MM'));
    chartDataMonth.datasets[0].data.push(0);
    tsm.add(1, 'days');
  }

  const ctx = $('#player-activity-month')
    .get(0)
    .getContext('2d');
  const config = {
    type: 'line',
    data: chartDataMonth,
    options: monthOptions,
  };
  new Chart(ctx, config);
}

$.get(
  `/api/player/activity/${encodeURIComponent($('#player-name').text())}`,
  result => {
    updateMonthChartData(result.activity);
  }
);
