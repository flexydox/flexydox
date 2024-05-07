/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

type Arg = unknown;
type Args = Arg[];
export interface Logger {
  error: (...args: Args) => void;
  warn: (...args: Args) => void;
  info: (...args: Args) => void;
  debug: (...args: Args) => void;
  trace: (...args: Args) => void;
}

export type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'silent';

// eslint-disable-next-line prefer-const
let logLevel: LogLevel = 'info';

export function setLogLevel(level: LogLevel): void {
  logLevel = level;
}

export const logger: Logger = {
  error: (...args: Args) => {
    if (
      logLevel === 'error' ||
      logLevel === 'warn' ||
      logLevel === 'info' ||
      logLevel === 'debug' ||
      logLevel === 'trace'
    ) {
      console.error(...args);
    }
  },
  warn: (...args: Args) => {
    if (
      logLevel === 'warn' ||
      logLevel === 'info' ||
      logLevel === 'debug' ||
      logLevel === 'trace'
    ) {
      console.warn(...args);
    }
  },
  info: (...args: Args) => {
    if (logLevel === 'info' || logLevel === 'debug' || logLevel === 'trace') {
      console.info(...args);
    }
  },
  debug: (...args: Args) => {
    if (logLevel === 'debug' || logLevel === 'trace') {
      console.debug(...args);
    }
  },
  trace: (...args: Args) => {
    if (logLevel === 'trace') {
      console.debug(...args);
    }
  }
};
