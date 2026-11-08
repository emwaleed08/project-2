
/**
 * TABLE VIEW - STUDENTS IMPLEMENT
 * Display data in sortable rows - good for scanning specific information
 */

const CHECKS = [
  'food_from_approved_source', 'food_protected_from', 'ill_workers_restricted',
  'proper_hand_washing', 'cooling_time_and_temperature', 'cold_holding_temperature',
  'hot_holding_temperature', 'cooking_time_and_temperature', 'reheating_time_and_temperature',
  'hot_and_cold_running_water', 'proper_sewage_disposal', 'no_bare_hand_contact',
  'adequate_hand_washing', 'rodent_and_insects', 'food_contact_surfaces_and',
];
// Turns "2026-05-17T00:00:00.000" into "May 17, 2026"
function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// got this from card view
function orNotListed(value) {
  return value === '------' || value === 'N/A' || value === undefined ? 'Not listed' : value;
}

function countViolations(inspection) {
  return CHECKS.filter((key) => inspection[key] === 'Out of Compliance').length;
}

function showTable(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Use a real HTML <table>, with <th> header cells and a <caption> saying what the table shows
  // - Include the 4-6 most useful fields
  // - Show "Not listed" instead of undefined when a value is missing
  // - Optional: add sorting

    const sorted = [...data].sort((a, b) => countViolations(b) - countViolations(a));

    const rowsHTML = sorted
    .map(
      /*html*/
      (inspection) => `
                <tr>
                    <th scope="row">${inspection.name}</th>
                    <td>${orNotListed(inspection.category)}</td>
                    <td>${orNotListed(inspection.city)}</td>
                    <td>${formatDate(inspection.inspection_date)}</td>
                    <td>${orNotListed(inspection.inspection_results)}</td>
                    <td>${countViolations(inspection)}</td>
                </tr>
            `
    )
    .join("");

  /*html*/ 
  return `
            <h2 class="view-title">📊 Table View</h2>
                <p class="view-description">For health inspectors: places with the most failed checks are at the top</p>
                <div class="table-wrapper" role="region" aria-label="Inspections table" tabindex="0">
                    <table class="restaurant-table">
                        <caption>${data.length} food safety inspections, sorted by number of failed checks</caption>
                        <thead>
                            <tr>
                                <th scope="col">Business</th>
                                <th scope="col">Type</th>
                                <th scope="col">City</th>
                                <th scope="col">Inspected</th>
                                <th scope="col">Result</th>
                                <th scope="col">Checks failed (of 15)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rowsHTML}
                        </tbody>
                    </table>
                </div>
            `;
}

export default showTable;