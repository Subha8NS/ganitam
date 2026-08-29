import { describe, it, expect } from 'vitest';
import {
  digitRoot,
  digitRootMod9,
  hcf,
  lcm,
  crossAddFractions,
  crossSubtractFractions,
  simpleInterest,
  profitPercent,
  lossPercent,
  verifyProductByDigitalRoot,
  checkPracticeAnswer,
} from '../utils/vedicMath.js';
import { TECHNIQUES, getTechnique, getTechniquesByCategory } from '../data/techniques.js';

describe('digitRoot / casting out 9s', () => {
  it('computes single digit roots', () => {
    expect(digitRoot(48)).toBe(3);
    expect(digitRoot(99)).toBe(9);
    expect(digitRoot(123)).toBe(6);
    expect(digitRoot(816)).toBe(6);
    expect(digitRoot(0)).toBe(0);
  });

  it('maps 9 to 0 for mod-9 checks', () => {
    expect(digitRootMod9(9)).toBe(0);
    expect(digitRootMod9(18)).toBe(0);
    expect(digitRootMod9(48)).toBe(3);
  });

  it('verifies products with digital roots', () => {
    expect(verifyProductByDigitalRoot(48, 17, 816)).toBe(true);
    expect(verifyProductByDigitalRoot(25, 16, 390)).toBe(false);
    expect(verifyProductByDigitalRoot(25, 16, 400)).toBe(true);
  });
});

describe('Anurupyena HCF / LCM', () => {
  it('finds HCF with Euclidean remainders', () => {
    expect(hcf(48, 18)).toBe(6);
    expect(hcf(36, 24)).toBe(12);
    expect(hcf(60, 45)).toBe(15);
    expect(hcf(84, 36)).toBe(12);
    expect(hcf(100, 35)).toBe(5);
  });

  it('finds LCM via (a*b)/HCF', () => {
    expect(lcm(12, 18)).toBe(36);
    expect(lcm(8, 12)).toBe(24);
    expect(lcm(15, 20)).toBe(60);
    expect(lcm(9, 6)).toBe(18);
    expect(lcm(14, 21)).toBe(42);
  });

  it('satisfies HCF × LCM = a × b', () => {
    const pairs = [[12, 18], [8, 12], [15, 20], [48, 18]];
    for (const [a, b] of pairs) {
      expect(hcf(a, b) * lcm(a, b)).toBe(a * b);
    }
  });
});

describe('Urdhva-Tiryag fraction criss-cross', () => {
  it('adds unlike fractions', () => {
    expect(crossAddFractions(5, 7, 3, 4)).toEqual({ n: 41, d: 28 });
    expect(crossAddFractions(2, 5, 1, 3)).toEqual({ n: 11, d: 15 });
    expect(crossAddFractions(1, 4, 2, 3)).toEqual({ n: 11, d: 12 });
    expect(crossAddFractions(3, 8, 1, 2)).toEqual({ n: 14, d: 16 });
    expect(crossAddFractions(4, 9, 1, 6)).toEqual({ n: 33, d: 54 });
  });

  it('subtracts unlike fractions', () => {
    expect(crossSubtractFractions(3, 4, 1, 5)).toEqual({ n: 11, d: 20 });
  });
});

describe('Simple Interest & Profit/Loss', () => {
  it('computes SI = PRT/100', () => {
    expect(simpleInterest(800, 5, 2)).toBe(80);
    expect(simpleInterest(1000, 10, 3)).toBe(300);
    expect(simpleInterest(500, 8, 2)).toBe(80);
    expect(simpleInterest(1200, 5, 4)).toBe(240);
    expect(simpleInterest(600, 7, 1)).toBe(42);
  });

  it('computes profit and loss percent', () => {
    expect(profitPercent(200, 240)).toBe(20);
    expect(profitPercent(150, 180)).toBe(20);
    expect(lossPercent(100, 80)).toBe(20);
    expect(profitPercent(250, 300)).toBe(20);
    expect(lossPercent(400, 360)).toBe(10);
  });
});

describe('checkPracticeAnswer', () => {
  it('checks numeric answers', () => {
    expect(checkPracticeAnswer({ a: 6 }, '6')).toBe(true);
    expect(checkPracticeAnswer({ a: 6 }, '7')).toBe(false);
  });

  it('checks yes/no', () => {
    expect(checkPracticeAnswer({ a: 1, isYesNo: true }, 1)).toBe(true);
    expect(checkPracticeAnswer({ a: 0, isYesNo: true }, 1)).toBe(false);
  });

  it('checks fractions', () => {
    expect(
      checkPracticeAnswer({ a: { n: 41, d: 28 }, answerType: 'fraction' }, '41', '28')
    ).toBe(true);
    expect(
      checkPracticeAnswer({ a: { n: 41, d: 28 }, answerType: 'fraction' }, '41', '27')
    ).toBe(false);
  });
});

describe('Phase 2 technique practice data integrity', () => {
  const phase2Ids = [
    'anurupyena-hcf',
    'anurupyena-lcm',
    'urdhva-fractions',
    'digital-root-check',
    'simple-interest',
    'profit-loss',
  ];

  it('includes all Phase 2 techniques', () => {
    for (const id of phase2Ids) {
      const t = getTechnique(id);
      expect(t, `missing ${id}`).toBeTruthy();
      expect(t.phase).toBe(2);
      expect(t.sutra).toBeTruthy();
      expect(t.practice.length).toBeGreaterThanOrEqual(5);
    }
  });

  it('validates HCF practice answers', () => {
    const t = getTechnique('anurupyena-hcf');
    const cases = [
      [48, 18],
      [36, 24],
      [60, 45],
      [84, 36],
      [100, 35],
    ];
    t.practice.forEach((q, i) => {
      expect(q.a).toBe(hcf(...cases[i]));
    });
  });

  it('validates LCM practice answers', () => {
    const t = getTechnique('anurupyena-lcm');
    const cases = [
      [12, 18],
      [8, 12],
      [15, 20],
      [9, 6],
      [14, 21],
    ];
    t.practice.forEach((q, i) => {
      expect(q.a).toBe(lcm(...cases[i]));
    });
  });

  it('validates fraction practice answers', () => {
    const t = getTechnique('urdhva-fractions');
    const cases = [
      [5, 7, 3, 4],
      [2, 5, 1, 3],
      [1, 4, 2, 3],
      [3, 8, 1, 2],
      [4, 9, 1, 6],
    ];
    t.practice.forEach((q, i) => {
      const expected = crossAddFractions(...cases[i]);
      expect(q.a).toEqual(expected);
      expect(q.answerType).toBe('fraction');
    });
  });

  it('validates SI practice answers', () => {
    const t = getTechnique('simple-interest');
    const cases = [
      [800, 5, 2],
      [1000, 10, 3],
      [500, 8, 2],
      [1200, 5, 4],
      [600, 7, 1],
    ];
    t.practice.forEach((q, i) => {
      expect(q.a).toBe(simpleInterest(...cases[i]));
    });
  });

  it('validates P&L practice answers', () => {
    const t = getTechnique('profit-loss');
    expect(t.practice[0].a).toBe(profitPercent(200, 240));
    expect(t.practice[1].a).toBe(profitPercent(150, 180));
    expect(t.practice[2].a).toBe(lossPercent(100, 80));
    expect(t.practice[3].a).toBe(profitPercent(250, 300));
    expect(t.practice[4].a).toBe(lossPercent(400, 360));
  });

  it('validates digital root practice', () => {
    const t = getTechnique('digital-root-check');
    expect(t.practice[0].a).toBe(digitRoot(48));
    expect(t.practice[1].a).toBe(digitRoot(99));
    expect(t.practice[2].a).toBe(verifyProductByDigitalRoot(48, 17, 816) ? 1 : 0);
    expect(t.practice[3].a).toBe(verifyProductByDigitalRoot(25, 16, 390) ? 1 : 0);
    expect(t.practice[4].a).toBe(digitRoot(123));
  });

  it('exposes new categories', () => {
    expect(getTechniquesByCategory('numbers').length).toBeGreaterThanOrEqual(2);
    expect(getTechniquesByCategory('fractions').length).toBeGreaterThanOrEqual(1);
    expect(getTechniquesByCategory('commercial').length).toBeGreaterThanOrEqual(2);
    expect(getTechniquesByCategory('verify').length).toBeGreaterThanOrEqual(1);
  });

  it('keeps total techniques count', () => {
    expect(TECHNIQUES.length).toBeGreaterThanOrEqual(15);
  });
});

describe('Phase 1 regression — existing techniques still valid', () => {
  it('multiply by 11 practice answers', () => {
    const t = getTechnique('multiply-11');
    expect(t.practice.map((p) => p.a)).toEqual([253, 495, 792, 616, 418]);
  });

  it('squares ending 5 practice answers', () => {
    const t = getTechnique('squares-5');
    expect(t.practice.map((p) => p.a)).toEqual([625, 2025, 4225, 7225, 225]);
  });

  it('percent 10 practice answers', () => {
    const t = getTechnique('percent-10');
    expect(t.practice.map((p) => p.a)).toEqual([8, 35, 12, 50, 9]);
  });
});
