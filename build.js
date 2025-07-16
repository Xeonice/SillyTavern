/**
 * Build script for SillyTavern
 * Compiles the public/lib.js file using Webpack
 */
import webpack from 'webpack';
import chalk from 'chalk';
import getPublicLibConfig from './webpack.config.js';

console.log(chalk.blue('Building SillyTavern...'));

// Set DATA_ROOT for webpack config if not already set
if (!globalThis.DATA_ROOT) {
    globalThis.DATA_ROOT = './data';
}

try {
    // Get webpack configuration
    const config = getPublicLibConfig();
    
    // Create webpack compiler
    const compiler = webpack(config);
    
    // Run the build
    compiler.run((err, stats) => {
        if (err || !stats) {
            console.error(chalk.red('Build failed:'), err || 'No stats available');
            process.exit(1);
        }
        
        if (stats.hasErrors()) {
            console.error(chalk.red('Build failed with errors:'));
            console.error(stats.toString({ colors: true }));
            process.exit(1);
        }
        
        if (stats.hasWarnings()) {
            console.warn(chalk.yellow('Build completed with warnings:'));
            console.warn(stats.toString({ colors: true }));
        }
        
        console.log(chalk.green('✓ Build completed successfully!'));
        console.log(stats.toString({ colors: true }));
        
        // Close the compiler
        compiler.close((closeErr) => {
            if (closeErr) {
                console.error(chalk.red('Error closing compiler:'), closeErr);
            }
        });
    });
} catch (error) {
    console.error(chalk.red('Build configuration error:'), error);
    process.exit(1);
}