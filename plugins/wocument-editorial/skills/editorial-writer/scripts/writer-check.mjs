#!/usr/bin/env node
// writer-check.mjs: checks a piece written or edited by the editorial-writer skill.
//
//   node writer-check.mjs <output.md> --source <notes or draft> [--source <more>]
//
// 1. Quotes: every quoted passage of 3 words or more must appear word for word in a source.
// 2. Numbers: every number in the output must appear in a source (digits and number words both
//    count, so "forty-two" matches "42"; "20%" matches "20 per cent").
// 3. Claims: words that characterise a person ("cheerful", "blunt") or raise the stakes
//    ("biggest", "betting its future") and do not appear in a source.
// 4. Slop: stock phrases and patterns that make text read as machine-written.
// Slop that already appears in a source (the author's own words) is not flagged.
// Exit code 1 when a quote, number or claim word is not found in the sources; slop findings are printed
// for the writer to fix or justify, and do not change the exit code.
import { readFileSync } from 'node:fs';

const UNITS = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split(' ');
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function wordsToDigits(text) {
  // "forty-two" -> 42, "three hundred" -> 300, "a dozen" -> 12; leaves everything else alone
  const unit = `(${UNITS.join('|')})`, ten = `(${TENS.filter(Boolean).join('|')})`;
  const re = new RegExp(`\\b(?:${unit}\\s+hundred(?:\\s+and)?\\s+)?(?:${ten}(?:[-\\s]${unit})?|${unit})\\b|\\b${unit}\\s+hundred\\b|\\bdozen\\b`, 'gi');
  return text.replace(re, m => {
    const w = m.toLowerCase().split(/[-\s]+/).filter(x => x !== 'and');
    if (w[0] === 'dozen') return '12';
    let n = 0, cur = 0;
    for (const x of w) {
      if (x === 'hundred') { cur = (cur || 1) * 100; continue; }
      const u = UNITS.indexOf(x), t = TENS.indexOf(x);
      cur += u >= 0 ? u : t >= 0 ? t * 10 : 0;
    }
    n += cur;
    return String(n);
  });
}
const norm = s => wordsToDigits(s)
  .replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[—–]/g, '-')
  .replace(/\bper ?cent\b/gi, '%').replace(/\s+%/g, '%')
  .replace(/(\d),(\d{3})\b/g, '$1$2')
  .replace(/\s+/g, ' ').toLowerCase();

const numbers = s => [...new Set((norm(s).match(/\d+(?:\.\d+)?/g) || []))];

function quotes(s) {
  const out = [];
  for (const m of s.matchAll(/“([^”]+)”|"([^"\n]+)"/g)) {
    for (const part of (m[1] ?? m[2]).split(/\.\.\.|…|\[[^\]]*\]/)) {
      const p = part.replace(/^[\s,.;:!?'-]+|[\s,.;:!?'-]+$/g, '');
      if (p.split(/\s+/).length >= 3) out.push(p);
    }
  }
  return out;
}

export const SLOP = [
  [/\b(?:it|this|that|they|he|she)(?:'s| is| was| are| were)n?'?t? (?:just |only |simply |merely )?(?:about )?[^.?!]{1,60}[.;,—–-]\s*(?:it|this|that|they|he|she)(?:'s| is| was| are| were)\b/gi, 'Contrast frame ("it is not X. It is Y."). Say what it is, once.'],
  [/\b(?:is|was|are|were)(?:n't| not) [^.?!]{1,50}\.\s+(?:It|This|That|They|He|She) (?:is|was|are|were)\b/g, 'Contrast frame ("the problem is not X. It is Y."). Say what it is, once.'],
  [/\bnot (?:just|only|merely) [^.?!]{1,60}, but\b/gi, 'Contrast frame ("not just X, but Y"). Say what it is.'],
  [/\b(?:delve|delving|tapestry|testament to|navigat(?:e|ing) the (?:complex|challeng)|ever-(?:evolving|changing)|game-?changer|revolutioni[sz]e|unlock(?:s|ing)? (?:the |its |their )?potential|seamless(?:ly)?|cutting-edge|a myriad of|plethora|in the realm of|embark(?:s|ed|ing)? on|harness(?:es|ing)? the power|at the end of the day|it(?:'s| is) worth noting|needless to say|in conclusion|let that sink in|buckle up|here's the (?:thing|kicker)|make no mistake|picture this|imagine a world|nestled|bustling|boasts|underscores|showcas(?:e|es|ing)|foster(?:s|ing)?|interplay|pivotal|a reminder that|serves as a|stands as a)\b/gi, 'Stock phrase that reads as machine-written. Use a plain, specific word.'],
  [/\bin today's (?:fast-paced|digital|modern|ever-changing|world)\b/gi, 'Empty scene-setting. Start with something specific.'],
  [/\b(?:the idea is simple|the answer is simple|it's simple(?:, really)?)\b/gi, 'Announcing simplicity. Just explain it.'],
  [/\b(?:The|Its|Their|His|Her) (?:answer|result|catch|twist|problem|kicker|secret|verdict)\? /g, 'Question-then-reveal trick. Use it at most once, and only if the voice guide allows it.'],
  [/\b(?:may|might|could) (?:potentially|possibly)\b/gi, 'Stacked hedge. Keep one word of doubt, or state the fact.'],
  [/\b(?:truly|incredibly|profoundly|deeply resonat\w*)\b/gi, 'Empty intensifier. Cut it or give the detail that earns it.'],
  [/[\u{1F300}-\u{1FAFF}]|(?:^|\s)#[A-Za-z]\w+/gu, 'Emoji or hashtag in editorial text.'],
];

// Words that characterise a person or raise the stakes. Each one is a claim: when it is not in a
// source, the writer must cut it or let a quote carry the tone instead.
export const CLAIMS = /\b(?:cheerful|cheerfully|blunt|bluntly|candid|candidly|frank|frankly|confident|defiant|modest|proud|proudly|nervous|excited|optimistic|pessimistic|sceptical|skeptical|wry|wryly|unsentimental|plain-spoken|plainspoken|dress (?:it|this|that) up|bet(?:s|ting)? (?:its|their|his|her|the) (?:future|company|house)|biggest|largest|smallest|best|worst|first-ever|only one|unique|circling|race to|revolution|breakthrough|famously|notorious|beloved|iconic|legendary|start-?up|young|veteran|sells|sold|selling|pays|paid|profitable|booming)\b/gi;

export function check(output, sources) {
  const src = norm(sources.join('\n\n'));
  const srcNums = new Set(numbers(sources.join('\n\n')));
  const badQuotes = quotes(output).filter(q => !src.includes(norm(q)));
  const badNumbers = numbers(output).filter(n => !srcNums.has(n));
  const slop = [];
  output.split('\n').forEach((line, i) => {
    // slop the author wrote in a source is theirs to keep; only flag what the writer added
    for (const [re, fix] of SLOP) for (const m of line.matchAll(re)) {
      if (src.includes(norm(m[0]))) continue;
      if (slop.some(x => x.line === i + 1 && x.text.includes(m[0].trim()))) continue;
      slop.push({ line: i + 1, text: m[0].trim(), fix });
    }
  });
  const claims = [];
  output.split('\n').forEach((line, i) => {
    for (const m of line.matchAll(CLAIMS)) if (!src.includes(norm(m[0]))) claims.push({ line: i + 1, text: m[0] });
  });
  return { badQuotes, badNumbers, slop, claims };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const out = args[0];
  const sources = args.flatMap((a, i) => args[i - 1] === '--source' ? [a] : []);
  if (!out || !sources.length) { console.error('usage: node writer-check.mjs <output.md> --source <file> [--source <file>]'); process.exit(2); }
  const r = check(readFileSync(out, 'utf8'), sources.map(f => readFileSync(f, 'utf8')));
  console.log(`Quotes not found word for word in the sources: ${r.badQuotes.length}`);
  r.badQuotes.forEach(q => console.log(`  - "${q}"`));
  console.log(`Numbers not found in the sources: ${r.badNumbers.length}`);
  r.badNumbers.forEach(n => console.log(`  - ${n}`));
  console.log(`Slop patterns: ${r.slop.length}`);
  r.slop.forEach(s => console.log(`  - line ${s.line}: "${s.text}" — ${s.fix}`));
  console.log(`Characterising or stakes words not in the sources: ${r.claims.length}`);
  r.claims.forEach(c => console.log(`  - line ${c.line}: "${c.text}" — a claim about a person or the stakes. Cut it, or point to the source that says it.`));
  process.exit(r.badQuotes.length || r.badNumbers.length || r.claims.length ? 1 : 0);
}
