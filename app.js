const themes = [
  {
    id: 'grammaire',
    name: 'Grammaire',
    icon: '📝',
    description:
      'Analyse de la phrase complexe, fonctions et classes grammaticales au programme de 3ᵉ.'
  },
  {
    id: 'orthographe',
    name: 'Orthographe',
    icon: '✍️',
    description:
      "Homophones, accords difficiles et pièges de l'écrit pour viser l'excellence."
  },
  {
    id: 'vocabulaire',
    name: 'Vocabulaire',
    icon: '📚',
    description:
      'Nuances de sens, préfixes, suffixes et champs lexicaux essentiels pour le DNB.'
  },
  {
    id: 'conjugaison',
    name: 'Conjugaison',
    icon: '⚡',
    description: 'Temps du récit, voix active/passive et valeurs des modes.'
  },
  {
    id: 'litterature',
    name: 'Littérature',
    icon: '📖',
    description:
      'Repères culturels et grandes œuvres étudiées au collège, genres et mouvements.'
  },
  {
    id: 'expression',
    name: 'Expression écrite',
    icon: '✒️',
    description:
      'Techniques de rédaction, argumentation et cohérence du discours.'
  },
  {
    id: 'comprehension',
    name: 'Compréhension',
    icon: '🧠',
    description:
      'Lecture fine, implicite, organisation du texte et stratégie de réponse.'
  },
  {
    id: 'figures',
    name: 'Figures de style',
    icon: '🎭',
    description: 'Identifier et analyser les procédés expressifs des textes littéraires.'
  }
];

const questionBank = {
  grammaire: [
    {
      question:
        "Dans la phrase : 'Les romans que tu m'as prêtés sont captivants', quelle est la fonction de la proposition subordonnée relative ?",
      options: [
        'Complément circonstanciel de manière',
        'Complément du nom',
        'Complément d’objet indirect',
        'Apposition'
      ],
      answer: 1,
      explanation:
        "La proposition relative introduite par 'que' précise le nom 'romans' : elle est donc complément du nom."
    },
    {
      question:
        "Quelle est la classe grammaticale de 'dont' dans la phrase : 'Voilà l'œuvre dont je t'ai parlé' ?",
      options: ['Pronom relatif', 'Adverbe interrogatif', 'Conjonction de subordination', 'Déterminant indéfini'],
      answer: 0,
      explanation:
        "'Dont' remplace un complément introduit par 'de' et relie la proposition subordonnée relative au nom : c'est un pronom relatif."
    },
    {
      question:
        "Dans 'Ils ont élu Léa déléguée', quelle est la fonction du groupe nominal 'déléguée' ?",
      options: [
        'Attribut du sujet',
        'Complément d’objet indirect',
        'Complément d’objet second',
        'Attribut du complément d’objet direct'
      ],
      answer: 3,
      explanation:
        "Le COD 'Léa' est complété par 'déléguée' qui indique le résultat de l'action : c'est un attribut du COD."
    },
    {
      question:
        "Dans la phrase : 'Bien qu'il fût épuisé, il continua', quel est le mode du verbe 'fût' et quelle valeur exprime-t-il ?",
      options: [
        'Indicatif, valeur de certitude',
        'Subjonctif, valeur de concession',
        'Subjonctif, valeur d’hypothèse',
        'Conditionnel, valeur d’irréel'
      ],
      answer: 1,
      explanation:
        "'Fût' est au subjonctif imparfait. Dans une proposition concessive introduite par 'bien que', il exprime la concession."
    },
    {
      question:
        "Quel est le sujet réel dans : 'Il est arrivé trois nouveaux élèves' ?",
      options: [
        'Il',
        'trois',
        'trois nouveaux élèves',
        'nouveaux élèves'
      ],
      answer: 2,
      explanation:
        "Le pronom 'il' est sujet apparent ; le véritable sujet est le groupe nominal 'trois nouveaux élèves'."
    },
    {
      question:
        "Dans 'Nous considérons que ce projet est ambitieux', comment s'analyse la subordonnée introduite par 'que' ?",
      options: [
        'Complément d’objet direct du verbe considérer',
        'Complément de phrase',
        'Apposition au nom projet',
        'Complément du nom projet'
      ],
      answer: 0,
      explanation:
        "Le verbe 'considérer' admet pour COD la subordonnée complétive 'que ce projet est ambitieux'."
    }
  ],
  orthographe: [
    {
      question:
        "Quelle phrase respecte la règle d'accord du participe passé employé avec l'auxiliaire avoir ?",
      options: [
        "Les chansons que j'ai écouté sont entraînantes",
        "Les chansons que j'ai écoutées sont entraînantes",
        "Les chansons que j'ai écoutés sont entraînantes",
        "Les chansons que j'ai écoutée sont entraînantes"
      ],
      answer: 1,
      explanation:
        "Le COD 'les chansons' est placé avant le participe passé : on accorde donc 'écoutées' au féminin pluriel."
    },
    {
      question:
        "Quel est l'homophone correct pour compléter : 'Ils ont ... leurs devoirs avant de sortir' ?",
      options: ['fais', 'fait', 'faits', 'faises'],
      answer: 2,
      explanation:
        "Le participe passé 'faits' s'accorde avec le COD 'leurs devoirs' placé avant l'auxiliaire avoir."
    },
    {
      question:
        "Parmi ces propositions, laquelle est orthographiée correctement ?",
      options: ['Il a eu tord', 'Ils se sont absaint', "Elle s'est méfiée", "Ils ont dût partir"],
      answer: 2,
      explanation:
        "Le verbe pronominal 'se méfier' s'accorde avec le sujet féminin singulier : 'Elle s'est méfiée'."
    },
    {
      question:
        "Complétez : 'Il se peut qu'ils ... en retard'",
      options: ['arrivent', 'arriveront', 'arrivèrent', 'arriveraient'],
      answer: 0,
      explanation:
        "Après 'il se peut que', on emploie le subjonctif présent : 'arrivent'."
    },
    {
      question:
        "Quel mot contient un accent circonflexe obligatoire ?",
      options: ['Croute', 'Hotel', 'Jeune', 'Maitre'],
      answer: 3,
      explanation:
        "Dans 'maître', l'accent circonflexe sur le â est obligatoire en orthographe rectifiée ou traditionnelle."
    },
    {
      question:
        "Quelle phrase respecte la règle d'accord du verbe avec un sujet composé ?",
      options: [
        'Ni Paul ni ses frères ne vient',
        'Paul ainsi que ses frères partent',
        'Paul ou ses frères êtes partis',
        'Paul avec ses frères arrive'
      ],
      answer: 1,
      explanation:
        "Lorsque le sujet est composé de deux éléments reliés par 'ainsi que', le verbe se met au pluriel : 'partent'."
    }
  ],
  vocabulaire: [
    {
      question:
        "Quel est le sens du préfixe 'pré-' dans les mots 'prévoir' ou 'prélire' ?",
      options: ['À travers', 'Après', 'Avant', 'En sens contraire'],
      answer: 2,
      explanation:
        "Le préfixe 'pré-' exprime l'antériorité : prévoir, prélire signifient faire une action avant."
    },
    {
      question:
        "Quel est le synonyme le plus précis du mot 'taciturne' ?",
      options: ['Bavard', 'Discret', 'Silencieux', 'Inquiet'],
      answer: 2,
      explanation:
        "Une personne taciturne parle peu, elle est silencieuse voire renfermée."
    },
    {
      question:
        "À quel champ lexical appartient principalement le mot 'inclémence' ?",
      options: ['La météo', 'La justice', 'La musique', 'La médecine'],
      answer: 0,
      explanation:
        "L'inclémence évoque une rigueur, une dureté du climat : vent, froid ou pluie violente."
    },
    {
      question:
        "Quel est l'antonyme du verbe 'corroborer' ?",
      options: ['Confirmer', 'Réfuter', 'Renforcer', 'Illustrer'],
      answer: 1,
      explanation:
        "'Corroborer' signifie confirmer. Son antonyme attendu est 'réfuter'."
    },
    {
      question:
        "Dans quel contexte emploie-t-on le mot 'ubiquité' ?",
      options: [
        'Pour décrire un raisonnement logique',
        "Pour qualifier la présence simultanée en plusieurs lieux",
        'Pour désigner une émotion fugace',
        "Pour parler d'une transformation chimique"
      ],
      answer: 1,
      explanation:
        "L'ubiquité caractérise le fait d'être présent en plusieurs endroits au même moment."
    },
    {
      question:
        "Quel suffixe permet de former un nom désignant une action ?",
      options: ['-ment', '-able', '-eux', '-if'],
      answer: 0,
      explanation:
        "Le suffixe '-ment' (châtiment, déploiement) crée des noms d'action ou leur résultat."
    }
  ],
  conjugaison: [
    {
      question:
        "Conjuguez le verbe 'croire' à la 3ᵉ personne du pluriel du subjonctif présent :",
      options: ['Qu’ils croivent', 'Qu’ils croient', 'Qu’ils crurent', 'Qu’ils croiraient'],
      answer: 1,
      explanation:
        "Le subjonctif présent de 'croire' donne : que je croie, que nous croyions, qu’ils croient."
    },
    {
      question:
        "À quel temps est conjugué le verbe souligné : 'Si tu avais révisé, tu aurais réussi' ?",
      options: ['Plus-que-parfait', 'Passé antérieur', 'Futur antérieur', 'Passé composé'],
      answer: 0,
      explanation:
        "'Avais révisé' est conjugué au plus-que-parfait, temps de l'hypothèse non réalisée."
    },
    {
      question:
        "Quelle transformation permet de passer de la voix active à la voix passive ?",
      options: [
        "Le complément d'objet indirect devient sujet",
        "Le complément d'objet direct devient sujet",
        'Le verbe reste inchangé',
        "Le sujet reste sujet"
      ],
      answer: 1,
      explanation:
        "À la voix passive, le COD du verbe actif devient sujet du verbe auxiliaire + participe passé."
    },
    {
      question:
        "Conjuguez 'vaincre' à la 1ᵉʳe personne du pluriel du passé simple :",
      options: ['Nous vainquîmes', 'Nous vainquons', 'Nous vaincrons', 'Nous vainquissions'],
      answer: 0,
      explanation:
        "Au passé simple : je vainquis, nous vainquîmes."
    },
    {
      question:
        "Quel temps utilise-t-on principalement dans les récits au présent pour marquer un retour en arrière ?",
      options: ['Le conditionnel présent', 'Le passé composé', "L'imparfait", 'Le plus-que-parfait'],
      answer: 3,
      explanation:
        "Le plus-que-parfait indique une antériorité par rapport au point de référence du récit."
    },
    {
      question:
        "Quelle terminaison convient pour le participe présent du verbe 'convaincre' ?",
      options: ['Convaincant', 'Convainquant', 'Convaincu', 'Convainc'],
      answer: 1,
      explanation:
        "Le participe présent se forme sur le radical du verbe + -ant : convainquant."
    }
  ],
  litterature: [
    {
      question: "Qui est l'auteur de 'La Parure' étudiée en 3ᵉ ?",
      options: ['Victor Hugo', 'Émile Zola', 'Guy de Maupassant', 'Honoré de Balzac'],
      answer: 2,
      explanation:
        "'La Parure' est une nouvelle réaliste écrite par Guy de Maupassant en 1884."
    },
    {
      question: "Quel mouvement littéraire associe-t-on principalement à Victor Hugo ?",
      options: ['Le classicisme', 'Le romantisme', 'Le réalisme', 'Le symbolisme'],
      answer: 1,
      explanation:
        "Victor Hugo est une figure majeure du romantisme français."
    },
    {
      question:
        "Quel genre de texte est privilégié pour dénoncer une injustice dans la presse au XIXᵉ siècle ?",
      options: ['La fable', 'Le poème lyrique', "L'article argumentatif", 'Le conte merveilleux'],
      answer: 2,
      explanation:
        "L'article argumentatif ou le plaidoyer permettent de défendre une cause et convaincre le lecteur."
    },
    {
      question:
        "Dans quel roman retrouve-t-on le personnage de Jean Valjean ?",
      options: ['Le Rouge et le Noir', 'Germinal', 'Les Misérables', 'Madame Bovary'],
      answer: 2,
      explanation:
        "Jean Valjean est le héros des 'Misérables' de Victor Hugo."
    },
    {
      question:
        "Quelle est la visée principale d'un apologue comme une fable de La Fontaine ?",
      options: ['Divertir sans réfléchir', 'Raconter une histoire vraie', 'Instruire en amusant', 'Décrire un paysage'],
      answer: 2,
      explanation:
        "L'apologue associe le plaisir de la fiction à une leçon morale : instruire en amusant."
    },
    {
      question:
        "Quel registre privilégie-t-on pour susciter l'émotion et la compassion du lecteur ?",
      options: ['Le registre épique', 'Le registre lyrique', 'Le registre pathétique', 'Le registre comique'],
      answer: 2,
      explanation:
        "Le registre pathétique vise à émouvoir et à inspirer la compassion."
    }
  ],
  expression: [
    {
      question:
        "Quelle structure convient pour soutenir une thèse dans un développement argumentatif ?",
      options: [
        'Enchaîner des anecdotes sans lien',
        'Présenter une thèse, des arguments et des exemples',
        'Multiplier les questions rhétoriques',
        'Employer uniquement le registre lyrique'
      ],
      answer: 1,
      explanation:
        "Un paragraphe argumentatif solide comporte une idée directrice, un argument et un exemple précis."
    },
    {
      question:
        "Quel connecteur logique introduit une conséquence ?",
      options: ['Cependant', 'Par conséquent', 'D’une part', 'À l’inverse'],
      answer: 1,
      explanation:
        "'Par conséquent' ou 'ainsi' marquent une relation de conséquence entre deux propositions."
    },
    {
      question:
        "Pour varier son vocabulaire en expression écrite, quelle stratégie est pertinente ?",
      options: [
        'Utiliser des mots très familiers',
        "Employer des synonymes précis et adaptés au contexte",
        'Répéter les mêmes termes pour être clair',
        'Supprimer tous les adjectifs'
      ],
      answer: 1,
      explanation:
        "Enrichir son lexique passe par le recours à des synonymes justes et variés."
    },
    {
      question:
        "Que faut-il vérifier en conclusion d'une rédaction argumentative ?",
      options: [
        "Qu'on ajoute une nouvelle idée",
        "Qu'on ouvre sur une réflexion plus large et qu'on rappelle la thèse",
        'Qu’on recopie l’introduction',
        'Qu’on utilise le présent de narration'
      ],
      answer: 1,
      explanation:
        "La conclusion rappelle l'essentiel de l'argumentation et élargit vers une ouverture."
    },
    {
      question:
        "Quel temps privilégier pour un récit d'imagination mené au passé ?",
      options: ['Présent simple', 'Imparfait pour le cadre et passé simple pour les actions', 'Passé composé uniquement', 'Futur simple'],
      answer: 1,
      explanation:
        "On installe le décor avec l'imparfait et on raconte les actions principales au passé simple."
    },
    {
      question:
        "Quel outil stylistique renforce une argumentation en donnant la parole à un auteur reconnu ?",
      options: ['La description', 'La citation', 'Le dialogue', 'La personnification'],
      answer: 1,
      explanation:
        "Citer une autorité renforce la crédibilité d’une argumentation."
    }
  ],
  comprehension: [
    {
      question:
        "Que désigne l'implicite d'un texte littéraire ?",
      options: [
        'Les informations explicites',
        'Les sous-entendus que le lecteur doit déduire',
        "Les citations d'un autre auteur",
        "Les éléments de la mise en page"
      ],
      answer: 1,
      explanation:
        "L'implicite correspond à ce qui n'est pas dit directement mais qu'on comprend en lisant attentivement."
    },
    {
      question:
        "Quelle démarche adopter pour analyser un portrait dans un récit ?",
      options: [
        'Identifier les champs lexicaux et leur effet',
        'Ignorer les adjectifs',
        'Chercher uniquement des comparaisons',
        'Relever les verbes au futur'
      ],
      answer: 0,
      explanation:
        "Les champs lexicaux révèlent la tonalité du portrait et l'intention de l'auteur."
    },
    {
      question:
        "Quand on vous demande de justifier une réponse à partir d’un texte, que doit-on fournir ?",
      options: [
        'Un avis personnel',
        'Une citation précise ou une reformulation fidèle',
        'Un résumé du texte entier',
        "Une nouvelle question"
      ],
      answer: 1,
      explanation:
        "Justifier suppose d'appuyer son idée sur une citation exacte ou une reformulation rigoureuse du passage."
    },
    {
      question:
        "Quel indicateur permet de repérer un changement de point de vue dans un récit ?",
      options: [
        'Les variations de pronoms personnels',
        'Les temps du futur',
        'Les figures de style',
        'Les interrogations indirectes'
      ],
      answer: 0,
      explanation:
        "Le passage du 'je' au 'il' ou l'apparition de termes évaluatifs montre un changement de focalisation."
    },
    {
      question:
        "Que signifie l'expression 'faire une inférence' lors d'une lecture ?",
      options: [
        'Inventer un passage',
        'Relier deux informations pour déduire une conclusion',
        'Choisir un nouveau thème',
        'Changer de paragraphe'
      ],
      answer: 1,
      explanation:
        "L'inférence est l'opération intellectuelle qui consiste à déduire une information implicite."
    },
    {
      question:
        "Quel type de question demande d'identifier la structure d'un texte ?",
      options: [
        'Question de vocabulaire',
        'Question de grammaire',
        'Question d’organisation',
        'Question d’orthographe'
      ],
      answer: 2,
      explanation:
        "Analyser la structure revient à repérer l'organisation du texte : narration, description, argumentation..."
    }
  ],
  figures: [
    {
      question:
        "Identifiez la figure de style : 'La Terre est bleue comme une orange' (Éluard).",
      options: ['Hyperbole', 'Comparaison', 'Métaphore', 'Personnification'],
      answer: 1,
      explanation:
        "L'emploi de 'comme' rapproche deux réalités : c'est une comparaison surprenante."
    },
    {
      question: "Quelle figure consiste à attribuer des comportements humains à un objet ?",
      options: ['Antiphrase', 'Personnification', 'Métonymie', 'Euphémisme'],
      answer: 1,
      explanation:
        "La personnification donne des traits humains à un objet ou à une idée abstraite."
    },
    {
      question:
        "Quel procédé est à l'œuvre dans : 'Je meurs de faim' ?",
      options: ['Antithèse', 'Litote', 'Hyperbole', 'Périphrase'],
      answer: 2,
      explanation:
        "'Je meurs de faim' exagère volontairement la situation : c'est une hyperbole."
    },
    {
      question:
        "Quel nom donne-t-on à la répétition d'un même son consonantique ?",
      options: ['Allitération', 'Assonance', 'Anaphore', 'Gradation'],
      answer: 0,
      explanation:
        "L'allitération est la répétition d'un son consonantique pour créer un effet sonore."
    },
    {
      question:
        "Quelle figure rapproche deux réalités sans outil de comparaison ?",
      options: ['Comparaison', 'Métaphore', 'Oxymore', 'Hyperbole'],
      answer: 1,
      explanation:
        "La métaphore associe deux réalités directement, sans 'comme', 'tel', etc."
    },
    {
      question:
        "Quel procédé est utilisé dans : 'Cette obscure clarté qui tombe des étoiles' ?",
      options: ['Antithèse', 'Oxymore', 'Pléonasme', 'Gradation'],
      answer: 1,
      explanation:
        "L'association de deux termes contraires 'obscure' et 'clarté' forme un oxymore."
    }
  ]
};
const state = {
  currentQuiz: [],
  currentQuestionIndex: 0,
  selectedOption: null,
  score: 0,
  stats: {
    totalQuizzes: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    themeStats: themes.reduce((acc, theme) => {
      acc[theme.id] = { correct: 0, total: 0 };
      return acc;
    }, {})
  }
};

const elements = {
  themeGrid: document.getElementById('theme-grid'),
  startQuiz: document.getElementById('start-quiz'),
  showThemes: document.getElementById('show-themes'),
  themeSection: document.getElementById('theme-section'),
  strengthList: document.getElementById('strength-list'),
  weaknessList: document.getElementById('weakness-list'),
  quizScreen: document.getElementById('quiz-screen'),
  resultsScreen: document.getElementById('results-screen'),
  quizTheme: document.getElementById('quiz-theme'),
  quizQuestion: document.getElementById('quiz-question'),
  quizOptions: document.getElementById('quiz-options'),
  quizExplanation: document.getElementById('quiz-explanation'),
  showAnswer: document.getElementById('show-answer'),
  nextQuestion: document.getElementById('next-question'),
  backToMenu: document.getElementById('back-to-menu'),
  progressBar: document.getElementById('progress-bar'),
  quizScore: document.getElementById('quiz-score'),
  resultsTitle: document.getElementById('results-title'),
  resultsSummary: document.getElementById('results-summary'),
  resultsGrid: document.getElementById('results-grid'),
  retryFocus: document.getElementById('retry-focus'),
  retryRandom: document.getElementById('retry-random'),
  resultsMenu: document.getElementById('results-menu'),
  statTotalQuizzes: document.getElementById('stat-total-quizzes'),
  statTotalQuestions: document.getElementById('stat-total-questions'),
  statSuccessRate: document.getElementById('stat-success-rate')
};

const accuracy = (correct, total) => (total === 0 ? 0 : Math.round((correct / total) * 100));

function scrollToSection(section) {
  section.scrollIntoView({ behavior: 'smooth' });
}

function renderThemeCards() {
  elements.themeGrid.innerHTML = '';
  themes.forEach((theme) => {
    const card = document.createElement('article');
    card.className = 'theme-card';
    card.innerHTML = `
      <span class="theme-card__icon">${theme.icon}</span>
      <h3 class="theme-card__title">${theme.name}</h3>
      <p class="theme-card__description">${theme.description}</p>
      <button class="theme-card__cta btn btn--secondary" data-theme="${theme.id}">
        <span>Défier ce thème</span>
        <span>→</span>
      </button>
    `;
    elements.themeGrid.appendChild(card);
  });

  elements.themeGrid.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const themeId = event.currentTarget.getAttribute('data-theme');
      launchQuiz({ themeId });
    });
  });
}

function getWeakThemes(limit = 3) {
  const statsArray = themes.map((theme) => {
    const data = state.stats.themeStats[theme.id];
    const total = data.total;
    const acc = total === 0 ? 50 : (data.correct / total) * 100;
    return { ...theme, total, accuracy: acc };
  });

  return statsArray
    .sort((a, b) => a.accuracy - b.accuracy || b.total - a.total)
    .slice(0, limit);
}

function getStrongThemes(limit = 3) {
  const statsArray = themes.map((theme) => {
    const data = state.stats.themeStats[theme.id];
    const total = data.total;
    const acc = total === 0 ? 0 : (data.correct / total) * 100;
    return { ...theme, total, accuracy: acc };
  });

  return statsArray
    .filter((theme) => theme.total > 0)
    .sort((a, b) => b.accuracy - a.accuracy || b.total - a.total)
    .slice(0, limit);
}

function renderFocusPanels() {
  const strengths = getStrongThemes();
  const weaknesses = getWeakThemes();

  const strengthContent = strengths.length
    ? strengths
        .map(
          (item) => `
          <li class="focus-list__item">
            <span>${item.icon} ${item.name}</span>
            <span class="focus-list__badge focus-list__badge--good">${Math.round(item.accuracy)} %</span>
          </li>
        `
        )
        .join('')
    : '<li class="focus-list__item">Réponds à quelques questions pour révéler tes points forts !</li>';

  const weaknessContent = weaknesses
    .map((item) => {
      const displayAcc = item.total === 0 ? 'N.C.' : `${Math.round(item.accuracy)} %`;
      return `
        <li class="focus-list__item">
          <span>${item.icon} ${item.name}</span>
          <span class="focus-list__badge focus-list__badge--alert">${displayAcc}</span>
        </li>
      `;
    })
    .join('');

  elements.strengthList.innerHTML = strengthContent;
  elements.weaknessList.innerHTML = weaknessContent;
}

function updateGlobalStatsDisplay() {
  const { totalQuizzes, totalQuestions, correctAnswers } = state.stats;
  const successRate = accuracy(correctAnswers, totalQuestions);
  elements.statTotalQuizzes.textContent = totalQuizzes;
  elements.statTotalQuestions.textContent = totalQuestions;
  elements.statSuccessRate.textContent = `${successRate}%`;
}

function pickThemeWeighted(possibleThemes, weights) {
  const totalWeight = possibleThemes.reduce((sum, themeId) => sum + (weights[themeId] || 1), 0);
  let r = Math.random() * totalWeight;
  for (const themeId of possibleThemes) {
    r -= weights[themeId] || 1;
    if (r <= 0) {
      return themeId;
    }
  }
  return possibleThemes[possibleThemes.length - 1];
}

function buildQuiz({ themeId = null, focus = false } = {}) {
  const usedQuestions = new Set();
  const quiz = [];
  const themeStats = state.stats.themeStats;

  const availableThemes = (() => {
    if (themeId) return [themeId];
    if (focus) {
      const weakThemes = getWeakThemes(4).map((theme) => theme.id);
      return weakThemes.length ? weakThemes : themes.map((theme) => theme.id);
    }
    return themes.map((theme) => theme.id);
  })();

  const weights = {};
  availableThemes.forEach((id) => {
    const data = themeStats[id];
    const total = data.total;
    const acc = total === 0 ? 0.6 : data.correct / total;
    let weight = 1 + (1 - acc) * 2;
    if (focus) {
      weight += (1 - acc) * 3;
    }
    weights[id] = Math.max(weight, 0.5);
  });

  const fallbackThemes = themes.map((theme) => theme.id);

  while (quiz.length < 10) {
    const pool = availableThemes.length ? availableThemes : fallbackThemes;
    const chosenTheme = pickThemeWeighted(pool, weights);
    const questions = questionBank[chosenTheme];
    const available = questions
      .map((question, index) => ({ ...question, theme: chosenTheme, uid: `${chosenTheme}-${index}` }))
      .filter((question) => !usedQuestions.has(question.uid));

    if (!available.length) {
      const index = availableThemes.indexOf(chosenTheme);
      if (index !== -1) availableThemes.splice(index, 1);
      if (!availableThemes.length && pool === availableThemes) {
        availableThemes.push(...fallbackThemes.filter((id) => !availableThemes.includes(id)));
      }
      continue;
    }

    const selected = available[Math.floor(Math.random() * available.length)];
    usedQuestions.add(selected.uid);
    quiz.push(selected);
  }

  return quiz;
}
function launchQuiz({ themeId = null, focus = false } = {}) {
  state.currentQuiz = buildQuiz({ themeId, focus });
  if (state.currentQuiz.length === 0) {
    alert("Impossible de générer un quiz : la banque de questions est vide.");
    return;
  }
  state.currentQuestionIndex = 0;
  state.selectedOption = null;
  state.score = 0;
  elements.quizScore.textContent = '0';
  elements.progressBar.style.width = '0%';
  showScreen('quiz');
  renderQuestion();
}

function showScreen(screen) {
  if (screen === 'quiz') {
    elements.quizScreen.hidden = false;
    elements.resultsScreen.hidden = true;
  } else if (screen === 'results') {
    elements.quizScreen.hidden = true;
    elements.resultsScreen.hidden = false;
  } else {
    elements.quizScreen.hidden = true;
    elements.resultsScreen.hidden = true;
  }
}

function renderQuestion() {
  const questionData = state.currentQuiz[state.currentQuestionIndex];
  const theme = themes.find((theme) => theme.id === questionData.theme);
  elements.quizTheme.textContent = `${theme.icon} ${theme.name}`;
  elements.quizQuestion.textContent = questionData.question;
  elements.quizExplanation.hidden = true;
  elements.quizExplanation.textContent = questionData.explanation;
  elements.showAnswer.disabled = true;
  elements.nextQuestion.disabled = true;
  elements.showAnswer.textContent = 'Valider la réponse';
  elements.quizOptions.innerHTML = '';

  questionData.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'quiz__option';
    button.innerHTML = `
      <span class="quiz__option-index">${String.fromCharCode(65 + index)}.</span>
      <span>${option}</span>
    `;
    button.addEventListener('click', () => handleOptionSelect(button, index));
    elements.quizOptions.appendChild(button);
  });

  updateProgressBar();
}

function handleOptionSelect(button, index) {
  state.quizOptionsButtons = Array.from(elements.quizOptions.querySelectorAll('button'));
  state.quizOptionsButtons.forEach((btn) => btn.classList.remove('quiz__option--selected'));
  button.classList.add('quiz__option--selected');
  state.selectedOption = index;
  elements.showAnswer.disabled = false;
}

function validateAnswer() {
  if (state.selectedOption === null) return;
  const questionData = state.currentQuiz[state.currentQuestionIndex];
  const correctIndex = questionData.answer;
  const buttons = Array.from(elements.quizOptions.querySelectorAll('button'));
  const isCorrect = state.selectedOption === correctIndex;

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    btn.classList.remove('quiz__option--selected');
    if (index === correctIndex) {
      btn.classList.add('quiz__option--correct');
    }
    if (index === state.selectedOption && index !== correctIndex) {
      btn.classList.add('quiz__option--wrong');
    }
  });

  if (isCorrect) {
    state.score += 1;
    elements.quizScore.textContent = state.score;
  }

  elements.quizExplanation.hidden = false;
  elements.showAnswer.disabled = true;
  elements.nextQuestion.disabled = false;
  elements.showAnswer.textContent = 'Réponse validée';

  const themeStats = state.stats.themeStats[questionData.theme];
  themeStats.total += 1;
  if (isCorrect) themeStats.correct += 1;
  state.stats.totalQuestions += 1;
  if (isCorrect) state.stats.correctAnswers += 1;

  state.currentQuiz[state.currentQuestionIndex].isCorrect = isCorrect;

  state.selectedOption = null;
  renderFocusPanels();
  updateGlobalStatsDisplay();
}

function nextQuestion() {
  if (state.currentQuestionIndex < state.currentQuiz.length - 1) {
    state.currentQuestionIndex += 1;
    state.selectedOption = null;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  state.stats.totalQuizzes += 1;
  updateGlobalStatsDisplay();
  renderResults();
  showScreen('results');
}

function renderResults() {
  const totalQuestions = state.currentQuiz.length;
  const percent = accuracy(state.score, totalQuestions);
  elements.resultsTitle.textContent = percent >= 80 ? 'Excellent !' : percent >= 60 ? 'Très bon travail !' : 'On continue !';
  elements.resultsSummary.textContent = `Tu viens de terminer une série de ${totalQuestions} questions exigeantes pour ${state.score} bonnes réponses. L'algorithme a ajusté ta carte de progression : concentre-toi sur les thèmes en orange. Aussitôt prêt ? Relance une série ciblée !`;

  const perTheme = {};
  state.currentQuiz.forEach((question) => {
    const themeId = question.theme;
    if (!perTheme[themeId]) {
      perTheme[themeId] = { total: 0, correct: 0 };
    }
    perTheme[themeId].total += 1;
    if (question.isCorrect) perTheme[themeId].correct += 1;
  });

  elements.resultsGrid.innerHTML = Object.entries(perTheme)
    .map(([themeId, data]) => {
      const theme = themes.find((item) => item.id === themeId);
      const ratio = accuracy(data.correct, data.total);
      return `
        <div class="results__item">
          <h4>${theme.icon} ${theme.name}</h4>
          <p>${data.correct} / ${data.total} bonnes réponses (${ratio} %)</p>
        </div>
      `;
    })
    .join('');
}

function updateProgressBar() {
  const progress = (state.currentQuestionIndex / state.currentQuiz.length) * 100;
  elements.progressBar.style.width = `${progress}%`;
}

function resetQuizState() {
  state.currentQuiz = [];
  state.currentQuestionIndex = 0;
  state.selectedOption = null;
  state.score = 0;
  elements.quizScore.textContent = '0';
  elements.quizExplanation.hidden = true;
  elements.nextQuestion.disabled = true;
  elements.showAnswer.disabled = true;
  elements.progressBar.style.width = '0%';
}

function initEventListeners() {
  elements.startQuiz.addEventListener('click', () => launchQuiz());
  elements.showThemes.addEventListener('click', () => scrollToSection(elements.themeSection));
  elements.backToMenu.addEventListener('click', () => {
    resetQuizState();
    showScreen('menu');
  });
  elements.showAnswer.addEventListener('click', validateAnswer);
  elements.nextQuestion.addEventListener('click', nextQuestion);
  elements.retryRandom.addEventListener('click', () => {
    showScreen('menu');
    launchQuiz();
  });
  elements.retryFocus.addEventListener('click', () => {
    showScreen('menu');
    launchQuiz({ focus: true });
  });
  elements.resultsMenu.addEventListener('click', () => {
    showScreen('menu');
    resetQuizState();
  });
}

function init() {
  renderThemeCards();
  renderFocusPanels();
  updateGlobalStatsDisplay();
  initEventListeners();
}

init();
