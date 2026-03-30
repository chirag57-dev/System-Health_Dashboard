import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://system-health-dashboard-q0j6.onrender.com/health");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div style={styles.loading}>Loading system data...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>System Health Dashboard</h1>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h2 style={styles.label}>CPU Usage</h2>
          <p style={styles.value}>{data.cpu.usage}%</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.label}>Memory Used</h2>
          <p style={styles.value}>{data.memory.used} GB</p>
          <p style={styles.sub}>of {data.memory.total} GB</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.label}>Disk Used</h2>
          <p style={styles.value}>{data.disk.used} GB</p>
          <p style={styles.sub}>of {data.disk.total} GB</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.label}>Total Processes</h2>
          <p style={styles.value}>{data.processes}</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.label}>Platform</h2>
          <p style={styles.value}>{data.os.platform}</p>
          <p style={styles.sub}>{data.os.distro}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    padding: "2rem",
    fontFamily: "monospace",
  },
  title: {
    color: "#38bdf8",
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "1.8rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: "12px",
    padding: "1.5rem",
    textAlign: "center",
    border: "1px solid #334155",
  },
  label: {
    color: "#94a3b8",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
    fontWeight: "normal",
  },
  value: {
    color: "#38bdf8",
    fontSize: "2rem",
    fontWeight: "bold",
    margin: "0",
  },
  sub: {
    color: "#64748b",
    fontSize: "0.8rem",
    marginTop: "0.3rem",
  },
  loading: {
    color: "#38bdf8",
    textAlign: "center",
    marginTop: "5rem",
    fontFamily: "monospace",
    fontSize: "1.2rem",
  },
};

export default App;