import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .term { background: #000; padding: 20px; min-height: 100vh; font-family: 'Share Tech Mono', monospace; position: relative; overflow: hidden; }
  canvas.matrix { position: fixed; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.035; pointer-events: none; }
  .scanline { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.1) 3px,rgba(0,0,0,0.1) 4px); pointer-events: none; z-index: 1; }
  .content { position: relative; z-index: 2; max-width: 1100px; margin: 0 auto; }
  .topbar { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #00ff4135; padding-bottom: 14px; margin-bottom: 16px; }
  .logo { font-size: 22px; letter-spacing: 4px; color: #00ff41; text-shadow: 0 0 10px #00ff4150; }
  .logo span { color: #00ff4170; }
  .tagline { font-size: 11px; color: #00ff4190; letter-spacing: 2px; margin-top: 5px; }
  .right-info { text-align: right; }
  .online { color: #00ff41; display: flex; align-items: center; gap: 5px; justify-content: flex-end; margin-bottom: 4px; font-size: 12px; }
  .ping { width: 7px; height: 7px; border-radius: 50%; background: #00ff41; animation: ping 1.5s infinite; box-shadow: 0 0 6px #00ff41; }
  @keyframes ping { 0%,100%{opacity:1} 50%{opacity:0.2} }
  .time { color: #00ff41; font-size: 12px; opacity: 0.8; }
  .node { color: #00ff41; font-size: 11px; opacity: 0.6; margin-top: 3px; }
  .grid3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-bottom: 12px; }
  .mcard { border: 1px solid #00ff4130; padding: 16px; position: relative; background: rgba(0,255,65,0.03); }
  .mcard:after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; }
  .mcard.ok:after { background: #00ff41; box-shadow: 0 0 8px #00ff41; }
  .mcard.warn:after { background: #ffcc00; box-shadow: 0 0 8px #ffcc00; }
  .mcard.crit:after { background: #ff4444; box-shadow: 0 0 8px #ff4444; }
  .mcard-id { font-size: 10px; color: #00ff41; opacity: 0.7; letter-spacing: 3px; margin-bottom: 10px; }
  .mini-chart { display: flex; align-items: flex-end; gap: 2px; height: 30px; margin-bottom: 10px; }
  .bar { flex: 1; border-radius: 1px 1px 0 0; }
  .mcard-num { font-size: 36px; letter-spacing: -1px; margin-bottom: 4px; font-weight: 500; }
  .ok .mcard-num { color: #00ff41; text-shadow: 0 0 10px #00ff4160; }
  .warn .mcard-num { color: #ffcc00; text-shadow: 0 0 10px #ffcc0060; }
  .crit .mcard-num { color: #ff4444; text-shadow: 0 0 10px #ff444460; }
  .mcard-unit { font-size: 12px; margin-bottom: 10px; }
  .ok .mcard-unit { color: #00ff41; opacity: 0.7; }
  .warn .mcard-unit { color: #ffcc00; opacity: 0.7; }
  .crit .mcard-unit { color: #ff4444; opacity: 0.7; }
  .progress { height: 2px; background: #ffffff10; margin-bottom: 8px; }
  .progress-fill { height: 2px; }
  .ok .progress-fill { background: #00ff41; }
  .warn .progress-fill { background: #ffcc00; }
  .crit .progress-fill { background: #ff4444; }
  .mcard-status { font-size: 10px; letter-spacing: 2px; font-weight: 500; }
  .ok .mcard-status { color: #00ff41; }
  .warn .mcard-status { color: #ffcc00; }
  .crit .mcard-status { color: #ff4444; }
  .grid2 { display: grid; grid-template-columns: 3fr 2fr; gap: 10px; margin-bottom: 12px; }
  .panel { border: 1px solid #00ff4125; padding: 14px; background: rgba(0,255,65,0.02); }
  .panel-title { font-size: 10px; color: #00ff41; opacity: 0.7; letter-spacing: 3px; margin-bottom: 12px; display: flex; justify-content: space-between; }
  .log-entry { font-size: 12px; margin-bottom: 7px; display: flex; gap: 8px; line-height: 1.5; }
  .lt { color: #00ff41; opacity: 0.5; flex-shrink: 0; }
  .ll { flex-shrink: 0; font-weight: 500; }
  .lm { flex: 1; color: #ccffcc; }
  .l-ok { color: #00ff41; }
  .l-warn { color: #ffcc00; }
  .l-err { color: #ff4444; }
  .l-info { color: #44ccff; }
  .sys-row { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid #00ff4112; font-size: 12px; }
  .sys-key { color: #00ff41; opacity: 0.6; }
  .sys-val { color: #00ff41; font-weight: 500; }
  .sys-val-warn { color: #ffcc00; font-weight: 500; }
  .sys-val-crit { color: #ff4444; font-weight: 500; }
  .alert-strip { background: rgba(255,68,68,0.08); border: 1px solid rgba(255,68,68,0.35); padding: 10px 14px; margin-bottom: 12px; font-size: 11px; color: #ff6666; display: flex; align-items: center; gap: 8px; letter-spacing: 1px; }
  .alert-blink { animation: blink 0.8s step-end infinite; color: #ff4444; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .bottom-bar { border: 1px solid #00ff4125; padding: 10px 14px; display: flex; align-items: center; gap: 10px; font-size: 12px; background: rgba(0,255,65,0.02); }
  .prompt-sym { color: #00ff41; flex-shrink: 0; }
  .typing { color: #00ff41; opacity: 0.7; overflow: hidden; white-space: nowrap; flex: 1; border-right: 2px solid #00ff41; animation: type 5s steps(60) infinite; }
  @keyframes type { 0%{width:0;border-color:#00ff41} 65%{width:100%;border-color:#00ff41} 80%{width:100%;border-color:transparent} 100%{width:0;border-color:transparent} }
  .loading { color: #00ff41; font-family: 'Share Tech Mono', monospace; text-align: center; padding: 4rem; font-size: 16px; background: #000; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
`;

function getStatus(val, warnThreshold, critThreshold) {
  if (val >= critThreshold) return "crit";
  if (val >= warnThreshold) return "warn";
  return "ok";
}

function MiniChart({ history, status }) {
  const colors = { ok: "#00ff41", warn: "#ffcc00", crit: "#ff4444" };
  const color = colors[status];
  return (
    <div className="mini-chart">
      {history.map((v, i) => (
        <div key={i} className="bar" style={{ height: `${v}%`, background: color, opacity: 0.4 + (i / history.length) * 0.6 }} />
      ))}
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(null);
  const [clock, setClock] = useState("");
  const [cpuHistory, setCpuHistory] = useState([]);
  const [memHistory, setMemHistory] = useState([]);
  const [logs, setLogs] = useState([
    { time: "00:00:01", tag: "[INFO]", cls: "l-info", msg: "system monitor initializing..." },
    { time: "00:00:02", tag: "[OK]   ", cls: "l-ok", msg: "connection established to backend" },
  ]);

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = styles;
    document.head.appendChild(styleEl);

    const canvas = document.createElement("canvas");
    canvas.className = "matrix";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const cols = Math.floor(canvas.width / 14);
    const drops = Array(cols).fill(1);

    const matrixInterval = setInterval(() => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = "12px monospace";
      drops.forEach((y, i) => {
        const ch = String.fromCharCode(0x30a0 + Math.random() * 96);
        ctx.fillText(ch, i * 14, y * 14);
        if (y * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 50);

    const clockInterval = setInterval(() => {
      setClock(new Date().toTimeString().slice(0, 8));
    }, 1000);

    return () => {
      clearInterval(matrixInterval);
      clearInterval(clockInterval);
      window.removeEventListener("resize", resize);
      document.body.removeChild(canvas);
      document.head.removeChild(styleEl);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://system-health-dashboard-q0j6.onrender.com/health");
        const json = await res.json();
        setData(json);

        const cpu = parseFloat(json.cpu.usage);
        const mem = parseFloat(((json.memory.used / json.memory.total) * 100).toFixed(1));

        setCpuHistory(prev => [...prev.slice(-7), cpu]);
        setMemHistory(prev => [...prev.slice(-7), mem]);

        const t = new Date().toTimeString().slice(0, 8);
        const cpuStatus = getStatus(cpu, 50, 70);
        const newLog = cpuStatus === "crit"
          ? { time: t, tag: "[ALERT]", cls: "l-err", msg: `cpu spike detected — ${cpu}% load` }
          : cpuStatus === "warn"
          ? { time: t, tag: "[WARN] ", cls: "l-warn", msg: `cpu elevated — ${cpu}%` }
          : { time: t, tag: "[OK]   ", cls: "l-ok", msg: `health check passed — cpu ${cpu}%` };

        setLogs(prev => [...prev.slice(-7), newLog]);
      } catch (err) {
        const t = new Date().toTimeString().slice(0, 8);
        setLogs(prev => [...prev.slice(-7), { time: t, tag: "[ERR]  ", cls: "l-err", msg: "failed to fetch metrics — retrying..." }]);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div className="loading">root@server:~$ initializing system monitor<span style={{ animation: "blink 1s step-end infinite" }}>_</span></div>;

  const cpu = parseFloat(data.cpu.usage);
  const memUsed = parseFloat(data.memory.used);
  const memTotal = parseFloat(data.memory.total);
  const memPct = parseFloat(((memUsed / memTotal) * 100).toFixed(1));
  const diskUsed = parseFloat(data.disk.used);
  const diskTotal = parseFloat(data.disk.total);
  const diskPct = parseFloat(((diskUsed / diskTotal) * 100).toFixed(1));

  const cpuStatus = getStatus(cpu, 50, 70);
  const memStatus = getStatus(memPct, 60, 80);
  const diskStatus = getStatus(diskPct, 70, 85);

  const statusLabel = { ok: "NOMINAL", warn: "WARNING", crit: "CRITICAL" };

  return (
    <div className="term">
      <div className="scanline" />
      <div className="content">
        <div className="topbar">
          <div>
            <div className="logo">SYS<span>/</span>MONITOR<span>_</span></div>
            <div className="tagline">INFRASTRUCTURE HEALTH TERMINAL v2.4.1</div>
          </div>
          <div className="right-info">
            <div className="online"><div className="ping" />NODE ONLINE</div>
            <div className="time">{clock}</div>
            <div className="node">{data.os.distro} · {data.os.platform}</div>
          </div>
        </div>

        {cpuStatus === "crit" && (
          <div className="alert-strip">
            <span className="alert-blink">!!</span>
            CPU UTILIZATION CRITICAL — {cpu}% — EXCEEDS THRESHOLD OF 70%
          </div>
        )}

        <div className="grid3">
          {[
            { id: "CPU_UTILIZATION", num: `${cpu}%`, unit: "PERCENT LOAD", pct: cpu, status: cpuStatus, history: cpuHistory },
            { id: "MEMORY_USAGE", num: `${memPct}%`, unit: `${memUsed} GB / ${memTotal} GB`, pct: memPct, status: memStatus, history: memHistory },
            { id: "DISK_USAGE", num: `${diskPct}%`, unit: `${diskUsed} GB / ${diskTotal} GB`, pct: diskPct, status: diskStatus, history: [] },
          ].map((m) => (
            <div key={m.id} className={`mcard ${m.status}`}>
              <div className="mcard-id">{m.id}</div>
              <MiniChart history={m.history.length ? m.history : [m.pct]} status={m.status} />
              <div className="mcard-num">{m.num}</div>
              <div className="mcard-unit">{m.unit}</div>
              <div className="progress"><div className="progress-fill" style={{ width: `${m.pct}%` }} /></div>
              <div className="mcard-status">STATUS :: {statusLabel[m.status]}</div>
            </div>
          ))}
        </div>

        <div className="grid2">
          <div className="panel">
            <div className="panel-title"><span>SYSTEM_LOG</span><span>{logs.length} ENTRIES</span></div>
            {logs.map((l, i) => (
              <div key={i} className="log-entry">
                <span className="lt">{l.time}</span>
                <span className={`ll ${l.cls}`}>{l.tag}</span>
                <span className="lm">{l.msg}</span>
              </div>
            ))}
          </div>
          <div className="panel">
            <div className="panel-title">NODE_INFO</div>
            <div className="sys-row"><span className="sys-key">PLATFORM</span><span className="sys-val">{data.os.platform}</span></div>
            <div className="sys-row"><span className="sys-key">DISTRO</span><span className="sys-val">{data.os.distro}</span></div>
            <div className="sys-row"><span className="sys-key">PROCESSES</span><span className="sys-val">{data.processes}</span></div>
            <div className="sys-row"><span className="sys-key">FREE_RAM</span><span className="sys-val">{data.memory.free} GB</span></div>
            <div className="sys-row"><span className="sys-key">FREE_DISK</span><span className="sys-val">{data.disk.free} GB</span></div>
            <div className="sys-row"><span className="sys-key">CPU</span><span className={`sys-val-${cpuStatus}`}>{statusLabel[cpuStatus]}</span></div>
            <div className="sys-row"><span className="sys-key">MEMORY</span><span className={`sys-val-${memStatus}`}>{statusLabel[memStatus]}</span></div>
            <div className="sys-row" style={{ border: "none" }}><span className="sys-key">OVERALL</span><span className={`sys-val-${cpuStatus === "crit" || memStatus === "crit" ? "crit" : "ok"}`}>{cpuStatus === "crit" || memStatus === "crit" ? "!! ALERT" : "STABLE"}</span></div>
          </div>
        </div>

        <div className="bottom-bar">
          <span className="prompt-sym">root@{data.os.platform}-prod:~$</span>
          <span className="typing">fetching live system metrics... cpu:{cpu}% mem:{memPct}% disk:{diskPct}% procs:{data.processes}</span>
        </div>
      </div>
    </div>
  );
}