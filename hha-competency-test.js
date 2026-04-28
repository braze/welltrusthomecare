/**
 * Home Health Aide Competency Test — data, render, and PDF export
 */
(function () {
  "use strict";

  /** @type {Array<{ id: string, text: string, options: { letter: string, text: string }[] }>[]} */
  const SECTIONS = [
    {
      title: "COMMUNICATION SKILLS",
      questions: [
        { id: "1", text: "When speaking with a confused client, you should:", options: [
          { letter: "a", text: "Speak loudly" },
          { letter: "b", text: "Use simple, clear words" },
          { letter: "c", text: "Ignore them" },
          { letter: "d", text: "Speak quickly" },
        ]},
        { id: "2", text: "Active listening means:", options: [
          { letter: "a", text: "Interrupting" },
          { letter: "b", text: "Ignoring" },
          { letter: "c", text: "Paying full attention" },
          { letter: "d", text: "Talking more" },
        ]},
        { id: "3", text: "If a client is upset, you should:", options: [
          { letter: "a", text: "Argue" },
          { letter: "b", text: "Listen calmly" },
          { letter: "c", text: "Walk away" },
          { letter: "d", text: "Ignore" },
        ]},
        { id: "4", text: "When communicating, you should:", options: [
          { letter: "a", text: "Use medical terms" },
          { letter: "b", text: "Be respectful" },
          { letter: "c", text: "Be rushed" },
          { letter: "d", text: "Be loud" },
        ]},
      ],
    },
    {
      title: "OBSERVATION, REPORTING & DOCUMENTATION",
      questions: [
        { id: "5", text: "If a client has a new rash, you should:", options: [
          { letter: "a", text: "Ignore" },
          { letter: "b", text: "Apply cream" },
          { letter: "c", text: "Report to supervisor" },
          { letter: "d", text: "Wait" },
        ]},
        { id: "6", text: "If a client refuses care:", options: [
          { letter: "a", text: "Force care" },
          { letter: "b", text: "Document and report" },
          { letter: "c", text: "Leave" },
          { letter: "d", text: "Ignore" },
        ]},
        { id: "7", text: "Which should be reported immediately?", options: [
          { letter: "a", text: "Sleeping" },
          { letter: "b", text: "Eating" },
          { letter: "c", text: "Fall with injury" },
          { letter: "d", text: "Watching TV" },
        ]},
        { id: "8", text: "Documentation must be:", options: [
          { letter: "a", text: "Late" },
          { letter: "b", text: "Accurate" },
          { letter: "c", text: "Optional" },
          { letter: "d", text: "Short" },
        ]},
        { id: "9", text: "If it is not documented:", options: [
          { letter: "a", text: "It was done" },
          { letter: "b", text: "It was not done" },
          { letter: "c", text: "It doesn’t matter" },
          { letter: "d", text: "Optional" },
        ]},
        { id: "10", text: "Changes in condition should be:", options: [
          { letter: "a", text: "Ignored" },
          { letter: "b", text: "Reported" },
          { letter: "c", text: "Hidden" },
          { letter: "d", text: "Delayed" },
        ]},
      ],
    },
    {
      title: "VITAL SIGNS",
      questions: [
        { id: "11", text: "Pulse should be taken for:", options: [
          { letter: "a", text: "10 sec" },
          { letter: "b", text: "30 sec" },
          { letter: "c", text: "1 min" },
          { letter: "d", text: "2 min" },
        ]},
        { id: "12", text: "If BP is abnormal:", options: [
          { letter: "a", text: "Ignore" },
          { letter: "b", text: "Report" },
          { letter: "c", text: "Wait" },
          { letter: "d", text: "Repeat later only" },
        ]},
        { id: "13", text: "Respiration counting should be:", options: [
          { letter: "a", text: "Obvious" },
          { letter: "b", text: "Hidden" },
          { letter: "c", text: "Loud" },
          { letter: "d", text: "Fast" },
        ]},
        { id: "14", text: "A normal respiration includes:", options: [
          { letter: "a", text: "One inhale" },
          { letter: "b", text: "One exhale" },
          { letter: "c", text: "Both inhale & exhale" },
          { letter: "d", text: "None" },
        ]},
      ],
    },
    {
      title: "INFECTION CONTROL",
      questions: [
        { id: "15", text: "Hand hygiene is done:", options: [
          { letter: "a", text: "Before care" },
          { letter: "b", text: "After care" },
          { letter: "c", text: "After gloves" },
          { letter: "d", text: "All" },
        ]},
        { id: "16", text: "Gloves are used when:", options: [
          { letter: "a", text: "Handling fluids" },
          { letter: "b", text: "Toileting" },
          { letter: "c", text: "Wounds" },
          { letter: "d", text: "All" },
        ]},
        { id: "17", text: "Best infection prevention:", options: [
          { letter: "a", text: "Gloves only" },
          { letter: "b", text: "Handwashing" },
          { letter: "c", text: "Mask only" },
          { letter: "d", text: "Nothing" },
        ]},
        { id: "18", text: "Universal precautions apply to:", options: [
          { letter: "a", text: "Some clients" },
          { letter: "b", text: "All clients" },
          { letter: "c", text: "None" },
          { letter: "d", text: "Staff only" },
        ]},
      ],
    },
    {
      title: "SAFETY & EMERGENCY",
      questions: [
        { id: "19", text: "If client is choking:", options: [
          { letter: "a", text: "Check pulse" },
          { letter: "b", text: "Check speech/cough" },
          { letter: "c", text: "Call family" },
          { letter: "d", text: "Ignore" },
        ]},
        { id: "20", text: "Fire emergency:", options: [
          { letter: "a", text: "Call supervisor" },
          { letter: "b", text: "Leave first" },
          { letter: "c", text: "Remove client & call 911" },
          { letter: "d", text: "Stay" },
        ]},
        { id: "21", text: "Fall occurs:", options: [
          { letter: "a", text: "Ignore" },
          { letter: "b", text: "Move client" },
          { letter: "c", text: "Report immediately" },
          { letter: "d", text: "Wait" },
        ]},
        { id: "22", text: "Oxygen safety:", options: [
          { letter: "a", text: "Allow smoking" },
          { letter: "b", text: "Keep away from heat" },
          { letter: "c", text: "Turn high" },
          { letter: "d", text: "Ignore" },
        ]},
      ],
    },
    {
      title: "PERSONAL CARE",
      questions: [
        { id: "23", text: "During bath:", options: [
          { letter: "a", text: "Expose client" },
          { letter: "b", text: "Keep covered" },
          { letter: "c", text: "Rush" },
          { letter: "d", text: "Skip" },
        ]},
        { id: "24", text: "Oral care should be:", options: [
          { letter: "a", text: "Rare" },
          { letter: "b", text: "Daily" },
          { letter: "c", text: "Weekly" },
          { letter: "d", text: "Optional" },
        ]},
        { id: "25", text: "Toileting assistance must include:", options: [
          { letter: "a", text: "Privacy" },
          { letter: "b", text: "Speed" },
          { letter: "c", text: "Ignoring" },
          { letter: "d", text: "Rushing" },
        ]},
        { id: "26", text: "Grooming includes:", options: [
          { letter: "a", text: "Hair care" },
          { letter: "b", text: "Nails" },
          { letter: "c", text: "Hygiene" },
          { letter: "d", text: "All" },
        ]},
      ],
    },
    {
      title: "SKIN CARE",
      questions: [
        { id: "27", text: "First sign of pressure ulcer:", options: [
          { letter: "a", text: "Pain" },
          { letter: "b", text: "Redness" },
          { letter: "c", text: "Bleeding" },
          { letter: "d", text: "Swelling" },
        ]},
        { id: "28", text: "Prevent pressure ulcers by:", options: [
          { letter: "a", text: "Turning" },
          { letter: "b", text: "Nutrition" },
          { letter: "c", text: "Clean skin" },
          { letter: "d", text: "All" },
        ]},
        { id: "29", text: "Skin should be:", options: [
          { letter: "a", text: "Dry & clean" },
          { letter: "b", text: "Wet" },
          { letter: "c", text: "Dirty" },
          { letter: "d", text: "Ignored" },
        ]},
      ],
    },
    {
      title: "MOBILITY & TRANSFERS",
      questions: [
        { id: "30", text: "Assist weak client:", options: [
          { letter: "a", text: "Strong side" },
          { letter: "b", text: "Weak side" },
          { letter: "c", text: "Far" },
          { letter: "d", text: "Alone" },
        ]},
        { id: "31", text: "Gait belt is for:", options: [
          { letter: "a", text: "Comfort" },
          { letter: "b", text: "Safety" },
          { letter: "c", text: "Decoration" },
          { letter: "d", text: "Exercise" },
        ]},
        { id: "32", text: "Transfers require:", options: [
          { letter: "a", text: "Speed" },
          { letter: "b", text: "Proper body mechanics" },
          { letter: "c", text: "Force" },
          { letter: "d", text: "None" },
        ]},
        { id: "33", text: "If client dizzy:", options: [
          { letter: "a", text: "Walk" },
          { letter: "b", text: "Sit immediately" },
          { letter: "c", text: "Ignore" },
          { letter: "d", text: "Run" },
        ]},
      ],
    },
    {
      title: "NUTRITION",
      questions: [
        { id: "34", text: "Elderly nutrition:", options: [
          { letter: "a", text: "Large meals" },
          { letter: "b", text: "Small frequent" },
          { letter: "c", text: "No fluids" },
          { letter: "d", text: "Skip meals" },
        ]},
        { id: "35", text: "Fluid intake recorded:", options: [
          { letter: "a", text: "Before" },
          { letter: "b", text: "After drinking" },
          { letter: "c", text: "Weekly" },
          { letter: "d", text: "Never" },
        ]},
        { id: "36", text: "Low salt diet:", options: [
          { letter: "a", text: "Chips" },
          { letter: "b", text: "Ham" },
          { letter: "c", text: "Chicken" },
          { letter: "d", text: "Soup" },
        ]},
      ],
    },
    {
      title: "MENTAL HEALTH & BEHAVIOR",
      questions: [
        { id: "37", text: "Alzheimer’s patient may:", options: [
          { letter: "a", text: "Forget" },
          { letter: "b", text: "Wander" },
          { letter: "c", text: "Be confused" },
          { letter: "d", text: "All" },
        ]},
        { id: "38", text: "Best approach to behavior:", options: [
          { letter: "a", text: "Restrain" },
          { letter: "b", text: "Observe cause" },
          { letter: "c", text: "Ignore" },
          { letter: "d", text: "Medicate" },
        ]},
      ],
    },
    {
      title: "MEDICATION (REMINDERS ONLY)",
      questions: [
        { id: "39", text: "Aides can:", options: [
          { letter: "a", text: "Give meds" },
          { letter: "b", text: "Inject meds" },
          { letter: "c", text: "Remind only" },
          { letter: "d", text: "Decide dose" },
        ]},
        { id: "40", text: "If client refuses meds:", options: [
          { letter: "a", text: "Force" },
          { letter: "b", text: "Ignore" },
          { letter: "c", text: "Report" },
          { letter: "d", text: "Hide" },
        ]},
      ],
    },
    {
      title: "ETHICS & PROFESSIONALISM",
      questions: [
        { id: "41", text: "Accept gifts?", options: [
          { letter: "a", text: "Yes" },
          { letter: "b", text: "No" },
          { letter: "c", text: "Sometimes" },
          { letter: "d", text: "Always" },
        ]},
        { id: "42", text: "Confidentiality means:", options: [
          { letter: "a", text: "Share info" },
          { letter: "b", text: "Protect info" },
          { letter: "c", text: "Ignore" },
          { letter: "d", text: "Post online" },
        ]},
      ],
    },
    {
      title: "TRUE / FALSE",
      questions: [
        { id: "43", text: "Respect culture differences.", options: [
          { letter: "a", text: "True" },
          { letter: "b", text: "False" },
        ]},
        { id: "44", text: "Use gait belt for safety.", options: [
          { letter: "a", text: "True" },
          { letter: "b", text: "False" },
        ]},
        { id: "45", text: "Document everything.", options: [
          { letter: "a", text: "True" },
          { letter: "b", text: "False" },
        ]},
        { id: "46", text: "Gloves not needed for fluids.", options: [
          { letter: "a", text: "True" },
          { letter: "b", text: "False" },
        ]},
        { id: "47", text: "Report changes immediately.", options: [
          { letter: "a", text: "True" },
          { letter: "b", text: "False" },
        ]},
        { id: "48", text: "Leave client unsafe.", options: [
          { letter: "a", text: "True" },
          { letter: "b", text: "False" },
        ]},
        { id: "49", text: "Follow care plan.", options: [
          { letter: "a", text: "True" },
          { letter: "b", text: "False" },
        ]},
        { id: "50", text: "Maintain professionalism.", options: [
          { letter: "a", text: "True" },
          { letter: "b", text: "False" },
        ]},
      ],
    },
  ];

  const ANSWER_KEY = [
    "b", "c", "b", "b", "c", "b", "c", "b", "b", "b",
    "c", "b", "b", "c", "d", "d", "b", "b", "b", "c",
    "c", "b", "b", "b", "a", "d", "b", "d", "a", "a",
    "b", "b", "b", "b", "b", "c", "d", "b", "c", "c",
    "b", "b", "a", "a", "a", "b", "a", "b", "a", "a",
  ];

  const TOTAL = ANSWER_KEY.length;

  /** Test record PDF (raster) — email-friendly: lower = smaller file, slightly softer. */
  const RECORD_PDF_H2C_SCALE = 1.0;
  const RECORD_PDF_MAX_RASTER_PX = 800;
  const RECORD_PDF_JPEG_QUALITY = 0.8;

  function getAllQuestionsFlat() {
    return SECTIONS.flatMap((s) => s.questions);
  }

  function findQuestionById(id) {
    for (const s of SECTIONS) {
      const q = s.questions.find((x) => x.id === id);
      if (q) return q;
    }
    return null;
  }

  function optionText(q, letter) {
    if (letter == null || letter === "") return "";
    const l = String(letter).toLowerCase();
    const o = q.options.find((x) => x.letter === l);
    return o ? o.text : "";
  }

  function renderTest() {
    const root = document.getElementById("test-sections");
    if (!root) return;

    root.innerHTML = "";
    for (const section of SECTIONS) {
      const block = document.createElement("div");
      block.className = "hha-test-section";
      const h2 = document.createElement("h2");
      h2.className = "hha-test-section-title";
      h2.textContent = section.title;
      block.appendChild(h2);

      for (const q of section.questions) {
        const fieldset = document.createElement("fieldset");
        fieldset.className = "hha-test-question";
        const legend = document.createElement("legend");
        legend.innerHTML = `<span class="hha-q-num">${q.id}.</span> <span class="hha-q-text">${escapeHtml(
          q.text
        )}</span>`;
        fieldset.appendChild(legend);
        const opts = document.createElement("div");
        opts.className = "hha-test-options";
        for (const opt of q.options) {
          const id = `q${q.id}_${opt.letter}`;
          const label = document.createElement("label");
          label.className = "hha-test-option";
          const input = document.createElement("input");
          input.type = "radio";
          input.name = `q${q.id}`;
          input.value = opt.letter;
          input.id = id;
          label.appendChild(input);
          label.appendChild(
            document.createTextNode(` ${opt.letter}. ${opt.text}`)
          );
          opts.appendChild(label);
        }
        fieldset.appendChild(opts);
        block.appendChild(fieldset);
      }
      root.appendChild(block);
    }
  }

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function collectAnswers() {
    const answers = {};
    const questions = getAllQuestionsFlat();
    for (const q of questions) {
      const el = document.querySelector(`input[name="q${q.id}"]:checked`);
      answers[q.id] = el ? el.value : null;
    }
    return answers;
  }

  function scoreAnswers(answers) {
    let correct = 0;
    const byId = getAllQuestionsFlat();
    for (let i = 0; i < byId.length; i++) {
      const q = byId[i];
      const key = ANSWER_KEY[i];
      if (answers[q.id] && answers[q.id].toLowerCase() === key) correct++;
    }
    return { correct, total: TOTAL, percent: Math.round((correct / TOTAL) * 1000) / 10 };
  }

  function computeStats(answers) {
    const flat = getAllQuestionsFlat();
    const sectionStats = SECTIONS.map((sec) => {
      let c = 0;
      for (const q of sec.questions) {
        const idx = flat.findIndex((x) => x.id === q.id);
        if (idx < 0) continue;
        const key = ANSWER_KEY[idx];
        if (answers[q.id] && answers[q.id].toLowerCase() === key) c += 1;
      }
      const t = sec.questions.length;
      return {
        title: sec.title,
        correct: c,
        total: t,
        percent: t ? Math.round((c / t) * 1000) / 10 : 0,
      };
    });
    const wrongIds = [];
    for (let i = 0; i < flat.length; i++) {
      const q = flat[i];
      const key = ANSWER_KEY[i];
      const u = answers[q.id];
      if (!u || u.toLowerCase() !== key) wrongIds.push(q.id);
    }
    return { sectionStats, wrongIds, wrongCount: wrongIds.length };
  }

  function getTestDateInfo() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return {
      iso: `${y}-${m}-${d}`,
      display: now.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  }

  function applyTestDate() {
    const d = getTestDateInfo();
    const el = document.getElementById("test-date");
    if (el) {
      el.value = d.display;
      el.dataset.iso = d.iso;
    }
    return d;
  }

  function getJsPDF() {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      throw new Error("PDF library not loaded. Check your network connection and try again.");
    }
    return window.jspdf.jsPDF;
  }

  function addWrappedLines(doc, str, x, y, maxW, lineH) {
    // jsPDF 2.5+ may throw "Invalid arguments passed to jsPDF.text" when
    // passing a string[] to text() in some cases — draw one line at a time.
    const text = String(str == null ? "" : str);
    const w = Math.max(1, Number(maxW) || 1);
    const h = Math.max(2, Number(lineH) || 5);
    const x0 = Number.isFinite(x) ? x : 0;
    let y0 = Number.isFinite(y) ? y : 0;
    const parts = doc.splitTextToSize(text, w);
    const lines = Array.isArray(parts) ? parts : [String(parts)];
    for (const raw of lines) {
      const line = String(raw);
      if (line) {
        doc.text(line, x0, y0);
      }
      y0 += h;
    }
    return y0;
  }

  function newPageIfNeeded(doc, y, minBottom, newPageY) {
    if (y > minBottom) {
      doc.addPage();
      return newPageY;
    }
    return y;
  }

  function waitForFonts() {
    if (document.fonts && typeof document.fonts.ready === "object") {
      return document.fonts.ready.then(function () {});
    }
    return Promise.resolve();
  }

  function downscaleCanvasToMaxWidth(source, maxW) {
    if (!source || source.width <= maxW) {
      return source;
    }
    const s = maxW / source.width;
    const w = maxW;
    const h = Math.max(1, Math.round(source.height * s));
    const out = document.createElement("canvas");
    out.width = w;
    out.height = h;
    const o = out.getContext("2d");
    o.imageSmoothingEnabled = true;
    o.imageSmoothingQuality = "high";
    o.fillStyle = "#ffffff";
    o.fillRect(0, 0, w, h);
    o.drawImage(source, 0, 0, w, h);
    return out;
  }

  /**
   * Score “ink” in a horizontal band (lower = more whitespace, better page break).
   */
  function inkScoreHorizontalBand(ctx, srcW, centerY, bandPx) {
    const h = ctx.canvas.height;
    const half = Math.floor(bandPx / 2);
    const yStart = Math.max(0, Math.floor(centerY) - half);
    const yEnd = Math.min(h, Math.ceil(centerY) + half);
    const actualH = yEnd - yStart;
    if (actualH <= 0) {
      return Infinity;
    }
    const data = ctx.getImageData(0, yStart, srcW, actualH).data;
    let ink = 0;
    const step = srcW > 1100 ? 2 : 1;
    for (let row = 0; row < actualH; row++) {
      const rowOff = row * srcW * 4;
      for (let x = 0; x < srcW; x += step) {
        const i = rowOff + x * 4;
        const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        if (lum < 248) {
          ink += 1;
        }
      }
    }
    return ink;
  }

  /**
   * Pick a cut row inside [y0, y0 + sliceHpx] near the bottom of the slice so we
   * split on whitespace between lines instead of through glyphs (never above slice).
   */
  function findBestPageCutY(ctx, srcW, y0, sliceHpx, srcH, minAdvance) {
    const idealBottom = Math.min(y0 + sliceHpx, srcH);
    if (idealBottom >= srcH - 1) {
      return srcH;
    }
    const searchBottom = Math.floor(idealBottom);
    const searchTop = Math.max(y0 + minAdvance, searchBottom - 140);
    let bestY = searchBottom;
    let bestInk = Infinity;
    for (let y = searchTop; y <= searchBottom; y++) {
      const ink = inkScoreHorizontalBand(ctx, srcW, y, 6);
      if (ink < bestInk || (ink === bestInk && y > bestY)) {
        bestInk = ink;
        bestY = y;
      }
    }
    return bestY;
  }

  function canvasToRecordPdfBlob(sourceCanvas) {
    const jsPDF = getJsPDF();
    const margin = 8;
    const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const maxW = pageW - 2 * margin;
    const maxH = pageH - 2 * margin;
    const srcW = sourceCanvas.width;
    const srcH = sourceCanvas.height;
    if (srcW < 4 || srcH < 4) {
      throw new Error(
        "The snapshot has no size. If you opened this file as file://, use a local web server (e.g. python3 -m http.server) and open http://localhost/… instead."
      );
    }
    const fullHeightMm = (srcH / srcW) * maxW;
    const jpgQ = RECORD_PDF_JPEG_QUALITY;
    if (fullHeightMm <= maxH) {
      const jpg = sourceCanvas.toDataURL("image/jpeg", jpgQ);
      doc.addImage(jpg, "JPEG", margin, margin, maxW, fullHeightMm);
      return doc.output("blob");
    }
    const sliceHpx = (maxH * srcH) / fullHeightMm;
    const minAdvance = Math.max(28, Math.floor(sliceHpx * 0.12));
    const ctx = sourceCanvas.getContext("2d");
    let y0 = 0;
    let page = 0;
    while (y0 < srcH - 1) {
      const remaining = srcH - y0;
      let cutY;
      if (remaining <= sliceHpx + 1) {
        cutY = srcH;
      } else {
        cutY = findBestPageCutY(ctx, srcW, y0, sliceHpx, srcH, minAdvance);
      }
      const thisH = cutY - y0;
      if (thisH < 1) {
        break;
      }
      const p = document.createElement("canvas");
      p.width = srcW;
      p.height = thisH;
      const c = p.getContext("2d");
      c.fillStyle = "#ffffff";
      c.fillRect(0, 0, p.width, p.height);
      c.drawImage(sourceCanvas, 0, y0, srcW, thisH, 0, 0, srcW, thisH);
      const hMm = (thisH / srcH) * fullHeightMm;
      if (page > 0) {
        doc.addPage();
      }
      const jpg2 = p.toDataURL("image/jpeg", jpgQ);
      doc.addImage(jpg2, "JPEG", margin, margin, maxW, hMm);
      y0 = cutY;
      page += 1;
      if (page > 400) {
        break;
      }
    }
    return doc.output("blob");
  }

  function buildRecordPdfBlob() {
    const el = document.getElementById("hha-pdf-capture");
    if (!el) {
      return Promise.reject(new Error("Test content not found."));
    }
    if (typeof window.html2canvas !== "function") {
      return Promise.reject(
        new Error("html2canvas is not loaded. Check your network connection and try again.")
      );
    }
    if (el.scrollHeight < 32) {
      return Promise.reject(
        new Error("The test area has no content to capture yet. If this happens after loading, use http:// (local server) instead of the file: protocol.")
      );
    }
    const h2c = window.html2canvas;
    return waitForFonts()
      .then(function () {
        return new Promise(function (r) {
          setTimeout(r, 80);
        });
      })
      .then(function () {
        try {
          window.scrollTo(0, 0);
        } catch (e) {
          // ignore
        }
        return h2c(el, {
          scale: RECORD_PDF_H2C_SCALE,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: false,
          imageTimeout: 20 * 1000,
          removeContainer: true,
          scrollX: 0,
          scrollY: 0,
          onclone: function (clonedDoc) {
            var root = clonedDoc.getElementById("hha-pdf-capture");
            if (!root) {
              return;
            }
            var w = Math.max(320, root.scrollWidth, root.getBoundingClientRect().width, el.scrollWidth);
            var h = Math.max(root.scrollHeight, root.getBoundingClientRect().height, el.scrollHeight);
            if (h < 1) {
              h = el.scrollHeight;
            }
            if (h < 1) {
              h = 200;
            }
            root.style.boxSizing = "border-box";
            root.style.color = "#111111";
            root.style.backgroundColor = "#ffffff";
            root.style.minHeight = h + "px";
            root.style.width = w + "px";
            root.style.maxWidth = w + "px";
            root.style.position = "relative";
            root.style.left = "0";
            root.style.top = "0";
            root.style.margin = "0";
            root.style.padding = "0";
            root.style.transform = "none";
            root.style.filter = "none";
            root.style.mixBlendMode = "normal";
            root.style.opacity = "1";
            root.style.zIndex = "0";
            clonedDoc.body.style.backgroundColor = "#ffffff";
            clonedDoc.body.style.minHeight = h + 40 + "px";
            clonedDoc.body.style.width = w + "px";
            clonedDoc.body.style.maxWidth = w + "px";
            clonedDoc.body.style.position = "relative";
            clonedDoc.body.style.color = "#111";
            clonedDoc.body.style.display = "block";
            clonedDoc.body.style.height = "auto";
            clonedDoc.body.style.margin = "0";
            clonedDoc.body.style.padding = "0";
            clonedDoc.body.style.transform = "none";
            clonedDoc.documentElement.style.backgroundColor = "#ffffff";
            clonedDoc.documentElement.style.width = w + "px";
            clonedDoc.documentElement.style.minHeight = h + 40 + "px";
          },
        });
      })
      .then(function (canvas) {
        if (!canvas || !canvas.width || !canvas.height) {
          throw new Error(
            "The snapshot is blank. Do not use file://; serve the site with a local web server, then try again."
          );
        }
        const scaled = downscaleCanvasToMaxWidth(canvas, RECORD_PDF_MAX_RASTER_PX);
        return canvasToRecordPdfBlob(scaled);
      });
  }

  function buildScorePdfBlob(employeeName, testDate, answers, score, stats) {
    const doc = buildScorePdf(employeeName, testDate, answers, score, stats);
    return doc.output("blob");
  }

  function submitHhaCompetencyNetlify(recordBlob, scoreBlob, meta) {
    const fd = new FormData();
    fd.append("form-name", "hha-competency");
    fd.append("employeeName", meta.name);
    fd.append("testDate", meta.testDate);
    fd.append("scoreSummary", meta.scoreSummary);
    fd.append("bot-field", "");
    fd.append("hha-record", recordBlob, meta.recordFilename);
    fd.append("hha-score", scoreBlob, meta.scoreFilename);
    return fetch(meta.actionUrl || "/", {
      method: "POST",
      body: fd,
    });
  }

  function buildScorePdf(employeeName, testDate, answers, score, stats) {
    const jsPDF = getJsPDF();
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 14;
    const maxW = pageW - margin * 2;
    let y = 18;
    const lineH = 5;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    y = addWrappedLines(
      doc,
      "WellTrust Home Care LLC \u2013 Competency Test (Answer Key & Score)",
      margin,
      y,
      maxW,
      lineH
    );
    y += 4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    y = addWrappedLines(
      doc,
      `Employee: ${employeeName || "\u2014"}   |   Date: ${testDate || "\u2014"}`,
      margin,
      y,
      maxW,
      4.5
    );
    y += 2;
    doc.setFont("helvetica", "bold");
    y = addWrappedLines(
      doc,
      `Score: ${score.correct} / ${score.total} (${score.percent}%)`,
      margin,
      y,
      maxW,
      lineH
    );
    y += 2;
    doc.setFont("helvetica", "normal");
    y = addWrappedLines(
      doc,
      `Total correct: ${score.correct} of ${score.total}   |   Total incorrect: ${stats.wrongCount}`,
      margin,
      y,
      maxW,
      4.5
    );
    y += 4;
    if (stats.wrongIds.length > 0) {
      const miss = `Questions missed: ${stats.wrongIds.join(", ")}`;
      y = addWrappedLines(doc, miss, margin, y, maxW, 4.5);
      y += 4;
    } else {
      y = addWrappedLines(
        doc,
        "All questions correct.",
        margin,
        y,
        maxW,
        4.5
      );
      y += 4;
    }

    doc.setFont("helvetica", "bold");
    y = addWrappedLines(doc, "By topic (correct / total)", margin, y, maxW, lineH);
    y += 2;
    doc.setFont("helvetica", "normal");
    for (const row of stats.sectionStats) {
      y = newPageIfNeeded(doc, y, 275, 18);
      y = addWrappedLines(
        doc,
        `• ${row.title}: ${row.correct} / ${row.total} (${row.percent}%)`,
        margin,
        y,
        maxW,
        4.2
      );
    }
    y += 4;
    doc.setFont("helvetica", "bold");
    y = addWrappedLines(doc, "Item detail", margin, y, maxW, lineH);
    y += 3;
    y = newPageIfNeeded(doc, y, 270, 18);

    const byId = getAllQuestionsFlat();
    for (let i = 0; i < byId.length; i++) {
      const q = byId[i];
      const key = ANSWER_KEY[i];
      const user = answers[q.id];
      const ok = user && user.toLowerCase() === key;
      const rightLine = `Correct: ${key.toUpperCase()}. ${optionText(q, key)}`;
      const yourLine = user
        ? `Your answer: ${user.toUpperCase()}. ${optionText(q, user)}  ${
            ok ? "[Correct]" : "[Incorrect]"
          }`
        : "Your answer: (not answered) [Incorrect]";

      y = newPageIfNeeded(doc, y, 270, 18);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      y = addWrappedLines(doc, `${q.id}. ${q.text}`, margin, y, maxW, 4.2);
      doc.setFont("helvetica", "normal");
      y = addWrappedLines(doc, rightLine, margin, y, maxW, 4.2);
      y = addWrappedLines(doc, yourLine, margin, y, maxW, 4.2);
      y += 3;
    }

    return doc;
  }

  function initSignaturePad() {
    const canvas = document.getElementById("hha-signature");
    if (!canvas) return { clear: function () {} };
    const ctx = canvas.getContext("2d");
    let drawing = false;

    function relPoint(e) {
      const t = e.touches ? e.touches[0] : e;
      const r = canvas.getBoundingClientRect();
      const x = ((t.clientX - r.left) / r.width) * canvas.width;
      const y = ((t.clientY - r.top) / r.height) * canvas.height;
      return { x, y };
    }

    function start(e) {
      if (e.cancelable) e.preventDefault();
      drawing = true;
      const p = relPoint(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    }
    function move(e) {
      if (!drawing) return;
      if (e.cancelable) e.preventDefault();
      const p = relPoint(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
    function end() {
      drawing = false;
    }

    ctx.strokeStyle = "#111";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.fillStyle = "#fafafa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener("mousedown", start);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    canvas.addEventListener("touchstart", start, { passive: false });
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);
    return {
      clear: function () {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fafafa";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      },
    };
  }

  function onSubmit(e) {
    e.preventDefault();
    const nameEl = document.getElementById("employee-name");
    const name = (nameEl && nameEl.value.trim()) || "";
    if (!name) {
      window.alert("Please enter your name.");
      if (nameEl) nameEl.focus();
      return;
    }

    const answers = collectAnswers();
    for (const q of getAllQuestionsFlat()) {
      if (!answers[q.id]) {
        window.alert(
          `Please answer all questions. The first unanswered question is number ${q.id}.`
        );
        const first = document.querySelector(`input[name="q${q.id}"]`);
        if (first) first.focus();
        return;
      }
    }

    const formEl = document.getElementById("hha-test-form");
    const sub = document.getElementById("hha-submit");
    const originalBtnLabel = sub ? sub.textContent : "Submit";
    (async function () {
      if (sub) {
        sub.disabled = true;
        sub.textContent = "Submitting...";
      }
      const dateInfo = applyTestDate();
      const testDate = dateInfo.display;
      const score = scoreAnswers(answers);
      const stats = computeStats(answers);
      const safeName = name
        .replace(/[/\\?%*:|"<>]/g, "")
        .replace(/\s+/g, " ")
        .slice(0, 80) || "employee";
      const stamp = dateInfo.iso;
      const recordFilename = `HHA_Test_Record_${safeName}_${stamp}.pdf`;
      const scoreFilename = `HHA_Test_Score_${safeName}_${stamp}.pdf`;
      const scoreSummary = `${score.correct} / ${score.total} (${score.percent}%)`;
      try {
        let recordBlob;
        try {
          recordBlob = await buildRecordPdfBlob();
        } catch (err) {
          window.alert(err.message || "Could not create the test record PDF.");
          return;
        }
        let scoreBlob;
        try {
          scoreBlob = buildScorePdfBlob(name, testDate, answers, score, stats);
        } catch (err2) {
          window.alert(err2.message || "Could not create the score PDF.");
          return;
        }
        const sumEl = document.getElementById("hha-score-summary");
        if (sumEl) {
          sumEl.value = scoreSummary;
        }
        const response = await submitHhaCompetencyNetlify(recordBlob, scoreBlob, {
          name: name,
          testDate: testDate,
          scoreSummary: scoreSummary,
          recordFilename: recordFilename,
          scoreFilename: scoreFilename,
          actionUrl: formEl ? formEl.getAttribute("action") || "/" : "/",
        });
        if (!response.ok) {
          throw new Error("submit");
        }
        window.location.replace("/");
      } catch (err3) {
        if (err3 && err3.message === "submit") {
          window.alert(
            "Could not submit online. Please email welltrusthomecare@gmail.com or call (234) 704-6458."
          );
        } else {
          window.alert(err3.message || "Submission failed.");
        }
      } finally {
        if (sub) {
          sub.disabled = false;
          sub.textContent = originalBtnLabel;
        }
      }
    })();
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyTestDate();
    setInterval(applyTestDate, 60 * 1000);
    const pad = initSignaturePad();
    const clearBtn = document.getElementById("hha-sig-clear");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        pad.clear();
      });
    }
    renderTest();
    const form = document.getElementById("hha-test-form");
    if (form) form.addEventListener("submit", onSubmit);
  });
})();
