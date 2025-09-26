import React, { useEffect, useMemo, useRef, useState } from 'react';

const typedPhrases = [
  'bank statements',
  'financial data',
  'cash-flow analysis',
  'portfolio reporting'
];

const formatFileSize = (size) => {
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} Mo`;
  }
  if (size >= 1024) {
    return `${(size / 1024).toFixed(1)} Ko`;
  }
  return `${size} o`;
};

const useTypewriter = (words, typingSpeed = 120, deletingSpeed = 60, pauseDuration = 1500) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) {
      return;
    }

    const currentWord = words[wordIndex % words.length];
    let timeoutId;

    if (!isDeleting && text === currentWord) {
      timeoutId = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      const nextLength = text.length + (isDeleting ? -1 : 1);
      timeoutId = setTimeout(() => {
        setText(currentWord.substring(0, nextLength));
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  useEffect(() => {
    if (!words.length) {
      setText('');
    }
  }, [words]);

  return text;
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const App = () => {
  const fileInputRef = useRef(null);
  const uploadSectionRef = useRef(null);
  const filesRef = useRef([]);
  const [files, setFiles] = useState([]);
  const [dragCounter, setDragCounter] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hintMessage, setHintMessage] = useState('');
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const typedText = useTypewriter(typedPhrases, 120, 60, 1400);

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  useEffect(() => {
    if (!isDemoOpen) {
      document.body.style.overflow = '';
      return undefined;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isDemoOpen]);

  useEffect(() => {
    if (!isDemoOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsDemoOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDemoOpen]);

  const handleStartProcessing = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (!filesRef.current.length) {
      setHintMessage("Ajoutez d'abord vos relevés bancaires (PDF) pour lancer le traitement.");
      return;
    }

    if (isProcessing) {
      setHintMessage('Le traitement est déjà en cours.');
      return;
    }

    setHintMessage('');
    setProgress(0);
    setFiles((prev) => prev.map((item) => ({ ...item, status: 'pending', progress: 0 })));
    setIsProcessing(true);
  };

  const handleWatchDemo = () => {
    setIsDemoOpen(true);
  };

  const handleChooseFiles = () => {
    fileInputRef.current?.click();
  };

  const registerFiles = (incomingFiles) => {
    const pdfFiles = incomingFiles.filter(
      (file) => file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    );

    if (!pdfFiles.length) {
      setHintMessage('Seuls les fichiers PDF sont pris en charge.');
      return;
    }

    setHintMessage('');

    setFiles((previous) => {
      const existingKeys = new Set(
        previous.map((item) => `${item.file.name}-${item.file.size}-${item.file.lastModified}`)
      );

      const additions = pdfFiles
        .filter((file) => !existingKeys.has(`${file.name}-${file.size}-${file.lastModified}`))
        .map((file) => ({
          id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 10)}`,
          file,
          status: 'pending',
          progress: 0
        }));

      if (!additions.length) {
        setHintMessage('Ces fichiers ont déjà été ajoutés.');
        return previous;
      }

      return [...previous, ...additions];
    });

    setProgress(0);
  };

  const handleFileInputChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length) {
      registerFiles(selectedFiles);
    }
    event.target.value = '';
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragCounter((prev) => prev + 1);
    setIsDragging(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragCounter((prev) => {
      const next = prev - 1;
      if (next <= 0) {
        setIsDragging(false);
        return 0;
      }
      return next;
    });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragCounter(0);
    setIsDragging(false);
    const droppedFiles = Array.from(event.dataTransfer?.files || []);
    if (droppedFiles.length) {
      registerFiles(droppedFiles);
    }
  };

  useEffect(() => {
    if (!isProcessing) {
      return undefined;
    }

    const snapshot = filesRef.current;

    if (!snapshot.length) {
      setIsProcessing(false);
      return undefined;
    }

    let cancelled = false;

    const runProcessing = async () => {
      const total = snapshot.length;

      for (let index = 0; index < total; index += 1) {
        if (cancelled) {
          return;
        }

        setFiles((prev) =>
          prev.map((item, idx) =>
            idx === index ? { ...item, status: 'processing', progress: 0 } : item
          )
        );

        const steps = 20;
        for (let step = 1; step <= steps; step += 1) {
          if (cancelled) {
            return;
          }

          await delay(90 + index * 20);

          const stepProgress = Math.min(100, Math.round((step / steps) * 100));

          setFiles((prev) =>
            prev.map((item, idx) =>
              idx === index ? { ...item, progress: stepProgress } : item
            )
          );

          setProgress(Math.round(((index + step / steps) / total) * 100));
        }

        setFiles((prev) =>
          prev.map((item, idx) =>
            idx === index ? { ...item, status: 'completed', progress: 100 } : item
          )
        );
      }

      if (!cancelled) {
        setProgress(100);
        setIsProcessing(false);
        setHintMessage('Traitement terminé. Consultez vos statistiques ci-dessous.');
      }
    };

    runProcessing();

    return () => {
      cancelled = true;
    };
  }, [isProcessing]);

  const processedCount = useMemo(
    () => files.filter((file) => file.status === 'completed').length,
    [files]
  );

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#faf9f7] to-[#f5f3f0] text-gray-900">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600">
              <span className="text-lg font-bold text-white">B</span>
            </div>
            <h1 className="text-2xl font-bold text-[#1a2332]" style={{ fontFamily: 'Playfair Display, serif' }}>
              BankStatement Pro
            </h1>
          </div>

            <div className="hidden items-center space-x-8 md:flex">
              <a href="#upload" className="nav-link text-sm font-medium text-gray-700 hover:text-gray-900">
                Upload
              </a>
              <a href="#analytics" className="nav-link text-sm font-medium text-gray-700 hover:text-gray-900">
                Analytics
              </a>
              <a href="#process" className="nav-link text-sm font-medium text-gray-700 hover:text-gray-900">
                Process
              </a>
              <a href="#insights" className="nav-link text-sm font-medium text-gray-700 hover:text-gray-900">
                Insights
              </a>
            </div>

          <div className="flex items-center space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-xs font-semibold text-white">
              SJ
            </div>
            <span className="hidden text-sm font-medium text-gray-700 md:block">Sarah Johnson</span>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-20">
        <section
          id="upload"
          className="hero-bg relative flex min-h-screen items-center overflow-hidden pt-16"
        >
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="text-white">
                <h2
                  className="mb-6 text-5xl font-bold leading-tight lg:text-6xl"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Transformez vos{' '}
                  <span className="text-gradient block lg:inline">{typedText}</span>
                </h2>
                <p className="mb-8 text-xl leading-relaxed text-gray-200">
                  Analysez, validez et synthétisez vos relevés bancaires grâce à une IA experte.
                  Notre plateforme transforme des PDF complexes en informations financières claires.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleStartProcessing}
                    className="btn-primary rounded-lg px-8 py-4 font-semibold text-white"
                  >
                    Lancer le traitement
                  </button>
                  <button
                    type="button"
                    onClick={handleWatchDemo}
                    className="rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white hover:text-gray-900"
                  >
                    Voir la démo
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="floating-element">
                  <div
                    ref={uploadSectionRef}
                    className={`upload-zone rounded-2xl p-8 text-center transition ${isDragging ? 'dragover' : ''}`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className="mb-6">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600">
                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <h3 className="mb-2 text-2xl font-bold text-white">Importez vos relevés</h3>
                      <p className="text-gray-200">Glissez-déposez vos fichiers PDF ou cliquez pour parcourir</p>
                    </div>

                    <div className="space-y-4">
                      <input
                        ref={fileInputRef}
                        id="fileInput"
                        type="file"
                        multiple
                        accept=".pdf"
                        className="hidden"
                        onChange={handleFileInputChange}
                      />
                      <button
                        type="button"
                        onClick={handleChooseFiles}
                        className="w-full rounded-lg bg-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/30"
                      >
                        Choisir des fichiers PDF
                      </button>

                      {files.length > 0 && (
                        <div className="space-y-2" id="fileList">
                          {files.map((item) => (
                            <div
                              key={item.id}
                              className="file-item flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-white"
                            >
                              <div>
                                <p className="font-semibold text-white">{item.file.name}</p>
                                <p className="text-xs text-gray-200">
                                  {formatFileSize(item.file.size)} •{' '}
                                  {item.status === 'completed'
                                    ? 'Analyse terminée'
                                    : item.status === 'processing'
                                    ? `Analyse en cours (${item.progress}%)`
                                    : 'En attente'}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-24 rounded-full bg-white/20">
                                  <div
                                    className="progress-bar h-2 rounded-full"
                                    style={{ width: `${item.progress}%` }}
                                  />
                                </div>
                                <span className="text-xs font-semibold">
                                  {item.status === 'completed' ? '✔︎' : `${item.progress}%`}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {(isProcessing || progress > 0) && (
                        <div id="uploadProgress" className="text-left">
                          <div className="mb-2 h-2 rounded-full bg-white/20">
                            <div className="progress-bar h-2 rounded-full" style={{ width: `${progress}%` }} />
                          </div>
                          <p className="text-sm text-gray-200">
                            {isProcessing ? 'Traitement des fichiers en cours...' : 'Traitement terminé !'}
                          </p>
                        </div>
                      )}

                      {hintMessage && (
                        <p className="text-sm font-medium text-amber-200">{hintMessage}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="analytics" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h3
                className="mb-4 text-4xl font-bold text-[#1a2332]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Analyses financières avancées
              </h3>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">
                Notre moteur d'analyse IA extrait les transactions, vérifie la cohérence des soldes et
                identifie les risques afin d'offrir une vision claire et exploitable de votre activité
                financière.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="feature-card rounded-2xl p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h4 className="mb-3 text-xl font-bold text-[#1a2332]">Extraction intelligente</h4>
                <p className="leading-relaxed text-gray-600">
                  OCR de précision, détection automatique des libellés et rapprochement des soldes pour une
                  capture fiable à 99,5 %.
                </p>
              </div>

              <div className="feature-card rounded-2xl p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h4 className="mb-3 text-xl font-bold text-[#1a2332]">Validation des données</h4>
                <p className="leading-relaxed text-gray-600">
                  Contrôles automatiques des anomalies, détection des transactions douteuses et suivi des
                  pièces justificatives manquantes.
                </p>
              </div>

              <div className="feature-card rounded-2xl p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h4 className="mb-3 text-xl font-bold text-[#1a2332]">Insights &amp; synthèses</h4>
                <p className="leading-relaxed text-gray-600">
                  Analyse des dépenses, projection de trésorerie et génération de rapports prêts à être
                  partagés en un clic.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="py-20" style={{ background: 'var(--background)' }}>
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h3
                className="mb-4 text-4xl font-bold text-[#1a2332]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Un workflow en 4 étapes
              </h3>
              <p className="text-xl text-gray-600">Démarrez en quelques minutes grâce à notre interface intuitive.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-4">
              {[
                {
                  title: 'Import des fichiers',
                  description: 'Déposez vos relevés bancaires PDF ou parcourez votre ordinateur.'
                },
                {
                  title: 'Traitement IA',
                  description: "L'algorithme extrait les transactions, identifie les contreparties et structure les données."
                },
                {
                  title: 'Relecture assistée',
                  description: 'Corrigez les libellés, catégorisez les flux et complétez les justificatifs.'
                },
                {
                  title: 'Tableau de bord',
                  description: 'Visualisez vos tendances, exportez les rapports et partagez-les en équipe.'
                }
              ].map((item, index) => (
                <div key={item.title} className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-xl font-bold text-white">
                    {index + 1}
                  </div>
                  <h4 className="mb-3 text-xl font-bold text-[#1a2332]">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="insights" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="rounded-2xl bg-[#1a2332] p-8 text-white shadow-xl">
                <h4 className="mb-6 text-2xl font-semibold">Suivi du traitement</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Fichiers importés</span>
                    <span className="text-lg font-semibold text-white">{files.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Fichiers analysés</span>
                    <span className="text-lg font-semibold text-white">{processedCount}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-200">Progression globale</p>
                    <div className="mt-2 h-3 rounded-full bg-white/20">
                      <div
                        className="progress-bar h-3 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-200">{progress}%</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="mb-2 text-2xl font-semibold text-[#1a2332]">Pourquoi BankStatement Pro ?</h4>
                  <p className="text-gray-600">
                    Pensé pour les analystes financiers, les cabinets comptables et les équipes de conformité,
                    BankStatement Pro offre une vision instantanée des flux financiers, détecte les incohérences
                    et produit des rapports exploitables.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm">
                  <h5 className="mb-3 text-lg font-semibold text-[#1a2332]">Export multi-formats</h5>
                  <p className="text-gray-600">
                    Exportez vos données nettoyées vers Excel, CSV, ou intégrez-les directement à votre ERP.
                    Les transactions sont catégorisées et enrichies automatiquement.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm">
                  <h5 className="mb-3 text-lg font-semibold text-[#1a2332]">Sécurité renforcée</h5>
                  <p className="text-gray-600">
                    Données chiffrées, suivi complet des accès et traçabilité des modifications pour répondre
                    aux exigences réglementaires les plus strictes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1a2332] py-12 text-center text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 flex items-center justify-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600">
              <span className="font-bold text-white">B</span>
            </div>
            <span className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              BankStatement Pro
            </span>
          </div>
          <p className="text-gray-300">
            © {new Date().getFullYear()} BankStatement Pro — Plateforme sécurisée de traitement des données
            financières.
          </p>
        </div>
      </footer>

      {isDemoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div className="max-w-3xl w-full overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h4 className="text-lg font-semibold text-[#1a2332]">Découvrez BankStatement Pro</h4>
              <button
                type="button"
                onClick={() => setIsDemoOpen(false)}
                className="text-sm font-semibold text-gray-500 transition hover:text-gray-800"
              >
                Fermer
              </button>
            </div>
            <div className="p-6">
              <div className="relative w-full overflow-hidden rounded-xl pb-[56.25%]">
                <iframe
                  className="absolute left-0 top-0 h-full w-full"
                  src="https://www.youtube.com/embed/B0Jx8Dxd9ZY"
                  title="BankStatement Pro Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Cette courte vidéo présente le parcours utilisateur : importation, validation et export des données
                bancaires en quelques minutes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
