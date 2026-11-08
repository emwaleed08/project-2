/**
 * CATEGORY VIEW - STUDENTS IMPLEMENT
 * Group data by categories
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

function countViolations(inspection) {
  return CHECKS.filter((key) => inspection[key] === 'Out of Compliance').length;
}
function showCategories(data) {
  // Requirements:
  // - Group data by one meaningful field (category, city, inspection result, etc.)
  // - Show how many records are in each group, plus one other number per group
  //   (an average, a highest, a lowest)
  // - Show items within each group
  // - Make the groups easy to compare, and visually distinct from their items
  /*html*/

    const groups = {};
  data.forEach((inspection) => {
    const type = orNotListed(inspection.category);
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(inspection);
  });

  // sorting - largest groups first
  const types = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length);

  const groupsHTML = types
    .map((type) => {
      const inspections = groups[type];

      // failed at least one check
      const failed = inspections.filter((inspection) => countViolations(inspection) > 0).length;
      const percent = Math.round((failed / inspections.length) * 100);

      const itemsHTML = inspections
        .map(
          /*html*/
          (inspection) => `
                <div class="category-item">
                    <span>${inspection.name}</span>
                    <span>${countViolations(inspection)} checks failed</span>
                </div>
            `
        )
        .join("");

      /*html*/
      return `
                <section class="category-section">
                    <h3 class="category-header">
                        ${type}: ${inspections.length} inspections, ${failed} failed at least one check (${percent}%)
                    </h3>
                    <div class="category-items">
                        ${itemsHTML}
                    </div>
                </section>
            `;
    })
    .join("");

  /*html*/
  return `
                <h2 class="view-title">📂 Category View</h2>
                <p class="view-description">For reporters: inspections grouped by type of business, largest groups first</p>
                ${groupsHTML}
            `;
}

export default showCategories;