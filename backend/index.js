const express = require('express');
const cors = require('cors');
const si = require('systeminformation');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    const [cpu, mem, disk, osInfo, processes] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.fsSize(),
      si.osInfo(),
      si.processes()
    ]);

    res.json({
      cpu: {
        usage: cpu.currentLoad.toFixed(2),
      },
      memory: {
        total: (mem.total / 1024 / 1024 / 1024).toFixed(2),
        used: (mem.used / 1024 / 1024 / 1024).toFixed(2),
        free: (mem.free / 1024 / 1024 / 1024).toFixed(2),
      },
      disk: {
        total: (disk[0].size / 1024 / 1024 / 1024).toFixed(2),
        used: (disk[0].used / 1024 / 1024 / 1024).toFixed(2),
        free: (disk[0].available / 1024 / 1024 / 1024).toFixed(2),
      },
      os: {
        platform: osInfo.platform,
        distro: osInfo.distro,
        uptime: osInfo.uptime,
      },
      processes: processes.all,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
