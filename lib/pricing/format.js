/** Parse "5 người" → 5 */
export function parsePeopleCount(peopleLabel) {
  const match = peopleLabel.match(/(\d+)/);
  return match ? Number(match[1]) : 1;
}

/** Parse "6.5man" → 6.5 */
export function parseManPrice(priceLabel) {
  return parseFloat(priceLabel.replace('man', ''));
}

/** Total man ÷ số người → "1.3man" */
export function formatPerPersonPrice(totalPriceLabel, peopleCount) {
  const total = parseManPrice(totalPriceLabel);
  const perPerson = total / peopleCount;
  const rounded = Math.round(perPerson * 10) / 10;
  const formatted = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  return `${formatted}man`;
}
