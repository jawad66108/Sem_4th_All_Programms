import { useState, useRef, useEffect } from "react";

/* ─── Mock Data per batch+semester ─── */
const ALL_DATA = {
  "BSCS-4": {
    "Fall-2025": [
      { name: "Ayesha Raza",   regNumber: "BSCS-2022-004", sgpa: 3.95, section: "4B" },
      { name: "Ali Hassan",    regNumber: "BSCS-2022-001", sgpa: 3.88, section: "4A" },
      { name: "Fatima Malik",  regNumber: "BSCS-2022-002", sgpa: 3.75, section: "4A" },
      { name: "Usman Tariq",   regNumber: "BSCS-2022-003", sgpa: 3.68, section: "4B" },
      { name: "Sara Ahmed",    regNumber: "BSCS-2022-005", sgpa: 3.62, section: "4A" },
      { name: "Hassan Khan",   regNumber: "BSCS-2022-006", sgpa: 3.55, section: "4B" },
    ],
    "Spring-2025": [
      { name: "Ali Hassan",    regNumber: "BSCS-2022-001", sgpa: 3.92, section: "4A" },
      { name: "Ayesha Raza",   regNumber: "BSCS-2022-004", sgpa: 3.80, section: "4B" },
      { name: "Zara Siddiqui", regNumber: "BSCS-2022-007", sgpa: 3.60, section: "4A" },
    ],
  },
  "BSSE-4": {
    "Fall-2025": [
      { name: "Omar Farooq",   regNumber: "BSSE-2022-001", sgpa: 3.90, section: "4A" },
      { name: "Nadia Akram",   regNumber: "BSSE-2022-002", sgpa: 3.72, section: "4A" },
      { name: "Bilal Saeed",   regNumber: "BSSE-2022-003", sgpa: 3.58, section: "4B" },
    ],
    "Spring-2025": [
      { name: "Nadia Akram",   regNumber: "BSSE-2022-002", sgpa: 3.85, section: "4A" },
      { name: "Omar Farooq",   regNumber: "BSSE-2022-001", sgpa: 3.65, section: "4A" },
    ],
  },
  "BSCS-3": {
    "Fall-2025": [
      { name: "Hamza Malik",   regNumber: "BSCS-2023-001", sgpa: 3.98, section: "3A" },
      { name: "Iqra Nawaz",    regNumber: "BSCS-2023-002", sgpa: 3.88, section: "3A" },
      { name: "Tariq Javed",   regNumber: "BSCS-2023-003", sgpa: 3.70, section: "3A" },
      { name: "Mahnoor Ali",   regNumber: "BSCS-2023-004", sgpa: 3.55, section: "3A" },
    ],
    "Spring-2025": [
      { name: "Iqra Nawaz",    regNumber: "BSCS-2023-002", sgpa: 3.91, section: "3A" },
      { name: "Hamza Malik",   regNumber: "BSCS-2023-001", sgpa: 3.82, section: "3A" },
    ],
  },
};

const BATCHES   = Object.keys(ALL_DATA);
const SEMESTERS = ["Fall-2025", "Spring-2025"];
const MIN_SGPA  = 3.5;

/* ─── Icons ─── */
const IconChart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const IconBook = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const IconLogout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconMedal = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="14" r="6"/>
    <path d="M8 6l-2-4h12l-2 4"/>
    <path d="M12 10v4l2 2"/>
  </svg>
);
const IconStar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconTrophy = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
  </svg>
);
const IconChevron = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const navItems = [
  { id: "cgpa",    label: "CGPA Analysis", icon: <IconChart /> },
  { id: "dean",    label: "Dean List",      icon: <IconMedal /> },
  { id: "project", label: "My Project",     icon: <IconBook /> },
];

const rankColors = {
  1: { bg: "#FFD700", text: "#111" },
  2: { bg: "#C0C0C0", text: "#111" },
  3: { bg: "#CD7F32", text: "#fff" },
};

/* ─── Dropdown Component ─── */
function Dropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={styles.dropWrapper}>
      <button style={styles.dropBtn} onClick={() => setOpen(!open)}>
        <span style={styles.dropLabel}>{label}</span>
        <span style={styles.dropValue}>{value}</span>
        <IconChevron open={open} />
      </button>
      {open && (
        <div style={styles.dropMenu}>
          {options.map((opt) => (
            <button
              key={opt}
              style={{
                ...styles.dropOption,
                ...(opt === value ? styles.dropOptionActive : {}),
              }}
              onClick={() => { onChange(opt); setOpen(false); }}
            >
              {opt === value && <span style={{ color: "#F5C400", marginRight: 6 }}>✓</span>}
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ─── */
export default function DeanList() {
  const [activeNav,   setActiveNav]   = useState("dean");
  const [hoveredNav,  setHoveredNav]  = useState(null);
  const [hoveredRow,  setHoveredRow]  = useState(null);
  const [selBatch,    setSelBatch]    = useState("BSCS-4");
  const [selSemester, setSelSemester] = useState("Fall-2025");

  const rawData  = (ALL_DATA[selBatch]?.[selSemester] || [])
    .filter((s) => s.sgpa >= MIN_SGPA)
    .sort((a, b) => b.sgpa - a.sgpa)
    .map((s, i) => ({ ...s, rank: i + 1 }));

  return (
    <div style={styles.page}>

      {/* ── Sidebar ── */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarWatermark}>R</div>

        <div style={styles.brand}>
          <span style={styles.brandText}>RANKIFY</span>
          <span style={styles.brandPro}>PRO</span>
        </div>
        <p style={styles.brandSub}>Academic Dashboard</p>
        <div style={styles.sidebarDivider} />

        <nav style={styles.nav}>
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            const isHov    = hoveredNav === item.id;
            return (
              <button key={item.id}
                style={{ ...styles.navItem, ...(isActive ? styles.navItemActive : {}), ...(isHov && !isActive ? styles.navItemHover : {}) }}
                onClick={() => setActiveNav(item.id)}
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <span style={{ color: isActive ? "#111" : "rgba(0,0,0,0.45)" }}>{item.icon}</span>
                <span style={styles.navLabel}>{item.label}</span>
                {isActive && <span style={styles.navDot} />}
              </button>
            );
          })}
        </nav>

        <div style={styles.decoBox}>
          <div style={styles.trophyGlow} />
          <div style={{ color: "rgba(0,0,0,0.15)", position: "relative", zIndex: 1 }}>
            <IconTrophy size={110} />
          </div>
          <div style={styles.trophyStars}>
            {["★","★","★"].map((s, i) => (
              <span key={i} style={styles.starDot}>{s}</span>
            ))}
          </div>
        </div>

        <button
          style={{ ...styles.logoutBtn, ...(hoveredNav === "logout" ? styles.logoutHover : {}) }}
          onMouseEnter={() => setHoveredNav("logout")}
          onMouseLeave={() => setHoveredNav(null)}
        >
          <IconLogout /><span>Logout</span>
        </button>
        <p style={styles.sidebarFooter}>© RANKIFY PRO</p>
      </aside>

      {/* ── Main ── */}
      <main style={styles.main}>

        {/* Header card */}
        <div style={styles.headerCard}>
          <div style={styles.headerCircle1} />
          <div style={styles.headerCircle2} />

          <div style={styles.headerInner}>
            <div style={styles.headerLeft}>
              <div style={styles.deanTitle}>
                <span style={styles.medalIconBox}><IconMedal size={28} /></span>
                Dean List
              </div>
              <p style={styles.batchLabel}>Batch {selBatch} · {selSemester}</p>
              <div style={styles.headerBadges}>
                <span style={styles.semBadge}>Min SGPA {MIN_SGPA}+</span>
                <span style={styles.countBadge}>{rawData.length} Students Qualified</span>
              </div>
            </div>

            {/* Dropdowns */}
            <div style={styles.dropdowns}>
              <Dropdown
                label="BATCH"
                options={BATCHES}
                value={selBatch}
                onChange={setSelBatch}
              />
              <Dropdown
                label="SEMESTER"
                options={SEMESTERS}
                value={selSemester}
                onChange={setSelSemester}
              />
            </div>

            <div style={styles.headerStat}>
              <p style={styles.headerStatNum}>{rawData.length}</p>
              <p style={styles.headerStatLabel}>on Dean's List</p>
              <p style={styles.headerStatSub}>Semester GPA ≥ {MIN_SGPA}</p>
            </div>
          </div>
        </div>

        {/* List */}
        <div style={styles.listContainer}>
          <div style={styles.colHeader}>
            <span style={{ width: 52 }}>#</span>
            <span style={{ flex: 1 }}>Student</span>
            <span style={{ width: 160 }}>Reg Number</span>
            <span style={{ width: 80, textAlign: "center" }}>Section</span>
            <span style={{ width: 90, textAlign: "right" }}>Sem GPA</span>
          </div>

          {rawData.length === 0 ? (
            <div style={styles.emptyState}>
              <IconTrophy size={48} />
              <p>No students on Dean's List for this batch & semester.</p>
            </div>
          ) : (
            rawData.map((s) => {
              const isTop3  = s.rank <= 3;
              const rankCol = rankColors[s.rank];
              const isHov   = hoveredRow === s.rank;
              return (
                <div key={s.rank}
                  style={{ ...styles.row, ...(isHov ? styles.rowHover : {}), ...(isTop3 ? styles.rowTop3 : {}) }}
                  onMouseEnter={() => setHoveredRow(s.rank)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <div style={{
                    ...styles.rankBubble,
                    background: rankCol ? rankCol.bg : "#C8293A",
                    color: rankCol ? rankCol.text : "#fff",
                    boxShadow: isTop3 ? `0 4px 12px ${rankCol.bg}88` : "none",
                  }}>
                    {s.rank}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ ...styles.namePill, ...(isTop3 ? styles.namePillTop3 : {}) }}>
                      {isTop3 && <span style={styles.starIcon}><IconStar /></span>}
                      {s.name}
                    </div>
                  </div>

                  <span style={styles.regText}>{s.regNumber}</span>

                  <span style={styles.sectionChip}>{s.section}</span>

                  <div style={styles.sgpaBox}>
                    <span style={styles.sgpaVal}>{s.sgpa.toFixed(2)}</span>
                    <div style={styles.sgpaMini}>
                      <div style={{ ...styles.sgpaMiniFill, width: `${((s.sgpa - MIN_SGPA) / (4 - MIN_SGPA)) * 100}%` }} />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}

/* ─── Styles ─── */
const YELLOW = "#F5C400";
const RED    = "#C8293A";
const BLACK  = "#111111";
const WHITE  = "#FFFFFF";

const styles = {
  page: {
    display: "flex", height: "100vh", width: "100vw", overflow: "hidden",
    fontFamily: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif",
    background: WHITE,
  },

  /* SIDEBAR */
  sidebar: {
    width: 280, minWidth: 280, background: YELLOW,
    display: "flex", flexDirection: "column", padding: "36px 28px",
    position: "relative", overflow: "hidden", boxSizing: "border-box", zIndex: 2,
  },
  sidebarWatermark: {
    position: "absolute", bottom: -40, left: -20, fontSize: 260, fontWeight: 900,
    color: "rgba(0,0,0,0.05)", pointerEvents: "none", userSelect: "none", lineHeight: 1, zIndex: 0,
  },
  brand: { display: "flex", alignItems: "flex-end", gap: 8, position: "relative", zIndex: 1 },
  brandText: {
    fontSize: 36, fontWeight: 900, color: WHITE, letterSpacing: -1,
    textShadow: "2px 2px 0 rgba(0,0,0,0.12)", lineHeight: 1,
  },
  brandPro: {
    fontSize: 12, fontWeight: 900, background: BLACK, color: YELLOW,
    padding: "3px 7px", borderRadius: 3, marginBottom: 4, letterSpacing: 2,
  },
  brandSub: {
    fontSize: 11, fontWeight: 700, color: "rgba(0,0,0,0.5)", margin: "4px 0 0",
    letterSpacing: 2, textTransform: "uppercase", position: "relative", zIndex: 1,
  },
  sidebarDivider: {
    width: "100%", height: 2, background: "rgba(0,0,0,0.12)",
    borderRadius: 2, margin: "20px 0", position: "relative", zIndex: 1,
  },
  nav: { display: "flex", flexDirection: "column", gap: 6, position: "relative", zIndex: 1 },
  navItem: {
    display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
    borderRadius: 12, border: "none", background: "transparent", cursor: "pointer",
    fontFamily: "inherit", fontSize: 15, fontWeight: 700, color: "rgba(0,0,0,0.6)",
    letterSpacing: 0.5, textAlign: "left", transition: "all 0.18s ease", position: "relative",
  },
  navItemActive: { background: WHITE, color: BLACK, boxShadow: "0 4px 14px rgba(0,0,0,0.1)" },
  navItemHover:  { background: "rgba(255,255,255,0.45)", color: BLACK },
  navLabel: { flex: 1 },
  navDot: { width: 7, height: 7, borderRadius: "50%", background: YELLOW, border: "2px solid " + BLACK, flexShrink: 0 },
  decoBox: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 },
  trophyGlow: { position: "absolute", width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.15)", filter: "blur(24px)" },
  trophyStars: { display: "flex", gap: 12, marginTop: 8 },
  starDot: { fontSize: 18, color: "rgba(0,0,0,0.2)" },
  logoutBtn: {
    display: "flex", alignItems: "center", gap: 8, padding: "11px 16px",
    borderRadius: 12, border: "2px solid rgba(0,0,0,0.15)", background: "transparent",
    color: "rgba(0,0,0,0.55)", fontFamily: "inherit", fontSize: 14, fontWeight: 700,
    cursor: "pointer", letterSpacing: 0.5, transition: "all 0.18s ease",
    position: "relative", zIndex: 1, marginBottom: 10,
  },
  logoutHover: { background: RED, color: WHITE, border: `2px solid ${RED}` },
  sidebarFooter: { fontSize: 9, letterSpacing: 3, color: "rgba(0,0,0,0.35)", fontWeight: 700, margin: 0, position: "relative", zIndex: 1 },

  /* MAIN */
  main: {
    flex: 1, display: "flex", flexDirection: "column",
    padding: "36px 44px", overflowY: "auto", gap: 24, background: "#fafafa", boxSizing: "border-box",
  },

  /* HEADER CARD */
  headerCard: {
    background: YELLOW, borderRadius: 24, padding: "28px 32px",
    position: "relative", overflow: "hidden", flexShrink: 0,
    boxShadow: "0 6px 28px rgba(245,196,0,0.35)",
  },
  headerCircle1: { position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.12)", pointerEvents: "none" },
  headerCircle2: { position: "absolute", bottom: -60, right: 60, width: 120, height: 120, borderRadius: "50%", background: "rgba(0,0,0,0.06)", pointerEvents: "none" },
  headerInner: { display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1, gap: 20, flexWrap: "wrap" },
  headerLeft: { display: "flex", flexDirection: "column", gap: 6 },
  deanTitle: {
    fontSize: 40, fontWeight: 900, color: RED, letterSpacing: -1,
    display: "flex", alignItems: "center", gap: 10, lineHeight: 1,
    fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif",
    textShadow: "2px 2px 0 rgba(0,0,0,0.08)",
  },
  medalIconBox: {
    background: RED, color: WHITE, width: 48, height: 48, borderRadius: 14,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, boxShadow: "0 4px 12px rgba(200,41,58,0.35)",
  },
  batchLabel: { fontSize: 14, fontWeight: 700, color: "rgba(0,0,0,0.55)", margin: 0, letterSpacing: 1, textTransform: "uppercase" },
  headerBadges: { display: "flex", gap: 10, marginTop: 2 },
  semBadge:   { background: BLACK, color: YELLOW, fontSize: 12, fontWeight: 900, padding: "5px 14px", borderRadius: 50, letterSpacing: 1 },
  countBadge: { background: "rgba(0,0,0,0.12)", color: BLACK, fontSize: 12, fontWeight: 800, padding: "5px 14px", borderRadius: 50, letterSpacing: 0.5 },

  /* DROPDOWNS */
  dropdowns: { display: "flex", gap: 12, flexDirection: "column" },
  dropWrapper: { position: "relative" },
  dropBtn: {
    display: "flex", alignItems: "center", gap: 10, padding: "10px 16px",
    borderRadius: 12, border: "2px solid rgba(0,0,0,0.18)", background: WHITE,
    cursor: "pointer", fontFamily: "inherit", minWidth: 180,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)", transition: "all 0.18s ease",
  },
  dropLabel: { fontSize: 10, fontWeight: 800, color: "rgba(0,0,0,0.4)", letterSpacing: 2, textTransform: "uppercase" },
  dropValue: { flex: 1, fontSize: 15, fontWeight: 900, color: BLACK, letterSpacing: 0.5, textAlign: "left" },
  dropMenu: {
    position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
    background: WHITE, borderRadius: 12, border: "2px solid rgba(0,0,0,0.1)",
    boxShadow: "0 8px 28px rgba(0,0,0,0.15)", zIndex: 100, overflow: "hidden",
  },
  dropOption: {
    display: "flex", alignItems: "center", width: "100%", padding: "11px 16px",
    border: "none", background: "transparent", cursor: "pointer",
    fontFamily: "inherit", fontSize: 14, fontWeight: 700, color: BLACK,
    textAlign: "left", transition: "background 0.15s",
  },
  dropOptionActive: { background: "rgba(245,196,0,0.15)", color: BLACK },

  headerStat: { textAlign: "right" },
  headerStatNum: {
    fontSize: 68, fontWeight: 900, color: WHITE, margin: 0, lineHeight: 1,
    letterSpacing: -2, textShadow: "3px 3px 0 rgba(0,0,0,0.1)",
    fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif",
  },
  headerStatLabel: { fontSize: 13, fontWeight: 700, color: "rgba(0,0,0,0.55)", margin: "2px 0 0", letterSpacing: 1 },
  headerStatSub:   { fontSize: 11, fontWeight: 700, color: "rgba(0,0,0,0.35)", margin: "2px 0 0", letterSpacing: 1, textTransform: "uppercase" },

  /* LIST */
  listContainer: { display: "flex", flexDirection: "column", gap: 10, flex: 1, overflowY: "auto" },
  colHeader: {
    display: "flex", alignItems: "center", gap: 16, padding: "0 20px 8px",
    fontSize: 10, fontWeight: 800, letterSpacing: 2, color: "rgba(0,0,0,0.35)",
    textTransform: "uppercase", borderBottom: "2px solid rgba(0,0,0,0.06)",
  },
  row: {
    display: "flex", alignItems: "center", gap: 16, padding: "13px 20px",
    borderRadius: 16, background: WHITE, border: "2px solid rgba(0,0,0,0.05)",
    transition: "all 0.18s ease", cursor: "default", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  rowHover: { border: `2px solid ${YELLOW}`, transform: "translateX(4px)", boxShadow: "0 4px 18px rgba(245,196,0,0.2)" },
  rowTop3:  { border: "2px solid rgba(245,196,0,0.3)", background: "rgba(245,196,0,0.04)" },
  rankBubble: {
    width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: 16, fontWeight: 900, flexShrink: 0,
    fontFamily: "'Barlow Condensed', Arial, sans-serif",
  },
  namePill: {
    display: "inline-flex", alignItems: "center", gap: 6, background: RED, color: WHITE,
    fontSize: 15, fontWeight: 800, padding: "9px 22px", borderRadius: 50,
    letterSpacing: 0.5, boxShadow: "0 3px 10px rgba(200,41,58,0.25)",
  },
  namePillTop3: { boxShadow: "0 4px 16px rgba(200,41,58,0.35)" },
  starIcon: { color: YELLOW, display: "flex", alignItems: "center" },
  regText: { width: 160, fontSize: 12, fontWeight: 700, color: "rgba(0,0,0,0.4)", letterSpacing: 0.8, fontFamily: "monospace", flexShrink: 0 },
  sectionChip: {
    width: 80, textAlign: "center", fontSize: 13, fontWeight: 800, color: BLACK,
    background: "rgba(245,196,0,0.25)", border: `1.5px solid ${YELLOW}`,
    padding: "4px 0", borderRadius: 8, letterSpacing: 1, flexShrink: 0,
  },
  sgpaBox: { width: 90, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 },
  sgpaVal: { fontSize: 20, fontWeight: 900, color: BLACK, letterSpacing: -0.5, fontFamily: "'Barlow Condensed', Arial, sans-serif" },
  sgpaMini: { width: "100%", height: 4, background: "rgba(0,0,0,0.08)", borderRadius: 10, overflow: "hidden" },
  sgpaMiniFill: { height: "100%", background: YELLOW, borderRadius: 10, transition: "width 0.5s ease" },
  emptyState: {
    flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    gap: 12, color: "rgba(0,0,0,0.25)", fontSize: 16, fontWeight: 700, padding: "60px 0",
  },
};
