import express from 'express';
import cors from 'cors';
import { exec, spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4001;

app.use(cors());
app.use(express.json());

app.get('/api/check-yooboo', (req, res) => {
  exec('lsof -i :3000', (err, stdout) => {
    if (!err && stdout) {
      return res.json({ running: true });
    }
    res.json({ running: false });
  });
});

app.post('/api/launch-yooboo', (req, res) => {
  const yoobooDir = path.join(__dirname, '../yooboo');
  
  exec('lsof -i :3000', (err, stdout) => {
    if (!err && stdout) {
      return res.json({ message: 'Already running' });
    }

    // Launch in background, detached, and ignore output to prevent hanging
    const child = spawn('./run.sh', ['start'], {
      cwd: yoobooDir,
      detached: true,
      stdio: 'ignore'
    });
    child.unref();

    res.json({ message: 'Launch initiated' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
