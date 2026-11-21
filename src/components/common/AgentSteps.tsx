import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import './AgentSteps.css';

export interface AgentStepItem {
  title: string;
  detail?: string;
  log?: string[];
  fail?: string;
  retryLog?: string[];
  done?: string;
}

export interface AgentStepsHandle {
  run: () => Promise<void>;
  start: (i: number) => void;
  log: (i: number, text: string) => void;
  done: (i: number, note?: string) => void;
  fail: (i: number, msg?: string) => void;
  retry: (i: number) => void;
  skip: (i: number, note?: string) => void;
  reset: () => void;
  expand: (i: number, open?: boolean) => void;
  detail: (i: number, text: string) => void;
}

export interface AgentStepsProps {
  title?: string;
  theme?: 'dark' | 'light';
  density?: 'compact' | 'normal';
  steps?: AgentStepItem[];
  demo?: 'loop' | 'once' | 'manual' | boolean;
  autoStart?: boolean;
  speed?: number;
  follow?: boolean;
  className?: string;
  onComplete?: (detail: { ok: boolean; elapsed: number }) => void;
  onChange?: (detail: any) => void;
}

export const DEFAULT_BITCOIN_AUDIT_STEPS: AgentStepItem[] = [
  {
    title: 'Ingest Bitcoin UTXO & Mempool State',
    detail: 'Querying electrum nodes, indexing unspent transaction outputs',
    log: [
      '> bitcoind getaddressutxos "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"',
      'retrieved 18 confirmed UTXOs across 4 blocks',
      'scanning mempool: 0 unconfirmed zero-conf txs',
      'scriptPubKey type: Witness v0 KeyHash (P2WPKH)'
    ],
    done: '18 UTXOs · 4.825 BTC settled'
  },
  {
    title: 'Traverse Multi-Hop Peeling Chains',
    detail: 'Peeling chain heuristics & change address identification',
    log: [
      'inspecting 43 input/output edges in cluster',
      'detected peel pattern: 0.05 BTC hop -> change remainder 4.775 BTC',
      'co-spending clustering: 3 associated wallet pubkeys identified',
      'path depth: 5 layers mapped across 12 intermediate hops'
    ],
    done: '12 hops traversed · 3 change clusters'
  },
  {
    title: 'Cross-Reference OFAC Sanctions & Mixer Watchlists',
    detail: 'Screening OFAC SDN, Sinbad, Blender & Wasabi CoinJoin pools',
    log: [
      '> ofac-screen --target bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      '✓ OFAC Specially Designated Nationals (SDN): clean',
      '✓ Lazarus Group attribution check: no direct match',
      '✗ CoinJoin mixer interaction: 1 hop from Wasabi pool',
      'flagged: indirect exposure to tumbler via 1.25 BTC UTXO'
    ],
    fail: 'Indirect mixer exposure detected (Wasabi CoinJoin)',
    retryLog: [
      're-evaluating hop taint depth: 2 hops away, threshold 0.15',
      '> compliance-eval --isolate-taint --depth 2',
      '✓ taint score downgraded: risk profile elevated to High (78/100)',
      '✓ automated sanctions compliance pass'
    ],
    done: 'Watchlists audited · 1 mixer flag annotated'
  },
  {
    title: 'Heuristic Peeling & Cluster De-Anonymization',
    detail: 'Evaluating velocity bursts, multi-sig peel anomalies',
    log: [
      'calculating transaction velocity bursts',
      'velocity: 0.82 BTC/hr (normal threshold < 0.20)',
      'peeling asymmetry ratio: 94.2% (rapid dispersion)',
      '✓ entity profile: OTC Broker / Intermediate Exchange'
    ],
    done: 'Velocity 0.82 BTC/hr · OTC Broker cluster'
  },
  {
    title: 'Synthesize Forensic Evidence Graph & SAR Export',
    detail: 'Generating directed acyclic flow graph & FinCEN dossier',
    log: [
      'generating interactive graph topology: 16 nodes, 21 edges',
      'building cryptographic hash manifest',
      'compiling FinCEN Suspicious Activity Report (SAR)',
      '✓ evidence package cryptographically sealed'
    ],
    done: 'Dossier compiled · SAR SAR-2026-BTC-892 ready'
  }
];

export const AgentSteps = forwardRef<AgentStepsHandle, AgentStepsProps>(
  (
    {
      title = 'Bitcoin Forensic Audit Agent Pipeline',
      theme = 'dark',
      density = 'normal',
      steps = DEFAULT_BITCOIN_AUDIT_STEPS,
      demo = 'manual',
      autoStart = false,
      speed = 1,
      follow = true,
      className = '',
      onComplete,
      onChange
    },
    ref
  ) => {
    const containerRef = useRef<HTMLElement | null>(null);
    const instanceRef = useRef<any>(null);

    useImperativeHandle(
      ref,
      () => ({
        run: () => instanceRef.current?.run(),
        start: (i: number) => instanceRef.current?.start(i),
        log: (i: number, text: string) => instanceRef.current?.log(i, text),
        done: (i: number, note?: string) => instanceRef.current?.done(i, note),
        fail: (i: number, msg?: string) => instanceRef.current?.fail(i, msg),
        retry: (i: number) => instanceRef.current?.retry(i),
        skip: (i: number, note?: string) => instanceRef.current?.skip(i, note),
        reset: () => instanceRef.current?.reset(),
        expand: (i: number, open?: boolean) => instanceRef.current?.expand(i, open),
        detail: (i: number, text: string) => instanceRef.current?.detail(i, text)
      }),
      []
    );

    useEffect(() => {
      const rootEl = containerRef.current;
      if (!rootEl) return;
      const el: HTMLElement = rootEl;

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
      const esc = (s: any) =>
        String(s == null ? '' : s).replace(
          /[&<>"]/g,
          (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] || c)
        );
      const fmt = (ms: number) => {
        const s = Math.max(0, ms) / 1000,
          m = Math.floor(s / 60),
          r = s - m * 60;
        return String(m).padStart(2, '0') + ':' + r.toFixed(1).padStart(4, '0');
      };

      const LABEL: Record<string, string> = {
        idle: 'Queued',
        running: 'Running',
        done: 'Completed',
        failed: 'Failed',
        paused: 'Paused'
      };
      const WORD: Record<string, string> = {
        pending: 'pending',
        running: 'running',
        done: 'done',
        failed: 'failed',
        skipped: 'skipped'
      };

      const SPRING = (() => {
        try {
          if (!CSS.supports('transition-timing-function', 'linear(0, 1)')) return null;
        } catch (e) {
          return null;
        }
        let x = 0,
          v = 0;
        const k = 260,
          c = 22,
          h = 1 / 240,
          pts: number[] = [];
        for (let i = 0; i <= 240; i++) {
          if (i % 6 === 0) pts.push(+x.toFixed(4));
          v += (k * (1 - x) - c * v) * h;
          x += v * h;
        }
        pts.push(1);
        return `linear(${pts.join(',')})`;
      })();

      const GLYPH =
        '<svg class="vs-agent-steps-glyph" viewBox="0 0 22 22" aria-hidden="true"><circle class="r" cx="11" cy="11" r="8.5"/><circle class="d" cx="11" cy="11" r="2.5"/><g class="spin"><circle class="a" cx="11" cy="11" r="8.5"/></g><circle class="f" cx="11" cy="11" r="10"/><circle class="f fb" cx="11" cy="11" r="10"/><path class="k" pathLength="1" d="M7 11.4 9.7 14 15.1 8.5"/><path class="x" pathLength="1" d="M8 8l6 6"/><path class="x x2" pathLength="1" d="M14 8l-6 6"/><path class="sk" d="M7.8 11h6.4"/></svg>';
      const CHEV =
        '<svg class="vs-agent-steps-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 3.5 4.5 4.5L6 12.5"/></svg>';
      const COPY =
        '<svg class="cp" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="2"/><path d="M10.5 3.2A1.7 1.7 0 0 0 9 2.5H4.2A1.7 1.7 0 0 0 2.5 4.2V9a1.7 1.7 0 0 0 .7 1.4"/></svg><svg class="ok" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-6.5"/></svg>';

      const kind = (t: string) =>
        /^[>$] /.test(t)
          ? 'cmd'
          : /^[✓+]/.test(t)
          ? 'ok'
          : /^[✗!×]/.test(t)
          ? 'bad'
          : /^[MAD] /.test(t)
          ? 'mod'
          : '';

      const id = 'vs-as-' + Math.random().toString(36).slice(2, 8);
      const stepList = steps.map((s) => ({ ...s }));

      if (SPRING) el.style.setProperty('--vs-agent-steps-spring', SPRING);

      el.innerHTML = `<div class="vs-agent-steps-head"><div class="vs-agent-steps-top"><span class="vs-agent-steps-status">Queued</span><span class="vs-agent-steps-clock" aria-label="Elapsed"><b>00:00.0</b></span></div>
        ${title ? `<h3 class="vs-agent-steps-title">${esc(title)}</h3>` : ''}
        <div class="vs-agent-steps-prog"><div class="vs-agent-steps-bar" aria-hidden="true">${stepList.map(() => '<i></i>').join('')}</div><span class="vs-agent-steps-count"><b>0</b> / ${stepList.length}</span></div></div>
        <ol class="vs-agent-steps-list">
          <div class="vs-agent-steps-standby">
            <div class="vs-agent-steps-standby-pill">
              <span class="vs-agent-steps-standby-dot"></span>
              <span>Autonomous AI Agent Ready</span>
            </div>
            <p class="vs-agent-steps-standby-text">Target loaded. Click <b>Run Agent Pipeline</b> to dynamically discover &amp; execute forensic multi-hop tracing.</p>
          </div>
          ${stepList
          .map(
            (s, i) => `<li class="vs-agent-steps-step" data-s="pending"><span class="vs-agent-steps-rail"></span>
          <button class="vs-agent-steps-row" type="button" aria-expanded="false" aria-controls="${id}-log${i}" aria-disabled="true">${GLYPH}
            <span class="vs-agent-steps-txt"><span class="vs-agent-steps-name">${esc(s.title)}</span><span class="vs-agent-steps-detail">${esc(s.detail || '')}</span></span>
            <span class="vs-agent-steps-side"><span class="vs-agent-steps-retry"></span><span class="vs-agent-steps-time"></span>${CHEV}</span></button>
          <div class="vs-agent-steps-drawer" id="${id}-log${i}" hidden><div class="vs-agent-steps-log"><div class="vs-agent-steps-loghead"><span>Output<b>0</b></span>
            <button class="vs-agent-steps-copy" type="button" aria-label="Copy output">${COPY}</button></div>
            <div class="vs-agent-steps-lines" role="log" aria-live="off" tabindex="0" aria-label="Output of ${esc(s.title)}"></div></div></div></li>`
          )
          .join('')}</ol>
        <p class="vs-agent-steps-sr" aria-live="polite"></p>`;

      const $ = (s: string) => el.querySelector(s) as HTMLElement;
      const status = $('.vs-agent-steps-status');
      const clock = $('.vs-agent-steps-clock b');
      const count = $('.vs-agent-steps-count b');
      const live = $('.vs-agent-steps-sr');
      const segs = Array.from(el.querySelectorAll('.vs-agent-steps-bar i')) as HTMLElement[];

      const S = (Array.from(el.querySelectorAll('.vs-agent-steps-step')) as HTMLElement[]).map(
        (li, i) => ({
          li,
          i,
          data: stepList[i],
          s: 'pending',
          acc: 0,
          t0: 0,
          retries: 0,
          open: false,
          auto: false,
          n: 0,
          lastTxt: '',
          userClosed: false,
          stale: false,
          cpT: 0,
          row: li.querySelector('.vs-agent-steps-row') as HTMLElement,
          detail: li.querySelector('.vs-agent-steps-detail') as HTMLElement,
          time: li.querySelector('.vs-agent-steps-time') as HTMLElement,
          badge: li.querySelector('.vs-agent-steps-retry') as HTMLElement,
          drawer: li.querySelector('.vs-agent-steps-drawer') as HTMLElement,
          lines: li.querySelector('.vs-agent-steps-lines') as HTMLElement,
          lc: li.querySelector('.vs-agent-steps-loghead b') as HTMLElement,
          copy: li.querySelector('.vs-agent-steps-copy') as HTMLElement,
          h: { x: 0, v: 0, g: 0 }
        })
      );

      let pauseT: any = 0,
        idleSince = 0,
        runT0 = 0,
        runEnd = 0,
        gen = 0,
        raf = 0,
        last = 0,
        onScreen = true,
        lastClock = '';

      const K = 340,
        C = 34;

      const tick = (now: number) => {
        const dt = Math.min(0.064, (now - last) / 1000 || 0.016);
        last = now;
        let busy = false;

        for (const st of S) {
          const p = st.h;
          if (reduce.matches) {
            p.x = p.g;
            p.v = 0;
          } else if (Math.abs(p.v) > 0.5 || Math.abs(p.x - p.g) > 0.3) {
            busy = true;
            const n = Math.max(1, Math.round(dt * 120)),
              h = dt / n;
            for (let j = 0; j < n; j++) {
              p.v += (-K * (p.x - p.g) - C * p.v) * h;
              p.x += p.v * h;
            }
          } else {
            p.x = p.g;
            p.v = 0;
          }

          const hp = Math.max(0, p.x).toFixed(1) + 'px';
          if (st.drawer.style.height !== hp) st.drawer.style.height = hp;
          if (p.x === p.g && p.g === 0 && !st.open && !st.drawer.hidden) st.drawer.hidden = true;

          if (st.s === 'running') {
            busy = true;
            const t = fmt(st.acc + now - st.t0);
            if (t !== st.lastTxt) {
              st.time.textContent = st.lastTxt = t;
            }
          }
        }

        if (runT0) {
          const t = fmt((runEnd || now) - runT0);
          if (t !== lastClock) clock.textContent = lastClock = t;
          if (!runEnd) busy = true;
        }

        raf = busy && onScreen && !document.hidden ? requestAnimationFrame(tick) : 0;
      };

      const wake = () => {
        if (!raf && onScreen && !document.hidden) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        }
      };

      const io =
        'IntersectionObserver' in window
          ? new IntersectionObserver((es) => {
              onScreen = es[0].isIntersecting;
              if (onScreen) wake();
            })
          : null;
      io && io.observe(el);

      const onVis = () => {
        if (!document.hidden) wake();
      };
      document.addEventListener('visibilitychange', onVis);

      function measure(st: (typeof S)[0]) {
        if (st.open) {
          st.h.g = (st.drawer.firstElementChild as HTMLElement).offsetHeight + 12;
          wake();
        }
      }

      function expand(i: number, open?: boolean, auto?: boolean) {
        const st = S[i];
        if (!st) return;
        open = open == null ? !st.open : !!open;
        if (open && !st.n) return;
        st.open = open;
        st.auto = open && !!auto;
        st.row.setAttribute('aria-expanded', String(open));
        if (open) {
          st.drawer.hidden = false;
          measure(st);
          st.lines.scrollTop = st.lines.scrollHeight;
        } else {
          st.h.g = 0;
        }
        wake();
      }

      let sayT: any = 0;
      const say = (t: string) => {
        clearTimeout(sayT);
        live.textContent = '';
        sayT = setTimeout(() => (live.textContent = t), 60);
      };

      function update() {
        const busy = S.some((s) => s.s === 'running');
        const fin = S.every((s) => s.s === 'done' || s.s === 'skipped');
        const bad = S.some((s) => s.s === 'failed');
        let state = busy
          ? 'running'
          : fin && S.length
          ? 'done'
          : bad
          ? 'failed'
          : S.some((s) => s.s !== 'pending')
          ? 'paused'
          : 'idle';

        const prev = el.dataset.state;
        const t = performance.now();
        clearTimeout(pauseT);

        if (busy) idleSince = 0;
        else if (!idleSince && prev === 'running') idleSince = t;

        if (state === 'paused' && idleSince && t - idleSince < 1500) {
          state = 'running';
          pauseT = setTimeout(update, 1500 - (t - idleSince) + 20);
        }

        el.dataset.state = state;
        status.textContent = LABEL[state] || state;
        const activeCount = S.filter((s) => s.s !== 'pending').length;
        count.textContent = String(S.filter((s) => s.s === 'done' || s.s === 'skipped').length);
        segs.forEach((g, i) => (g.dataset.s = S[i].s));

        const standby = el.querySelector('.vs-agent-steps-standby') as HTMLElement | null;
        if (standby) {
          standby.style.display = activeCount === 0 ? 'flex' : 'none';
        }

        S.forEach((st, i) => {
          const next = S[i + 1];
          const rail = st.li.querySelector('.vs-agent-steps-rail') as HTMLElement | null;
          if (rail) {
            rail.style.display = (next && next.s !== 'pending') ? 'block' : 'none';
          }
        });

        const now = performance.now();
        if (state === 'running') runEnd = 0;
        else if (runT0 && !runEnd && (state === 'done' || state === 'failed')) runEnd = now;

        if (state === 'done' && prev !== 'done' && follow) {
          const g = gen;
          setTimeout(() => {
            if (gen === g && el.dataset.state === 'done')
              S.forEach((o) => {
                if (o.auto && o.open) expand(o.i, false);
              });
          }, 900);
        }

        if (state === 'done' && prev !== 'done') {
          const elapsed = runEnd - runT0;
          say(`Run complete in ${fmt(elapsed)}.`);
          onComplete?.({ ok: true, elapsed });
          el.dispatchEvent(
            new CustomEvent('vs-agent-steps:complete', {
              bubbles: true,
              detail: { ok: true, elapsed }
            })
          );
        }
        wake();
      }

      function set(i: number, s: string, note?: string) {
        const st = S[i];
        if (!st) return;
        const prev = st.s;
        const now = performance.now();

        if (prev === 'running') {
          st.acc += now - st.t0;
          st.time.textContent = st.lastTxt = fmt(st.acc);
          st.lines.lastElementChild?.classList.remove('caret');
        }

        st.s = s;
        st.li.dataset.s = s;
        if (s === 'running') {
          st.t0 = now;
          if (!runT0) runT0 = now;
        }
        if (note != null) st.detail.textContent = note;
        st.row.setAttribute(
          'aria-label',
          `${st.data.title}, ${WORD[s]}${st.retries ? `, retry ${st.retries}` : ''}${
            st.acc ? ', ' + fmt(st.acc) : ''
          }`
        );

        update();
        onChange?.({ index: i, state: s, prev, step: st.data, retries: st.retries });
        el.dispatchEvent(
          new CustomEvent('vs-agent-steps:change', {
            bubbles: true,
            detail: { index: i, state: s, prev, step: st.data, retries: st.retries }
          })
        );
      }

      function clearVis(st: (typeof S)[0], soft?: boolean) {
        st.stale = false;
        st.li.dataset.s = st.s;
        delete st.li.dataset.retries;
        st.badge.textContent = '';
        segs[st.i].dataset.s = st.s;
        st.time.textContent = '';
        st.detail.textContent = st.data.detail || '';
        st.row.setAttribute('aria-label', `${st.data.title}, ${WORD[st.s]}`);

        const wipe = () => {
          if (st.open) return;
          st.lines.textContent = '';
          st.n = 0;
          st.lc.textContent = '0';
          st.row.setAttribute('aria-disabled', 'true');
        };

        if (soft)
          setTimeout(() => {
            if (st.s === 'pending' && !st.stale) wipe();
          }, 450);
        else wipe();
      }

      function start(i: number) {
        const st = S[i];
        if (!st) return;
        if (st.stale) clearVis(st, false);
        if (follow)
          S.forEach((o) => {
            if (o !== st && o.auto && o.open) expand(o.i, false);
          });
        set(i, 'running');
        say(`Step ${i + 1}, ${st.data.title}: running.`);
        if (follow && st.n) expand(i, true, true);
      }

      function log(i: number, text: string) {
        const st = S[i];
        if (!st) return;
        String(text)
          .split('\n')
          .forEach((t) => {
            const d = document.createElement('div');
            const k = kind(t);
            if (k) d.className = k;
            d.textContent = t;
            st.lines.lastElementChild?.classList.remove('caret');
            if (st.s === 'running') d.classList.add('caret');
            const stick = st.lines.scrollTop + st.lines.clientHeight >= st.lines.scrollHeight - 14;
            st.lines.appendChild(d);
            st.n++;
            st.lc.textContent = String(st.n);
            if (!reduce.matches && st.open)
              d.animate(
                [{ opacity: 0, transform: 'translateY(3px)' }, { opacity: 1, transform: 'none' }],
                { duration: 240, easing: 'cubic-bezier(.16,1,.3,1)' }
              );
            if (stick) st.lines.scrollTop = st.lines.scrollHeight;
          });

        st.row.setAttribute('aria-disabled', 'false');
        if (st.s === 'running') {
          const t = st.lines.lastElementChild?.textContent || '';
          st.detail.textContent = t.replace(/^([>$]|[✓✗×!]) */, '');
        }
        if (follow && st.s === 'running' && !st.open && st.n && !st.userClosed)
          expand(i, true, true);
        measure(st);
      }

      function sep(i: number, t: string) {
        const st = S[i];
        const d = document.createElement('div');
        d.className = 'sep';
        d.textContent = t;
        st.lines.appendChild(d);
        st.n++;
        measure(st);
      }

      function done(i: number, note?: string) {
        const st = S[i];
        if (!st) return;
        set(i, 'done', note);
        say(`Step ${i + 1} done${note ? ': ' + note : ''}.`);
      }

      function fail(i: number, msg?: string) {
        const st = S[i];
        if (!st) return;
        set(i, 'failed', msg || 'Failed');
        say(`Step ${i + 1} failed${msg ? ': ' + msg : ''}.`);
      }

      function skip(i: number, note?: string) {
        set(i, 'skipped', note);
      }

      function retry(i: number) {
        const st = S[i];
        if (!st) return;
        st.retries++;
        st.li.dataset.retries = String(st.retries);
        st.badge.textContent = 'retry ' + st.retries;
        sep(i, 'retry ' + st.retries);
        st.userClosed = false;
        start(i);
      }

      function reset() {
        gen++;
        runT0 = runEnd = idleSince = 0;
        clearTimeout(pauseT);
        lastClock = '';
        clock.textContent = '00:00.0';
        const n = S.length,
          g = gen;
        S.forEach((st) => {
          if (st.open) expand(st.i, false);
          st.s = 'pending';
          st.acc = 0;
          st.retries = 0;
          st.userClosed = false;
          st.lastTxt = '';
        });
        el.dataset.state = 'idle';
        status.textContent = LABEL.idle;
        count.textContent = '0';
        S.forEach((st, i) => {
          st.stale = true;
          setTimeout(
            () => {
              if (gen === g && st.stale) clearVis(st, true);
            },
            reduce.matches ? 0 : (n - 1 - i) * 45
          );
        });
        wake();
      }

      function copy(st: (typeof S)[0]) {
        const text = Array.from(st.lines.children)
          .map((d) => d.textContent)
          .join('\n');
        const ok = () => {
          st.copy.classList.add('is-done');
          st.copy.setAttribute('aria-label', 'Copied');
          clearTimeout(st.cpT);
          st.cpT = window.setTimeout(() => {
            st.copy.classList.remove('is-done');
            st.copy.setAttribute('aria-label', 'Copy output');
          }, 1500);
        };
        const legacy = () => {
          const t = document.createElement('textarea');
          t.value = text;
          t.style.cssText = 'position:fixed;opacity:0';
          document.body.appendChild(t);
          t.select();
          try {
            document.execCommand('copy');
          } catch (e) {}
          t.remove();
          ok();
        };
        if (navigator.clipboard && window.isSecureContext)
          navigator.clipboard.writeText(text).then(ok, legacy);
        else legacy();
      }

      const onClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        const row = target?.closest('.vs-agent-steps-row');
        if (row) {
          const st = S.find((s) => s.row === row);
          if (st && st.n) {
            expand(st.i);
            st.userClosed = !st.open;
          }
          return;
        }
        const cp = target?.closest('.vs-agent-steps-copy');
        if (cp) {
          const st = S.find((s) => s.copy === cp);
          if (st) copy(st);
        }
      };

      const onKey = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement | null;
        const row = target?.closest?.('.vs-agent-steps-row');
        if (!row) return;
        const i = S.findIndex((s) => s.row === row);
        const map: Record<string, number> = {
          ArrowDown: i + 1,
          ArrowUp: i - 1,
          Home: 0,
          End: S.length - 1
        };
        const to = map[e.key];
        if (to != null && S[to]) {
          e.preventDefault();
          S[to].row.focus();
        }
      };

      el.addEventListener('click', onClick);
      el.addEventListener('keydown', onKey);
      update();

      // Simulated runner
      let simTimeout: any = 0;
      let active = true;
      let isSimRunning = false;

      const runSimulation = async () => {
        if (isSimRunning) return;
        isSimRunning = true;
        clearTimeout(simTimeout);
        api.reset();
        await new Promise((r) => (simTimeout = setTimeout(r, 200)));
        if (!active) {
          isSimRunning = false;
          return;
        }

        const sp = () => speed || 1;
        let seed = 7;
        const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
        const wait = (ms: number) => new Promise((r) => (simTimeout = setTimeout(r, ms / sp())));

        await wait(300);
        for (let i = 0; i < stepList.length && active; i++) {
          const d = stepList[i];
          api.start(i);
          await wait(380);
          for (const l of d.log || []) {
            if (!active) {
              isSimRunning = false;
              return;
            }
            api.log(i, l);
            await wait(170 + rnd() * 230);
          }
          if (d.fail && active) {
            await wait(260);
            api.fail(i, d.fail);
            await wait(1150);
            if (!active) {
              isSimRunning = false;
              return;
            }
            api.retry(i);
            await wait(300);
            for (const l of d.retryLog || []) {
              if (!active) {
                isSimRunning = false;
                return;
              }
              api.log(i, l);
              await wait(170 + rnd() * 230);
            }
          }
          if (!active) {
            isSimRunning = false;
            return;
          }
          await wait(220);
          api.done(i, d.done || undefined);
          await wait(300);
        }

        isSimRunning = false;

        if (demo === 'loop' && active) {
          await new Promise((r) => (simTimeout = setTimeout(r, 2600)));
          if (!active) return;
          api.reset();
          await new Promise((r) => (simTimeout = setTimeout(r, 700)));
          if (active) runSimulation();
        }
      };

      const api: AgentStepsHandle = {
        run: runSimulation,
        start,
        log,
        done,
        fail,
        retry,
        skip,
        reset,
        expand: (i: number, open?: boolean) => {
          expand(i, open);
          if (S[i]) S[i].userClosed = !S[i].open;
        },
        detail: (i: number, t: string) => {
          if (S[i]) S[i].detail.textContent = t;
        }
      };

      instanceRef.current = api;

      if (autoStart || demo === 'loop' || demo === true || demo === 'once') {
        runSimulation();
      }

      return () => {
        active = false;
        clearTimeout(simTimeout);
        clearTimeout(pauseT);
        clearTimeout(sayT);
        cancelAnimationFrame(raf);
        io?.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        el.removeEventListener('click', onClick);
        el.removeEventListener('keydown', onKey);
      };
    }, [title, density, theme, follow, demo, speed, steps]);

    return (
      <section
        ref={containerRef}
        data-theme={theme}
        data-density={density}
        data-follow={follow ? 'on' : 'off'}
        aria-label="Agent run"
        className={`vs-agent-steps ${className}`}
      />
    );
  }
);

AgentSteps.displayName = 'AgentSteps';
export default AgentSteps;
