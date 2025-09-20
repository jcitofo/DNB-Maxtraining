import { describe, expect, it } from "vitest";
import { analyzeWeaknesses, csvToBank } from "./App.jsx";

describe("csvToBank", () => {
  it("parse les lignes avec guillemets et virgules internes", () => {
    const csv = [
      "id,prompt,choice1,choice2,choice3,choice4,answerIndex,level,tags,explain",
      'id1,"Quel signe utilise-t-on ? , ou ; ?",A,B,C,D,1,3,ponctuation;grammaire,Les virgules séparent les éléments.',
      "id2,Question simple,A,B,C,D,2,1,,Explication"
    ].join("\n");
    const bank = csvToBank(csv);
    expect(bank).toHaveLength(2);
    expect(bank[0].prompt).toBe("Quel signe utilise-t-on ? , ou ; ?");
    expect(bank[0].choices[1]).toBe("B");
    expect(bank[0].tags).toEqual(["ponctuation", "grammaire"]);
    expect(bank[1].tags).toEqual(["vocabulaire"]);
  });

  it("respecte l'ordre des colonnes et tronque les espaces", () => {
    const csv = [
      "choice1,choice2,choice3,choice4,id,prompt,answerIndex,level,tags,explain",
      "oui,non,peut-être,Jamais,id3,Une question ?,0,2,grammaire,Juste"
    ].join("\n");
    const bank = csvToBank(csv);
    expect(bank[0].id).toBe("id3");
    expect(bank[0].choices[0]).toBe("oui");
  });
});

describe("analyzeWeaknesses", () => {
  it("calcule et trie les faiblesses par taux d'erreurs", () => {
    const q = (tags, answerIndex = 0) => ({
      q: { tags, answerIndex, choices: ["A", "B", "C", "D"] },
      chosen: 0,
      correct: answerIndex === 0
    });
    const results = [
      q(["grammaire", "orthographe"], 1),
      q(["grammaire"], 0),
      q(["vocabulaire"], 2)
    ];
    const weaknesses = analyzeWeaknesses(results);
    expect(weaknesses[0].tag).toBe("vocabulaire");
    expect(weaknesses[0].rate).toBe(1);
    expect(weaknesses[1].tag).toBe("grammaire");
  });
});
