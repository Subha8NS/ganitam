export const CATEGORIES = [
  { id: 'multiply', icon: '✕', en: 'Multiply', hi: 'गुणा' },
  { id: 'divide', icon: '÷', en: 'Divide', hi: 'भाग' },
  { id: 'squares', icon: '²', en: 'Squares', hi: 'वर्ग' },
  { id: 'mental', icon: '+', en: 'Mental Add', hi: 'मानसिक जोड़' },
  { id: 'percent', icon: '%', en: 'Percent', hi: 'प्रतिशत' },
];

export const PRO_TYPES = {
  speed: { icon: '⚡', en: 'Faster', hi: 'तेज़' },
  steps: { icon: '📉', en: 'Fewer steps', hi: 'कम कदम' },
  mental: { icon: '🧠', en: 'In your head', hi: 'दिमाग में' },
  pattern: { icon: '🔁', en: 'Works for many', hi: 'कई पर काम करता है' },
  exam: { icon: '📝', en: 'Exam-friendly', hi: 'परीक्षा के लिए' },
  verify: { icon: '✓', en: 'Easy to check', hi: 'आसान जाँच' },
  confidence: { icon: '💪', en: 'Builds confidence', hi: 'आत्मविश्वास बढ़ाता है' },
};

export const TECHNIQUES = [
  {
    id: 'multiply-11',
    category: 'multiply',
    difficulty: 1,
    icon: '11',
    en: 'Multiply by 11',
    hi: '11 से गुणा',
    benefitChip: { en: '2× faster', hi: '2 गुना तेज़' },
    duration: '3 min',
    whenToUse: {
      en: 'Best for: homework, mental tests, quick estimates',
      hi: 'सबसे अच्छा: होमवर्क, मानसिक गणित, जल्दी अनुमान',
    },
    whenNotToUse: {
      en: 'For very large numbers, long multiplication is fine too.',
      hi: 'बहुत बड़े अंकों के लिए सामान्य गुणा भी ठीक है।',
    },
    whyVedic: [
      { type: 'steps', en: 'Fewer steps than column multiply', hi: 'कॉलम गुणा से कम कदम' },
      { type: 'mental', en: 'Do it entirely in your head', hi: 'पूरा दिमाग में करें' },
      { type: 'pattern', en: 'Same trick for 11, 22, 33…', hi: '11, 22, 33… पर एक ही तरीका' },
      { type: 'verify', en: 'Check with digit sum in 1 second', hi: 'अंक जोड़ से 1 सेकंड में जाँच' },
    ],
    regular: {
      steps: [
        { en: 'Write 47 × 11 in columns', hi: '47 × 11 कॉलम में लिखें' },
        { en: 'Multiply 7 × 1 = 7', hi: '7 × 1 = 7 गुणा करें' },
        { en: 'Multiply 4 × 1, carry over', hi: '4 × 1 गुणा, कैरी लें' },
        { en: 'Add partial products → 517', hi: 'आंशिक जोड़ें → 517' },
      ],
      timeEstimate: 22,
    },
    vedic: {
      steps: [
        { en: 'Split 47: 4 | 7', hi: '47 विभाजित करें: 4 | 7', proTip: { en: 'Keep the outer digits separate.', hi: 'बाहरी अंक अलग रखें।' } },
        { en: 'Add middle: 4 + 7 = 11', hi: 'बीच जोड़ें: 4 + 7 = 11', proTip: { en: 'Add the two digits — this is the middle part.', hi: 'दो अंक जोड़ें — यह बीच का भाग है।' } },
        { en: 'Write 1 in middle, carry 1', hi: 'बीच में 1 लिखें, 1 कैरी करें', proTip: { en: 'When the sum is 11 or more, carry to the left.', hi: 'योग 11 या अधिक हो तो बाएँ कैरी करें।' } },
        { en: 'Add carry: 4 + 1 = 5', hi: 'कैरी जोड़ें: 4 + 1 = 5', proTip: { en: 'Add the carry to the left digit.', hi: 'कैरी को बाएँ अंक में जोड़ें।' } },
        { en: 'Answer: 5 | 1 | 7 → 517', hi: 'जवाब: 5 | 1 | 7 → 517', proTip: { en: 'Read left, middle, right — done!', hi: 'बाएँ, बीच, दाएँ पढ़ें — हो गया!' } },
      ],
      pros: ['steps', 'mental', 'speed'],
      timeEstimate: 8,
    },
    practice: [
      { q: '23 × 11', a: 253, hint: { en: '2+3=5 in the middle', hi: 'बीच में 2+3=5' } },
      { q: '45 × 11', a: 495, hint: { en: '4+5=9 in the middle', hi: 'बीच में 4+5=9' } },
      { q: '72 × 11', a: 792, hint: { en: '7+2=9 in the middle', hi: 'बीच में 7+2=9' } },
      { q: '56 × 11', a: 616, hint: { en: '5+6=11, write 1, carry 1 → 616', hi: '5+6=11, 1 लिखें, 1 कैरी → 616' } },
      { q: '38 × 11', a: 418, hint: { en: '3+8=11, write 1, carry 1 → 418', hi: '3+8=11, 1 लिखें, 1 कैरी → 418' } },
    ],
    masteredText: { en: 'You can now multiply by 11 in your head!', hi: 'अब आप 11 से गुणा दिमाग में कर सकते हैं!' },
  },
  {
    id: 'multiply-25',
    category: 'multiply',
    difficulty: 1,
    icon: '25',
    en: 'Multiply by 25',
    hi: '25 से गुणा',
    benefitChip: { en: 'No long division', hi: 'लंबा भाग नहीं' },
    duration: '3 min',
    whenToUse: {
      en: 'Best for: money problems, quick mental math',
      hi: 'सबसे अच्छा: पैसे के सवाल, जल्दी मानसिक गणित',
    },
    whenNotToUse: {
      en: 'Numbers not divisible by 4 need an extra step.',
      hi: '4 से न भाज्य अंकों में एक अतिरिक्त कदम लगेगा।',
    },
    whyVedic: [
      { type: 'speed', en: 'Divide by 4, then ×100 — super fast', hi: '4 से भाग, फिर ×100 — बहुत तेज़' },
      { type: 'mental', en: 'Think in quarters (25¢ = quarter dollar)', hi: 'चौथाई में सोचें (25 पैसे = चौथाई)' },
      { type: 'pattern', en: 'Works for 25, 250, 2500…', hi: '25, 250, 2500… पर काम करता है' },
      { type: 'exam', en: 'Common in word problems', hi: 'शब्दों वाले सवालों में आम' },
    ],
    regular: {
      steps: [
        { en: 'Set up 48 × 25', hi: '48 × 25 सेट करें' },
        { en: 'Multiply 48 × 5 = 240', hi: '48 × 5 = 240 गुणा करें' },
        { en: 'Multiply 240 × 5 = 1200', hi: '240 × 5 = 1200 गुणा करें' },
        { en: 'Or use long multiplication', hi: 'या लंबी गुणा करें' },
      ],
      timeEstimate: 25,
    },
    vedic: {
      steps: [
        { en: '48 ÷ 4 = 12', hi: '48 ÷ 4 = 12', proTip: { en: '25 is 100÷4 — so divide first!', hi: '25 = 100÷4 — पहले भाग दें!' } },
        { en: '12 × 100 = 1200', hi: '12 × 100 = 1200', proTip: { en: 'Just add two zeros — instant!', hi: 'बस दो शून्य जोड़ें — तुरंत!' } },
      ],
      pros: ['speed', 'steps', 'mental'],
      timeEstimate: 6,
    },
    practice: [
      { q: '36 × 25', a: 900, hint: { en: '36÷4=9, then ×100', hi: '36÷4=9, फिर ×100' } },
      { q: '52 × 25', a: 1300, hint: { en: '52÷4=13, then ×100', hi: '52÷4=13, फिर ×100' } },
      { q: '64 × 25', a: 1600, hint: { en: '64÷4=16, then ×100', hi: '64÷4=16, फिर ×100' } },
      { q: '88 × 25', a: 2200, hint: { en: '88÷4=22, then ×100', hi: '88÷4=22, फिर ×100' } },
      { q: '44 × 25', a: 1100, hint: { en: '44÷4=11, then ×100', hi: '44÷4=11, फिर ×100' } },
    ],
    masteredText: { en: 'You can crush ×25 problems in seconds!', hi: 'अब आप ×25 के सवाल सेकंडों में हल कर सकते हैं!' },
  },
  {
    id: 'squares-5',
    category: 'squares',
    difficulty: 1,
    icon: '5²',
    en: 'Squares ending in 5',
    hi: '5 पर समाप्त वर्ग',
    benefitChip: { en: 'Instant squares', hi: 'तुरंत वर्ग' },
    duration: '4 min',
    whenToUse: {
      en: 'Best for: squares like 25², 35², 95²',
      hi: 'सबसे अच्छा: 25², 35², 95² जैसे वर्ग',
    },
    whenNotToUse: {
      en: 'Only works when the number ends in 5.',
      hi: 'केवल 5 पर समाप्त संख्याओं पर काम करता है।',
    },
    whyVedic: [
      { type: 'speed', en: 'Answer in 4 quick steps', hi: '4 त्वरित कदमों में जवाब' },
      { type: 'mental', en: 'No multiplication tables needed', hi: 'गुणा तालिका की जरूरत नहीं' },
      { type: 'pattern', en: 'Same rule for any …5 number', hi: 'किसी भी …5 संख्या पर एक नियम' },
      { type: 'confidence', en: 'Looks like magic to friends!', hi: 'दोस्तों को जादू जैसा लगेगा!' },
    ],
    regular: {
      steps: [
        { en: '35 × 35 — set up long multiplication', hi: '35 × 35 — लंबी गुणा सेट करें' },
        { en: '5×5=25, 5×3=15, carry…', hi: '5×5=25, 5×3=15, कैरी…' },
        { en: '3×5=15, 3×3=9, add all', hi: '3×5=15, 3×3=9, सब जोड़ें' },
        { en: 'Answer: 1225', hi: 'जवाब: 1225' },
      ],
      timeEstimate: 30,
    },
    vedic: {
      steps: [
        { en: 'Take 3 (digit before 5 in 35)', hi: '3 लें (35 में 5 से पहले का अंक)', proTip: { en: 'Ignore the 5 for now — focus on the digit before it!', hi: 'अभी 5 को छोड़ें — उससे पहले के अंक पर ध्यान दें!' } },
        { en: 'Next number: 3 + 1 = 4', hi: 'अगली संख्या: 3 + 1 = 4', proTip: { en: 'Always add 1 to the first digit.', hi: 'पहले अंक में हमेशा 1 जोड़ें।' } },
        { en: 'Multiply: 3 × 4 = 12', hi: 'गुणा करें: 3 × 4 = 12', proTip: { en: 'Multiply the two numbers from steps 1 and 2.', hi: 'कदम 1 और 2 की दोनों संख्याओं को गुणा करें।' } },
        { en: 'Append 25 → 1225', hi: '25 जोड़ें → 1225', proTip: { en: 'Squares ending in 5 always end with 25!', hi: '5 पर समाप्त वर्ग हमेशा 25 से समाप्त होते हैं!' } },
      ],
      pros: ['speed', 'mental', 'pattern'],
      timeEstimate: 8,
    },
    practice: [
      { q: '25²', a: 625, hint: { en: '2×3=6, append 25', hi: '2×3=6, 25 जोड़ें' } },
      { q: '45²', a: 2025, hint: { en: '4×5=20, append 25', hi: '4×5=20, 25 जोड़ें' } },
      { q: '65²', a: 4225, hint: { en: '6×7=42, append 25', hi: '6×7=42, 25 जोड़ें' } },
      { q: '85²', a: 7225, hint: { en: '8×9=72, append 25', hi: '8×9=72, 25 जोड़ें' } },
      { q: '15²', a: 225, hint: { en: '1×2=2, append 25', hi: '1×2=2, 25 जोड़ें' } },
    ],
    masteredText: { en: 'You can square any …5 number instantly!', hi: 'अब आप किसी भी …5 संख्या का वर्ग तुरंत निकाल सकते हैं!' },
  },
  {
    id: 'near-base',
    category: 'multiply',
    difficulty: 2,
    icon: '≈',
    en: 'Multiply near 100',
    hi: '100 के पास गुणा',
    benefitChip: { en: 'Big numbers, small work', hi: 'बड़े अंक, कम मेहनत' },
    duration: '5 min',
    whenToUse: {
      en: 'Best for: 98×97, 96×94, numbers close to 100',
      hi: 'सबसे अच्छा: 98×97, 96×94, 100 के पास के अंक',
    },
    whenNotToUse: {
      en: 'When numbers are far from 100, use regular method.',
      hi: 'जब अंक 100 से दूर हों, सामान्य तरीका अपनाएँ।',
    },
    whyVedic: [
      { type: 'speed', en: 'Turn hard multiply into easy subtract', hi: 'कठिन गुणा को आसान घटाव में बदलें' },
      { type: 'mental', en: 'Work with small differences only', hi: 'सिर्फ छोटे अंतर से काम करें' },
      { type: 'pattern', en: 'Base method works for 10, 100, 1000…', hi: 'आधार विधि 10, 100, 1000… पर काम करती है' },
      { type: 'exam', en: 'Saves time in competitive tests', hi: 'प्रतियोगी परीक्षाओं में समय बचाता है' },
    ],
    regular: {
      steps: [
        { en: '98 × 97 — long multiplication', hi: '98 × 97 — लंबी गुणा' },
        { en: '7×8=56, carries everywhere', hi: '7×8=56, हर जगह कैरी' },
        { en: 'Add partial products', hi: 'आंशिक जोड़ें' },
        { en: 'Answer: 9506', hi: 'जवाब: 9506' },
      ],
      timeEstimate: 35,
    },
    vedic: {
      steps: [
        { en: 'Find gaps from 100: 98 → -2, 97 → -3', hi: '100 से अंतर: 98 → -2, 97 → -3', proTip: { en: 'How far is each number from 100?', hi: 'प्रत्येक अंक 100 से कितना दूर है?' } },
        { en: 'Cross subtract: 98 - 3 = 95', hi: 'क्रॉस घटाव: 98 - 3 = 95', proTip: { en: 'Subtract the other number\'s gap (or 97 - 2 = 95).', hi: 'दूसरे अंक का अंतर घटाएँ (या 97 - 2 = 95)।' } },
        { en: 'Multiply gaps: (-2) × (-3) = 6', hi: 'अंतर गुणा: (-2) × (-3) = 6', proTip: { en: 'Negative × negative = positive. Write as 06.', hi: 'ऋण × ऋण = धनात्मक। 06 लिखें।' } },
        { en: 'Join parts: 95 and 06 → 9506', hi: 'भाग जोड़ें: 95 और 06 → 9506', proTip: { en: 'Put the cross result and product side by side.', hi: 'क्रॉस परिणाम और गुणनफल साथ रखें।' } },
      ],
      pros: ['speed', 'mental', 'exam'],
      timeEstimate: 12,
    },
    practice: [
      { q: '99 × 98', a: 9702, hint: { en: '-1 & -2, cross subtract, multiply, join', hi: '-1 और -2, क्रॉस घटाव, गुणा, जोड़ें' } },
      { q: '95 × 96', a: 9120, hint: { en: '-5 & -4 → 91 and 20 → 9120', hi: '-5 और -4 → 91 और 20 → 9120' } },
      { q: '97 × 93', a: 9021, hint: { en: '-3 & -7 → 90 and 21 → 9021', hi: '-3 और -7 → 90 और 21 → 9021' } },
      { q: '94 × 99', a: 9306, hint: { en: '-6 & -1 → 93 and 06 → 9306', hi: '-6 और -1 → 93 और 06 → 9306' } },
      { q: '92 × 98', a: 9016, hint: { en: '-8 & -2 → 90 and 16 → 9016', hi: '-8 और -2 → 90 और 16 → 9016' } },
    ],
    masteredText: { en: 'You can multiply big numbers near 100 easily!', hi: 'अब आप 100 के पास बड़े अंक आसानी से गुणा कर सकते हैं!' },
  },
  {
    id: 'divisibility-9',
    category: 'divide',
    difficulty: 1,
    icon: '9',
    en: 'Divisible by 9?',
    hi: '9 से भाज्य?',
    benefitChip: { en: 'Check in 1 sec', hi: '1 सेकंड में जाँच' },
    duration: '3 min',
    whenToUse: {
      en: 'Best for: checking answers, divisibility rules',
      hi: 'सबसे अच्छा: जवाब जाँचना, भाज्यता नियम',
    },
    whenNotToUse: {
      en: 'To find the actual quotient, you still need division.',
      hi: 'वास्तविक भागफल के लिए भाग करना होगा।',
    },
    whyVedic: [
      { type: 'verify', en: 'Verify any large number instantly', hi: 'किसी भी बड़ी संख्या की तुरंत जाँच' },
      { type: 'speed', en: 'Faster than doing the full division', hi: 'पूरा भाग करने से तेज़' },
      { type: 'exam', en: 'Catch mistakes before submitting', hi: 'जमा करने से पहले गलती पकड़ें' },
      { type: 'pattern', en: 'Digit sum rule works every time', hi: 'अंक जोड़ नियम हर बार काम करता है' },
    ],
    regular: {
      steps: [
        { en: 'Divide 4,536 ÷ 9 using long division', hi: '4,536 ÷ 9 लंबा भाग करें' },
        { en: '9 into 45 = 5, subtract…', hi: '45 में 9 = 5, घटाएँ…' },
        { en: 'Bring down digits, repeat', hi: 'अंक नीचे लाएँ, दोहराएँ' },
        { en: 'Takes 30+ seconds', hi: '30+ सेकंड लगते हैं' },
      ],
      timeEstimate: 28,
    },
    vedic: {
      steps: [
        { en: 'Add all digits: 4 + 5 + 3 + 6 = 18', hi: 'सभी अंक जोड़ें: 4 + 5 + 3 + 6 = 18', proTip: { en: 'Add every digit of the number.', hi: 'संख्या का हर अंक जोड़ें।' } },
        { en: 'Check digit sum: 18 ÷ 9 = 2 ✓', hi: 'अंक-योग जाँचें: 18 ÷ 9 = 2 ✓', proTip: { en: 'If the sum divides by 9, the number does too. (If sum > 9, add digits again: 1+8=9)', hi: 'योग 9 से भाज्य हो तो संख्या भी। (योग > 9 हो तो फिर जोड़ें: 1+8=9)' } },
        { en: 'Yes — 4,536 is divisible by 9', hi: 'हाँ — 4,536, 9 से भाज्य है', proTip: { en: 'Use this to verify answers without full division.', hi: 'पूरा भाग किए बिना जवाब जाँचने के लिए उपयोग करें।' } },
      ],
      pros: ['verify', 'speed', 'exam'],
      timeEstimate: 4,
    },
    practice: [
      { q: 'Is 2,871 divisible by 9?', a: 1, hint: { en: '2+8+7+1=18, yes!', hi: '2+8+7+1=18, हाँ!' }, isYesNo: true },
      { q: 'Is 5,436 divisible by 9?', a: 1, hint: { en: '5+4+3+6=18, yes!', hi: '5+4+3+6=18, हाँ!' }, isYesNo: true },
      { q: 'Is 1,234 divisible by 9?', a: 0, hint: { en: '1+2+3+4=10, no', hi: '1+2+3+4=10, नहीं' }, isYesNo: true },
      { q: 'Is 9,999 divisible by 9?', a: 1, hint: { en: '9+9+9+9=36, yes!', hi: '9+9+9+9=36, हाँ!' }, isYesNo: true },
      { q: 'Is 7,263 divisible by 9?', a: 1, hint: { en: '7+2+6+3=18, yes!', hi: '7+2+6+3=18, हाँ!' }, isYesNo: true },
    ],
    masteredText: { en: 'You can check divisibility by 9 in a flash!', hi: 'अब आप 9 से भाज्यता झटपट जाँच सकते हैं!' },
  },
  {
    id: 'complement-10',
    category: 'mental',
    difficulty: 1,
    icon: '10',
    en: 'Complements to 10',
    hi: '10 तक पूरक',
    benefitChip: { en: 'Lightning add', hi: 'बिजली जैसी जोड़' },
    duration: '3 min',
    whenToUse: {
      en: 'Best for: adding long columns, mental addition',
      hi: 'सबसे अच्छा: लंबे जोड़, मानसिक जोड़',
    },
    whenNotToUse: {
      en: 'Simple 2-number adds may not need this trick.',
      hi: 'साधारण 2-अंक जोड़ में यह तरीका जरूरी नहीं।',
    },
    whyVedic: [
      { type: 'speed', en: 'Add left-to-right, no carrying mess', hi: 'बाएँ से दाएँ जोड़ें, कैरी की झंझट नहीं' },
      { type: 'mental', en: 'Pairs that make 10 simplify everything', hi: '10 बनाने वाले जोड़े सब आसान करते हैं' },
      { type: 'confidence', en: 'Foundation for all Vedic maths', hi: 'सभी वैदिक गणित की नींव' },
      { type: 'pattern', en: '7+3, 6+4, 8+2 — always 10', hi: '7+3, 6+4, 8+2 — हमेशा 10' },
    ],
    regular: {
      steps: [
        { en: 'Add 47 + 38 right to left', hi: '47 + 38 दाएँ से बाएँ जोड़ें' },
        { en: '7+8=15, write 5 carry 1', hi: '7+8=15, 5 लिखें 1 कैरी' },
        { en: '4+3+1=8', hi: '4+3+1=8' },
        { en: 'Answer: 85', hi: 'जवाब: 85' },
      ],
      timeEstimate: 15,
    },
    vedic: {
      steps: [
        { en: 'Round 38 up to 40 (add 2)', hi: '38 को 40 पर पूर्णांक करें (+2)', proTip: { en: 'Find the next easy round number.', hi: 'अगली आसान पूर्ण संख्या खोजें।' } },
        { en: 'Balance: take 2 from 47 → 45', hi: 'संतुलन: 47 से 2 लें → 45', proTip: { en: 'Subtract the same amount from the other number.', hi: 'दूसरी संख्या से उतना ही घटाएँ।' } },
        { en: 'Add the round number: 45 + 40 = 85', hi: 'पूर्ण संख्या जोड़ें: 45 + 40 = 85', proTip: { en: 'Now the addition is easy!', hi: 'अब जोड़ आसान है!' } },
      ],
      pros: ['mental', 'speed', 'confidence'],
      timeEstimate: 6,
    },
    practice: [
      { q: '67 + 29', a: 96, hint: { en: '29→30, 67-1=66, 66+30=96', hi: '29→30, 67-1=66, 66+30=96' } },
      { q: '48 + 37', a: 85, hint: { en: '37→40, 48-3=45, 45+40=85', hi: '37→40, 48-3=45, 45+40=85' } },
      { q: '56 + 28', a: 84, hint: { en: '28→30, 56-2=54, 54+30=84', hi: '28→30, 56-2=54, 54+30=84' } },
      { q: '39 + 46', a: 85, hint: { en: '39→40, 46-1=45, 45+40=85', hi: '39→40, 46-1=45, 45+40=85' } },
      { q: '58 + 27', a: 85, hint: { en: '27→30, 58-3=55, 55+30=85', hi: '27→30, 58-3=55, 55+30=85' } },
    ],
    masteredText: { en: 'You add numbers smarter using complements!', hi: 'अब आप पूरक से होशियारी से जोड़ते हैं!' },
  },
  {
    id: 'percent-10',
    category: 'percent',
    difficulty: 1,
    icon: '10%',
    en: 'Find 10% fast',
    hi: '10% जल्दी निकालें',
    benefitChip: { en: 'Move the dot', hi: 'बिंदु हिलाएँ' },
    duration: '3 min',
    whenToUse: {
      en: 'Best for: discounts, tips, marks, quick estimates',
      hi: 'सबसे अच्छा: छूट, टिप, अंक, जल्दी अनुमान',
    },
    whenNotToUse: {
      en: 'Weird percentages like 13% need the build-from-10% trick.',
      hi: '13% जैसे अजीब प्रतिशत के लिए 10% से बनाने की विधि लगेगी।',
    },
    whyVedic: [
      { type: 'speed', en: '10% = divide by 10 in one move', hi: '10% = एक ही कदम में 10 से भाग' },
      { type: 'mental', en: 'Just shift the decimal point left', hi: 'बस दशमलव बिंदु बाएँ खिसकाएँ' },
      { type: 'pattern', en: 'Foundation for 5%, 15%, 20%…', hi: '5%, 15%, 20%… की नींव' },
      { type: 'exam', en: 'Super common in word problems', hi: 'शब्दों वाले सवालों में बहुत आम' },
    ],
    regular: {
      steps: [
        { en: '10% of 240 — set up proportion', hi: '240 का 10% — अनुपात बनाएँ' },
        { en: '10/100 × 240', hi: '10/100 × 240' },
        { en: 'Simplify: 240 ÷ 10', hi: 'सरल करें: 240 ÷ 10' },
        { en: 'Answer: 24', hi: 'जवाब: 24' },
      ],
      timeEstimate: 20,
    },
    vedic: {
      steps: [
        { en: '10% means 1 out of every 10', hi: '10% का मतलब हर 10 में से 1', proTip: { en: '10% is always one-tenth of the number.', hi: '10% हमेशा संख्या का एक-दसवाँ होता है।' } },
        { en: 'Divide by 10: 240 ÷ 10 = 24', hi: '10 से भाग: 240 ÷ 10 = 24', proTip: { en: 'Or move the decimal one place left: 240. → 24.0', hi: 'या दशमलव एक स्थान बाएँ: 240. → 24.0' } },
        { en: 'Answer: 10% of 240 = 24', hi: 'जवाब: 240 का 10% = 24', proTip: { en: 'Use this as the base for 5%, 15%, 20% and more!', hi: 'इसे 5%, 15%, 20% और अधिक के आधार के रूप में उपयोग करें!' } },
      ],
      pros: ['speed', 'mental', 'pattern'],
      timeEstimate: 5,
    },
    practice: [
      { q: '10% of 80', a: 8, hint: { en: '80 ÷ 10 = 8', hi: '80 ÷ 10 = 8' } },
      { q: '10% of 350', a: 35, hint: { en: '350 ÷ 10 = 35', hi: '350 ÷ 10 = 35' } },
      { q: '10% of 120', a: 12, hint: { en: '120 ÷ 10 = 12', hi: '120 ÷ 10 = 12' } },
      { q: '10% of 500', a: 50, hint: { en: '500 ÷ 10 = 50', hi: '500 ÷ 10 = 50' } },
      { q: '10% of 90', a: 9, hint: { en: '90 ÷ 10 = 9', hi: '90 ÷ 10 = 9' } },
    ],
    masteredText: { en: 'You can find 10% of anything in a second!', hi: 'अब आप किसी भी संख्या का 10% एक सेकंड में निकाल सकते हैं!' },
  },
  {
    id: 'percent-25',
    category: 'percent',
    difficulty: 1,
    icon: '25%',
    en: 'Find 25% fast',
    hi: '25% जल्दी निकालें',
    benefitChip: { en: 'Just ÷ 4', hi: 'बस ÷ 4' },
    duration: '3 min',
    whenToUse: {
      en: 'Best for: quarter-off sales, 25% marks, splitting in 4',
      hi: 'सबसे अच्छा: चौथाई छूट, 25% अंक, 4 में बाँटना',
    },
    whenNotToUse: {
      en: 'For 33% or other fractions, use a different shortcut.',
      hi: '33% या अन्य भिन्न के लिए दूसरा शॉर्टकट उपयोग करें।',
    },
    whyVedic: [
      { type: 'speed', en: '25% = divide by 4 instantly', hi: '25% = तुरंत 4 से भाग' },
      { type: 'mental', en: '25% is the same as one quarter', hi: '25% = एक चौथाई के बराबर' },
      { type: 'pattern', en: 'Works for 25, 250, 2500…', hi: '25, 250, 2500… पर काम करता है' },
      { type: 'exam', en: 'Quarter fractions appear everywhere', hi: 'चौथाई भिन्न हर जगह आते हैं' },
    ],
    regular: {
      steps: [
        { en: '25% of 80 — set up proportion', hi: '80 का 25% — अनुपात बनाएँ' },
        { en: '25/100 × 80 = 1/4 × 80', hi: '25/100 × 80 = 1/4 × 80' },
        { en: '80 ÷ 4 = 20', hi: '80 ÷ 4 = 20' },
        { en: 'Answer: 20', hi: 'जवाब: 20' },
      ],
      timeEstimate: 18,
    },
    vedic: {
      steps: [
        { en: '25% = 1/4 (one quarter)', hi: '25% = 1/4 (एक चौथाई)', proTip: { en: 'Think “quarter” — 25¢ is a quarter of ₹1', hi: '“चौथाई” सोचें — 25 पैसे = ₹1 का चौथाई' } },
        { en: 'Divide by 4: 80 ÷ 4 = 20', hi: '4 से भाग: 80 ÷ 4 = 20', proTip: { en: 'Half of half also works: 80→40→20', hi: 'आधा-आधा भी चलेगा: 80→40→20' } },
        { en: 'Answer: 25% of 80 = 20', hi: 'जवाब: 80 का 25% = 20', proTip: { en: 'Same trick as ×25 — divide by 4 first!', hi: '×25 जैसा ही — पहले 4 से भाग!' } },
      ],
      pros: ['speed', 'mental', 'pattern'],
      timeEstimate: 6,
    },
    practice: [
      { q: '25% of 60', a: 15, hint: { en: '60 ÷ 4 = 15', hi: '60 ÷ 4 = 15' } },
      { q: '25% of 200', a: 50, hint: { en: '200 ÷ 4 = 50', hi: '200 ÷ 4 = 50' } },
      { q: '25% of 48', a: 12, hint: { en: '48 ÷ 4 = 12', hi: '48 ÷ 4 = 12' } },
      { q: '25% of 100', a: 25, hint: { en: '100 ÷ 4 = 25', hi: '100 ÷ 4 = 25' } },
      { q: '25% of 36', a: 9, hint: { en: '36 ÷ 4 = 9', hi: '36 ÷ 4 = 9' } },
    ],
    masteredText: { en: 'You can find 25% by dividing by 4!', hi: 'अब आप 25% चार से भाग करके निकाल सकते हैं!' },
  },
  {
    id: 'percent-build',
    category: 'percent',
    difficulty: 2,
    icon: '15%',
    en: 'Build % from 10%',
    hi: '10% से % बनाएँ',
    benefitChip: { en: 'Mix & match', hi: 'मिलाएँ और बनाएँ' },
    duration: '4 min',
    whenToUse: {
      en: 'Best for: 5%, 15%, 20%, 30% — any % built from 10%',
      hi: 'सबसे अच्छा: 5%, 15%, 20%, 30% — 10% से बनने वाले सभी %',
    },
    whenNotToUse: {
      en: 'For 10% or 25%, use the direct shortcuts instead.',
      hi: '10% या 25% के लिए सीधे शॉर्टकट उपयोग करें।',
    },
    whyVedic: [
      { type: 'pattern', en: '5% = half of 10%, 20% = double 10%', hi: '5% = 10% का आधा, 20% = 10% का दोगुना' },
      { type: 'mental', en: 'Break any % into easy pieces', hi: 'किसी भी % को आसान टुकड़ों में तोड़ें' },
      { type: 'speed', en: 'Faster than setting up fractions', hi: 'भिन्न बनाने से तेज़' },
      { type: 'exam', en: 'Handles 15%, 35%, 45% in exams', hi: 'परीक्षा में 15%, 35%, 45% हल करता है' },
    ],
    regular: {
      steps: [
        { en: '15% of 200 — set up 15/100 × 200', hi: '200 का 15% — 15/100 × 200 बनाएँ' },
        { en: 'Simplify: 15 × 200 ÷ 100', hi: 'सरल करें: 15 × 200 ÷ 100' },
        { en: 'Calculate: 3000 ÷ 100 = 30', hi: 'गणना: 3000 ÷ 100 = 30' },
        { en: 'Answer: 30', hi: 'जवाब: 30' },
      ],
      timeEstimate: 25,
    },
    vedic: {
      steps: [
        { en: 'Split 15% = 10% + 5%', hi: '15% = 10% + 5% में तोड़ें', proTip: { en: 'Break the % into 10% chunks you know!', hi: '% को ज्ञात 10% के टुकड़ों में तोड़ें!' } },
        { en: 'Find 10% of 200: 200 ÷ 10 = 20', hi: '200 का 10%: 200 ÷ 10 = 20', proTip: { en: 'Always find 10% first — it\'s the building block.', hi: 'हमेशा पहले 10% निकालें — यह नींव है।' } },
        { en: 'Find 5%: half of 20 = 10', hi: '5%: 20 का आधा = 10', proTip: { en: '5% is always half of 10%.', hi: '5% हमेशा 10% का आधा होता है।' } },
        { en: 'Add: 20 + 10 = 30', hi: 'जोड़ें: 20 + 10 = 30', proTip: { en: '20% would be 20+20=40. Easy!', hi: '20% होगा 20+20=40। आसान!' } },
      ],
      pros: ['pattern', 'mental', 'exam'],
      timeEstimate: 10,
    },
    practice: [
      { q: '15% of 200', a: 30, hint: { en: '10%=20, 5%=10, add=30', hi: '10%=20, 5%=10, जोड़=30' } },
      { q: '20% of 150', a: 30, hint: { en: '10%=15, double=30', hi: '10%=15, दोगुना=30' } },
      { q: '5% of 80', a: 4, hint: { en: '10%=8, half=4', hi: '10%=8, आधा=4' } },
      { q: '30% of 100', a: 30, hint: { en: '10%=10, triple=30', hi: '10%=10, तिगुना=30' } },
      { q: '15% of 60', a: 9, hint: { en: '10%=6, 5%=3, add=9', hi: '10%=6, 5%=3, जोड़=9' } },
    ],
    masteredText: { en: 'You can build any % from 10% pieces!', hi: 'अब आप 10% के टुकड़ों से कोई भी % बना सकते हैं!' },
  },
];

export const DAILY_CHALLENGE = {
  pro: { en: 'Today: speed + mental maths', hi: 'आज: तेज़ी + दिमागी गणित' },
  techniques: ['multiply-11', 'squares-5', 'complement-10'],
};

export function getTechnique(id) {
  return TECHNIQUES.find((t) => t.id === id);
}

export function getTechniquesByCategory(categoryId) {
  return TECHNIQUES.filter((t) => t.category === categoryId);
}
