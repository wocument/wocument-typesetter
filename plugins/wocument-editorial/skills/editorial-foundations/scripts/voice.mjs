#!/usr/bin/env node
// voice.mjs: measures how a text is written (sentence length, word difficulty, person, questions,
// quotes, numbers, punctuation habits, spelling) and, with --compare, ranks the profiles whose
// writing is closest. Plain Node, no dependencies. Text only: it never reads or writes pictures.
//
//   node voice.mjs article.md                    a readable table
//   node voice.mjs article.md --json             the measures as JSON
//   node voice.mjs article.md --compare voice-fingerprints.json
//   node voice.mjs p1.txt p2.txt ... --json      several files are measured as one text
//
// Markdown headings, front matter, tables and Wocument commands (\name[...]) are removed first.
// Lines broken inside a word ("exam-\nple") are joined. Fragments that are not sentences
// (headings, labels, captions without a full stop) are dropped, so the numbers describe prose.
import { readFileSync } from 'node:fs';

export const MEASURES = {
  sentence_words: 'Average words per sentence',
  long_sentences: 'Sentences of 30 words or more (%)',
  short_sentences: 'Sentences of 8 words or fewer (%)',
  word_letters: 'Average letters per word',
  hard_words: 'Words of 3 syllables or more (%)',
  grade: 'Reading grade (Flesch-Kincaid, school years)',
  i_rate: '"I, me, my" per 1,000 words',
  we_rate: '"we, us, our" per 1,000 words',
  you_rate: '"you, your" per 1,000 words',
  questions: 'Questions (% of sentences)',
  exclamations: 'Exclamations (% of sentences)',
  quotes: 'Quoted passages per 1,000 words',
  numbers: 'Numbers per 1,000 words',
  contractions: 'Contractions per 1,000 words',
  dashes: 'Dashes per 1,000 words',
  semicolons: 'Semicolons per 1,000 words',
  diversity: 'Vocabulary range (moving type-token ratio, 0 to 1)',
};

export function clean(text) {
  return text
    .replace(/^---\n[\s\S]*?\n---\n/, '')               // front matter
    .replace(/```[\s\S]*?```/g, '')                     // code blocks
    .replace(/%%.*$/gm, '')                             // Wocument comments
    .replace(/\\[a-zA-Z]+(\[[^\]]*\])?/g, ' ')          // Wocument commands
    .replace(/[{}]/g, ' ')
    .replace(/^\s*(#|>|\||-{3,}|\*{3,}).*$/gm, '')      // headings, quotes blocks, tables, rules
    .replace(/(\w)-\s*\n\s*([a-z])/g, '$1$2')           // word broken over a line
    .replace(/[ \t]*\n[ \t]*/g, '\n');
}

const ABBR = /\b(Mr|Mrs|Ms|Dr|St|Jr|Sr|Prof|Gen|Gov|Sen|Rep|vs|etc|e\.g|i\.e|U\.S|U\.K|No|Inc|Ltd|Co|Corp|Mt|approx)\.$/i;

export function sentences(text) {
  const flat = text.replace(/\n{2,}/g, ' ¶ ').replace(/\n/g, ' ').replace(/\s+/g, ' ');
  const out = [];
  let cur = '';
  for (const tok of flat.split(' ')) {
    if (tok === '¶') { if (cur) out.push({ s: cur.trim(), end: false }); cur = ''; continue; }
    cur += (cur ? ' ' : '') + tok;
    if (/[.!?]["”’)\]]*$/.test(tok) && !ABBR.test(tok.replace(/["”’)\]]+$/, '')) && !/^[A-Z]\.$/.test(tok)) {
      out.push({ s: cur.trim(), end: true }); cur = '';
    }
  }
  if (cur.trim()) out.push({ s: cur.trim(), end: false });
  // keep real sentences only: ends with . ! ?, 3 to 80 words, mostly words, starts like a sentence
  return out.filter(({ s, end }) => {
    if (!end) return false;
    const w = words(s);
    if (w.length < 3 || w.length > 80) return false;
    const alpha = w.filter(x => /[a-z]/i.test(x)).length;
    return alpha / w.length > 0.7 && /^["“‘'(\[]?[A-Z0-9]/.test(s);
  }).map(x => x.s);
}

export const words = s => s.match(/[A-Za-z0-9][A-Za-z0-9'’.,%-]*/g)?.map(w => w.replace(/[.,]+$/, '')) ?? [];

export function syllables(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const s = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '').match(/[aeiouy]{1,2}/g);
  return Math.max(1, s ? s.length : 1);
}

function mattr(tokens, win = 500) {
  if (tokens.length < win) return tokens.length ? new Set(tokens).size / tokens.length : 0;
  let sum = 0, n = 0;
  for (let i = 0; i + win <= tokens.length; i += 50) { sum += new Set(tokens.slice(i, i + win)).size / win; n++; }
  return sum / n;
}

const UK = /\b(colour|favour|honour|labour|neighbour|behaviour|centre|theatre|metre|organis\w*|realis\w*|recognis\w*|programme|travell\w*|defence|licence|grey|whilst|amongst)\b/gi;
const US = /\b(color|favor|honor|labor|neighbor|behavior|center|theater|meter|organiz\w*|realiz\w*|recogniz\w*|travel(ed|ing)|defense|gray)\b/gi;

export function measure(raw) {
  const text = clean(raw);
  const sents = sentences(text);
  const body = sents.join(' ');
  const ws = words(body);
  const n = ws.length || 1, ns = sents.length || 1;
  const per1k = re => ((body.match(re) || []).length / n) * 1000;
  const lens = sents.map(s => words(s).length);
  const syl = ws.map(syllables);
  const r = x => Math.round(x * 10) / 10;
  const uk = (body.match(UK) || []).length, us = (body.match(US) || []).length;
  return {
    words: ws.length,
    sentences: sents.length,
    sentence_words: r(n / ns),
    long_sentences: r(100 * lens.filter(l => l >= 30).length / ns),
    short_sentences: r(100 * lens.filter(l => l <= 8).length / ns),
    word_letters: r(ws.reduce((a, w) => a + w.replace(/[^A-Za-z]/g, '').length, 0) / n),
    hard_words: r(100 * syl.filter(s => s >= 3).length / n),
    grade: r(0.39 * (n / ns) + 11.8 * (syl.reduce((a, b) => a + b, 0) / n) - 15.59),
    i_rate: r(per1k(/\b(I|me|my|mine|myself)\b/g)),
    we_rate: r(per1k(/\b(we|us|our|ours|ourselves)\b/gi)),
    you_rate: r(per1k(/\b(you|your|yours|yourself)\b/gi)),
    questions: r(100 * sents.filter(s => /\?["”’)]*$/.test(s)).length / ns),
    exclamations: r(100 * sents.filter(s => /![”"’)]*$/.test(s)).length / ns),
    // opening double marks, opening single marks (British style; not apostrophes, which are ’), straight pairs
    quotes: r((((body.match(/“/g) || []).length + (body.match(/(^|[\s(—–-])‘(?=\w)/g) || []).length + (body.match(/"/g) || []).length / 2) / n) * 1000),
    numbers: r(per1k(/\b\d[\d,.]*%?/g)),
    contractions: r(per1k(/\b\w+['’](s|t|re|ve|ll|d|m)\b/gi)),
    dashes: r(per1k(/—|–| - /g)),
    semicolons: r(per1k(/;/g)),
    diversity: Math.round(mattr(ws.map(w => w.toLowerCase())) * 1000) / 1000,
    spelling: uk + us < 5 ? 'unclear' : uk > us * 2 ? 'British' : us > uk * 2 ? 'American' : 'mixed',
  };
}

// Distance in standard deviations of the reference set, over the measures listed in `keys`.
export function compare(m, ref) {
  const keys = Object.keys(ref.spread);
  return ref.profiles.map(p => {
    const diffs = keys.map(k => ({ k, z: (m[k] - p.voice[k]) / (ref.spread[k] || 1) }));
    const dist = Math.sqrt(diffs.reduce((a, d) => a + d.z * d.z, 0) / keys.length);
    const far = diffs.filter(d => Math.abs(d.z) >= 1.5).sort((a, b) => Math.abs(b.z) - Math.abs(a.z))
      .map(d => `${d.k} ${d.z > 0 ? 'higher' : 'lower'}`);
    return { profile: p.profile, distance: Math.round(dist * 100) / 100, differs: far.slice(0, 3) };
  }).sort((a, b) => a.distance - b.distance);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const files = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--compare');
  if (!files.length) { console.error('usage: node voice.mjs <text files...> [--json] [--compare fingerprints.json]'); process.exit(2); }
  const m = measure(files.map(f => readFileSync(f, 'utf8')).join('\n\n'));
  const ci = args.indexOf('--compare');
  const ranked = ci >= 0 ? compare(m, JSON.parse(readFileSync(args[ci + 1], 'utf8'))) : null;
  if (args.includes('--json')) { console.log(JSON.stringify(ranked ? { voice: m, closest: ranked } : m, null, 2)); process.exit(0); }
  if (m.sentences < 20) console.log(`Note: only ${m.sentences} sentences found; the measures are rough.\n`);
  console.log(`| Measure | Value |\n|---|---|`);
  console.log(`| Words / sentences measured | ${m.words} / ${m.sentences} |`);
  for (const [k, label] of Object.entries(MEASURES)) console.log(`| ${label} | ${m[k]} |`);
  console.log(`| Spelling | ${m.spelling} |`);
  if (ranked) {
    console.log(`\nClosest profiles by writing (0 = the same; above 1.5 = clearly different):\n`);
    console.log(`| Profile | Distance | Differs most in |\n|---|---|---|`);
    for (const x of ranked) console.log(`| ${x.profile} | ${x.distance} | ${x.differs.join(', ') || '—'} |`);
  }
}
