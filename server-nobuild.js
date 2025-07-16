#!/usr/bin/env node
/**
 * Server startup script without automatic webpack build.
 * For use in environments like Vercel where build is done separately.
 */
import { CommandLineParser } from './src/command-line.js';
import { serverDirectory } from './src/server-directory.js';

// Set environment variable to skip webpack build
process.env.SKIP_WEBPACK_BUILD = 'true';

// config.yaml will be set when parsing command line arguments
const cliArgs = new CommandLineParser().parse(process.argv);
globalThis.DATA_ROOT = cliArgs.dataRoot;
globalThis.COMMAND_LINE_ARGS = cliArgs;
process.chdir(serverDirectory);

try {
    await import('./src/server-main.js');
} catch (error) {
    console.error('A critical error has occurred while starting the server:', error);
}