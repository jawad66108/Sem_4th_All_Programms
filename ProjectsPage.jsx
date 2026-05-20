import { useState } from "react";

/* ─── Mock Data ─── */
const ALL_PROJECTS = {
  "BSCS-4": {
    "Database Systems": [
      { id: 1,  title: "Smart Attendance System",    members: ["Ali Hassan", "Fatima Malik"],    description: "AI-based attendance using facial recognition with real-time alerts and admin dashboard.", github: "https://github.com/example/smart-attendance", score: 93, section: "4A", status: "APPROVED" },
      { id: 2,  title: "Rankify Pro",                members: ["Ayesha Raza", "Usman Tariq"],   description: "Academic intelligence system for tracking student rankings, CGPA and project scores.",    github: "https://github.com/example/rankify-pro",      score: 91, section: "4B", status: "APPROVED" },
      { id: 3,  title: "Library Management System",  members: ["Sara Ahmed", "Hassan Khan"],    description: "Digital library with book search, issue tracking, fine management and analytics.",        github: "https://github.com/example/library",           score: 88, section: "4A", status: "APPROVED" },
      { id: 4,  title: "Hospital Management System", members: ["Zara Siddiqui", "Omar Farooq"],description: "Complete HMS with patient records, billing, appointment scheduling and reporting.",       github: "https://github.com/example/hms",              score: 85, section: "4B", status: "REVIEWED" },
    ],
    "Object Oriented Programming": [
      { id: 5,  title: "E-Commerce Platform",        members: ["Bilal Saeed", "Nadia Akram"],   description: "Full-stack online shopping system with cart, payments and seller dashboard.",             github: "https://github.com/example/ecommerce",        score: 90, section: "4A", status: "APPROVED" },
      { id: 6,  title: "AI Chatbot Assistant",       members: ["Hamza Malik"],                  description: "NLP-powered university chatbot that answers student queries using GPT integration.",      github: "https://github.com/example/chatbot",           score: 87, section: "4B", status: "APPROVED" },
      { id: 7,  title: "Inventory Tracker",          members: ["Iqra Nawaz", "Tariq Javed"],   description: "Real-time inventory management for small businesses with low-stock alerts.",              github: "https://github.com/example/inventory",         score: 83, section: "4A", status: "REVIEWED" },
      { id: 8,  title: "Student Grade Calculator",   members: ["Mahnoor Ali"],                  description: "OOP-based grade calculator with GPA prediction and semester comparison charts.",          github: "https://github.com/example/grade-calc",        score: 79, section: "4B", status: "REVIEWED" },
    ],
    "Web Engineering": [
      { id: 9,  title: "Campus Navigator App",       members: ["Faisal Raza", "Sana Mir"],     description: "Mobile-friendly interactive campus map with event scheduling and room finder.",           github: "https://github.com/example/campus-nav",       score: 89, section: "4A", status: "APPROVED" },
      { id: 10, title: "Online Voting System",       members: ["Kamran Sheikh"],                description: "Secure digital voting platform with blockchain-based result verification.",                github: "https://github.com/example/voting",            score: 85, section: "4B", status: "APPROVED" },
      { id: 11, title: "Task Management Tool",       members: ["Yusra Butt", "Ahad Malik"],    description: "Kanban-style project management tool with team collaboration and deadlines.",             github: "https://github.com/example/taskman",           score: 81, section: "4A", status: "REVIEWED" },
      { id: 12, title: "Food Delivery App",          members: ["Rimsha Awan"],                  description: "End-to-end food ordering platform with live GPS tracking and restaurant portal.",         github: "https://github.com/example/foodapp",           score: 77, section: "4B", status: "APPROVED" },
    ],
  },
  "BSSE-4": {
    "Software Design": [
      { id: 13, title: "Ride Sharing App",           members: ["Junaid Abbas", "Laiba Shah"],   description: "Real-time ride booking platform with driver matching and live tracking.",                 github: "https://github.com/example/ride",              score: 92, section: "4A", status: "APPROVED" },
      { id: 14, title: "Event Management System",    members: ["Sadia Noor"],                   description: "University event booking system with registrations, notifications and reports.",           github: "https://github.com/example/events",            score: 88, section: "4A", status: "APPROVED" },
      { id: 15, title: "HR Management Tool",         members: ["Ali Raza", "Hina Baig"],        description: "Employee management system with payroll, attendance and performance tracking.",           github: "https://github.com/example/hr",                score: 84, section: "4B", status: "REVIEWED" },
      { id: 16, title: "Expense Tracker",            members: ["Usman Butt"],                   description: "Personal finance tracker with budget goals, charts and monthly reports.",                  github: "https://github.com/example/expense",           score: 79, section: "4B", status: "REVIEWED" },
    ],
    "Artificial Intelligence": [
      { id: 17, title: "Face Recognition System",    members: ["Amna Sheikh", "Babar Hussain"], description: "Real-time face detection and recognition using OpenCV and deep learning models.",         github: "https://github.com/example/face",              score: 95, section: "4A", status: "APPROVED" },
      { id: 18, title: "Sentiment Analyzer",         members: ["Komal Tariq"],                  description: "NLP-based social media sentiment analysis tool with live Twitter integration.",            github: "https://github.com/example/sentiment",         score: 90, section: "4B", status: "APPROVED" },
      { id: 19, title: "Recommendation Engine",      members: ["Zain Malik", "Noor Fatima"],    description: "AI-powered product recommendation system using collaborative filtering.",                  github: "https://github.com/example/recommend",         score: 86, section: "4A", status: "REVIEWED" },
      { id: 20, title: "Spam Detector",              members: ["Haris Ahmed"],                  description: "Email spam classifier using Naive Bayes and SVM with 98% accuracy.",                     github: "https://github.com/example/spam",              score: 82, section: "4B", status: "REVIEWED" },
    ],
  },
  "BSCS-3": {
    "Data Structures": [
      { id: 21, title: "Pathfinding Visualizer",     members: ["Sana Akhtar", "Rafay Mir"],     description: "Interactive visualizer for A*, Dijkstra and BFS algorithms with step-by-step animation.", github: "https://github.com/example/pathfind",          score: 91, section: "3A", status: "APPROVED" },
      { id: 22, title: "Sorting Visualizer",         members: ["Dania Qureshi"],                description: "Animated comparison of 8 sorting algorithms with time complexity analysis.",              github: "https://github.com/example/sort",              score: 87, section: "3A", status: "APPROVED" },
      { id: 23, title: "Binary Tree Simulator",      members: ["Fahad Ilyas", "Mariam Zafar"],  description: "Visual BST simulator with insert, delete, search and traversal animations.",               github: "https://github.com/example/bst",               score: 83, section: "3A", status: "REVIEWED" },
      { id: 24, title: "Graph Theory Tool",          members: ["Rida Khalid"],                  description: "Interactive graph builder with DFS, BFS and minimum spanning tree visualization.",        github: "https://github.com/example/graph",             score: 79, section: "3A", status: "REVIEWED" },
    ],
    "Operating Systems": [
      { id: 25, title: "Process Scheduler Sim",      members: ["Usama Javed", "Ayaz Khan"],     description: "CPU scheduling simulator for FCFS, SJF and Round Robin with Gantt chart output.",        github: "https://github.com/example/scheduler",         score: 89, section: "3A", status: "APPROVED" },
      { id: 26, title: "Memory Manager",             members: ["Zoya Malik"],                   description: "Virtual memory management simulator with paging, segmentation and page replacement.",     github: "https://github.com/example/memory",            score: 85, section: "3A", status: "APPROVED" },
      { id: 27, title: "Deadlock Detector",          members: ["Bilal Cheema", "Sara Qazi"],    description: "Tool for detecting and resolving deadlocks using Banker's algorithm.",                    github: "https://github.com/example/deadlock",          score: 81, section: "3A", status: "REVIEWED" },
      { id: 28, title: "File System Emulator",       members: ["Huma Tariq"],                   description: "Simulated file system with directory tree, permissions and disk allocation tracking.",    github: "https://github.com/example/filesystem",        score: 76, section: "3A", status: "REVIEWED" },
    ],
  },
};

const BATCHES = Object.keys(ALL_PROJECTS);
const SUBJECTS_BY_BATCH = Object.fromEntries(
  BATCHES.map((b) => [b, Object.keys(ALL_PROJECTS[b])])
);

/* ─── Icons ─── */
const IconChart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const IconBook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const IconMedal = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="14" r="6"/><path d="M8 6l-2-4h12l-2 4"/><path d="M12 10v4l2 2"/>
  </svg>
);
const IconLogout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconGithub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);
const IconChevron = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconPlus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconCheck = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconUsers = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const navItems = [
  { id: "cgpa",    label: "CGPA Analysis", icon: <IconChart /> },
  { id: "dean",    label: "Dean List",     icon: <IconMedal /> },
  { id: "project", label: "My Project",    icon: <IconBook />  },
];

/* ─── Small Dropdown ─── */
function Dropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button style={styles.dropBtn} onClick={() => setOpen(!open)}>
        <span style={styles.dropBtnLabel}>{label}:</span>
        <span style={styles.dropBtnVal}>{value}</span>
        <IconChevron open={open} />
      </button>
      {open && (
        <div style={styles.dropMenu} onMouseLeave={() => setOpen(false)}>
          {options.map((o) => (
            <button key={o} style={{ ...styles.dropOpt, ...(o === value ? styles.dropOptActive : {}) }}
              onClick={() => { onChange(o); setOpen(false); }}>
              {o === value && <span style={{ color: "#F5C400", marginRight: 6 }}>✓</span>}{o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ project, rank }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered,  setHovered]  = useState(false);

  const rankColors = { 1: "#FFD700", 2: "#C0C0C0", 3: "#CD7F32" };
  const rankColor  = rankColors[rank] || "#C8293A";
  const isTop3     = rank <= 3;

  return (
    <div
      style={{
        ...styles.card,
        ...(hovered && !expanded ? styles.cardHover : {}),
        ...(expanded ? styles.cardExpanded : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card Top Row */}
      <div style={styles.cardTop}>
        {/* Rank */}
        <div style={{ ...styles.rankBadge, background: rankColor, color: rank <= 2 ? "#111" : "#fff",
            boxShadow: isTop3 ? `0 4px 14px ${rankColor}88` : "none" }}>
          {isTop3 && <span style={{ marginRight: 3 }}><IconStar /></span>}
          #{rank}
        </div>

        {/* Title */}
        <div style={{ flex: 1 }}>
          <h3 style={styles.cardTitle}>{project.title}</h3>
          <div style={styles.cardMeta}>
            <span style={styles.sectionChip}>{project.section}</span>
            <span style={{ ...styles.statusChip, background: project.status === "APPROVED" ? "rgba(34,197,94,0.15)" : "rgba(245,196,0,0.2)",
                color: project.status === "APPROVED" ? "#16a34a" : "#92600a", border: `1.5px solid ${project.status === "APPROVED" ? "#16a34a44" : "#F5C40044"}` }}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Score */}
        <div style={styles.scoreBox}>
          <span style={styles.scoreVal}>{project.score}</span>
          <span style={styles.scoreLabel}>Score</span>
        </div>

        {/* Description toggle */}
        <button style={{ ...styles.descBtn, ...(expanded ? styles.descBtnActive : {}) }}
          onClick={() => setExpanded(!expanded)}>
          {expanded ? "Close" : "Description"}
          <span style={{ marginLeft: 6, display: "inline-flex", transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
            <IconChevron open={false} />
          </span>
        </button>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div style={styles.expandedBody}>
          <div style={styles.expandDivider} />

          <div style={styles.expandGrid}>
            {/* Members */}
            <div style={styles.expandSection}>
              <div style={styles.expandLabel}>
                <IconUsers />&nbsp; Members
              </div>
              <div style={styles.memberList}>
                {project.members.map((m, i) => (
                  <span key={i} style={styles.memberPill}>{m}</span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div style={styles.expandSection}>
              <div style={styles.expandLabel}>📋&nbsp; Description</div>
              <p style={styles.expandDesc}>{project.description}</p>
            </div>

            {/* GitHub */}
            <div style={styles.expandSection}>
              <div style={styles.expandLabel}>
                <IconGithub />&nbsp; GitHub Link
              </div>
              <a href={project.github} target="_blank" rel="noreferrer" style={styles.githubLink}>
                {project.github}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Add Project Form ─── */
function AddProjectView({ onSuccess }) {
  const [form, setForm]       = useState({ title: "", batch: "BSCS-4", subject: "Database Systems", members: "", description: "", github: "" });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.subject.trim())     e.subject     = "Please select a subject";
    if (!form.title.trim())       e.title       = "Project name is required";
    if (!form.members.trim())     e.members     = "At least one member required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.github.trim())      e.github      = "GitHub link is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 1200);
  };

  return (
    <div style={styles.addForm}>
      {/* Form header */}
      <div style={styles.formHeader}>
        <span style={styles.formHeaderIcon}><IconPlus /></span>
        Enter Project Details
      </div>

      <div style={styles.formBody}>
        {/* Batch */}
        <div style={styles.formRow}>
          <label style={styles.formLabel}>Batch:</label>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {BATCHES.map((b) => (
              <button key={b}
                style={{ ...styles.batchChip, ...(form.batch === b ? styles.batchChipActive : {}) }}
                onClick={() => { set("batch", b); set("subject", SUBJECTS_BY_BATCH[b]?.[0] || ""); }}>
                {b}
              </button>
            ))}
          </div>
          {errors.batch && <span style={styles.err}>{errors.batch}</span>}
        </div>

        {/* Project Name */}
        <div style={styles.formRow}>
          <label style={styles.formLabel}>Project Name:</label>
          <input style={{ ...styles.input, ...(errors.title ? styles.inputErr : {}) }}
            placeholder="e.g: Smart Attendance System"
            value={form.title}
            onChange={(e) => { set("title", e.target.value); setErrors((er) => ({ ...er, title: "" })); }}
          />
          {errors.title && <span style={styles.err}>{errors.title}</span>}
        </div>

        {/* Subject */}
        <div style={styles.formRow}>
          <label style={styles.formLabel}>Subject:</label>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {(SUBJECTS_BY_BATCH[form.batch] || []).map((s) => (
              <button key={s}
                style={{ ...styles.batchChip, ...(form.subject === s ? styles.batchChipActive : {}) }}
                onClick={() => set("subject", s)}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Members */}
        <div style={styles.formRow}>
          <label style={styles.formLabel}>Members:</label>
          <input style={{ ...styles.input, ...(errors.members ? styles.inputErr : {}) }}
            placeholder="e.g: Student1, Student2, Student3"
            value={form.members}
            onChange={(e) => { set("members", e.target.value); setErrors((er) => ({ ...er, members: "" })); }}
          />
          {errors.members && <span style={styles.err}>{errors.members}</span>}
        </div>

        {/* Description */}
        <div style={styles.formRow}>
          <label style={styles.formLabel}>Description:</label>
          <textarea style={{ ...styles.input, ...styles.textarea, ...(errors.description ? styles.inputErr : {}) }}
            placeholder="Brief description of your project..."
            value={form.description}
            onChange={(e) => { set("description", e.target.value); setErrors((er) => ({ ...er, description: "" })); }}
          />
          {errors.description && <span style={styles.err}>{errors.description}</span>}
        </div>

        {/* GitHub */}
        <div style={styles.formRow}>
          <label style={styles.formLabel}>GitHub Link:</label>
          <input style={{ ...styles.input, ...(errors.github ? styles.inputErr : {}) }}
            placeholder="https://github.com/your-repo"
            value={form.github}
            onChange={(e) => { set("github", e.target.value); setErrors((er) => ({ ...er, github: "" })); }}
          />
          {errors.github && <span style={styles.err}>{errors.github}</span>}
        </div>

        {/* Submit */}
        <button style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }} onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Add Project"}
          {!loading && <IconPlus />}
        </button>
      </div>
    </div>
  );
}

/* ─── Success View ─── */
function SuccessView({ onBack }) {
  return (
    <div style={styles.successBox}>
      <div style={styles.successIcon}><IconCheck /></div>
      <h2 style={styles.successTitle}>Project Submitted!</h2>
      <p style={styles.successSub}>Your project has been added and is pending faculty review.</p>
      <button style={styles.submitBtn} onClick={onBack}>← Back to Projects</button>
    </div>
  );
}

/* ─── Main Component ─── */
export default function ProjectsPage() {
  const [activeNav,   setActiveNav]   = useState("project");
  const [hoveredNav,  setHoveredNav]  = useState(null);
  const [view,        setView]        = useState("review"); // "review" | "add" | "success"
  const [selBatch,    setSelBatch]    = useState("BSCS-4");
  const [selSubject,  setSelSubject]  = useState("Database Systems");

  // When batch changes, reset subject to first available
  const handleBatchChange = (b) => {
    setSelBatch(b);
    setSelSubject(SUBJECTS_BY_BATCH[b]?.[0] || "");
  };

  const projects = (ALL_PROJECTS[selBatch]?.[selSubject] || [])
    .slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((p, i) => ({ ...p, rank: i + 1 }));

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

        {/* Deco */}
        <div style={styles.decoBox}>
          <div style={{ color: "rgba(0,0,0,0.12)", fontSize: 90, fontWeight: 900, lineHeight: 1, fontFamily: "serif", userSelect: "none" }}>{"</>"}</div>
          <p style={{ color: "rgba(0,0,0,0.2)", fontSize: 11, fontWeight: 700, letterSpacing: 2, marginTop: 8 }}>BUILD · SUBMIT · EXCEL</p>
        </div>

        <button style={{ ...styles.logoutBtn, ...(hoveredNav === "logout" ? styles.logoutHover : {}) }}
          onMouseEnter={() => setHoveredNav("logout")}
          onMouseLeave={() => setHoveredNav(null)}>
          <IconLogout /><span>Logout</span>
        </button>
        <p style={styles.sidebarFooter}>© RANKIFY PRO</p>
      </aside>

      {/* ── Main ── */}
      <main style={styles.main}>

        {/* Top action bar */}
        <div style={styles.topBar}>
          <div style={styles.tabGroup}>
            <button
              style={{ ...styles.tabBtn, ...(view === "review" ? styles.tabBtnActive : {}) }}
              onClick={() => setView("review")}>
              Review Projects
            </button>
            <button
              style={{ ...styles.tabBtn, ...(view === "add" || view === "success" ? styles.tabBtnActive : {}) }}
              onClick={() => setView("add")}>
              <IconPlus /> ADD Project
            </button>
          </div>

          {view === "review" && (
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Dropdown label="Batch"   options={BATCHES}                        value={selBatch}   onChange={handleBatchChange} />
              <Dropdown label="Subject" options={SUBJECTS_BY_BATCH[selBatch] || []} value={selSubject} onChange={setSelSubject}    />
            </div>
          )}
        </div>

        {/* ── REVIEW VIEW ── */}
        {view === "review" && (
          <div style={styles.reviewSection}>
            <div style={styles.reviewHeader}>
              <div>
                <h2 style={styles.reviewTitle}>Top Projects</h2>
                <p style={styles.reviewSub}>Batch <strong>{selBatch}</strong> · <strong>{selSubject}</strong> · Top 4 ranked by score</p>
              </div>
              <div style={styles.reviewStats}>
                <span style={styles.statPill}>🏆 {projects.length} Projects</span>
              </div>
            </div>

            <div style={styles.cardList}>
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} rank={p.rank} />
              ))}
              {projects.length === 0 && (
                <div style={styles.emptyState}>No projects found for this batch.</div>
              )}
            </div>
          </div>
        )}

        {/* ── ADD VIEW ── */}
        {view === "add" && (
          <AddProjectView onSuccess={() => setView("success")} />
        )}

        {/* ── SUCCESS VIEW ── */}
        {view === "success" && (
          <SuccessView onBack={() => setView("review")} />
        )}
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
    fontFamily: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif", background: WHITE,
  },

  /* SIDEBAR */
  sidebar: { width: 280, minWidth: 280, background: YELLOW, display: "flex", flexDirection: "column", padding: "36px 28px", position: "relative", overflow: "hidden", boxSizing: "border-box", zIndex: 2 },
  sidebarWatermark: { position: "absolute", bottom: -40, left: -20, fontSize: 260, fontWeight: 900, color: "rgba(0,0,0,0.05)", pointerEvents: "none", userSelect: "none", lineHeight: 1, zIndex: 0 },
  brand: { display: "flex", alignItems: "flex-end", gap: 8, position: "relative", zIndex: 1 },
  brandText: { fontSize: 36, fontWeight: 900, color: WHITE, letterSpacing: -1, textShadow: "2px 2px 0 rgba(0,0,0,0.12)", lineHeight: 1 },
  brandPro: { fontSize: 12, fontWeight: 900, background: BLACK, color: YELLOW, padding: "3px 7px", borderRadius: 3, marginBottom: 4, letterSpacing: 2 },
  brandSub: { fontSize: 11, fontWeight: 700, color: "rgba(0,0,0,0.5)", margin: "4px 0 0", letterSpacing: 2, textTransform: "uppercase", position: "relative", zIndex: 1 },
  sidebarDivider: { width: "100%", height: 2, background: "rgba(0,0,0,0.12)", borderRadius: 2, margin: "20px 0", position: "relative", zIndex: 1 },
  nav: { display: "flex", flexDirection: "column", gap: 6, position: "relative", zIndex: 1 },
  navItem: { display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 700, color: "rgba(0,0,0,0.6)", letterSpacing: 0.5, textAlign: "left", transition: "all 0.18s ease", position: "relative" },
  navItemActive: { background: WHITE, color: BLACK, boxShadow: "0 4px 14px rgba(0,0,0,0.1)" },
  navItemHover:  { background: "rgba(255,255,255,0.45)", color: BLACK },
  navLabel: { flex: 1 },
  navDot: { width: 7, height: 7, borderRadius: "50%", background: YELLOW, border: "2px solid " + BLACK, flexShrink: 0 },
  decoBox: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 },
  logoutBtn: { display: "flex", alignItems: "center", gap: 8, padding: "11px 16px", borderRadius: 12, border: "2px solid rgba(0,0,0,0.15)", background: "transparent", color: "rgba(0,0,0,0.55)", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5, transition: "all 0.18s ease", position: "relative", zIndex: 1, marginBottom: 10 },
  logoutHover: { background: RED, color: WHITE, border: `2px solid ${RED}` },
  sidebarFooter: { fontSize: 9, letterSpacing: 3, color: "rgba(0,0,0,0.35)", fontWeight: 700, margin: 0, position: "relative", zIndex: 1 },

  /* MAIN */
  main: { flex: 1, display: "flex", flexDirection: "column", padding: "36px 44px", overflowY: "auto", gap: 24, background: "#fafafa", boxSizing: "border-box" },

  /* TOP BAR */
  topBar: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexShrink: 0 },
  tabGroup: { display: "flex", gap: 12 },
  tabBtn: {
    display: "flex", alignItems: "center", gap: 8, padding: "12px 24px",
    borderRadius: 12, border: "2px solid rgba(0,0,0,0.12)", background: WHITE,
    fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "rgba(0,0,0,0.5)",
    cursor: "pointer", letterSpacing: 0.5, transition: "all 0.18s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  tabBtnActive: { background: BLACK, color: WHITE, border: "2px solid " + BLACK, boxShadow: "0 4px 14px rgba(0,0,0,0.2)" },

  /* DROPDOWN */
  dropBtn: { display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: 12, border: "2px solid rgba(0,0,0,0.12)", background: WHITE, cursor: "pointer", fontFamily: "inherit", minWidth: 170, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", transition: "all 0.18s" },
  dropBtnLabel: { fontSize: 10, fontWeight: 800, color: "rgba(0,0,0,0.4)", letterSpacing: 2, textTransform: "uppercase" },
  dropBtnVal: { flex: 1, fontSize: 15, fontWeight: 900, color: BLACK, textAlign: "left" },
  dropMenu: { position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: WHITE, borderRadius: 12, border: "2px solid rgba(0,0,0,0.1)", boxShadow: "0 8px 28px rgba(0,0,0,0.15)", zIndex: 100, overflow: "hidden" },
  dropOpt: { display: "flex", alignItems: "center", width: "100%", padding: "11px 16px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 700, color: BLACK, textAlign: "left", transition: "background 0.15s" },
  dropOptActive: { background: "rgba(245,196,0,0.15)" },

  /* REVIEW SECTION */
  reviewSection: { display: "flex", flexDirection: "column", gap: 18, flex: 1 },
  reviewHeader: { display: "flex", alignItems: "flex-end", justifyContent: "space-between" },
  reviewTitle: { fontSize: 36, fontWeight: 900, color: BLACK, margin: 0, letterSpacing: -1, fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif" },
  reviewSub: { fontSize: 14, fontWeight: 600, color: "rgba(0,0,0,0.4)", margin: "4px 0 0", letterSpacing: 0.5 },
  reviewStats: { display: "flex", gap: 10 },
  statPill: { background: YELLOW, color: BLACK, fontSize: 13, fontWeight: 800, padding: "6px 16px", borderRadius: 50, letterSpacing: 0.5 },

  /* CARDS */
  cardList: { display: "flex", flexDirection: "column", gap: 14 },
  card: { background: YELLOW, borderRadius: 20, padding: "20px 24px", transition: "all 0.22s ease", border: "2px solid transparent", boxShadow: "0 3px 12px rgba(245,196,0,0.2)" },
  cardHover: { transform: "translateY(-2px)", boxShadow: "0 8px 28px rgba(245,196,0,0.35)", border: "2px solid rgba(0,0,0,0.08)" },
  cardExpanded: { boxShadow: "0 10px 36px rgba(245,196,0,0.4)", border: `2px solid ${YELLOW}` },
  cardTop: { display: "flex", alignItems: "center", gap: 16 },
  rankBadge: { display: "flex", alignItems: "center", fontSize: 15, fontWeight: 900, padding: "6px 14px", borderRadius: 50, flexShrink: 0, fontFamily: "inherit", letterSpacing: 0.5 },
  cardTitle: { fontSize: 20, fontWeight: 900, color: BLACK, margin: 0, letterSpacing: -0.3, fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif" },
  cardMeta: { display: "flex", gap: 8, marginTop: 5, alignItems: "center" },
  sectionChip: { fontSize: 11, fontWeight: 800, color: BLACK, background: "rgba(0,0,0,0.1)", padding: "3px 10px", borderRadius: 6, letterSpacing: 1 },
  statusChip: { fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 6, letterSpacing: 0.8 },
  scoreBox: { display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(0,0,0,0.1)", borderRadius: 12, padding: "8px 16px", minWidth: 60 },
  scoreVal: { fontSize: 26, fontWeight: 900, color: BLACK, lineHeight: 1, fontFamily: "'Barlow Condensed', Arial, sans-serif" },
  scoreLabel: { fontSize: 10, fontWeight: 700, color: "rgba(0,0,0,0.45)", letterSpacing: 1, textTransform: "uppercase" },
  descBtn: { display: "flex", alignItems: "center", padding: "10px 20px", borderRadius: 50, border: "none", background: RED, color: WHITE, fontFamily: "inherit", fontSize: 14, fontWeight: 800, cursor: "pointer", letterSpacing: 0.5, transition: "all 0.18s ease", flexShrink: 0, boxShadow: "0 3px 10px rgba(200,41,58,0.3)" },
  descBtnActive: { background: BLACK },

  /* EXPANDED */
  expandedBody: { marginTop: 16 },
  expandDivider: { height: 2, background: "rgba(0,0,0,0.1)", borderRadius: 2, marginBottom: 18 },
  expandGrid: { display: "flex", gap: 24, flexWrap: "wrap" },
  expandSection: { display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 200 },
  expandLabel: { display: "flex", alignItems: "center", fontSize: 11, fontWeight: 800, color: "rgba(0,0,0,0.45)", letterSpacing: 2, textTransform: "uppercase" },
  memberList: { display: "flex", gap: 8, flexWrap: "wrap" },
  memberPill: { background: WHITE, color: BLACK, fontSize: 13, fontWeight: 800, padding: "6px 14px", borderRadius: 50, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
  expandDesc: { fontSize: 14, fontWeight: 600, color: "rgba(0,0,0,0.7)", margin: 0, lineHeight: 1.6 },
  githubLink: { fontSize: 13, fontWeight: 700, color: BLACK, textDecoration: "none", background: WHITE, padding: "7px 14px", borderRadius: 8, display: "inline-flex", alignItems: "center", gap: 6, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", wordBreak: "break-all" },

  /* ADD FORM */
  addForm: { background: YELLOW, borderRadius: 24, overflow: "hidden", boxShadow: "0 6px 28px rgba(245,196,0,0.35)", maxWidth: 700 },
  formHeader: { background: RED, color: WHITE, fontSize: 22, fontWeight: 900, padding: "20px 32px", display: "flex", alignItems: "center", gap: 10, letterSpacing: 0.5, fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif" },
  formHeaderIcon: { background: "rgba(255,255,255,0.2)", width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" },
  formBody: { padding: "28px 32px", display: "flex", flexDirection: "column", gap: 20 },
  formRow: { display: "flex", flexDirection: "column", gap: 6 },
  formLabel: { fontSize: 16, fontWeight: 800, color: BLACK, letterSpacing: 0.5 },
  input: { padding: "12px 16px", borderRadius: 12, border: "2px solid rgba(0,0,0,0.12)", background: WHITE, fontFamily: "inherit", fontSize: 14, fontWeight: 600, color: BLACK, outline: "none", transition: "border 0.18s", resize: "none" },
  textarea: { minHeight: 80 },
  inputErr: { border: `2px solid ${RED}` },
  err: { fontSize: 12, fontWeight: 700, color: RED, letterSpacing: 0.3 },
  batchChip: { padding: "8px 18px", borderRadius: 50, border: "2px solid rgba(0,0,0,0.15)", background: "rgba(255,255,255,0.5)", fontFamily: "inherit", fontSize: 14, fontWeight: 800, color: BLACK, cursor: "pointer", transition: "all 0.18s" },
  batchChipActive: { background: BLACK, color: YELLOW, border: "2px solid " + BLACK },
  submitBtn: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 32px", borderRadius: 12, border: "none", background: BLACK, color: WHITE, fontFamily: "inherit", fontSize: 16, fontWeight: 900, cursor: "pointer", letterSpacing: 0.5, transition: "all 0.18s", boxShadow: "0 4px 16px rgba(0,0,0,0.2)", alignSelf: "flex-start" },

  /* SUCCESS */
  successBox: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, flex: 1, textAlign: "center", padding: "60px 0" },
  successIcon: { width: 90, height: 90, borderRadius: "50%", background: YELLOW, display: "flex", alignItems: "center", justifyContent: "center", color: BLACK, boxShadow: "0 8px 28px rgba(245,196,0,0.45)" },
  successTitle: { fontSize: 44, fontWeight: 900, color: BLACK, margin: 0, letterSpacing: -1, fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif" },
  successSub: { fontSize: 16, fontWeight: 600, color: "rgba(0,0,0,0.45)", margin: 0, maxWidth: 360 },
  emptyState: { textAlign: "center", padding: "48px 0", fontSize: 16, fontWeight: 700, color: "rgba(0,0,0,0.3)" },
};
