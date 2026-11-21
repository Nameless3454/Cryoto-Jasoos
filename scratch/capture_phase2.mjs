import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = '/Users/kabeerprajapati/.gemini/antigravity/brain/42cae1b2-3ef5-4b3a-868e-47ce7a4e05d6/screenshots';

async function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.msgId = 1;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (e) => reject(e);
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.id && this.callbacks.has(data.id)) {
          const { res, rej } = this.callbacks.get(data.id);
          this.callbacks.delete(data.id);
          if (data.error) rej(data.error);
          else res(data.result);
        }
      };
    });
  }

  send(method, params = {}) {
    const id = this.msgId++;
    return new Promise((res, rej) => {
      this.callbacks.set(id, { res, rej });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function run() {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const userDataDir = `/tmp/chrome_phase2_${Date.now()}`;
  const debugPort = 9228;

  const chromeProc = spawn(chromePath, [
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${userDataDir}`,
    '--headless=new',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ], { stdio: 'ignore' });

  for (let i = 0; i < 20; i++) {
    await sleep(500);
    try {
      const res = await fetch(`http://127.0.0.1:${debugPort}/json/version`);
      if (res.ok) break;
    } catch (e) {}
  }

  const listRes = await fetch(`http://127.0.0.1:${debugPort}/json/list`);
  const pages = await listRes.json();
  const page = pages.find(p => p.type === 'page') || pages[0];

  const client = new CDPClient(page.webSocketDebuggerUrl);
  await client.connect();

  await client.send('Page.enable');
  await client.send('Runtime.enable');
  await client.send('DOM.enable');

  const targets = [
    { name: 'phase2_dashboard_1440', url: 'http://localhost:3000/', width: 1440, height: 900, mobile: false },
    { name: 'phase2_dashboard_390', url: 'http://localhost:3000/', width: 390, height: 844, mobile: true },
    { name: 'phase2_cases_1440', url: 'http://localhost:3000/cases', width: 1440, height: 900, mobile: false },
    { name: 'phase2_wallet_analyzer_1440', url: 'http://localhost:3000/wallet-analyzer', width: 1440, height: 900, mobile: false },
    { name: 'phase2_dashboard_1280', url: 'http://localhost:3000/', width: 1280, height: 800, mobile: false },
    { name: 'phase2_dashboard_768', url: 'http://localhost:3000/', width: 768, height: 1024, mobile: false },
    { name: 'phase2_dashboard_360', url: 'http://localhost:3000/', width: 360, height: 780, mobile: true },
  ];

  for (const t of targets) {
    console.log(`Navigating to ${t.url} (${t.width}x${t.height})...`);
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: t.width,
      height: t.height,
      deviceScaleFactor: 2,
      mobile: t.mobile
    });

    await client.send('Page.navigate', { url: t.url });
    await sleep(2000); // Allow React and Framer Motion layout to settle

    const ss = await client.send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(ss.data, 'base64');
    const outPath = path.join(SCREENSHOTS_DIR, `${t.name}.png`);
    fs.writeFileSync(outPath, buffer);
    console.log(`Saved screenshot: ${outPath}`);
  }

  client.close();
  chromeProc.kill();
  console.log('Phase 2 capture complete.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
