import { describe, it, expect } from 'vitest';
import {
  digitRoot,
  hcf,
  lcm,
  crossAddFractions,
  simpleInterest,
  profitPercent,
  lossPercent,
  verifyProductByDigitalRoot,
  checkPracticeAnswer,
  cube,
  integerSquareRoot,
  divideBy5,
  divideBy25,
  divideBy9,
  expandBinomials,
  formatBinomial,
  solveSimultaneous,
  quadraticRootsFromSumProduct,
  sunyamHasRootOne,
  circumference22by7,
  areaCircle22by7,
  annualDividend,
  marketValue,
  heightFromTan45,
  heightFromTan30,
  heightFromTan60,
  normalizeTextAnswer,
  validateBilingualTechnique,
  hintRevealsAnswer,
  hasHindi,
  isAcceptableBilingualHi,
  isMathOnly,
} from '../utils/vedicMath.js';
import { TECHNIQUES, getTechnique, CATEGORIES } from '../data/techniques.js';


describe('Phase 3 helpers — cubes, roots, division', () => {
  it('cubes near 10', () => {
    expect(cube(12)).toBe(1728);
    expect(cube(11)).toBe(1331);
    expect(cube(9)).toBe(729);
    expect(cube(8)).toBe(512);
    expect(cube(13)).toBe(2197);
  });

  it('perfect square roots', () => {
    expect(integerSquareRoot(144)).toBe(12);
    expect(integerSquareRoot(81)).toBe(9);
    expect(integerSquareRoot(169)).toBe(13);
    expect(integerSquareRoot(225)).toBe(15);
    expect(integerSquareRoot(256)).toBe(16);
    expect(integerSquareRoot(50)).toBeNull();
  });

  it('divide by 5 and 25', () => {
    expect(divideBy5(480)).toBe(96);
    expect(divideBy5(75)).toBe(15);
    expect(divideBy25(800)).toBe(32);
    expect(divideBy25(125)).toBe(5);
  });

  it('divide by 9 exact', () => {
    expect(divideBy9(729)).toBe(81);
    expect(divideBy9(459)).toBe(51);
    expect(divideBy9(891)).toBe(99);
  });
});

describe('Phase 3 helpers — algebra & mensuration', () => {
  it('expands binomials Urdhva-style', () => {
    expect(expandBinomials(2, 3, 3, -5)).toEqual({ x2: 6, x: -1, const: -15 });
    expect(formatBinomial(2, 3, 3, -5)).toBe('6x^2 - x - 15');
    expect(formatBinomial(1, 2, 1, 3)).toBe('x^2 + 5x + 6');
    expect(formatBinomial(1, 4, 1, -1)).toBe('x^2 + 3x - 4');
    expect(formatBinomial(2, 1, 1, 5)).toBe('2x^2 + 11x + 5');
    expect(formatBinomial(3, -2, 1, 4)).toBe('3x^2 + 10x - 8');
  });

  it('solves simultaneous equations', () => {
    expect(solveSimultaneous(2, 3, 13, 5, -1, 7)).toEqual({ x: 2, y: 3 });
    expect(solveSimultaneous(1, 1, 5, 1, -1, 1)).toEqual({ x: 3, y: 2 });
    expect(solveSimultaneous(3, 1, 9, 1, 1, 3)).toEqual({ x: 3, y: 0 });
    expect(solveSimultaneous(1, 2, 8, 2, 1, 7)).toEqual({ x: 2, y: 3 });
    expect(solveSimultaneous(4, -1, 10, 2, 1, 8)).toEqual({ x: 3, y: 2 });
  });

  it('quadratic sum-product and sunyam', () => {
    expect(quadraticRootsFromSumProduct(5, 6)).toEqual([2, 3]);
    expect(quadraticRootsFromSumProduct(7, 12)).toEqual([3, 4]);
    expect(quadraticRootsFromSumProduct(9, 20)).toEqual([4, 5]);
    expect(sunyamHasRootOne(1, 2, -3)).toBe(true);
    expect(sunyamHasRootOne(1, -5, 6)).toBe(false);
  });

  it('mensuration with 22/7', () => {
    expect(areaCircle22by7(14)).toBe(616);
    expect(areaCircle22by7(7)).toBe(154);
    expect(areaCircle22by7(21)).toBe(1386);
    expect(circumference22by7(7)).toBe(44);
    expect(circumference22by7(14)).toBe(88);
  });
});

describe('Phase 4 helpers — shares & heights', () => {
  it('shares and dividends', () => {
    expect(annualDividend(100, 10, 8)).toBe(80);
    expect(annualDividend(50, 20, 10)).toBe(100);
    expect(marketValue(40, 25)).toBe(1000);
    expect(annualDividend(200, 5, 12)).toBe(120);
    expect(marketValue(80, 15)).toBe(1200);
  });

  it('heights from tan', () => {
    expect(heightFromTan45(40)).toBe(40);
    expect(heightFromTan45(25)).toBe(25);
    expect(Math.round(heightFromTan30(30 * Math.sqrt(3)))).toBe(30);
    expect(Math.round(heightFromTan60(30) ** 2)).toBe(2700);
  });
});

describe('checkPracticeAnswer — new types', () => {
  it('checks text binomial answers with flexible spacing', () => {
    const q = { a: '6x^2 - x - 15', answerType: 'text' };
    expect(checkPracticeAnswer(q, '6x^2 - x - 15')).toBe(true);
    expect(checkPracticeAnswer(q, '6x^2-x-15')).toBe(true);
    expect(checkPracticeAnswer(q, '6x^2 + x - 15')).toBe(false);
  });

  it('checks pair answers', () => {
    const q = { a: { x: 2, y: 3 }, answerType: 'pair' };
    expect(checkPracticeAnswer(q, '2', '3')).toBe(true);
    expect(checkPracticeAnswer(q, '3', '2')).toBe(false);
  });

  it('normalizeTextAnswer', () => {
    expect(normalizeTextAnswer('6x^2 - x - 15')).toBe(normalizeTextAnswer('6x^2-x-15'));
  });
});

describe('ALL techniques — bilingual EN + HI', () => {
  it('every technique passes bilingual validation', () => {
    const allIssues = [];
    for (const tech of TECHNIQUES) {
      allIssues.push(...validateBilingualTechnique(tech));
    }
    expect(allIssues, allIssues.join('\n')).toEqual([]);
  });

  it('every technique has EN and HI titles with Devanagari in HI', () => {
    for (const tech of TECHNIQUES) {
      expect(tech.en.length).toBeGreaterThan(2);
      expect(tech.hi.length).toBeGreaterThan(1);
      expect(hasHindi(tech.hi)).toBe(true);
    }
  });

  it('every practice hint is bilingual (Devanagari or shared math)', () => {
    for (const tech of TECHNIQUES) {
      for (const [i, p] of tech.practice.entries()) {
        expect(p.hint?.en, `${tech.id}[${i}] hint.en`).toBeTruthy();
        expect(p.hint?.hi, `${tech.id}[${i}] hint.hi`).toBeTruthy();
        expect(
          isAcceptableBilingualHi(p.hint.hi),
          `${tech.id}[${i}] hint.hi invalid: ${p.hint.hi}`
        ).toBe(true);
      }
    }
  });

  it('practice hints guide without giving away the answer', () => {
    for (const tech of TECHNIQUES) {
      for (const [i, p] of tech.practice.entries()) {
        expect(
          hintRevealsAnswer(p.hint, p),
          `${tech.id}[${i}] hint leaks answer: ${p.hint.en}`
        ).toBe(false);
      }
    }
  });

  it('regular and vedic steps are bilingual (Devanagari or shared math)', () => {
    for (const tech of TECHNIQUES) {
      expect(tech.regular.steps.length).toBeGreaterThan(0);
      expect(tech.vedic.steps.length).toBeGreaterThan(0);
      for (const s of tech.regular.steps) {
        expect(s.en).toBeTruthy();
        expect(isAcceptableBilingualHi(s.hi)).toBe(true);
      }
      for (const s of tech.vedic.steps) {
        expect(s.en).toBeTruthy();
        expect(isAcceptableBilingualHi(s.hi)).toBe(true);
      }
    }
  });

  it('prose fields (whenToUse, masteredText, whyVedic) use Devanagari', () => {
    for (const tech of TECHNIQUES) {
      expect(hasHindi(tech.whenToUse.hi)).toBe(true);
      expect(hasHindi(tech.masteredText.hi)).toBe(true);
      for (const w of tech.whyVedic) {
        expect(hasHindi(w.hi)).toBe(true);
      }
    }
  });

  it('isMathOnly recognizes formulas', () => {
    expect(isMathOnly('480×2=960, ÷10=96')).toBe(true);
    expect(isMathOnly('6x^2 - x - 15')).toBe(true);
    expect(isMathOnly('P×R×T/100')).toBe(true);
    expect(isMathOnly('पहले दोगुना करें')).toBe(false);
  });
});

describe('Phase 3+4 technique practice integrity', () => {
  const phase34Ids = [
    'cube-near-10',
    'square-root-perfect',
    'divide-by-5',
    'divide-by-25',
    'divide-by-9-shortcut',
    'urdhva-binomial',
    'paravartya-simultaneous',
    'sunyam-quadratic',
    'mensuration-pi',
    'trig-identity',
    'shares-dividends',
    'heights-distances',
  ];

  it('includes all Phase 3/4 + extras techniques', () => {
    for (const id of phase34Ids) {
      const t = getTechnique(id);
      expect(t, `missing ${id}`).toBeTruthy();
      expect([3, 4]).toContain(t.phase);
      expect(t.practice.length).toBeGreaterThanOrEqual(5);
    }
  });

  it('validates cube practice', () => {
    const t = getTechnique('cube-near-10');
    expect(t.practice.map((p) => p.a)).toEqual([12, 11, 9, 8, 13].map(cube));
  });

  it('validates square-root practice', () => {
    const t = getTechnique('square-root-perfect');
    [144, 81, 169, 225, 256].forEach((n, i) => {
      expect(t.practice[i].a).toBe(integerSquareRoot(n));
    });
  });

  it('validates division practice', () => {
    const d5 = getTechnique('divide-by-5');
    expect(d5.practice.map((p) => p.a)).toEqual([480, 350, 125, 640, 75].map(divideBy5));
    const d25 = getTechnique('divide-by-25');
    expect(d25.practice.map((p) => p.a)).toEqual([800, 500, 250, 125, 1000].map(divideBy25));
    const d9 = getTechnique('divide-by-9-shortcut');
    expect(d9.practice.map((p) => p.a)).toEqual([729, 459, 891, 108, 936].map(divideBy9));
  });

  it('validates binomial practice text', () => {
    const t = getTechnique('urdhva-binomial');
    const cases = [
      [2, 3, 3, -5],
      [1, 2, 1, 3],
      [1, 4, 1, -1],
      [2, 1, 1, 5],
      [3, -2, 1, 4],
    ];
    t.practice.forEach((q, i) => {
      expect(normalizeTextAnswer(q.a)).toBe(normalizeTextAnswer(formatBinomial(...cases[i])));
    });
  });

  it('validates simultaneous practice pairs', () => {
    const t = getTechnique('paravartya-simultaneous');
    const cases = [
      [2, 3, 13, 5, -1, 7],
      [1, 1, 5, 1, -1, 1],
      [3, 1, 9, 1, 1, 3],
      [1, 2, 8, 2, 1, 7],
      [4, -1, 10, 2, 1, 8],
    ];
    t.practice.forEach((q, i) => {
      expect(q.a).toEqual(solveSimultaneous(...cases[i]));
    });
  });

  it('validates quadratic practice', () => {
    expect(getTechnique('sunyam-quadratic').practice[0].a).toBe(2);
    expect(getTechnique('sunyam-quadratic').practice[1].a).toBe(3);
    expect(getTechnique('sunyam-quadratic').practice[3].a).toBe(1);
  });

  it('validates mensuration practice', () => {
    const t = getTechnique('mensuration-pi');
    expect(t.practice[0].a).toBe(areaCircle22by7(14));
    expect(t.practice[1].a).toBe(circumference22by7(7));
    expect(t.practice[2].a).toBe(areaCircle22by7(7));
    expect(t.practice[3].a).toBe(circumference22by7(14));
    expect(t.practice[4].a).toBe(areaCircle22by7(21));
  });

  it('validates shares practice', () => {
    const t = getTechnique('shares-dividends');
    expect(t.practice[0].a).toBe(annualDividend(100, 10, 8));
    expect(t.practice[1].a).toBe(annualDividend(50, 20, 10));
    expect(t.practice[2].a).toBe(marketValue(40, 25));
    expect(t.practice[3].a).toBe(annualDividend(200, 5, 12));
    expect(t.practice[4].a).toBe(marketValue(80, 15));
  });

  it('validates heights practice', () => {
    const t = getTechnique('heights-distances');
    expect(t.practice[0].a).toBe(heightFromTan45(40));
    expect(t.practice[1].a).toBe(heightFromTan45(25));
    expect(t.practice[2].a).toBe(heightFromTan45(100));
    expect(t.practice[3].a).toBe(2700);
    expect(t.practice[4].a).toBe(30);
  });
});

describe('Catalogue sanity', () => {
  it('has expanded technique count and categories', () => {
    expect(TECHNIQUES.length).toBeGreaterThanOrEqual(27);
    expect(CATEGORIES.length).toBeGreaterThanOrEqual(12);
  });

  it('every technique has unique id', () => {
    const ids = TECHNIQUES.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('Phase 1–2 regression', () => {
  it('multiply by 11', () => {
    expect(getTechnique('multiply-11').practice.map((p) => p.a)).toEqual([253, 495, 792, 616, 418]);
  });

  it('HCF / LCM / fractions / SI still valid', () => {
    expect(hcf(48, 18)).toBe(6);
    expect(lcm(12, 18)).toBe(36);
    expect(crossAddFractions(5, 7, 3, 4)).toEqual({ n: 41, d: 28 });
    expect(simpleInterest(800, 5, 2)).toBe(80);
    expect(profitPercent(200, 240)).toBe(20);
    expect(lossPercent(100, 80)).toBe(20);
    expect(verifyProductByDigitalRoot(48, 17, 816)).toBe(true);
    expect(digitRoot(48)).toBe(3);
  });
});
