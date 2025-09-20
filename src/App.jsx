import React, { useEffect, useMemo, useRef, useState } from "react";

// ===============================
//  Quiz Français DNB (3e)
//  v2.1 — Fix regex CSV, strings, + self-tests; Import 200+ QCM, Mode Examen, Dashboard
// ===============================

/**
 * Question schema
 * id: string
 * prompt: string
 * choices: string[4]
 * answerIndex: number 0..3
 * level: 1..5 (5 = le plus difficile)
 * tags: string[] (ex: ["orthographe","grammaire",...])
 * explain: string
 */

const DEFAULT_BANK = [
  // --- échantillon minimal (remplacé après import) ---
  {
    id: "ex1",
    prompt:
      "Accord du participe passé : Les lettres qu'elle a ___ hier sont sur la table.",
    choices: ["écrits", "écrites", "écrit", "écrite"],
    answerIndex: 1,
    level: 4,
    tags: ["orthographe", "accord"],
    explain:
      "Avec l'auxiliaire avoir, le participe s'accorde avec le COD (les lettres) placé avant : ‘écrites’."
  },
  {
    id: "ex2",
    prompt: "Quelle est la fonction : ‘Paul mange **une pomme**’.",
    choices: ["Sujet", "COD", "COI", "Attribut"],
    answerIndex: 1,
    level: 2,
    tags: ["grammaire", "fonctions"],
    explain: "‘Une pomme’ est COD."
  }
];

const LEVELS = [1, 2, 3, 4, 5];
const TAGS = [
  "orthographe",
  "grammaire",
  "conjugaison",
  "vocabulaire",
  "compréhension",
  "ponctuation",
  "lecture",
  "figures",
  "accord"
];

const STORAGE_KEY = "dnb-fr-quiz-progress-v2";
const STORAGE_BANK = "dnb-fr-quiz-bank-v2";

function hasLocalStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

// ---------- utils stockage ----------
function loadJSON(key, fallback) {
  if (!hasLocalStorage()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}
function saveJSON(key, value) {
  if (!hasLocalStorage()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignorer les erreurs de quota ou d'accès
  }
}

// ---------- helpers ----------
export function pickN(arr, n) {
  const copy = [...arr];
  const out = [];
  while (copy.length && out.length < n) {
    const i = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
}

export function analyzeWeaknesses(results) {
  const counts = {};
  results.forEach((r) => {
    r.q.tags.forEach((t) => {
      counts[t] ||= { wrong: 0, total: 0 };
      counts[t].total += 1;
      if (!r.correct) counts[t].wrong += 1;
    });
  });
  return Object.entries(counts)
    .map(([tag, v]) => ({
      tag,
      wrong: v.wrong,
      total: v.total,
      rate: v.total ? v.wrong / v.total : 0
    }))
    .sort((a, b) => b.rate - a.rate);
}

function parseCSVLine(row) {
  const cells = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < row.length; i += 1) {
    const char = row[i];

    if (char === "\"") {
      const next = row[i + 1];
      if (inQuotes && next === "\"") {
        current += "\"";
        i += 1; // sauter la seconde guillemet
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      cells.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current.trim());
  return cells.map((cell) => cell.replace(/\r$/, ""));
}

export function csvToBank(text) {
  // Expected headers: id,prompt,choice1,choice2,choice3,choice4,answerIndex,level,tags,explain
  // Robust split for \n and Windows \r\n newlines
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (!lines.length) return [];
  const [header, ...rows] = lines;
  const cols = parseCSVLine(header).map((c) => c.trim());
  const idx = Object.fromEntries(cols.map((c, i) => [c.toLowerCase(), i]));
  const required = [
    "id",
    "prompt",
    "choice1",
    "choice2",
    "choice3",
    "choice4",
    "answerindex",
    "level",
    "tags",
    "explain"
  ];
  for (const k of required) {
    if (!(k in idx)) throw new Error("Colonnes manquantes dans le CSV: " + k);
  }

  return rows.map((row, r) => {
    const cells = parseCSVLine(row);
    const tags = (cells[idx.tags] || "")
      .split(";")
      .map((t) => t.trim())
      .filter(Boolean);
    return {
      id: cells[idx.id] || "r" + r,
      prompt: cells[idx.prompt] || "",
      choices: [
        cells[idx.choice1] || "",
        cells[idx.choice2] || "",
        cells[idx.choice3] || "",
        cells[idx.choice4] || ""
      ],
      answerIndex: Number(cells[idx.answerindex] ?? 0),
      level: Number(cells[idx.level] || 3),
      tags: tags.length ? tags : ["vocabulaire"],
      explain: cells[idx.explain] || ""
    };
  });
}

function downloadText(filename, text) {
  if (typeof document === "undefined") return;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function App() {
  const [bank, setBank] = useState(loadJSON(STORAGE_BANK, DEFAULT_BANK));
  const [level, setLevel] = useState(5);
  const [selectedTags, setSelectedTags] = useState([...TAGS]);
  const [quiz, setQuiz] = useState(null); // {questions}
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(loadJSON(STORAGE_KEY, { sessions: [] }));
  const [modeExam, setModeExam] = useState(false);
  const [examSecs, setExamSecs] = useState(20 * 60); // 20 min par défaut
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => saveJSON(STORAGE_BANK, bank), [bank]);
  useEffect(() => saveJSON(STORAGE_KEY, progress), [progress]);
  useEffect(() => () => stopTimer(), []);

  const eligible = useMemo(() => {
    return bank.filter(
      (q) =>
        q.level <= level &&
        (!selectedTags.length || q.tags.some((t) => selectedTags.includes(t)))
    );
  }, [level, selectedTags, bank]);

  function startQuiz(focusWeak = false) {
    let pool = eligible;
    if (focusWeak && progress.sessions.length) {
      const last = progress.sessions[progress.sessions.length - 1];
      const worstTags = last.weaknesses.slice(0, 2).map((w) => w.tag);
      const focused = bank.filter(
        (q) => q.level <= level && q.tags.some((t) => worstTags.includes(t))
      );
      if (focused.length >= 10) {
        pool = focused;
      }
    }

    if (!pool.length) {
      if (typeof window !== "undefined") {
        window.alert(
          "Aucune question disponible pour ces filtres. Importez une banque ou élargissez vos critères."
        );
      }
      setQuiz(null);
      setAnswers([]);
      setFinished(false);
      return;
    }

    const questions = pickN(pool, 10);
    setQuiz({ questions });
    setAnswers(Array(questions.length).fill(null));
    setFinished(false);

    // Examen : lance le chrono
    if (modeExam) {
      clearInterval(timerRef.current);
      setTimeLeft(examSecs);
      timerRef.current = setInterval(() => {
        setTimeLeft((s) => {
          if (s === null) return null;
          if (s <= 1) {
            clearInterval(timerRef.current);
            submit(true);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      stopTimer();
      setTimeLeft(null);
    }
  }

  function stopTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function setAnswerAt(i, idx) {
    const next = [...answers];
    next[i] = idx;
    setAnswers(next);
  }

  function summarizePerTag(results) {
    const m = new Map();
    results.forEach((r) => {
      r.q.tags.forEach((t) => {
        const v = m.get(t) || { ok: 0, total: 0 };
        v.total += 1;
        if (r.correct) v.ok += 1;
        m.set(t, v);
      });
    });
    return Array.from(m.entries()).map(([tag, v]) => ({ tag, ok: v.ok, total: v.total }));
  }

  function submit(auto = false) {
    if (!quiz) return;
    stopTimer();
    const results = quiz.questions.map((q, i) => ({
      q,
      chosen: answers[i],
      correct: answers[i] === q.answerIndex
    }));
    const score = results.filter((r) => r.correct).length;
    const weaknesses = analyzeWeaknesses(results);
    const session = {
      date: new Date().toISOString(),
      score,
      total: results.length,
      level,
      tags: [...selectedTags],
      mode: modeExam ? "examen" : "entrainement",
      duration: modeExam ? examSecs : null,
      timeUsed: modeExam && timeLeft != null ? examSecs - timeLeft : null,
      autoSubmit: auto,
      weaknesses,
      perTag: summarizePerTag(results)
    };
    setProgress((prev) => ({ sessions: [...prev.sessions, session] }));
    setFinished(true);
  }

  function handleImportJSON(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const arr = JSON.parse(String(reader.result));
        if (!Array.isArray(arr)) throw new Error("JSON invalide");
        setBank(arr);
      } catch (e) {
        if (typeof window !== "undefined") {
          window.alert("Échec import JSON: " + e.message);
        }
      }
    };
    reader.readAsText(file);
  }

  function handleImportCSV(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const arr = csvToBank(String(reader.result));
        setBank(arr);
      } catch (e) {
        if (typeof window !== "undefined") {
          window.alert("Échec import CSV: " + e.message);
        }
      }
    };
    reader.readAsText(file);
  }

  function exportProgress() {
    downloadText("progression-dnb.json", JSON.stringify(progress, null, 2));
  }

  function exportTemplateCSV() {
    const header =
      "id,prompt,choice1,choice2,choice3,choice4,answerIndex,level,tags,explain\n";
    const sample = [
      "q1,\"Choisis l'orthographe correcte : Il fait beau, il __ chaud.\",y a,y as,y à,y ah,0,2,orthographe;grammaire,On écrit 'il y a'",
      "q2,Hyperbole : quelle phrase ?,Je t'ai appelé deux fois.,Je meurs de faim !,Il regarde la télé.,Elle marche vite.,1,4,figures;compréhension,Hyperbole = exagération"
    ].join("\n");
    downloadText("modele-questions-dnb.csv", header + sample + "\n");
  }

  const lastSession = progress.sessions[progress.sessions.length - 1];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Quiz Français – Préparation DNB (3e)</h1>
          <p className="text-sm text-neutral-600 mt-2">
            Importe une banque de 200+ QCM (JSON/CSV), mode examen chronométré et tableau de bord par notion.
          </p>
        </header>

        {/* Import / Export */}
        <div className="bg-white rounded-2xl shadow p-4 mb-6 grid md:grid-cols-3 gap-4">
          <div>
            <p className="font-medium mb-2">Importer banque</p>
            <div className="flex flex-col gap-2">
              <label className="text-sm">
                <input
                  type="file"
                  accept="application/json"
                  onChange={(e) => e.target.files?.[0] && handleImportJSON(e.target.files[0])}
                />{" "}
                JSON
              </label>
              <label className="text-sm">
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={(e) => e.target.files?.[0] && handleImportCSV(e.target.files[0])}
                />{" "}
                CSV (modèle)
              </label>
              <button onClick={exportTemplateCSV} className="px-3 py-1 rounded-lg border w-fit">
                Télécharger modèle CSV
              </button>
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">Mode</p>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={modeExam}
                  onChange={(e) => setModeExam(e.target.checked)}
                />
                <span>Examen (chronométré)</span>
              </label>
            </div>
            {modeExam && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm">Durée :</span>
                <select
                  className="border rounded-lg px-2 py-1"
                  value={examSecs}
                  onChange={(e) => setExamSecs(Number(e.target.value))}
                >
                  <option value={15 * 60}>15 min</option>
                  <option value={20 * 60}>20 min</option>
                  <option value={30 * 60}>30 min</option>
                </select>
              </div>
            )}
          </div>
          <div>
            <p className="font-medium mb-2">Export</p>
            <button onClick={exportProgress} className="px-3 py-1 rounded-lg border">
              Exporter progression (JSON)
            </button>
          </div>
        </div>

        {/* Filtres */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow p-4">
            <p className="font-medium mb-2">Niveau maximum</p>
            <div className="flex gap-2 flex-wrap">
              {LEVELS.map((lv) => (
                <button
                  key={lv}
                  onClick={() => setLevel(lv)}
                  className={`px-3 py-1 rounded-full border ${
                    level === lv ? "bg-black text-white" : "bg-white"
                  }`}
                >
                  {lv}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-4 md:col-span-2">
            <p className="font-medium mb-2">Domaines</p>
            <div className="flex gap-2 flex-wrap">
              {TAGS.map((t) => {
                const on = selectedTags.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() =>
                      setSelectedTags((prev) =>
                        on ? prev.filter((x) => x !== t) : [...prev, t]
                      )
                    }
                    className={`px-3 py-1 rounded-full border ${
                      on ? "bg-black text-white" : "bg-white"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-6 items-center">
          <button
            onClick={() => startQuiz(false)}
            className="px-4 py-2 rounded-2xl bg-black text-white shadow"
          >
            Nouvelle série (10 QCM)
          </button>
          <button
            onClick={() => startQuiz(true)}
            className="px-4 py-2 rounded-2xl bg-white border shadow"
          >
            Série ciblée (faiblesses)
          </button>
          {modeExam && timeLeft !== null && (
            <span className="ml-auto text-sm font-medium">
              ⏳ Temps restant : {formatSecs(timeLeft)}
            </span>
          )}
        </div>

        {!eligible.length && (
          <div className="bg-amber-100 border border-amber-300 text-amber-900 rounded-xl p-3 mb-4 text-sm">
            Aucune question ne correspond aux filtres actuels. Importez une nouvelle banque ou sélectionnez plus de tags.
          </div>
        )}

        {/* Quiz */}
        {quiz && (
          <div className="bg-white rounded-2xl shadow p-4 mb-6">
            {quiz.questions.map((q, i) => (
              <div key={q.id} className="mb-6">
                <p className="font-medium mb-2">
                  {i + 1}. {q.prompt}
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {q.choices.map((c, idx) => (
                    <label
                      key={idx}
                      className={`border rounded-xl p-3 cursor-pointer ${
                        answers[i] === idx ? "bg-black text-white" : "bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${i}`}
                        className="hidden"
                        onChange={() => setAnswerAt(i, idx)}
                        checked={answers[i] === idx}
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <button
                onClick={() => submit(false)}
                className="px-4 py-2 rounded-2xl bg-emerald-600 text-white"
              >
                Valider mes réponses
              </button>
              {modeExam && timeLeft !== null && (
                <span className="text-sm text-neutral-600">
                  Le test se soumettra automatiquement à 0:00.
                </span>
              )}
            </div>
          </div>
        )}

        {/* Résultats */}
        {finished && quiz && (
          <ResultsPanel quiz={quiz} answers={answers} lastSession={lastSession} />
        )}

        {/* Dashboard & Historique */}
        <Dashboard progress={progress} />
      </div>
    </div>
  );
}

function formatSecs(s) {
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${m}:${ss.toString().padStart(2, "0")}`;
}

function ResultsPanel({ quiz, answers, lastSession }) {
  const results = quiz.questions.map((q, i) => ({
    q,
    chosen: answers[i],
    correct: answers[i] === q.answerIndex
  }));
  const score = results.filter((r) => r.correct).length;
  const weaknesses = analyzeWeaknesses(results);

  return (
    <div className="bg-white rounded-2xl shadow p-4 mb-6">
      <h2 className="text-xl font-semibold mb-1">Résultats</h2>
      <p className="mb-4">
        Score : <span className="font-bold">{score} / {results.length}</span>
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium mb-2">Corrections</h3>
          <ul className="space-y-2">
            {results.map((r, i) => (
              <li
                key={i}
                className={`border rounded-xl p-3 ${
                  r.correct ? "bg-emerald-50" : "bg-rose-50"
                }`}
              >
                <div className="font-medium">
                  {i + 1}. {r.q.prompt}
                </div>
                <div className="text-sm mt-1">
                  Votre réponse : {r.chosen != null ? r.q.choices[r.chosen] : "(aucune)"} • Bonne réponse :
                  {" "}
                  {r.q.choices[r.q.answerIndex]}
                </div>
                <div className="text-xs text-neutral-600 mt-1">{r.q.explain}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-2">Analyse des faiblesses</h3>
          {weaknesses.length === 0 ? (
            <p>Pas assez de données.</p>
          ) : (
            <ul className="space-y-2">
              {weaknesses.map((w) => (
                <li
                  key={w.tag}
                  className="border rounded-xl p-3 flex items-center justify-between"
                >
                  <span className="capitalize">{w.tag}</span>
                  <span className="text-sm">
                    {Math.round(w.rate * 100)}% d'erreurs ({w.wrong}/{w.total})
                  </span>
                </li>
              ))}
            </ul>
          )}

          {lastSession && (
            <div className="mt-4 text-sm">
              <p className="font-medium mb-1">Conseil pour la prochaine série</p>
              <p>
                Utilise « Série ciblée (faiblesses) » pour t'entraîner en priorité sur :
                {" "}
                {lastSession.weaknesses
                  .slice(0, 2)
                  .map((w) => w.tag)
                  .join(", ") || "—"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Dashboard({ progress }) {
  const sessions = progress.sessions;
  if (!sessions.length) return null;

  const global = sessions.reduce(
    (acc, s) => {
      acc.ok += s.score;
      acc.total += s.total;
      return acc;
    },
    { ok: 0, total: 0 }
  );

  const accuracy = global.total ? Math.round((global.ok / global.total) * 100) : 0;

  // per-tag accuracy across sessions
  const tagAgg = new Map();
  sessions.forEach((s) => {
    s.perTag?.forEach((pt) => {
      const v = tagAgg.get(pt.tag) || { ok: 0, total: 0 };
      v.ok += pt.ok;
      v.total += pt.total;
      tagAgg.set(pt.tag, v);
    });
  });
  const perTag = Array.from(tagAgg.entries())
    .map(([tag, v]) => ({ tag, rate: v.total ? v.ok / v.total : 0, ok: v.ok, total: v.total }))
    .sort((a, b) => a.rate - b.rate);

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-3">Tableau de bord</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border rounded-xl p-3">
          <p className="text-sm text-neutral-600">Précision globale</p>
          <p className="text-2xl font-bold">{accuracy}%</p>
          <p className="text-xs text-neutral-500">
            {global.ok}/{global.total} réponses justes
          </p>
        </div>
        <div className="border rounded-xl p-3">
          <p className="text-sm text-neutral-600">Nombre de séries</p>
          <p className="text-2xl font-bold">{sessions.length}</p>
          <p className="text-xs text-neutral-500">(entrainement + examen)</p>
        </div>
      </div>

      <h3 className="font-medium mt-4 mb-2">Progression par notion</h3>
      <ul className="space-y-2">
        {perTag.map((t) => (
          <li key={t.tag} className="border rounded-xl p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="capitalize">{t.tag}</span>
              <span className="text-sm">
                {Math.round(t.rate * 100)}% ({t.ok}/{t.total})
              </span>
            </div>
            <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div className="h-full bg-black" style={{ width: `${Math.round(t.rate * 100)}%` }} />
            </div>
          </li>
        ))}
      </ul>

      <h3 className="font-medium mt-6 mb-2">Historique des séries</h3>
      <ul className="space-y-2">
        {sessions.map((s, i) => (
          <li
            key={i}
            className="border rounded-xl p-3 text-sm flex items-center justify-between"
          >
            <span>
              {new Date(s.date).toLocaleString()} — niv {s.level} — {s.mode}
            </span>
            <span className="font-medium">
              {s.score}/{s.total}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ===============================
// DEV SELF-TESTS (non bloquants)
// Objectif : garantir que csvToBank gère bien les \n et \r\n
(function runSelfTests() {
  try {
    const header =
      "id,prompt,choice1,choice2,choice3,choice4,answerIndex,level,tags,explain";
    const row1 = "r1,Question?,A,B,C,D,2,3,grammaire;accord,Explication";
    const csvCRLF = `${header}\r\n${row1}`;
    const out1 = csvToBank(csvCRLF);
    console.assert(out1.length === 1, "Test CRLF: mauvaise longueur");
    console.assert(out1[0].choices.length === 4, "Test CRLF: 4 choix attendus");
    console.assert(out1[0].tags[0] === "grammaire", "Test CRLF: tag 1");

    const csvLF = `${header}\n${row1}`;
    const out2 = csvToBank(csvLF);
    console.assert(out2.length === 1, "Test LF: mauvaise longueur");
    console.assert(out2[0].answerIndex === 2, "Test LF: answerIndex");

    // Tags fallback
    const row2 = "r2,Simple?,A,B,C,D,1,1,,";
    const out3 = csvToBank(`${header}\n${row2}`);
    console.assert(out3[0].tags.length === 1, "Test tags fallback");
    console.log("✅ Self-tests csvToBank OK");
  } catch (e) {
    console.warn("⚠️ Self-tests csvToBank ont échoué:", e);
  }
})();
