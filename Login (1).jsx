import { useState } from "react";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.1 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.2 2.7l5.7-5.7C33.7 7.1 29.1 5 24 5 13 5 4 14 4 25s9 20 20 20 20-9 20-20c0-1.5-.2-3-.4-4.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c2.8 0 5.3 1 7.2 2.7l5.7-5.7C33.7 7.1 29.1 5 24 5 16.3 5 9.7 9.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 45c5 0 9.5-1.9 12.9-5l-6-4.9C29.3 36.5 26.8 37.5 24 37.5c-5.2 0-9.6-3.5-11.2-8.2l-6.5 5C9.5 41 16.2 45 24 45z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6 4.9C41 34.8 44 30.3 44 25c0-1.5-.2-3-.4-4.5z"/>
  </svg>
);

const roles = [
  { id: "student", label: "Student", icon: "🎓" },
  { id: "faculty", label: "Faculty", icon: "📋" },
  { id: "admin",   label: "Admin",   icon: "🛡️" },
];

export default function Login() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered]   = useState(null);

  const handleSelect = (id) => setSelected(id);
  const handleBack   = () => setSelected(null);

  return (
    <div style={styles.page}>
      {/* Big watermark text */}
      <div style={styles.watermark}>RANKIFY</div>

      {/* Left yellow panel */}
      <div style={styles.left}>
        <div style={styles.topLabel}>
          <span style={styles.line} /> ACADEMIC PORTAL
        </div>

        <div style={styles.brandBlock}>
          <h1 style={styles.brandName}>RANKIFY</h1>
          <span style={styles.proBadge}>PRO</span>
        </div>

        <p style={styles.tagline}>Academic Intelligence System</p>

        <div style={styles.divider} />

        {!selected ? (
          <div style={styles.roleSection}>
            <p style={styles.chooseLabel}>CHOOSE YOUR ROLE</p>
            <div style={styles.roleButtons}>
              {roles.map((r) => (
                <button
                  key={r.id}
                  style={{
                    ...styles.roleBtn,
                    ...(hovered === r.id ? styles.roleBtnHover : {}),
                  }}
                  onMouseEnter={() => setHovered(r.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleSelect(r.id)}
                >
                  <span style={styles.roleIcon}>{r.icon}</span>
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={styles.googleSection}>
            <p style={styles.chooseLabel}>
              SIGNING IN AS&nbsp;
              <span style={styles.selectedRole}>
                {roles.find((r) => r.id === selected)?.icon}&nbsp;
                {roles.find((r) => r.id === selected)?.label.toUpperCase()}
              </span>
            </p>

            <button
              style={{
                ...styles.googleBtn,
                ...(hovered === "google" ? styles.googleBtnHover : {}),
              }}
              onMouseEnter={() => setHovered("google")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => alert(`Google Sign-In as ${selected}`)}
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            <button
              style={{
                ...styles.backBtn,
                ...(hovered === "back" ? styles.backBtnHover : {}),
              }}
              onMouseEnter={() => setHovered("back")}
              onMouseLeave={() => setHovered(null)}
              onClick={handleBack}
            >
              ← Go Back
            </button>

            <p style={styles.note}>
              Only university Google accounts{" "}
              <code style={styles.code}>@your_role.edu.pk</code> are allowed.
            </p>
          </div>
        )}

        <p style={styles.footer}>© RANKIFY PRO · SECURE SIGN-IN</p>
      </div>

      {/* Right white panel */}
      <div style={styles.right}>
        <div style={styles.podiumWrapper}>
          {/* Podium illustration */}
          <div style={styles.podium}>
            {/* 2nd place */}
            <div style={styles.placeCol}>
              <div style={styles.medalSilver}>
                <span style={styles.medalNum}>2</span>
              </div>
              <div style={{ ...styles.block, height: 210 }}>
                <span style={styles.blockNum}>2</span>
              </div>
            </div>
            {/* 1st place */}
            <div style={styles.placeCol}>
              <div style={styles.medalGold}>
                <span style={styles.medalNum}>1</span>
              </div>
              <div style={{ ...styles.block, height: 280 }}>
                <span style={styles.blockNum}>1</span>
              </div>
            </div>
            {/* 3rd place */}
            <div style={styles.placeCol}>
              <div style={styles.medalBronze}>
                <span style={styles.medalNum}>3</span>
              </div>
              <div style={{ ...styles.block, height: 160 }}>
                <span style={styles.blockNum}>3</span>
              </div>
            </div>
          </div>
          <div style={styles.podiumShadow} />
        </div>
      </div>
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
    position: "relative",
  },
  watermark: {
    position: "absolute",
    bottom: -40,
    left: -20,
    fontSize: 260,
    fontWeight: 900,
    letterSpacing: -8,
    color: "rgba(0,0,0,0.04)",
    pointerEvents: "none",
    userSelect: "none",
    zIndex: 0,
    lineHeight: 1,
  },

  /* LEFT */
  left: {
    width: "68%",
    background: YELLOW,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "48px 72px",
    position: "relative",
    clipPath: "polygon(0 0, 92% 0, 100% 100%, 0 100%)",
    zIndex: 1,
    boxSizing: "border-box",
  },
  topLabel: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 4,
    color: "rgba(0,0,0,0.55)",
    marginBottom: 28,
    textTransform: "uppercase",
  },
  line: {
    display: "inline-block",
    width: 32,
    height: 2,
    background: "rgba(0,0,0,0.4)",
  },
  brandBlock: {
    display: "flex",
    alignItems: "flex-end",
    gap: 12,
    lineHeight: 1,
    overflow: "visible",
  },
  brandName: {
    fontSize: 110,
    fontWeight: 900,
    color: WHITE,
    margin: 0,
    letterSpacing: -2,
    textShadow: "4px 4px 0px rgba(0,0,0,0.15)",
    lineHeight: 1,
    fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif",
    whiteSpace: "nowrap",
  },
  proBadge: {
    fontSize: 22,
    fontWeight: 900,
    background: BLACK,
    color: YELLOW,
    padding: "4px 10px",
    borderRadius: 4,
    marginBottom: 14,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 18,
    fontWeight: 700,
    color: "rgba(0,0,0,0.65)",
    margin: "12px 0 0",
    letterSpacing: 0.5,
  },
  divider: {
    width: 60,
    height: 3,
    background: "rgba(0,0,0,0.25)",
    borderRadius: 2,
    margin: "28px 0",
  },

  /* ROLE SELECTION */
  roleSection: { display: "flex", flexDirection: "column", gap: 0 },
  chooseLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 4,
    color: "rgba(0,0,0,0.5)",
    margin: "0 0 16px",
  },
  roleButtons: { display: "flex", gap: 14, flexWrap: "wrap" },
  roleBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "14px 28px",
    fontSize: 16,
    fontWeight: 700,
    background: WHITE,
    color: BLACK,
    border: "2px solid rgba(0,0,0,0.12)",
    borderRadius: 50,
    cursor: "pointer",
    letterSpacing: 0.5,
    transition: "all 0.18s ease",
    fontFamily: "inherit",
  },
  roleBtnHover: {
    background: "#E53E3E",
    color: WHITE,
    border: "2px solid #E53E3E",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(229,62,62,0.35)",
  },
  roleIcon: { fontSize: 18 },

  /* GOOGLE SECTION */
  googleSection: { display: "flex", flexDirection: "column", gap: 14 },
  selectedRole: {
    color: BLACK,
    fontWeight: 900,
    fontSize: 13,
    letterSpacing: 2,
  },
  googleBtn: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "15px 28px",
    fontSize: 16,
    fontWeight: 700,
    background: WHITE,
    color: BLACK,
    border: "2px solid rgba(0,0,0,0.1)",
    borderRadius: 50,
    cursor: "pointer",
    width: "fit-content",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    letterSpacing: 0.3,
    boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
  },
  googleBtnHover: {
    background: "#E53E3E",
    color: WHITE,
    border: "2px solid #E53E3E",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(229,62,62,0.45)",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "12px 24px",
    fontSize: 14,
    fontWeight: 700,
    background: "transparent",
    color: "rgba(0,0,0,0.55)",
    border: "2px solid rgba(0,0,0,0.2)",
    borderRadius: 50,
    cursor: "pointer",
    width: "fit-content",
    transition: "all 0.18s ease",
    fontFamily: "inherit",
    letterSpacing: 0.5,
  },
  backBtnHover: {
    background: "rgba(0,0,0,0.08)",
    color: BLACK,
  },
  note: {
    fontSize: 15,
    fontWeight: 800,
    color: "#111111",
    margin: "10px 0 0",
    lineHeight: 1.7,
    background: "rgba(0,0,0,0.13)",
    padding: "12px 18px",
    borderRadius: 10,
    borderLeft: "5px solid #111111",
    letterSpacing: 0.3,
  },
  code: {
    background: "#111111",
    color: "#F5C400",
    padding: "3px 8px",
    borderRadius: 4,
    fontFamily: "monospace",
    fontSize: 13,
    fontWeight: 900,
    letterSpacing: 1,
  },

  footer: {
    position: "absolute",
    bottom: 24,
    left: 72,
    fontSize: 10,
    letterSpacing: 3,
    color: "rgba(0,0,0,0.4)",
    fontWeight: 700,
  },

  /* RIGHT */
  right: {
    flex: 1,
    background: WHITE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  podiumWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  podium: {
    display: "flex",
    alignItems: "flex-end",
    gap: 8,
  },
  placeCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 0,
  },
  block: {
    width: 100,
    background: "#1a1a2e",
    borderRadius: "8px 8px 0 0",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 12,
  },
  blockNum: {
    fontSize: 28,
    fontWeight: 900,
    color: YELLOW,
    fontFamily: "'Barlow Condensed', Arial, sans-serif",
  },
  medalGold: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: `radial-gradient(circle at 35% 35%, #FFE066, ${YELLOW}, #B8860B)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 16px rgba(245,196,0,0.5)",
    marginBottom: 6,
    border: "3px solid #fff",
  },
  medalSilver: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "radial-gradient(circle at 35% 35%, #f0f0f0, #b0b0b0, #808080)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    marginBottom: 6,
    border: "3px solid #fff",
  },
  medalBronze: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    background: "radial-gradient(circle at 35% 35%, #f0c080, #cd7f32, #8B4513)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    marginBottom: 6,
    border: "3px solid #fff",
  },
  medalNum: {
    fontSize: 20,
    fontWeight: 900,
    color: WHITE,
    textShadow: "0 1px 3px rgba(0,0,0,0.4)",
    fontFamily: "'Barlow Condensed', Arial, sans-serif",
  },
  podiumShadow: {
    width: 320,
    height: 16,
    background: "radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 70%)",
    marginTop: 0,
  },
};
