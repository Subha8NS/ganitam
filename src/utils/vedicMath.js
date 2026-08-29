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

/**
 * @param {object} question practice item from techniques data
 * @param {string|number|null} rawAnswer primary answer
 * @param {string|number|null} rawAnswer2 denominator for fractions
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

  if (question.answerType === 'decimal') {
    const val = parseFloat(rawAnswer);
    return Math.abs(val - question.a) < 0.01;
  }

  return Number(rawAnswer) === question.a;
}

/** Validate all practice answers in a technique against math helpers */
export function validateTechniquePractice(technique, validators) {
  const errors = [];
  for (const [i, q] of technique.practice.entries()) {
    const fn = validators[q.validate];
    if (!fn) continue;
    const expected = fn(q);
    if (q.isYesNo) {
      if (expected !== (q.a === 1)) errors.push(`${technique.id}[${i}] yes/no expected ${expected}, got a=${q.a}`);
    } else if (q.answerType === 'fraction') {
      if (expected.n !== q.a.n || expected.d !== q.a.d) {
        errors.push(`${technique.id}[${i}] fraction expected ${expected.n}/${expected.d}, got ${q.a.n}/${q.a.d}`);
      }
    } else if (Math.abs(expected - q.a) > 0.01) {
      errors.push(`${technique.id}[${i}] expected ${expected}, got ${q.a}`);
    }
  }
  return errors;
}
