import { useState } from "react";

/* ─── Mock Data (replace with real API later) ─── */
const student = {
  name: "Ali Hassan",
  regNumber: "BSCS-2022-001",
  semester: "Fall-2025",
  sgpa: 3.75,
  cgpa: 3.82,
  classRank: 12,
  totalStudents: 98,
  percentileRanking: 95,
  overallGrade: "A+",
  onDeanList: true,
  deanListSemester: "Fall-2025",
};

/* ─── Icons ─── */
const IconGradCap = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);
const IconBook = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const IconChart = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const IconLogout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconMedal = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="14" r="6"/>
    <path d="M8 6l-2-4h12l-2 4"/>
    <path d="M12 10v4l2 2"/>
  </svg>
);
const IconTrophy = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
  </svg>
);

const navItems = [
  { id: "cgpa",    label: "CGPA Analysis",  icon: <IconChart /> },
  { id: "dean",    label: "Dean List",       icon: <IconMedal /> },
  { id: "project", label: "My Project",      icon: <IconBook /> },
];

/* ─── Main Component ─── */
export default function StudentDashboard() {
  const [activeNav, setActiveNav] = useState("cgpa");
  const [hoveredNav, setHoveredNav] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={styles.page}>
      {/* ── Sidebar ── */}
      <aside style={styles.sidebar}>
        {/* Watermark */}
        <div style={styles.sidebarWatermark}>R</div>

        {/* Brand */}
        <div style={styles.brand}>
          <span style={styles.brandText}>RANKIFY</span>
          <span style={styles.brandPro}>PRO</span>
        </div>
        <p style={styles.brandSub}>Academic Dashboard</p>

        <div style={styles.sidebarDivider} />

        {/* Nav */}
        <nav style={styles.nav}>
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            const isHov = hoveredNav === item.id;
            return (
              <button
                key={item.id}
                style={{
                  ...styles.navItem,
                  ...(isActive ? styles.navItemActive : {}),
                  ...(isHov && !isActive ? styles.navItemHover : {}),
                }}
                onClick={() => setActiveNav(item.id)}
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <span style={{
                  ...styles.navIcon,
                  color: isActive ? "#111" : "rgba(0,0,0,0.5)",
                }}>
                  {item.icon}
                </span>
                <span style={styles.navLabel}>{item.label}</span>
                {isActive && <span style={styles.navDot} />}
              </button>
            );
          })}
        </nav>

        {/* Illustration placeholder */}
        <div style={styles.illustrationBox}>
          <div style={styles.calcIllustration}>
            <div style={styles.calcScreen}>
              <span style={styles.calcScreenText}>3.82</span>
            </div>
            <div style={styles.calcButtons}>
              {[...Array(12)].map((_, i) => (
                <div key={i} style={{
                  ...styles.calcBtn,
                  background: i < 3 ? "#1a1a2e" : "rgba(0,0,0,0.15)",
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          style={{
            ...styles.logoutBtn,
            ...(hoveredNav === "logout" ? styles.logoutHover : {}),
          }}
          onMouseEnter={() => setHoveredNav("logout")}
          onMouseLeave={() => setHoveredNav(null)}
        >
          <IconLogout />
          <span>Logout</span>
        </button>

        <p style={styles.sidebarFooter}>© RANKIFY PRO</p>
      </aside>

      {/* ── Main Content ── */}
      <main style={styles.main}>

        {/* Top bar */}
        <div style={styles.topBar}>
          <div>
            <p style={styles.welcomeLabel}>ACADEMIC PORTAL</p>
            <h1 style={styles.welcomeTitle}>
              Welcome,<br />
              <span style={styles.studentName}>{student.name}</span>
            </h1>
            <div style={styles.regNumRow}>
              <span style={styles.regBadge}>{student.regNumber}</span>
              <span style={styles.semBadge}>{student.semester}</span>
            </div>
          </div>
          <div style={styles.topIcons}>
            <div style={styles.topIconBtn}><IconGradCap /></div>
            <div style={styles.topIconBtn}><IconBook /></div>
            <div style={styles.topIconBtn}><IconChart /></div>
          </div>
        </div>

        {/* Dean List Banner */}
        {student.onDeanList && (
          <div style={styles.deanBanner}>
            <span style={styles.deanBannerText}>
              🏅 Congratulations! You made the Dean's List for{" "}
              <strong>{student.deanListSemester}</strong>
            </span>
            <div style={styles.deanMedalIcon}><IconMedal /></div>
          </div>
        )}

        {/* Stats Grid - Row 1 */}
        <div style={styles.statsRow}>
          {/* SGPA Card */}
          <div
            style={{
              ...styles.card,
              ...styles.cardLarge,
              ...(hoveredCard === "sgpa" ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard("sgpa")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <p style={styles.cardLabel}>Current Semester GPA</p>
            <p style={styles.cardValue}>{student.sgpa.toFixed(2)}</p>
            <div style={styles.cardBar}>
              <div style={{ ...styles.cardBarFill, width: `${(student.sgpa / 4) * 100}%` }} />
            </div>
          </div>

          {/* CGPA Card */}
          <div
            style={{
              ...styles.card,
              ...styles.cardLarge,
              ...(hoveredCard === "cgpa" ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard("cgpa")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <p style={styles.cardLabel}>Cumulative Grade Point Average</p>
            <p style={styles.cardValue}>{student.cgpa.toFixed(2)}</p>
            <div style={styles.cardBar}>
              <div style={{ ...styles.cardBarFill, width: `${(student.cgpa / 4) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Stats Grid - Row 2 */}
        <div style={styles.statsRow}>
          {/* Class Rank */}
          <div
            style={{
              ...styles.card,
              ...styles.cardSmall,
              ...(hoveredCard === "rank" ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard("rank")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <p style={styles.cardLabelSmall}>Class Rank</p>
            <p style={styles.cardSubLabel}>Out of {student.totalStudents}</p>
            <p style={styles.cardValueBig}>#{student.classRank}</p>
          </div>

          {/* Percentile */}
          <div
            style={{
              ...styles.card,
              ...styles.cardSmall,
              ...(hoveredCard === "pct" ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard("pct")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <p style={styles.cardLabelSmall}>Percentile Ranking</p>
            <p style={styles.cardSubLabel}>Top of class</p>
            <p style={styles.cardValueBig}>{student.percentileRanking}%</p>
          </div>

          {/* Overall Grade */}
          <div
            style={{
              ...styles.card,
              ...styles.cardSmall,
              ...(hoveredCard === "grade" ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard("grade")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <p style={styles.cardLabelSmall}>Overall Grade</p>
            <p style={styles.cardSubLabel}>This semester</p>
            <p style={styles.cardValueBig}>{student.overallGrade}</p>
          </div>
        </div>

      </main>
    </div>
  );
}

/* ─── Styles ─────────────────────────────────────────────── */
const YELLOW = "#F5C400";
const BLACK  = "#111111";
const WHITE  = "#FFFFFF";

const styles = {
  page: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    fontFamily: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif",
    background: WHITE,
  },

  /* ── SIDEBAR ── */
  sidebar: {
    width: 280,
    minWidth: 280,
    background: YELLOW,
    display: "flex",
    flexDirection: "column",
    padding: "36px 28px",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
    zIndex: 2,
  },
  sidebarWatermark: {
    position: "absolute",
    bottom: -40,
    left: -20,
    fontSize: 260,
    fontWeight: 900,
    color: "rgba(0,0,0,0.05)",
    pointerEvents: "none",
    userSelect: "none",
    lineHeight: 1,
    zIndex: 0,
  },
  brand: {
    display: "flex",
    alignItems: "flex-end",
    gap: 8,
    position: "relative",
    zIndex: 1,
  },
  brandText: {
    fontSize: 36,
    fontWeight: 900,
    color: WHITE,
    letterSpacing: -1,
    textShadow: "2px 2px 0 rgba(0,0,0,0.12)",
    lineHeight: 1,
  },
  brandPro: {
    fontSize: 12,
    fontWeight: 900,
    background: BLACK,
    color: YELLOW,
    padding: "3px 7px",
    borderRadius: 3,
    marginBottom: 4,
    letterSpacing: 2,
  },
  brandSub: {
    fontSize: 11,
    fontWeight: 700,
    color: "rgba(0,0,0,0.5)",
    margin: "4px 0 0",
    letterSpacing: 2,
    textTransform: "uppercase",
    position: "relative",
    zIndex: 1,
  },
  sidebarDivider: {
    width: "100%",
    height: 2,
    background: "rgba(0,0,0,0.12)",
    borderRadius: 2,
    margin: "20px 0",
    position: "relative",
    zIndex: 1,
  },

  /* Nav */
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    position: "relative",
    zIndex: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 16px",
    borderRadius: 12,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 700,
    color: "rgba(0,0,0,0.6)",
    letterSpacing: 0.5,
    textAlign: "left",
    transition: "all 0.18s ease",
    position: "relative",
  },
  navItemActive: {
    background: WHITE,
    color: BLACK,
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
  },
  navItemHover: {
    background: "rgba(255,255,255,0.45)",
    color: BLACK,
  },
  navIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    height: 22,
    transition: "color 0.18s",
  },
  navLabel: { flex: 1 },
  navDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: YELLOW,
    border: "2px solid " + BLACK,
    flexShrink: 0,
  },

  /* Calculator illustration */
  illustrationBox: {
    flex: 1,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    paddingBottom: 12,
  },
  calcIllustration: {
    width: 120,
    background: "#1a1a2e",
    borderRadius: 16,
    padding: 12,
    boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
  },
  calcScreen: {
    background: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: "8px 12px",
    marginBottom: 10,
    textAlign: "right",
  },
  calcScreenText: {
    fontSize: 22,
    fontWeight: 900,
    color: YELLOW,
    letterSpacing: 1,
  },
  calcButtons: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 6,
  },
  calcBtn: {
    height: 20,
    borderRadius: 4,
  },

  /* Logout */
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "11px 16px",
    borderRadius: 12,
    border: "2px solid rgba(0,0,0,0.15)",
    background: "transparent",
    color: "rgba(0,0,0,0.55)",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: 0.5,
    transition: "all 0.18s ease",
    position: "relative",
    zIndex: 1,
    marginBottom: 10,
  },
  logoutHover: {
    background: "#E53E3E",
    color: WHITE,
    border: "2px solid #E53E3E",
  },
  sidebarFooter: {
    fontSize: 9,
    letterSpacing: 3,
    color: "rgba(0,0,0,0.35)",
    fontWeight: 700,
    margin: 0,
    position: "relative",
    zIndex: 1,
  },

  /* ── MAIN ── */
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "40px 48px",
    overflowY: "auto",
    gap: 24,
    background: "#fafafa",
    boxSizing: "border-box",
  },

  /* Top bar */
  topBar: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  welcomeLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 4,
    color: "rgba(0,0,0,0.35)",
    margin: "0 0 8px",
    textTransform: "uppercase",
  },
  welcomeTitle: {
    fontSize: 52,
    fontWeight: 900,
    color: BLACK,
    margin: 0,
    lineHeight: 1.05,
    letterSpacing: -1.5,
    fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif",
  },
  studentName: {
    color: "#b89000",
  },
  regNumRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: "12px 0 0",
    flexWrap: "wrap",
  },
  regBadge: {
    fontSize: 14,
    fontWeight: 900,
    color: "#111111",
    background: "#F5C400",
    padding: "6px 16px",
    borderRadius: 50,
    letterSpacing: 1.5,
    boxShadow: "0 3px 10px rgba(245,196,0,0.4)",
    display: "inline-block",
  },
  semBadge: {
    fontSize: 13,
    fontWeight: 800,
    color: "#111111",
    background: "rgba(0,0,0,0.08)",
    border: "2px solid rgba(0,0,0,0.12)",
    padding: "5px 14px",
    borderRadius: 50,
    letterSpacing: 1,
    display: "inline-block",
  },
  topIcons: {
    display: "flex",
    gap: 12,
    paddingTop: 4,
  },
  topIconBtn: {
    width: 52,
    height: 52,
    borderRadius: 14,
    border: "2px solid rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(0,0,0,0.4)",
    background: WHITE,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },

  /* Dean Banner */
  deanBanner: {
    background: YELLOW,
    borderRadius: 50,
    padding: "18px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 4px 20px rgba(245,196,0,0.35)",
  },
  deanBannerText: {
    fontSize: 16,
    fontWeight: 700,
    color: BLACK,
    letterSpacing: 0.3,
  },
  deanMedalIcon: {
    color: BLACK,
    display: "flex",
    alignItems: "center",
  },

  /* Stats */
  statsRow: {
    display: "flex",
    gap: 20,
    flex: "0 0 auto",
  },
  card: {
    background: YELLOW,
    borderRadius: 20,
    padding: "28px 32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    transition: "all 0.2s ease",
    cursor: "default",
    position: "relative",
    overflow: "hidden",
  },
  cardLarge: {
    flex: 1,
    minHeight: 160,
  },
  cardSmall: {
    flex: 1,
    minHeight: 140,
  },
  cardHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 32px rgba(245,196,0,0.45)",
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: "rgba(0,0,0,0.5)",
    letterSpacing: 1,
    textTransform: "uppercase",
    margin: "0 0 8px",
  },
  cardLabelSmall: {
    fontSize: 11,
    fontWeight: 700,
    color: "rgba(0,0,0,0.5)",
    letterSpacing: 1,
    textTransform: "uppercase",
    margin: "0 0 2px",
  },
  cardSubLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(0,0,0,0.35)",
    margin: "0 0 10px",
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 56,
    fontWeight: 900,
    color: WHITE,
    margin: "0 0 12px",
    lineHeight: 1,
    letterSpacing: -1,
    textShadow: "2px 2px 0 rgba(0,0,0,0.1)",
    fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif",
  },
  cardValueBig: {
    fontSize: 48,
    fontWeight: 900,
    color: WHITE,
    margin: 0,
    lineHeight: 1,
    letterSpacing: -1,
    textShadow: "2px 2px 0 rgba(0,0,0,0.1)",
    fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif",
  },
  cardBar: {
    width: "100%",
    height: 5,
    background: "rgba(0,0,0,0.12)",
    borderRadius: 10,
    overflow: "hidden",
  },
  cardBarFill: {
    height: "100%",
    background: WHITE,
    borderRadius: 10,
    transition: "width 0.6s ease",
  },
};
