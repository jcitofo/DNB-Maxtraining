import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  Target,
  TrendingUp,
  Award,
  RefreshCw,
  ChevronRight,
  Star,
  Brain,
  BarChart3,
  Sparkles,
  Compass,
  Flame,
  Layers
} from 'lucide-react';

const TOTAL_QUESTIONS_PER_SERIES = 10;
const DIFFICULTY_LABEL = 'Niveau 5/5 - Expert Brevet';

const themes = [
  { id: 'grammaire', name: 'Grammaire', icon: '📝', color: 'from-sky-400 to-blue-600' },
  { id: 'orthographe', name: 'Orthographe', icon: '✍️', color: 'from-emerald-400 to-emerald-600' },
  { id: 'vocabulaire', name: 'Vocabulaire', icon: '📚', color: 'from-fuchsia-400 to-purple-600' },
  { id: 'conjugaison', name: 'Conjugaison', icon: '⚡', color: 'from-orange-400 to-amber-500' },
  { id: 'litterature', name: 'Littérature', icon: '📖', color: 'from-rose-400 to-red-500' },
  { id: 'expression', name: 'Expression écrite', icon: '✒️', color: 'from-indigo-400 to-indigo-600' },
  { id: 'comprehension', name: 'Compréhension', icon: '🧠', color: 'from-teal-400 to-cyan-500' },
  { id: 'figures', name: 'Figures de style', icon: '🎭', color: 'from-pink-400 to-pink-600' }
];

const questionBanks = {
  grammaire: [
    {
      id: 'gram-1',
      question: "Dans la phrase : 'Le roman que j'ai emprunté est passionnant', quelle est la fonction de la subordonnée relative ?",
      options: ['Complément circonstanciel', 'Complément du nom', 'Attribut du sujet', 'Sujet'],
      correct: 1,
      explanation: "La subordonnée relative 'que j'ai emprunté' complète le nom 'roman' en le précisant : c'est un complément du nom.",
      skill: 'Analyse de la proposition'
    },
    {
      id: 'gram-2',
      question: "Quel est le mode du verbe conjugué dans : 'Il faut que tu viennes réviser.' ?",
      options: ['Indicatif', 'Impératif', 'Subjonctif', 'Conditionnel'],
      correct: 2,
      explanation: "Le verbe 'viennes' est conjugué au subjonctif présent, utilisé après l'expression de la nécessité 'Il faut que'.",
      skill: 'Identification du mode'
    },
    {
      id: 'gram-3',
      question: "Quelle est la nature du groupe souligné : 'Nous partirons [quand la cloche sonnera]' ?",
      options: ['Proposition subordonnée conjonctive circonstancielle', 'Groupe infinitif', 'Proposition relative', 'Complément du nom'],
      correct: 0,
      explanation: "La subordonnée est introduite par la conjonction 'quand' et exprime une circonstance de temps : c'est une subordonnée conjonctive circonstancielle de temps.",
      skill: 'Subordonnées'
    },
    {
      id: 'gram-4',
      question: "Quelle transformation réalise le passage du discours direct au discours indirect ?",
      options: ["On garde les temps et on supprime 'que'", "On change les temps et on introduit un subordonnant", "On ajoute des guillemets", "On utilise obligatoirement le conditionnel passé"],
      correct: 1,
      explanation: "Au discours indirect, les paroles sont rapportées dans une subordonnée introduite par un subordonnant, et les temps sont ajustés selon la concordance des temps.",
      skill: 'Discours rapporté'
    },
    {
      id: 'gram-5',
      question: "Dans : 'Ils se sont parlé longuement', pourquoi le participe passé ne s'accorde-t-il pas ?",
      options: ["Parce qu'il n'y a pas d'auxiliaire", "Parce que 'parlé' est invariable avec l'auxiliaire avoir", "Parce que le verbe est pronominal réciproque et que l'objet est indirect", "Parce que le sujet est masculin"],
      correct: 2,
      explanation: "Avec un verbe pronominal réciproque comme 'se parler', le participe passé s'accorde avec le COD si celui-ci est placé avant. Ici, le complément est indirect ('se parler à quelqu'un'), donc il reste invariable.",
      skill: 'Accord du participe passé'
    },
    {
      id: 'gram-6',
      question: "Quelle est la classe grammaticale du mot souligné : 'Il est parti dès l'aube.' ?",
      options: ['Préposition', 'Adverbe', 'Conjonction de coordination', 'Nom'],
      correct: 0,
      explanation: "Le mot 'dès' introduit un complément circonstanciel de temps ; c'est une préposition.",
      skill: 'Classes grammaticales'
    },
    {
      id: 'gram-7',
      question: "Quel est le rôle du groupe nominal souligné : 'Le professeur explique la règle aux élèves distraits.' ?",
      options: ["Complément d'objet direct", "Complément d'objet indirect", "Complément d'agent", 'Complément circonstanciel'],
      correct: 1,
      explanation: "Le groupe 'aux élèves distraits' répond à la question 'à qui ?' posée au verbe expliquer : c'est un complément d'objet indirect.",
      skill: 'Fonctions dans la phrase'
    },
    {
      id: 'gram-8',
      question: "Quelle transformation subit la phrase : 'Il mange rapidement' lorsqu'on la met à la voix passive ?",
      options: ["Elle devient 'Rapidement est mangé par il'", "Elle ne peut pas être mise à la voix passive", "Elle devient 'Rapidement est mangée par lui'", "Elle devient 'Il est mangé rapidement'"],
      correct: 1,
      explanation: "Seuls les verbes transitifs directs peuvent être passivés. 'Manger' est transitif, mais ici le COD est absent, donc la voix passive est impossible.",
      skill: 'Voix active et passive'
    },
    {
      id: 'gram-9',
      question: "Quel est le type de phrase suivant : 'N'oubliez pas d'apporter votre brouillon.' ?",
      options: ['Déclarative', 'Interrogative', 'Exclamative', 'Injonctive'],
      correct: 3,
      explanation: "La phrase exprime un ordre ou un conseil : c'est une phrase injonctive, souvent réalisée grâce à l'impératif.",
      skill: 'Types de phrases'
    },
    {
      id: 'gram-10',
      question: "Quelle est la fonction de 'qu'il soit prêt' dans : 'Je souhaite qu'il soit prêt.' ?",
      options: ["Complément d'objet direct", 'Complément circonstanciel', 'Complément du nom', 'Sujet du verbe'],
      correct: 0,
      explanation: "La subordonnée complète le verbe 'souhaite' et répond à la question 'je souhaite quoi ?' : c'est un complément d'objet direct.",
      skill: 'Analyse de la subordonnée'
    }
  ],
  orthographe: [
    {
      id: 'ortho-1',
      question: "Choisissez l'orthographe correcte : 'Ils se sont ___ les mains.'",
      options: ['lavé', 'lavée', 'lavés', 'lavées'],
      correct: 2,
      explanation: "Le verbe pronominal 'se laver' a un complément d'objet direct placé après le verbe ('les mains'). Le participe passé reste donc invariable au masculin pluriel : 'lavés'.",
      skill: 'Accord du participe passé'
    },
    {
      id: 'ortho-2',
      question: "Quelle phrase respecte la règle d'accord du participe passé employé avec avoir ?",
      options: [
        "Les copies que j'ai rendu hier sont notées.",
        "Les copies que j'ai rendues hier sont notées.",
        "Les copies que j'ai rendue hier sont notées.",
        "Les copies que j'ai rendus hier sont notées."
      ],
      correct: 1,
      explanation: "Avec l'auxiliaire avoir, le participe passé s'accorde avec le COD placé avant le verbe : 'que' reprend 'copies', féminin pluriel → 'rendues'.",
      skill: 'Accord avec avoir'
    },
    {
      id: 'ortho-3',
      question: "Quel est l'homophone correct : 'Il a ___ sa leçon.' ?",
      options: ['sût', 'su', 'sut', 'sur'],
      correct: 1,
      explanation: "Le verbe 'savoir' au passé composé se conjugue avec avoir : 'il a su'.",
      skill: 'Homophones grammaticaux'
    },
    {
      id: 'ortho-4',
      question: "Choisissez la forme correcte : 'Elles ont ___ convaincues.'",
      options: ['été', 'étées', 'esté', 'étez'],
      correct: 0,
      explanation: "Le participe passé du verbe 'être' est invariable : 'elles ont été convaincues'.",
      skill: 'Participes passés irréguliers'
    },
    {
      id: 'ortho-5',
      question: "Quel mot contient une faute d'orthographe ?",
      options: ['Appréhension', 'Apparaitre', 'Approximation', 'Appropriation'],
      correct: 1,
      explanation: "Le verbe 'apparaître' conserve son accent circonflexe sur le 'î'.",
      skill: 'Accents'
    },
    {
      id: 'ortho-6',
      question: "Quelle phrase est correctement orthographiée ?",
      options: [
        "Il s'est permit de partir avant la fin.",
        "Il s'est permis de partir avant la fin.",
        "Il s'est permise de partir avant la fin.",
        "Il s'est permi de partir avant la fin."
      ],
      correct: 1,
      explanation: "Avec l'auxiliaire être, le participe passé s'accorde avec le sujet si le verbe est essentiellement pronominal. Ici, 'se permettre' garde la valeur transitivement indirecte : le participe passé reste donc masculin singulier 'permis'.",
      skill: 'Verbes pronominaux'
    },
    {
      id: 'ortho-7',
      question: "Quelle phrase nécessite un accord au pluriel ?",
      options: [
        "La plupart des élèves est arrivée à l'heure.",
        "La plupart des élèves sont arrivés à l'heure.",
        "La plupart des élèves est arrivés à l'heure.",
        "La plupart des élèves sont arrivé à l'heure."
      ],
      correct: 1,
      explanation: "L'expression 'la plupart' commande l'accord avec le complément pluriel : 'les élèves'.",
      skill: 'Accords délicats'
    },
    {
      id: 'ortho-8',
      question: "Quelle forme du mot est correcte ?",
      options: ['Privilège', 'Privilègee', 'Privilèje', 'Privilége'],
      correct: 0,
      explanation: "'Privilège' s'écrit avec un accent grave sur le 'è' et sans double consonne.",
      skill: 'Lexique'
    },
    {
      id: 'ortho-9',
      question: "Quelle orthographe faut-il choisir : 'Il faut ___ les sacs avant de partir.' ?",
      options: ['emmenés', 'emmener', 'amener', 'ammenner'],
      correct: 1,
      explanation: "Après 'falloir', on utilise l'infinitif. 'Emmener' signifie conduire avec soi vers un autre lieu.",
      skill: 'Infinitif ou participe'
    },
    {
      id: 'ortho-10',
      question: "Quelle phrase respecte la règle du pluriel des noms composés ?",
      options: ['Des timbre-postes rares', 'Des timbres-poste rares', 'Des timbres-postes rares', 'Des timbre-poste rares'],
      correct: 1,
      explanation: "Dans 'timbre-poste', seul le nom principal 'timbre' prend le pluriel : 'des timbres-poste'.",
      skill: 'Pluriel des noms composés'
    }
  ],
  vocabulaire: [
    {
      id: 'vocab-1',
      question: "Quel est le synonyme le plus précis de 'jubiler' ?",
      options: ['Se fâcher', 'Se réjouir intensément', 'Se plaindre', 'Se moquer'],
      correct: 1,
      explanation: "'Jubiler' signifie éprouver une joie très vive : c'est 'se réjouir intensément'.",
      skill: 'Synonymes nuancés'
    },
    {
      id: 'vocab-2',
      question: "Quel est l'antonyme de 'résolu' dans un contexte argumentatif ?",
      options: ['Hésitant', 'Brusque', 'Docile', 'Durable'],
      correct: 0,
      explanation: "Face à quelqu'un de 'résolu', l'opposé serait 'hésitant', qui manque de détermination.",
      skill: 'Antonymes'
    },
    {
      id: 'vocab-3',
      question: "Quel est le sens du préfixe 'para-' dans 'paradoxe' ?",
      options: ['Contre', 'À côté de', 'Entre', 'Autour'],
      correct: 1,
      explanation: "Le préfixe grec 'para-' signifie 'à côté de' ou 'au-delà de', indiquant un écart par rapport à la pensée dominante.",
      skill: 'Préfixes'
    },
    {
      id: 'vocab-4',
      question: "Quel registre de langue correspond au mot 'morveux' ?",
      options: ['Soutenu', 'Familier', 'Technique', 'Poétique'],
      correct: 1,
      explanation: "'Morveux' appartient au registre familier, utilisé dans les échanges quotidiens ou familiers.",
      skill: 'Registres de langue'
    },
    {
      id: 'vocab-5',
      question: "Quel mot désigne le fait de se mettre à la place de quelqu'un d'autre ?",
      options: ['Symbiose', 'Empathie', 'Sympathie', 'Apathie'],
      correct: 1,
      explanation: "L'empathie est la capacité à ressentir ce que l'autre ressent, à se mettre à sa place.",
      skill: 'Notions clés'
    },
    {
      id: 'vocab-6',
      question: "Quel est le sens du suffixe '-logue' dans 'philologue' ?",
      options: ['Spécialiste de', 'Qui rejette', 'Qui rend', 'Qui diminue'],
      correct: 0,
      explanation: "Le suffixe '-logue' vient du grec 'logos' et signifie 'spécialiste de'.",
      skill: 'Suffixes'
    },
    {
      id: 'vocab-7',
      question: "Quel mot exprime une exagération volontaire ?",
      options: ['Litote', 'Hyperbole', 'Euphémisme', 'Antiphrase'],
      correct: 1,
      explanation: "L'hyperbole est une figure qui amplifie l'expression pour créer un effet fort.",
      skill: 'Figures lexicales'
    },
    {
      id: 'vocab-8',
      question: "Quel champ lexical correspond au mot 'funeste' ?",
      options: ['La joie', 'La mort', 'La nature', 'La technique'],
      correct: 1,
      explanation: "'Funeste' renvoie à une issue mortelle ou très malheureuse, il appartient au champ lexical de la mort.",
      skill: 'Champ lexical'
    },
    {
      id: 'vocab-9',
      question: "Quel mot signifie 'qui dure peu de temps' ?",
      options: ['Pérenne', 'Fugace', 'Immémorial', 'Ancestral'],
      correct: 1,
      explanation: "'Fugace' signifie éphémère, qui disparaît rapidement.",
      skill: 'Définitions précises'
    },
    {
      id: 'vocab-10',
      question: "Quel est le sens exact de l'expression 'tenir quelqu'un en haleine' ?",
      options: ['Le fatiguer', 'Le faire patienter avec intérêt', 'Le contredire', 'Le décevoir'],
      correct: 1,
      explanation: "'Tenir en haleine' signifie maintenir l'attention et l'intérêt de quelqu'un, souvent grâce au suspense.",
      skill: 'Expressions idiomatiques'
    }
  ],
  conjugaison: [
    {
      id: 'conj-1',
      question: "Conjuguez 'vaincre' à la 1re personne du pluriel du passé simple.",
      options: ['Nous vainquîmes', 'Nous vainquons', 'Nous avons vaincu', 'Nous vaincrions'],
      correct: 0,
      explanation: "Le passé simple de 'vaincre' à la 1re personne du pluriel est 'nous vainquîmes'.",
      skill: 'Passé simple'
    },
    {
      id: 'conj-2',
      question: "Quelle est la bonne conjugaison : 'Il fallait que nous ___ à l'heure.' ?",
      options: ['arrivons', 'arrivions', 'arriverions', 'arrivassions'],
      correct: 1,
      explanation: "Après 'il fallait que', on emploie le subjonctif présent : 'arrivions'.",
      skill: 'Subjonctif'
    },
    {
      id: 'conj-3',
      question: "Choisissez la forme correcte du conditionnel passé : 'Si tu avais insisté, ils ___.'",
      options: ['seraient venu', 'seraient venus', 'aurait venu', 'viendraient'],
      correct: 1,
      explanation: "Le conditionnel passé s'accorde avec le sujet. Ici, 'ils seraient venus'.",
      skill: 'Conditionnel passé'
    },
    {
      id: 'conj-4',
      question: "Quel est l'infinitif du verbe conjugué : 'Ils concluraient rapidement.' ?",
      options: ['Concluire', 'Conclure', 'Concluer', 'Concloir'],
      correct: 1,
      explanation: "L'infinitif du verbe est 'conclure'.",
      skill: 'Infinitif'
    },
    {
      id: 'conj-5',
      question: "Conjuguez 'cueillir' à la 2e personne du pluriel de l'indicatif présent.",
      options: ['Vous cueillez', 'Vous cueilliez', 'Vous cueillerez', 'Vous cueillîtes'],
      correct: 0,
      explanation: "Le verbe 'cueillir' suit le modèle de 'finir' : 'vous cueillez'.",
      skill: 'Présent'
    },
    {
      id: 'conj-6',
      question: "Quel temps exprime l'antériorité dans : 'Nous avions déjà mangé lorsqu'il est arrivé.' ?",
      options: ['Passé simple', 'Imparfait', 'Plus-que-parfait', 'Futur antérieur'],
      correct: 2,
      explanation: "'Avions mangé' est au plus-que-parfait, temps de l'antériorité par rapport à un passé.",
      skill: 'Valeurs des temps'
    },
    {
      id: 'conj-7',
      question: "Quelle forme convient : 'Que je ___ ou non, cela ne changera rien.' ?",
      options: ['viens', 'vienne', 'viendrai', 'venu'],
      correct: 1,
      explanation: "Après 'que', pour exprimer l'hypothèse, on utilise le subjonctif présent : 'que je vienne'.",
      skill: 'Subjonctif présent'
    },
    {
      id: 'conj-8',
      question: "Conjuguez 's'asseoir' à la 3e personne du pluriel du futur simple.",
      options: ["Ils s'assieront", "Ils s'assoient", "Ils s'assirent", "Ils s'assiéraient"],
      correct: 0,
      explanation: "Au futur simple, on emploie 'ils s'assieront' (ou 'ils s'assoieront').",
      skill: 'Futur simple'
    },
    {
      id: 'conj-9',
      question: "Quel est le participe présent de 'convaincre' ?",
      options: ['Convainquent', 'Convainquant', 'Convaincu', 'Convaincant'],
      correct: 1,
      explanation: "Le participe présent s'écrit 'convainquant' avec 'qu'.",
      skill: 'Participe présent'
    },
    {
      id: 'conj-10',
      question: "Choisissez la bonne concordance des temps : 'Il pensait qu'elle ___ venir.' ?",
      options: ['pourrait', 'pourra', 'puisse', 'pouvra'],
      correct: 0,
      explanation: "Dans une proposition subordonnée au discours indirect dépendant d'un verbe à l'imparfait, on choisit le conditionnel présent : 'pourrait'.",
      skill: 'Concordance des temps'
    }
  ],
  litterature: [
    {
      id: 'lit-1',
      question: "Qui est l'auteur des 'Fables' étudiées au collège ?",
      options: ['Voltaire', 'La Fontaine', 'Molière', 'Rousseau'],
      correct: 1,
      explanation: "Jean de La Fontaine a publié ses Fables au XVIIe siècle.",
      skill: 'Auteurs incontournables'
    },
    {
      id: 'lit-2',
      question: "À quel mouvement littéraire appartient Victor Hugo au XIXe siècle ?",
      options: ['Classique', 'Baroque', 'Romantique', 'Symboliste'],
      correct: 2,
      explanation: "Victor Hugo est la grande figure du romantisme français.",
      skill: 'Courants littéraires'
    },
    {
      id: 'lit-3',
      question: "Quelle oeuvre de Zola étudie la condition ouvrière ?",
      options: ['Germinal', 'Madame Bovary', 'Bel-Ami', 'Le Rouge et le Noir'],
      correct: 0,
      explanation: "'Germinal' de Zola montre la vie des mineurs et dénonce l'injustice sociale.",
      skill: 'Réalisme et naturalisme'
    },
    {
      id: 'lit-4',
      question: "Quel est le genre du texte 'Le Horla' de Maupassant ?",
      options: ['Nouvelle fantastique', 'Roman historique', 'Poème épique', 'Pièce tragique'],
      correct: 0,
      explanation: "'Le Horla' est une nouvelle fantastique qui joue sur l'hésitation entre réel et imaginaire.",
      skill: 'Genres narratifs'
    },
    {
      id: 'lit-5',
      question: "Quel dramaturge du XVIIe siècle est surnommé 'le Molière du collège' ?",
      options: ['Corneille', 'Racine', 'Molière', 'Beaumarchais'],
      correct: 2,
      explanation: "Molière est étudié au collège pour ses comédies satiriques comme 'Le Malade imaginaire'.",
      skill: 'Théâtre classique'
    },
    {
      id: 'lit-6',
      question: "Quel est le but principal d'une fable ?",
      options: ['Faire peur', 'Faire rire', 'Donner une leçon morale', 'Décrire un paysage'],
      correct: 2,
      explanation: "La fable combine récit et morale pour transmettre un enseignement.",
      skill: 'Interprétation des genres'
    },
    {
      id: 'lit-7',
      question: "Quel auteur a écrit 'Le Petit Prince' ?",
      options: ['Antoine de Saint-Exupéry', 'Albert Camus', 'Jules Verne', 'André Gide'],
      correct: 0,
      explanation: "'Le Petit Prince' est un conte poétique d'Antoine de Saint-Exupéry publié en 1943.",
      skill: 'Lecture cursive'
    },
    {
      id: 'lit-8',
      question: "Quel est le mouvement littéraire qui prône l'imitation des Anciens et la clarté ?",
      options: ['Baroque', 'Classicisme', 'Surréalisme', 'Naturalisme'],
      correct: 1,
      explanation: "Le classicisme valorise l'harmonie, la clarté et l'imitation des modèles antiques.",
      skill: 'Culture littéraire'
    },
    {
      id: 'lit-9',
      question: "Quel genre privilégie l'argumentation directe ?",
      options: ['Roman', 'Conte', 'Discours', 'Poésie lyrique'],
      correct: 2,
      explanation: "Le discours ou l'essai sont des genres d'argumentation directe où l'auteur s'adresse explicitement au lecteur.",
      skill: 'Argumentation'
    },
    {
      id: 'lit-10',
      question: "Quel registre domine dans 'Le Dernier jour d'un condamné' ?",
      options: ['Comique', 'Tragique et pathétique', 'Lyrique', 'Épique'],
      correct: 1,
      explanation: "Victor Hugo mobilise le registre pathétique et tragique pour susciter la compassion pour le condamné.",
      skill: 'Analyse des registres'
    }
  ],
  expression: [
    {
      id: 'exp-1',
      question: "Quel temps privilégier pour raconter des actions de premier plan dans un récit au passé ?",
      options: ['Imparfait', 'Passé simple', 'Plus-que-parfait', 'Conditionnel'],
      correct: 1,
      explanation: "Le passé simple dynamise les actions principales du récit.",
      skill: 'Temps du récit'
    },
    {
      id: 'exp-2',
      question: "Quelle est la structure d'un paragraphe argumentatif efficace ?",
      options: ['Une affirmation seule', 'Une idée, un exemple, une conclusion', "Une succession d'exemples", 'Une citation sans explication'],
      correct: 1,
      explanation: "Un paragraphe argumentatif présente une idée, l'illustre et en tire une mini-conclusion.",
      skill: 'Argumentation écrite'
    },
    {
      id: 'exp-3',
      question: "Quel connecteur introduit une concession ?",
      options: ['Ainsi', 'Cependant', 'Par conséquent', 'Dès lors'],
      correct: 1,
      explanation: "'Cependant' est un connecteur adversatif qui permet de nuancer une affirmation précédente.",
      skill: 'Connecteurs logiques'
    },
    {
      id: 'exp-4',
      question: "Quelle formulation évite l'impersonnel ?",
      options: ["Il est intéressant de noter", "On doit réfléchir", "Il semble que", 'Je pense que'],
      correct: 3,
      explanation: "Dire 'Je pense que' permet d'assumer son point de vue, utile dans une argumentation personnelle.",
      skill: 'Énonciation'
    },
    {
      id: 'exp-5',
      question: "Quelle phrase contient une reformulation efficace ?",
      options: ["En d'autres termes, cette mesure est injuste.", 'Bref, voilà.', 'Bon, enfin...', 'Heu, je veux dire...'],
      correct: 0,
      explanation: "'En d'autres termes' introduit une reformulation claire et précise.",
      skill: 'Reformulation'
    },
    {
      id: 'exp-6',
      question: "Quel est l'intérêt d'un brouillon avant la rédaction finale ?",
      options: ['Gagner du temps', 'Organiser ses idées et corriger les fautes', 'Dessiner des schémas', 'Écrire sans réfléchir'],
      correct: 1,
      explanation: "Le brouillon permet de planifier le texte et d'éviter les erreurs lors de la copie.",
      skill: 'Méthodologie'
    },
    {
      id: 'exp-7',
      question: "Quel connecteur introduit une conséquence logique ?",
      options: ['Ainsi', 'Cependant', 'Pourtant', 'Bien que'],
      correct: 0,
      explanation: "'Ainsi' annonce une conséquence ou une synthèse logique.",
      skill: 'Connecteurs'
    },
    {
      id: 'exp-8',
      question: "Quelle stratégie enrichit le vocabulaire dans une rédaction ?",
      options: ['Employer des répétitions', 'Utiliser des synonymes précis', 'Éviter les adjectifs', 'Limiter les verbes'],
      correct: 1,
      explanation: "Employer des synonymes précis évite les répétitions et donne du relief au texte.",
      skill: 'Enrichissement stylistique'
    },
    {
      id: 'exp-9',
      question: "Quelle conclusion est la plus efficace dans un devoir argumenté ?",
      options: ['En conclusion, le sujet est compliqué.', 'Pour conclure, je répète mes arguments.', "En conclusion, après avoir montré ..., il apparaît que ...", "Voilà, c'est fini."],
      correct: 2,
      explanation: "Une conclusion efficace synthétise les arguments et ouvre éventuellement sur une perspective.",
      skill: 'Conclusion'
    },
    {
      id: 'exp-10',
      question: "Quelle stratégie permet de capter l'attention dès l'introduction ?",
      options: ['Commencer par une définition pertinente', 'Dire bonjour', 'Citer la consigne', 'Décrire sa journée'],
      correct: 0,
      explanation: "Débuter par une définition ou une accroche pertinente capte l'attention et annonce le thème.",
      skill: 'Introduction'
    }
  ],
  comprehension: [
    {
      id: 'comp-1',
      question: "Quelle information repère-t-on en priorité dans un texte narratif ?",
      options: ['Les références bibliographiques', 'La situation initiale et les personnages', 'Les rimes', 'La mise en page'],
      correct: 1,
      explanation: "Identifier la situation initiale et les personnages permet de comprendre l'enjeu du récit.",
      skill: 'Repérage narratif'
    },
    {
      id: 'comp-2',
      question: "Quelle question permet de vérifier une inférence ?",
      options: ['Qui est l'auteur ?', 'Quelles informations implicites puis-je déduire ?', "Quel est le numéro de page ?", 'Quelle est la police utilisée ?'],
      correct: 1,
      explanation: "Faire une inférence consiste à déduire une information implicite à partir des indices du texte.",
      skill: 'Inférences'
    },
    {
      id: 'comp-3',
      question: "Dans un texte argumentatif, que repère-t-on pour analyser la stratégie de l'auteur ?",
      options: ['La ponctuation seulement', 'Les connecteurs logiques et les exemples', 'Les illustrations', 'La taille des paragraphes'],
      correct: 1,
      explanation: "Les connecteurs et les exemples révèlent la structure argumentative et la progression du raisonnement.",
      skill: 'Analyse argumentative'
    },
    {
      id: 'comp-4',
      question: "Quel indice révèle un narrateur interne ?",
      options: ['La présence de dialogues', "L'usage du pronom je", 'La longueur du texte', 'La présence de descriptions'],
      correct: 1,
      explanation: "Un narrateur interne raconte l'histoire de son point de vue, d'où l'emploi du pronom je.",
      skill: 'Point de vue'
    },
    {
      id: 'comp-5',
      question: "Pourquoi repérer le champ lexical dominant d'un texte ?",
      options: ['Pour compter les mots', 'Pour mémoriser le texte', "Pour comprendre l'atmosphère et le thème", 'Pour déterminer la date de publication'],
      correct: 2,
      explanation: "Un champ lexical dominant renseigne sur l'atmosphère et l'orientation du texte.",
      skill: 'Champ lexical'
    },
    {
      id: 'comp-6',
      question: "Quel élément annonce une ellipse narrative ?",
      options: ['Une description détaillée', 'Une indication de temps qui saute une période', 'Un dialogue', 'Un changement de narrateur'],
      correct: 1,
      explanation: "Une ellipse narrative se repère par une rupture temporelle signalée par une expression comme 'Quelques années plus tard'.",
      skill: 'Analyse du temps du récit'
    },
    {
      id: 'comp-7',
      question: "Quelle démarche permet de justifier une réponse ?",
      options: ['Citer le texte et expliquer', 'Donner son avis personnel', 'Réécrire la question', 'Deviner'],
      correct: 0,
      explanation: "Pour justifier, on cite un passage précis puis on l'explique en lien avec la question.",
      skill: 'Justification'
    },
    {
      id: 'comp-8',
      question: "Quel est l'intérêt de repérer les connecteurs temporels ?",
      options: ['Identifier la chronologie', "Connaître le style de l'auteur", 'Repérer les rimes', 'Compter les mots'],
      correct: 0,
      explanation: "Les connecteurs temporels permettent de suivre la chronologie et les ruptures dans le récit.",
      skill: 'Chronologie'
    },
    {
      id: 'comp-9',
      question: "Que signifie l'expression 'point de vue omniscient' ?",
      options: ['Le narrateur sait tout sur les personnages', 'Le narrateur est un personnage secondaire', "Le narrateur est l'auteur", 'Le narrateur est inconnu'],
      correct: 0,
      explanation: "Un narrateur omniscient connaît les pensées, les sentiments et le passé des personnages.",
      skill: 'Types de narrateur'
    },
    {
      id: 'comp-10',
      question: "Quel est le rôle d'une conclusion dans un texte informatif ?",
      options: ['Introduire un nouveau sujet', 'Synthétiser les informations essentielles', 'Présenter la table des matières', 'Donner les références'],
      correct: 1,
      explanation: "La conclusion rappelle l'idée principale et propose parfois une ouverture.",
      skill: 'Structure des textes'
    }
  ],
  figures: [
    {
      id: 'fig-1',
      question: "Identifiez la figure de style : 'Le soleil versait des flots d'or sur la ville.'",
      options: ['Comparaison', 'Métaphore', 'Personnification', 'Hyperbole'],
      correct: 1,
      explanation: "Il y a une comparaison implicite entre le soleil et un être qui verse : c'est une métaphore.",
      skill: 'Métaphore'
    },
    {
      id: 'fig-2',
      question: "Quelle figure atténue la réalité : 'Il n'est pas très malin.' ?",
      options: ['Hyperbole', 'Litote', 'Oxymore', 'Antithèse'],
      correct: 1,
      explanation: "La litote consiste à dire moins pour suggérer davantage.",
      skill: 'Litote'
    },
    {
      id: 'fig-3',
      question: "Quelle figure rapproche deux réalités avec un outil comparatif ?",
      options: ['Métaphore', 'Comparaison', 'Antithèse', 'Gradation'],
      correct: 1,
      explanation: "La comparaison utilise un outil (comme, tel, semblable à) pour rapprocher deux éléments.",
      skill: 'Comparaison'
    },
    {
      id: 'fig-4',
      question: "Quelle figure oppose deux idées pour les mettre en relief ?",
      options: ['Oxymore', 'Hyperbole', 'Antithèse', 'Ellipse'],
      correct: 2,
      explanation: "L'antithèse confronte deux termes contraires dans une même phrase.",
      skill: 'Antithèse'
    },
    {
      id: 'fig-5',
      question: "Dans : 'C'est un roc ! C'est un pic !', quelle figure reconnaît-on ?",
      options: ['Gradation', 'Accumulation', 'Métaphore', 'Antiphrase'],
      correct: 0,
      explanation: "Les termes s'intensifient progressivement : c'est une gradation ascendante.",
      skill: 'Gradation'
    },
    {
      id: 'fig-6',
      question: "Quelle figure prête des caractéristiques humaines à un objet ?",
      options: ['Métonymie', 'Personnification', 'Synecdoque', 'Chiasme'],
      correct: 1,
      explanation: "La personnification attribue des traits humains à des éléments inanimés.",
      skill: 'Personnification'
    },
    {
      id: 'fig-7',
      question: "Quelle figure utilise une partie pour désigner le tout ?",
      options: ['Synecdoque', 'Métonymie', 'Hyperbate', 'Périphrase'],
      correct: 0,
      explanation: "La synecdoque repose sur une relation d'inclusion : une partie désigne le tout ou inversement.",
      skill: 'Synecdoque'
    },
    {
      id: 'fig-8',
      question: "Dans : 'Paris s'éveille', quelle figure est employée ?",
      options: ['Métonymie', 'Hyperbole', 'Antiphrase', 'Oxymore'],
      correct: 0,
      explanation: "'Paris' désigne les habitants de la ville : c'est une métonymie.",
      skill: 'Métonymie'
    },
    {
      id: 'fig-9',
      question: "Quelle figure consiste à exagérer une réalité ?",
      options: ['Hyperbole', 'Litote', 'Périphrase', 'Ellipse'],
      correct: 0,
      explanation: "L'hyperbole amplifie démesurément une idée pour marquer les esprits.",
      skill: 'Hyperbole'
    },
    {
      id: 'fig-10',
      question: "Identifiez la figure : 'Cette obscure clarté qui tombe des étoiles.'",
      options: ['Oxymore', 'Parallélisme', 'Litote', 'Antiphrase'],
      correct: 0,
      explanation: "L'oxymore associe deux mots de sens contraire ('obscure' et 'clarté') pour créer une image frappante.",
      skill: 'Oxymore'
    }
  ]
};

const shuffleArray = (array) => {
  const clone = [...array];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
};

const themeMap = Object.fromEntries(themes.map((theme) => [theme.id, theme]));

const computeWeakThemes = (themeStats) => {
  return Object.entries(themeStats)
    .map(([themeId, stats]) => {
      const accuracy = stats.attempts > 0 ? stats.correct / stats.attempts : 0;
      return {
        themeId,
        accuracy,
        attempts: stats.attempts
      };
    })
    .filter((stat) => stat.attempts >= 2)
    .sort((a, b) => {
      if (a.accuracy === b.accuracy) {
        return b.attempts - a.attempts;
      }
      return a.accuracy - b.accuracy;
    });
};

const generateQuizQuestions = (selectedThemes) => {
  const uniqueThemes = selectedThemes.length > 0 ? selectedThemes : Object.keys(questionBanks);
  const mainTheme = uniqueThemes[0];
  const prioritizedThemes =
    uniqueThemes.length > 1
      ? uniqueThemes
      : [mainTheme, ...shuffleArray(Object.keys(questionBanks).filter((themeId) => themeId !== mainTheme)).slice(0, 2)];
  const selected = [];
  const usedIds = new Set();

  prioritizedThemes.forEach((themeId, index) => {
    const bank = questionBanks[themeId];
    if (!bank) {
      return;
    }
    const desiredCount =
      index === 0
        ? Math.min(Math.ceil(TOTAL_QUESTIONS_PER_SERIES * 0.5), bank.length)
        : Math.min(Math.ceil(TOTAL_QUESTIONS_PER_SERIES / prioritizedThemes.length), bank.length);
    const themeQuestions = shuffleArray(bank)
      .filter((question) => !usedIds.has(question.id))
      .slice(0, desiredCount)
      .map((question) => ({ ...question, theme: themeId }));

    themeQuestions.forEach((question) => usedIds.add(question.id));
    selected.push(...themeQuestions);
  });

  if (selected.length < TOTAL_QUESTIONS_PER_SERIES) {
    const remaining = TOTAL_QUESTIONS_PER_SERIES - selected.length;
    const pool = shuffleArray(
      Object.entries(questionBanks).flatMap(([themeId, questions]) =>
        questions
          .filter((question) => !usedIds.has(question.id))
          .map((question) => ({ ...question, theme: themeId }))
      )
    );
    selected.push(...pool.slice(0, remaining));
  }

  return shuffleArray(selected).slice(0, TOTAL_QUESTIONS_PER_SERIES);
};

const getFocusLabel = (focusThemes) => {
  if (focusThemes.length === 0) {
    return 'Entraînement global DNB';
  }
  if (focusThemes.length === 1) {
    return `Focus ${themeMap[focusThemes[0]].name}`;
  }
  return `Focus ${focusThemes.map((themeId) => themeMap[themeId].name).join(' & ')}`;
};

const getProgressionLevel = (accuracy) => {
  if (accuracy >= 0.9) {
    return { label: 'Champion du DNB', color: 'from-emerald-400 to-emerald-600' };
  }
  if (accuracy >= 0.75) {
    return { label: 'Stratège confirmé', color: 'from-blue-400 to-indigo-500' };
  }
  if (accuracy >= 0.6) {
    return { label: 'Explorateur appliqué', color: 'from-amber-400 to-orange-500' };
  }
  return { label: 'Constructeur en devenir', color: 'from-rose-400 to-pink-500' };
};

const DNBFrancaisApp = () => {
  const [currentView, setCurrentView] = useState('menu');
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizResults, setQuizResults] = useState([]);
  const [playerStats, setPlayerStats] = useState({
    totalQuizzes: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    themeStats: {},
    quizHistory: []
  });

  const recommendedThemes = useMemo(() => computeWeakThemes(playerStats.themeStats), [playerStats.themeStats]);

  const startQuiz = (specificTheme = null) => {
    const focusThemes = specificTheme
      ? [specificTheme]
      : recommendedThemes.length > 0
      ? recommendedThemes.slice(0, 2).map((stat) => stat.themeId)
      : shuffleArray(Object.keys(questionBanks)).slice(0, 3);

    const questions = generateQuizQuestions(focusThemes);

    setCurrentQuiz({
      focusThemes,
      questions,
      title: getFocusLabel(focusThemes),
      difficulty: DIFFICULTY_LABEL
    });
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizResults([]);
    setCurrentView('quiz');
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const recordQuestionResult = (question, isCorrect) => {
    setPlayerStats((previous) => {
      const themeStats = { ...previous.themeStats };
      const statsForTheme = themeStats[question.theme] || {
        attempts: 0,
        correct: 0,
        streak: 0,
        lastTen: []
      };
      const updatedStatsForTheme = {
        ...statsForTheme,
        attempts: statsForTheme.attempts + 1,
        correct: statsForTheme.correct + (isCorrect ? 1 : 0),
        streak: isCorrect ? statsForTheme.streak + 1 : 0,
        lastTen: [...statsForTheme.lastTen.slice(-9), isCorrect]
      };
      themeStats[question.theme] = updatedStatsForTheme;

      return {
        ...previous,
        totalQuestions: previous.totalQuestions + 1,
        correctAnswers: previous.correctAnswers + (isCorrect ? 1 : 0),
        themeStats
      };
    });
  };

  const handleNextQuestion = () => {
    const question = currentQuiz.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correct;

    recordQuestionResult(question, isCorrect);

    const newResult = {
      question: question.question,
      correct: isCorrect,
      theme: question.theme,
      skill: question.skill
    };

    const updatedResults = [...quizResults, newResult];
    setQuizResults(updatedResults);

    if (isCorrect) {
      setScore((previous) => previous + 1);
    }

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex((previous) => previous + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      finishQuiz(updatedResults);
    }
  };

  const finishQuiz = (finalResults) => {
    const correctAnswers = finalResults.filter((result) => result.correct).length;

    setPlayerStats((previous) => ({
      ...previous,
      totalQuizzes: previous.totalQuizzes + 1,
      quizHistory: [
        ...previous.quizHistory,
        {
          id: previous.quizHistory.length + 1,
          date: new Date().toISOString(),
          score: correctAnswers,
          total: finalResults.length,
          focusThemes: currentQuiz.focusThemes
        }
      ]
    }));

    setCurrentView('results');
  };

  const showAnswer = () => {
    setShowResult(true);
  };

  const currentQuestion = currentQuiz?.questions[currentQuestionIndex];
  const currentTheme = currentQuestion ? themeMap[currentQuestion.theme] : null;
  const overallAccuracy = playerStats.totalQuestions > 0 ? playerStats.correctAnswers / playerStats.totalQuestions : 0;
  const progressionLevel = getProgressionLevel(overallAccuracy);
  if (currentView === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-blue-700 to-indigo-900">
        <div className="container mx-auto px-4 py-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-white mb-3">🎓 DNB Français MaxTraining</h1>
            <p className="text-xl text-purple-100">
              Prépare le Diplôme National du Brevet avec des QCM de niveau expert adaptés à tes besoins !
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl border border-white/30">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Target className="w-8 h-8 text-blue-600" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Quiz adaptatif intelligent</h2>
                    <p className="text-gray-500">
                      Série de {TOTAL_QUESTIONS_PER_SERIES} questions niveau 5/5 ciblant tes faiblesses.
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">{DIFFICULTY_LABEL}</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Brain className="w-5 h-5 text-purple-500" />
                  <span>Questions ciblées sur les thèmes du DNB : grammaire, orthographe, lecture, écriture et culture littéraire.</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Les séries suivantes s'appuient sur tes résultats pour renforcer les points faibles.</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Compass className="w-5 h-5 text-emerald-500" />
                  <span>Progrès suivi en temps réel avec un tableau de bord détaillé.</span>
                </div>
              </div>
              <button
                onClick={() => startQuiz()}
                className="mt-8 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
              >
                Lancer un quiz adaptatif 🚀
              </button>
            </div>

            <div className="bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl border border-white/30">
              <div className="flex items-center mb-6">
                <TrendingUp className="w-8 h-8 text-emerald-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Ta progression</h2>
              </div>
              <div className={`rounded-2xl p-6 text-white bg-gradient-to-r ${progressionLevel.color} shadow-lg mb-6`}>
                <p className="text-sm uppercase tracking-wide">Niveau actuel</p>
                <p className="text-2xl font-bold">{progressionLevel.label}</p>
                <p className="text-sm text-white/80 mt-2">
                  Précision globale : {Math.round(overallAccuracy * 100)}%
                </p>
              </div>
              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between">
                  <span>Quiz complétés</span>
                  <span className="font-semibold text-blue-600">{playerStats.totalQuizzes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions traitées</span>
                  <span className="font-semibold text-purple-600">{playerStats.totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Réponses justes</span>
                  <span className="font-semibold text-emerald-500">{playerStats.correctAnswers}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl border border-white/30">
              <div className="flex items-center mb-6">
                <BookOpen className="w-8 h-8 text-indigo-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Choisis un entraînement ciblé</h2>
              </div>
              <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => startQuiz(theme.id)}
                    className={`bg-gradient-to-br ${theme.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1`}
                  >
                    <div className="text-3xl mb-2">{theme.icon}</div>
                    <div className="text-sm uppercase tracking-wide">{theme.name}</div>
                    <div className="text-xs text-white/80 mt-2">10 QCM experts</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl border border-white/30">
              <div className="flex items-center mb-4">
                <BarChart3 className="w-6 h-6 text-amber-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Focus recommandé</h3>
              </div>
              {recommendedThemes.length === 0 ? (
                <p className="text-gray-600">
                  Commence un premier quiz pour découvrir tes points forts et à renforcer.
                </p>
              ) : (
                <div className="space-y-3">
                  {recommendedThemes.slice(0, 3).map((stat) => {
                    const themeInfo = themeMap[stat.themeId];
                    return (
                      <div key={stat.themeId} className="p-4 rounded-2xl bg-gradient-to-r from-white to-blue-50 border border-blue-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{themeInfo.icon}</span>
                            <div>
                              <p className="font-semibold text-gray-800">{themeInfo.name}</p>
                              <p className="text-xs text-gray-500">Précision : {Math.round(stat.accuracy * 100)}% • {stat.attempts} questions</p>
                            </div>
                          </div>
                          <button
                            onClick={() => startQuiz(stat.themeId)}
                            className="px-3 py-1 text-sm font-semibold bg-blue-500 text-white rounded-full hover:bg-blue-600"
                          >
                            Renforcer
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (currentView === 'quiz' && currentQuiz && currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-700 via-purple-700 to-indigo-900">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl border border-white/30">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${currentTheme?.color || 'from-slate-400 to-slate-600'} flex items-center justify-center text-white text-2xl shadow-lg`}>
                    {currentTheme?.icon || '🎯'}
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wide text-blue-500">{currentQuiz.title}</p>
                    <h2 className="text-3xl font-bold text-gray-800">{currentTheme?.name || 'Question mixte'}</h2>
                    <p className="text-gray-500 text-sm">{DIFFICULTY_LABEL}</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-5 py-3 rounded-2xl shadow-lg text-center">
                  <p className="text-xs uppercase">Score actuel</p>
                  <p className="text-2xl font-bold">{score} / {currentQuestionIndex + (showResult ? 1 : 0)}</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    Question {currentQuestionIndex + 1} sur {currentQuiz.questions.length}
                  </span>
                  <span className="text-sm text-gray-500">Compétence : {currentQuestion.skill}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 leading-snug">{currentQuestion.question}</h3>

                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = showResult && index === currentQuestion.correct;
                    const isIncorrect = showResult && isSelected && !isCorrect;

                    return (
                      <button
                        key={option}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 shadow-sm hover:shadow-lg flex items-start space-x-4 ${
                          isCorrect
                            ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                            : isIncorrect
                            ? 'border-rose-400 bg-rose-50 text-rose-700'
                            : isSelected
                            ? 'border-blue-400 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        <span className="flex-shrink-0 w-9 h-9 rounded-full bg-white text-sm font-bold flex items-center justify-center border border-gray-200">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="leading-relaxed">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {showResult && (
                <div className="mb-6 p-6 bg-blue-50 border-l-4 border-blue-400 rounded-2xl text-blue-700">
                  <h4 className="font-semibold text-lg mb-2">Explication experte</h4>
                  <p>{currentQuestion.explanation}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={() => setCurrentView('menu')}
                  className="px-6 py-3 rounded-2xl bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors"
                >
                  Retour au menu
                </button>

                {!showResult ? (
                  <button
                    onClick={showAnswer}
                    disabled={selectedAnswer === null}
                    className="px-6 py-3 rounded-2xl bg-amber-500 text-white font-semibold hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  >
                    Valider ma réponse
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    {currentQuestionIndex < currentQuiz.questions.length - 1 ? 'Question suivante' : 'Voir mes résultats'}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (currentView === 'results' && currentQuiz) {
    const percentage = Math.round((score / currentQuiz.questions.length) * 100);
    const weakThemesAfterQuiz = computeWeakThemes(playerStats.themeStats).slice(0, 3);

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur rounded-3xl p-10 shadow-2xl border border-white/30 text-center mb-10">
              <div className="flex flex-col items-center">
                <Award className="w-16 h-16 text-yellow-400 mb-6" />
                <h1 className="text-4xl font-black text-gray-800 mb-2">Quiz terminé !</h1>
                <p className="text-lg text-gray-600">Tu as obtenu {score} / {currentQuiz.questions.length}</p>
              </div>

              <div className="mt-8">
                <div className="w-40 h-40 mx-auto mb-6 relative">
                  <div className="w-40 h-40 rounded-full border-8 border-gray-200 flex items-center justify-center">
                    <span className="text-4xl font-black text-gray-800">{percentage}%</span>
                  </div>
                </div>
                <div className="flex justify-center mb-8">
                  {percentage >= 80 ? (
                    <div className="flex items-center text-emerald-500">
                      <Star className="w-6 h-6 mr-2" />
                      <span className="text-lg font-bold">Excellent ! Tu maîtrises presque tout.</span>
                    </div>
                  ) : percentage >= 60 ? (
                    <div className="flex items-center text-amber-500">
                      <TrendingUp className="w-6 h-6 mr-2" />
                      <span className="text-lg font-bold">Très bon travail, continue sur ta lancée.</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-blue-500">
                      <RefreshCw className="w-6 h-6 mr-2" />
                      <span className="text-lg font-bold">Ne lâche rien, on consolide ensemble !</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                  <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" /> Points forts
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    {quizResults.filter((result) => result.correct).slice(0, 3).map((result) => (
                      <li key={result.question} className="text-sm">{result.question}</li>
                    ))}
                    {quizResults.filter((result) => result.correct).length === 0 && (
                      <li className="text-sm">Révise encore un peu pour faire apparaître tes points forts.</li>
                    )}
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-50 to-rose-100 border border-rose-200">
                  <h3 className="text-lg font-bold text-rose-700 mb-3 flex items-center">
                    <Flame className="w-5 h-5 mr-2" /> Axes de progrès
                  </h3>
                  <ul className="space-y-2 text-rose-700">
                    {quizResults.filter((result) => !result.correct).slice(0, 3).map((result) => (
                      <li key={result.question} className="text-sm">{result.question}</li>
                    ))}
                    {quizResults.filter((result) => !result.correct).length === 0 && (
                      <li className="text-sm">Bravo ! Aucun faux pas sur cette série.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl border border-white/30">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Layers className="w-6 h-6 text-indigo-500 mr-3" /> Prochaine étape ciblée
                </h2>
                {weakThemesAfterQuiz.length === 0 ? (
                  <p className="text-gray-600">
                    Tout est au vert ! Lance un nouveau défi pour conserver ta progression.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {weakThemesAfterQuiz.map((stat) => {
                      const themeInfo = themeMap[stat.themeId];
                      return (
                        <div key={stat.themeId} className="p-4 rounded-2xl bg-gradient-to-r from-white to-purple-50 border border-purple-100 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-3xl">{themeInfo.icon}</span>
                            <div>
                              <p className="font-semibold text-gray-800">{themeInfo.name}</p>
                              <p className="text-xs text-gray-500">Précision actuelle : {Math.round(stat.accuracy * 100)}% • {stat.attempts} questions</p>
                            </div>
                          </div>
                          <button
                            onClick={() => startQuiz(stat.themeId)}
                            className="px-3 py-1 text-sm font-semibold bg-purple-500 text-white rounded-full hover:bg-purple-600"
                          >
                            Retenter
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl border border-white/30">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <BookOpen className="w-6 h-6 text-blue-500 mr-3" /> Historique des séries
                </h2>
                {playerStats.quizHistory.length === 0 ? (
                  <p className="text-gray-600">Ton premier résultat apparaîtra ici.</p>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {playerStats.quizHistory.slice().reverse().map((entry) => (
                      <div key={entry.id} className="p-4 rounded-2xl bg-gradient-to-r from-white to-blue-50 border border-blue-100 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {new Date(entry.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p className="text-xs text-gray-500">{getFocusLabel(entry.focusThemes)}</p>
                        </div>
                        <span className="text-sm font-bold text-blue-600">{entry.score} / {entry.total}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <button
                onClick={() => startQuiz()}
                className="px-8 py-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <RefreshCw className="w-5 h-5 mr-2" /> Nouveau quiz adaptatif
              </button>
              <button
                onClick={() => setCurrentView('menu')}
                className="px-8 py-3 rounded-2xl bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors"
              >
                Retour au menu principal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DNBFrancaisApp;
