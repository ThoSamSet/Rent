/** FAQ search — tokenize, OR match, accent-insensitive highlight. */

export const MIN_TOKEN_LENGTH = 2;

export function normalizeSearch(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function stripHtml(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/** @param {string} query @param {number} [minLen] */
export function tokenizeQuery(query, minLen = MIN_TOKEN_LENGTH) {
  return query
    .split(/\s+/)
    .map((part) => normalizeSearch(part))
    .filter((token) => token.length >= minLen);
}

/** @param {{ question: string; answerHtml: string }} item @param {string[]} tokens */
export function matchesQuery(item, tokens) {
  if (!tokens.length) return true;
  return getMatchScore(item, tokens).tokenCount > 0;
}

/** @param {{ question: string; answerHtml: string }} item @param {string[]} tokens @returns {{ tokenCount: number; questionTokenCount: number }} */
export function getMatchScore(item, tokens) {
  if (!tokens.length) return { tokenCount: 0, questionTokenCount: 0 };

  const questionHay = normalizeSearch(item.question);
  const answerHay = normalizeSearch(stripHtml(item.answerHtml));

  let tokenCount = 0;
  let questionTokenCount = 0;

  for (const token of tokens) {
    const inQuestion = questionHay.includes(token);
    const inAnswer = answerHay.includes(token);
    if (inQuestion || inAnswer) {
      tokenCount += 1;
      if (inQuestion) questionTokenCount += 1;
    }
  }

  return { tokenCount, questionTokenCount };
}

/** @param {{ question: string; answerHtml: string }} a @param {{ question: string; answerHtml: string }} b @param {string[]} tokens */
export function compareByRelevance(a, b, tokens) {
  const scoreA = getMatchScore(a, tokens);
  const scoreB = getMatchScore(b, tokens);

  if (scoreB.tokenCount !== scoreA.tokenCount) return scoreB.tokenCount - scoreA.tokenCount;
  if (scoreB.questionTokenCount !== scoreA.questionTokenCount) {
    return scoreB.questionTokenCount - scoreA.questionTokenCount;
  }
  return 0;
}

/** @param {string} text */
export function buildNormalizedIndexMap(text) {
  const normalizedChars = [];
  /** @type {number[]} */
  const indexMap = [];

  for (let i = 0; i < text.length; i += 1) {
    const charNorm = normalizeSearch(text[i]);
    for (let j = 0; j < charNorm.length; j += 1) {
      normalizedChars.push(charNorm[j]);
      indexMap.push(i);
    }
  }

  return {
    normalized: normalizedChars.join(''),
    indexMap,
  };
}

/** @param {[number, number][]} ranges */
function mergeRanges(ranges) {
  if (ranges.length === 0) return [];
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  /** @type {[number, number][]} */
  const merged = [sorted[0]];

  for (let i = 1; i < sorted.length; i += 1) {
    const last = merged[merged.length - 1];
    const curr = sorted[i];
    if (curr[0] <= last[1]) {
      last[1] = Math.max(last[1], curr[1]);
    } else {
      merged.push(curr);
    }
  }

  return merged;
}

/** @param {string} text @param {string[]} tokens @returns {[number, number][]} */
function findMatchRanges(text, tokens) {
  if (!tokens.length) return [];

  const { normalized, indexMap } = buildNormalizedIndexMap(text);
  /** @type {[number, number][]} */
  const ranges = [];

  for (const token of tokens) {
    let start = 0;
    while (start <= normalized.length - token.length) {
      const idx = normalized.indexOf(token, start);
      if (idx === -1) break;
      const endNorm = idx + token.length;
      const startOrig = indexMap[idx];
      const endOrig = indexMap[endNorm - 1] + 1;
      ranges.push([startOrig, endOrig]);
      start = idx + 1;
    }
  }

  return mergeRanges(ranges);
}

/** @param {string} text @param {string[]} tokens @returns {{ text: string; match: boolean }[]} */
export function getHighlightSegments(text, tokens) {
  if (!tokens.length) return [{ text, match: false }];

  const ranges = findMatchRanges(text, tokens);
  if (!ranges.length) return [{ text, match: false }];

  /** @type {{ text: string; match: boolean }[]} */
  const segments = [];
  let pos = 0;

  for (const [start, end] of ranges) {
    if (pos < start) {
      segments.push({ text: text.slice(pos, start), match: false });
    }
    segments.push({ text: text.slice(start, end), match: true });
    pos = end;
  }

  if (pos < text.length) {
    segments.push({ text: text.slice(pos), match: false });
  }

  return segments;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** @param {string} text @param {string[]} tokens */
export function highlightPlainText(text, tokens) {
  return getHighlightSegments(text, tokens)
    .map((seg) =>
      seg.match ? `<mark class="faq-match">${escapeHtml(seg.text)}</mark>` : escapeHtml(seg.text),
    )
    .join('');
}

/** @param {string} html @param {string[]} tokens */
export function highlightHtml(html, tokens) {
  if (!tokens.length) return html;
  return html
    .split(/(<[^>]+>)/g)
    .map((part) => (part.startsWith('<') ? part : highlightPlainText(part, tokens)))
    .join('');
}
