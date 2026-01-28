const STORAGE_KEY = "cuaderno_azul_progress_v1";

const discoveries = {
  d1: {
    emoji: "🪨",
    title: "Piedra lisa",
    sub: "Orilla del río",
    summary: "Las piedras no presumen lo que son. Solo están. Eso me calma cuando estoy contigo.",
    habitat: "Piedras pequeñas, quietas. Una forma de belleza que no grita.",
    note: "Me gusta cómo las recoges: como si fueras capaz de ver valor donde otros solo ven “nada”.",
    tags: ["piedras", "calma", "detalle"]
  },
  d2: {
    emoji: "🪨",
    title: "Piedra con veta",
    sub: "Un detalle escondido",
    summary: "Hay cosas que solo aparecen si las miras un segundo más. Tú haces eso naturalmente.",
    habitat: "Vetas finas, texturas suaves. La gracia está en acercarse.",
    note: "A veces pienso que tú vives un poquito más despierta que el resto del mundo.",
    tags: ["observación", "textura", "cerca"]
  },
  d3: {
    emoji: "🪨",
    title: "Piedra azulada",
    sub: "Un guiño a tu color",
    summary: "No sé si es el color, o lo que el color me recuerda. Pero el azul siempre me lleva a ti.",
    habitat: "Un azul tranquilo: no invade, acompaña.",
    note: "Me gusta amarte así: sin ruido, pero con intención.",
    tags: ["azul", "intención", "suave"]
  },

  d4: {
    emoji: "🐾",
    title: "Huellitas",
    sub: "Alguien pasó por aquí",
    summary: "Tú no “miras” el ambiente. Lo lees. Como si el mundo te diera pistas y tú supieras escucharlas.",
    habitat: "Señales pequeñas: marcas, sombras, sonidos. El mapa real está en lo sutil.",
    note: "Eso tuyo de encontrar animalitos… a mí me parece tierno y brillante al mismo tiempo.",
    tags: ["animalitos", "pistas", "curiosidad"]
  },
  d5: {
    emoji: "🦊",
    title: "Zorrito mínimo",
    sub: "Una criatura bonita",
    summary: "Tu amor por los animalitos lindos me derrite. Es como si tu ternura tuviera radar propio.",
    habitat: "A veces lo lindo no es “cursi”. Es delicado. Es una forma de cuidado.",
    note: "Me gusta verte emocionarte por cosas pequeñas. Me hace quererte más, sin esfuerzo.",
    tags: ["ternura", "lindo", "cuidado"]
  },
  d6: {
    emoji: "🦦",
    title: "Nutria curiosa",
    sub: "Observación tranquila",
    summary: "Me gusta que no necesitas grandes planes para estar bien: te basta un paseo y mirar.",
    habitat: "El mejor ambiente: el que no te exige ser otra persona.",
    note: "Quiero ser para ti un lugar así: donde puedas ser rarita en paz.",
    tags: ["paz", "paseo", "ser tú"]
  },

  d7: {
    emoji: "📘",
    title: "Página Encarta",
    sub: "Un guiño a tus juegos",
    summary: "Esto está hecho con esa energía: explorar por curiosidad, no por obligación.",
    habitat: "Como un CD viejo, pero con una cosa nueva: tú.",
    note: "Me encanta que te gusten esas exploraciones antiguas. Dice mucho de tu cabeza (en el mejor sentido).",
    tags: ["encarta", "explorar", "nostalgia"]
  },
  d8: {
    emoji: "📎",
    title: "Recorte pegado",
    sub: "Un fragmento honesto",
    summary: "No intento impresionarte. Intento mirarte bien. Y recordarte que me importas.",
    habitat: "Un cuaderno no grita amor. Lo guarda con cuidado.",
    note: "Si esto te hace sonreír un poquito, ya valió la pena.",
    tags: ["honesto", "cariño", "cuidado"]
  },

  d9: {
    emoji: "🦕",
    title: "Fósil de Triceratops",
    sub: "Desbloqueado",
    summary: "Tu dinosaurio favorito tenía algo que yo admiro: fuerza tranquila, sin necesidad de violencia.",
    habitat: "Tres cuernos no para atacar por deporte, sino para sostenerse en el mundo.",
    note: "Yo contigo quiero eso: sostener, cuidar, estar. Con intención, pero sin presión.",
    tags: ["triceratops", "fuerza", "tranquilo"]
  }
};

const finalMessage = `Eres rarita, por eso me gustas mucho.

Y no lo digo como un chiste.
Lo digo porque me encanta tu forma de explorar el mundo: 
cómo recoges piedras como si fueran tesoros, 
cómo buscas animalitos como si tuvieras un radar para lo vivo,
cómo te emocionas por detalles que casi nadie nota.

Yo no quiero un amor ruidoso.
Quiero uno claro.
De esos que se sienten seguros, y se van construyendo con calma.

Si algún día dudas, vuelve aquí:
yo sigo eligiéndote.`;

const state = {
  selectedId: null,
  observed: new Set(),
};

const els = {
  progressPill: document.getElementById("progressPill"),
  resetBtn: document.getElementById("resetBtn"),

  panelSub: document.getElementById("panelSub"),
  bigEmoji: document.getElementById("bigEmoji"),
  title: document.getElementById("title"),
  summary: document.getElementById("summary"),
  meta: document.getElementById("meta"),
  habitat: document.getElementById("habitat"),
  note: document.getElementById("note"),
  callout: document.getElementById("callout"),

  finalCard: document.getElementById("finalCard"),
  finalText: document.getElementById("finalText"),
  copyBtn: document.getElementById("copyBtn"),
  copiedMsg: document.getElementById("copiedMsg"),

  modal: document.getElementById("modal"),
  modalEmoji: document.getElementById("modalEmoji"),
  modalTitle: document.getElementById("modalTitle"),
  modalSub: document.getElementById("modalSub"),
  modalText: document.getElementById("modalText"),
  modalFootnote: document.getElementById("modalFootnote"),
  closeModal: document.getElementById("closeModal"),
  markBtn: document.getElementById("markBtn"),
  laterBtn: document.getElementById("laterBtn"),
};

function save(){
  const data = { observed: Array.from(state.observed) };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function load(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return;
    const data = JSON.parse(raw);
    if(Array.isArray(data.observed)){
      state.observed = new Set(data.observed.filter(id => discoveries[id]));
    }
  }catch(e){}
}

function updateProgressUI(){
  const count = state.observed.size;
  els.progressPill.textContent = `${count}/9 observaciones`;

  // Mark buttons as found
  document.querySelectorAll(".item[data-id]").forEach(btn=>{
    const id = btn.getAttribute("data-id");
    btn.classList.toggle("found", state.observed.has(id));
  });

  // Unlock fossil after 6 observed
  const fossilBtn = document.querySelector('.item.fossil[data-id="d9"]');
  const unlocked = count >= 6;
  fossilBtn.classList.toggle("locked", !unlocked);

  // If locked, keep lock visible
  const lockIcon = fossilBtn.querySelector(".lock");
  if(lockIcon) lockIcon.style.display = unlocked ? "none" : "grid";

  // Final card appears once all 9 observed
  const allDone = count >= 9;
  els.finalCard.hidden = !allDone;
  if(allDone){
    els.finalText.textContent = finalMessage;
  }
}

function renderPanel(id){
  const d = discoveries[id];
  if(!d) return;

  state.selectedId = id;

  els.panelSub.textContent = `${d.sub}${state.observed.has(id) ? " • observado" : ""}`;
  els.bigEmoji.textContent = d.emoji;
  els.title.textContent = d.title;
  els.summary.textContent = d.summary;
  els.habitat.textContent = d.habitat;
  els.note.textContent = d.note;

  els.meta.innerHTML = "";
  (d.tags || []).forEach(t=>{
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = t;
    els.meta.appendChild(span);
  });

  // Gentle hint in callout
  const left = 9 - state.observed.size;
  els.callout.textContent = left > 0
    ? `Te faltan ${left} observaciones para completar el cuaderno. Sin prisa.`
    : `Cuaderno completo. Si te quedas aquí un rato, está bien.`;
}

function openModal(id){
  const d = discoveries[id];
  if(!d) return;

  // Handle locked fossil
  if(id === "d9" && state.observed.size < 6){
    els.modalEmoji.textContent = "🔒";
    els.modalTitle.textContent = "Fósil bloqueado";
    els.modalSub.textContent = "Necesitas 6 observaciones";
    els.modalText.textContent =
      "Esto se desbloquea cuando ya hayas encontrado suficientes detalles del paseo. Vuelve luego.";
    els.modalFootnote.textContent = "Pista: mira la orilla y el centro del río.";
    els.markBtn.disabled = true;
    els.markBtn.textContent = "Aún no";
  }else{
    els.modalEmoji.textContent = d.emoji;
    els.modalTitle.textContent = d.title;
    els.modalSub.textContent = d.sub;
    els.modalText.textContent = d.note;
    els.modalFootnote.textContent = state.observed.has(id)
      ? "Ya lo marcaste como observado."
      : "Si esto te resonó, márcalo como observado.";

    els.markBtn.disabled = false;
    els.markBtn.textContent = state.observed.has(id) ? "Ya observado" : "Marcar como observado";
  }

  els.modal.classList.add("show");
  els.modal.setAttribute("aria-hidden", "false");
}

function closeModal(){
  els.modal.classList.remove("show");
  els.modal.setAttribute("aria-hidden", "true");
}

function markObserved(id){
  if(!discoveries[id]) return;
  if(id === "d9" && state.observed.size < 6) return;

  state.observed.add(id);
  save();
  updateProgressUI();
  renderPanel(id);
}

function setupTabs(){
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab=>{
    tab.addEventListener("click", ()=>{
      tabs.forEach(t=>t.classList.remove("active"));
      tab.classList.add("active");

      const name = tab.getAttribute("data-tab");
      document.querySelectorAll(".pane").forEach(p=>p.classList.remove("active"));
      document.getElementById(`pane-${name}`).classList.add("active");

      tabs.forEach(t=>t.setAttribute("aria-selected", t === tab ? "true" : "false"));
    });
  });
}

function setupSceneClicks(){
  document.querySelectorAll(".item[data-id]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.getAttribute("data-id");
      openModal(id);
    });
  });
}

function setupModal(){
  els.closeModal.addEventListener("click", closeModal);
  els.laterBtn.addEventListener("click", closeModal);
  document.querySelector(".modal-backdrop").addEventListener("click", closeModal);

  els.markBtn.addEventListener("click", ()=>{
    const id = state.selectedId;
    // If modal was opened without setting selectedId, infer from modal title? keep simple:
    // Better: store pending id in dataset
  });

  // We’ll store pending id on modal element each time openModal runs
}

function patchModalIdStorage(){
  // Override openModal to store the pending id in modal dataset
  const originalOpenModal = openModal;
  window.openModal = function(id){
    els.modal.dataset.pendingId = id;
    originalOpenModal(id);
  };
  // rebind scene clicks to use window.openModal
  document.querySelectorAll(".item[data-id]").forEach(btn=>{
    btn.replaceWith(btn.cloneNode(true));
  });
  // After cloning, reselect & bind again
  document.querySelectorAll(".item[data-id]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.getAttribute("data-id");
      window.openModal(id);
    });
  });

  // Mark button uses pending id
  els.markBtn.addEventListener("click", ()=>{
    const id = els.modal.dataset.pendingId;
    if(!id) return;
    if(state.observed.has(id)){
      closeModal();
      return;
    }
    markObserved(id);
    closeModal();
  });
}

function setupReset(){
  els.resetBtn.addEventListener("click", ()=>{
    localStorage.removeItem(STORAGE_KEY);
    state.observed = new Set();
    state.selectedId = null;
    updateProgressUI();
    els.panelSub.textContent = "Selecciona algo en el mapa.";
    els.bigEmoji.textContent = "🟦";
    els.title.textContent = "Cuaderno Azul";
    els.summary.textContent = "Esto es un lugar pequeño para descubrir cosas que me recuerdan a ti.";
    els.habitat.textContent = "Un paseo tranquilo: orilla, piedras, detalles, animalitos y una nostalgia bonita.";
    els.note.textContent = "Cuando estés lista, explora sin prisa. Esto no intenta impresionarte: intenta mirarte bien.";
    els.meta.innerHTML = "";
    els.finalCard.hidden = true;
    els.copiedMsg.hidden = true;
  });
}

function setupCopy(){
  els.copyBtn.addEventListener("click", async ()=>{
    try{
      await navigator.clipboard.writeText("Eres rarita, por eso me gustas mucho");
      els.copiedMsg.hidden = false;
      setTimeout(()=> els.copiedMsg.hidden = true, 1200);
    }catch(e){
      // fallback: do nothing
    }
  });
}

function init(){
  load();
  setupTabs();
  setupSceneClicks();
  setupModal();
  patchModalIdStorage();
  setupReset();
  setupCopy();
  updateProgressUI();

  // Start by rendering a neutral panel
  if(state.observed.size > 0){
    // pick last observed to show something immediately
    const last = Array.from(state.observed).slice(-1)[0];
    renderPanel(last);
  }
}

init();
