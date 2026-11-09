export interface FrameworkSettings {
  target: 'demo' | 'external';
  baseURL: string;
  demoPort: number;
  runId: string;
}

export function env(): FrameworkSettings {
  const target = process.env.TARGET ?? 'demo';
  if (target !== 'demo' && target !== 'external') throw new Error('TARGET must be demo or external');
  const demoPort = Number(process.env.DEMO_PORT ?? '4173');
  if (!Number.isInteger(demoPort) || demoPort < 1 || demoPort > 65535) throw new Error('Invalid DEMO_PORT');
  const baseURL = process.env.APP_BASE_URL ?? `http://127.0.0.1:${demoPort}`;
  if (!/^https?:\/\//.test(baseURL)) throw new Error('APP_BASE_URL must be an HTTP(S) URL');
  return { target, baseURL: baseURL.replace(/\/$/, ''), demoPort, runId: process.env.RUN_ID ?? 'local' };
}
