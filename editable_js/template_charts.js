/**
 * CHARTS VIEW - STUDENTS IMPLEMENT
 * Show patterns in your data as charts, using Chart.js
 *
 * This view has two parts:
 *   showCharts(data) returns the HTML: one <canvas> per chart, with a text alternative under each
 *   drawCharts(data) runs after that HTML is on the page, and draws a chart into each <canvas>
 *
 * Chart.js docs: https://www.chartjs.org/docs/latest/getting-started/
 */

const CHECKS = [
  'food_from_approved_source', 'food_protected_from', 'ill_workers_restricted',
  'proper_hand_washing', 'cooling_time_and_temperature', 'cold_holding_temperature',
  'hot_holding_temperature', 'cooking_time_and_temperature', 'reheating_time_and_temperature',
  'hot_and_cold_running_water', 'proper_sewage_disposal', 'no_bare_hand_contact',
  'adequate_hand_washing', 'rodent_and_insects', 'food_contact_surfaces_and',
];

// got this from card view
function orNotListed(value) {
  return value === '------' || value === 'N/A' || value === undefined ? 'Not listed' : value;
}

function showCharts(data) {
  // TODO: Replace each TODO sentence below with text that says what that chart shows.
  // Charts are drawn as pictures, so screen readers can't read them.
  /*html*/
  return `
                <h2 class="view-title">📈 Charts View</h2>
                <p class="view-description">Patterns in the data at a glance</p>
                <div class="charts-grid">
                    <figure class="chart-figure">
                        <canvas id="chart-one"></canvas>
                        <figcaption class="chart-summary">
                            Rodents and insects was the most often failed check: 20 of 150 inspections,
                            followed by hot holding temperature and food contact surfaces (14 each).
                        </figcaption>
                    </figure>
                    <figure class="chart-figure">
                        <canvas id="chart-two"></canvas>
                        <figcaption class="chart-summary">
                            The most common result was "Non-Compliant - Violations Observed" (42 of 150 inspections),
                            and 40 inspections had no result listed.
                        </figcaption>
                    </figure>
                </div>
            `;
}

function drawCharts(data) {
  // Chart.js is loaded by a <script> tag in index.html. If it didn't load, say so instead of breaking.
  if (typeof Chart === 'undefined') {
    document.querySelector('.charts-grid').innerHTML =
      '<p class="error">Chart.js did not load, so the charts can\'t be drawn. Check the &lt;script&gt; tag in index.html.</p>';
    return;
  }

  // TODO 1: Reshape your data for the first chart.
  // Chart.js doesn't take your array of records.
  // It wants a list of labels and a matching list of numbers.
  // Example: count inspections by type of business.

  const checkCounts = {};
  CHECKS.forEach((check) => {
    const label = check.replaceAll('_', ' ');
    checkCounts[label] = data.filter((inspection) => inspection[check] === 'Out of Compliance').length;
  });
  const checkLabels = Object.keys(checkCounts);
  const checkNumbers = Object.values(checkCounts);

  // TODO 2: Draw the first chart into <canvas id="chart-one">.
  // Every chart needs a title, and every axis needs a label.

  new Chart(document.querySelector('#chart-one'), {
    type: 'bar',
    data: {
      labels: checkLabels,
      datasets: [{ label: 'Inspections that failed this check', data: checkNumbers }]
    },
    options: {
      indexAxis: 'y',
      aspectRatio: 1,
      plugins: { title: { display: true, text: 'Which safety checks fail most often?' } },
      scales: {
        x: { title: { display: true, text: 'Number of inspections' }, beginAtZero: true },
        y: { title: { display: true, text: 'Safety check' } }
      }
    }
  });

  // TODO 3: Reshape your data again, and draw a second chart of a DIFFERENT type
  // (pie, line, scatter...) into <canvas id="chart-two">, answering a different question.
  // Ideas: inspection results as a pie, inspections per month as a line,
  // or how many "Out of Compliance" checks each type of business averages.

  const resultCounts = {};
  data.forEach((inspection) => {
    const result = orNotListed(inspection.inspection_results);
    resultCounts[result] = (resultCounts[result] || 0) + 1;
  });
  const resultLabels = Object.keys(resultCounts);
  const resultNumbers = Object.values(resultCounts);

  // chart 2 as a pie chart
  new Chart(document.querySelector('#chart-two'), {
    type: 'pie',
    data: {
      labels: resultLabels,
      datasets: [{ label: 'Inspections', data: resultNumbers }]
    },
    options: {
      plugins: { title: { display: true, text: 'What were the inspection results?' } }
      //pie chart doesnt have axes labels
    }
  });
}


export { showCharts, drawCharts };
