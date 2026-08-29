/** @param {number} n positive integer */
export function digitRoot(n) {
  let x = Math.abs(Math.trunc(n));
  if (x === 0) return 0;
  while (x >= 10) {
    x = String(x)
      .split('')
      .reduce((sum, d) => sum + Number(d), 0);
  }
  return x;
}

/** Digital root for verification — 9 maps to 0 in mod-9 check */
export function digitRootMod9(n) {
  const dr = digitRoot(n);
  return dr === 9 ? 0 : dr;
}

export function hcf(a, b) {
  let x = Math.abs(Math.trunc(a));
  let y = Math.abs(Math.trunc(b));
  while (y) {
    [x, y] = [y, x % y];
  }
  return x;
}

export function lcm(a, b) {
  const a1 = Math.abs(Math.trunc(a));
  const b1 = Math.abs(Math.trunc(b));
  if (a1 === 0 || b1 === 0) return 0;
  return (a1 * b1) / hcf(a1, b1);
}

/** Criss-cross addition: n1/d1 + n2/d2 */
export function crossAddFractions(n1, d1, n2, d2) {
  return {
    n: n1 * d2 + n2 * d1,
    d: d1 * d2,
  };
}

/** Criss-cross subtraction: n1/d1 - n2/d2 */
export function crossSubtractFractions(n1, d1, n2, d2) {
  return {
    n: n1 * d2 - n2 * d1,
    d: d1 * d2,
  };
}

export function simpleInterest(principal, ratePercent, years) {
  return (principal * ratePercent * years) / 100;
}

export function profitPercent(costPrice, sellingPrice) {
  return ((sellingPrice - costPrice) / costPrice) * 100;
}

export function lossPercent(costPrice, sellingPrice) {
  return ((costPrice - sellingPrice) / costPrice) * 100;
}

/**
 * Verify a × b = product using casting out 9s (digital roots).
 */
export function verifyProductByDigitalRoot(a, b, product) {
  const left = digitRoot(digitRoot(a) * digitRoot(b));
  const right = digitRoot(product);
  return left === right;
}

/** Perfect cube */
export function cube(n) {
  return n * n * n;
}

/** Integer square root if perfect square, else null */
export function integerSquareRoot(n) {
  if (n < 0) return null;
  const r = Math.round(Math.sqrt(n));
  return r * r === n ? r : null;
}

/** Divide by 5: n/5 = (n×2)/10 */
export function divideBy5(n) {
  return (n * 2) / 10;
}

/** Divide by 25: n/25 = (n×4)/100 */
export function divideBy25(n) {
  return (n * 4) / 100;
}

/** Divide by 9 using long division result (exact when divisible) */
export function divideBy9(n) {
  return n / 9;
}

/**
 * Expand (ax+b)(cx+d) = (ac)x² + (ad+bc)x + bd
 * Urdhva-Tiryag vertically and crosswise
 */
export function expandBinomials(a, b, c, d) {
  return {
    x2: a * c,
    x: a * d + b * c,
    const: b * d,
  };
}

/** Format binomial expansion for answers: e.g. "6x^2 - x - 15" */
export function formatBinomial(a, b, c, d) {
  const { x2, x, const: k } = expandBinomials(a, b, c, d);
  const parts = [];
  if (x2 === 1) parts.push('x^2');
  else if (x2 === -1) parts.push('-x^2');
  else parts.push(`${x2}x^2`);
  if (x === 0) {
    /* skip */
  } else if (x === 1) parts.push('+ x');
  else if (x === -1) parts.push('- x');
  else if (x > 0) parts.push(`+ ${x}x`);
  else parts.push(`- ${Math.abs(x)}x`);
  if (k === 0) {
    /* skip */
  } else if (k > 0) parts.push(`+ ${k}`);
  else parts.push(`- ${Math.abs(k)}`);
  return parts.join(' ').replace(/^\+ /, '');
}

/**
 * Solve ax+by=c, dx+ey=f by determinants (Paravartya / Cramer's rule)
 * Returns { x, y } when unique solution exists
 */
export function solveSimultaneous(a, b, c, d, e, f) {
  const det = a * e - b * d;
  if (det === 0) return null;
  return {
    x: (c * e - b * f) / det,
    y: (a * f - c * d) / det,
  };
}

/**
 * Factor / roots of x² - sx + p = 0 when integer roots r1, r2 with r1+r2=s, r1*r2=p
 */
export function quadraticRootsFromSumProduct(sum, product) {
  for (let r1 = -Math.abs(product); r1 <= Math.abs(product); r1++) {
    if (r1 === 0) continue;
    if (product % r1 !== 0) continue;
    const r2 = product / r1;
    if (r1 + r2 === sum) {
      return [Math.min(r1, r2), Math.max(r1, r2)];
    }
  }
  return null;
}

/** Sunyam: if a+b+c=0 for ax²+bx+c, then x=1 is a root */
export function sunyamHasRootOne(a, b, c) {
  return a + b + c === 0;
}

/** Circumference with π=22/7: 2πr */
export function circumference22by7(r) {
  return (2 * 22 * r) / 7;
}

/** Area of circle πr² with π=22/7 */
export function areaCircle22by7(r) {
  return (22 * r * r) / 7;
}

/** Dividend = (number of shares × face value × rate%) / 100 */
export function annualDividend(shares, faceValue, ratePercent) {
  return (shares * faceValue * ratePercent) / 100;
}

/** Market value of shares */
export function marketValue(shares, marketPrice) {
  return shares * marketPrice;
}

/** Height from tan: opposite = adjacent × tan(θ); for 30° tan=1/√3, 45°=1, 60°=√3 */
export function heightFromTan45(distance) {
  return distance; // tan45=1
}

export function heightFromTan30(distance) {
  return distance / Math.sqrt(3);
}

export function heightFromTan60(distance) {
  return distance * Math.sqrt(3);
}

/** Normalize text answers for comparison */
export function normalizeTextAnswer(s) {
  return String(s)
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/\*\*/g, '^')
    .replace(/−/g, '-')
    .replace(/×/g, 'x');
}

/**
 * @param {object} question practice item from techniques data
 * @param {string|number|null} rawAnswer primary answer
 * @param {string|number|null} rawAnswer2 second part (fraction den, or y, or text unused)
 */
export function checkPracticeAnswer(question, rawAnswer, rawAnswer2 = null) {
  if (question.isYesNo) {
    return Number(rawAnswer) === question.a;
  }

  if (question.answerType === 'fraction') {
    const n = Number(rawAnswer);
    const d = Number(rawAnswer2);
    return n === question.a.n && d === question.a.d;
  }

  if (question.answerType === 'pair') {
    return Number(rawAnswer) === question.a.x && Number(rawAnswer2) === question.a.y;
  }

  if (question.answerType === 'text') {
    return normalizeTextAnswer(rawAnswer) === normalizeTextAnswer(question.a);
  }

  if (question.answerType === 'decimal') {
    const val = parseFloat(rawAnswer);
    const tol = question.tolerance ?? 0.01;
    return Math.abs(val - question.a) < tol;
  }

  return Number(rawAnswer) === question.a;
}

/** Has Devanagari characters */
export function hasHindi(text) {
  return /[\u0900-\u097F]/.test(String(text ?? ''));
}

/**
 * Shared math notation (formulas, equations) is acceptable as HI
 * when there is no prose — kids see the same symbols in both languages.
 */
export function isMathOnly(text) {
  const t = String(text ?? '').trim();
  if (!t || hasHindi(t)) return false;
  if (!/\d/.test(t) && !/[xyθπ√]/.test(t)) return false;
  // Digits, algebra letters, trig abbreviations, operators, spaces
  return /^[\d\s+\-−–×÷=*/^()[\]{}.,:;?%√πθαβ²³₀-₉a-zA-Z|\\→←↔…·✓✗]+$/.test(t);
}

export function isAcceptableBilingualHi(hi) {
  return hasHindi(hi) || isMathOnly(hi);
}

/** Collect bilingual field issues for a technique */
export function validateBilingualTechnique(technique) {
  const issues = [];
  const req = (label, en, hi) => {
    if (!en || !String(en).trim()) issues.push(`${technique.id}: missing EN ${label}`);
    if (!hi || !String(hi).trim()) issues.push(`${technique.id}: missing HI ${label}`);
    else if (!isAcceptableBilingualHi(hi)) {
      issues.push(`${technique.id}: HI ${label} needs Devanagari or math notation`);
    }
  };

  req('title', technique.en, technique.hi);
  req('benefitChip', technique.benefitChip?.en, technique.benefitChip?.hi);
  req('whenToUse', technique.whenToUse?.en, technique.whenToUse?.hi);
  req('whenNotToUse', technique.whenNotToUse?.en, technique.whenNotToUse?.hi);
  req('masteredText', technique.masteredText?.en, technique.masteredText?.hi);

  technique.whyVedic?.forEach((w, i) => req(`whyVedic[${i}]`, w.en, w.hi));
  technique.regular?.steps?.forEach((s, i) => req(`regular[${i}]`, s.en, s.hi));
  technique.vedic?.steps?.forEach((s, i) => {
    req(`vedic[${i}]`, s.en, s.hi);
    if (s.proTip) req(`vedic[${i}].proTip`, s.proTip.en, s.proTip.hi);
  });
  technique.practice?.forEach((p, i) => {
    if (!p.q) issues.push(`${technique.id}: practice[${i}] missing q`);
    if (p.hint) req(`practice[${i}].hint`, p.hint.en, p.hint.hi);
  });

  if (technique.sutra) {
    req('sutra', technique.sutra.en, technique.sutra.hi);
    if (technique.sutra.meaning) req('sutra.meaning', technique.sutra.meaning.en, technique.sutra.meaning.hi);
  }
  if (technique.selinaTag) req('selinaTag', technique.selinaTag.en, technique.selinaTag.hi);

  return issues;
}
