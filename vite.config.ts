import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import dotenv from 'dotenv';
import { handleAiCreativeBrief } from './src/worker.ts';

dotenv.config();

/**
 * Vite plugin that mounts the Cloudflare Worker API handler during local dev.
 * Provides identical behavior to Cloudflare Workers in local preview.
 */
function cloudflareWorkerDevPlugin(): Plugin {
  return {
    name: 'cloudflare-worker-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/ai-creative-brief')) {
          if (req.method === 'OPTIONS') {
            res.writeHead(204, {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            });
            res.end();
            return;
          }

          if (req.method === 'POST') {
            try {
              let bodyStr = '';
              for await (const chunk of req) {
                bodyStr += chunk;
              }
              const fullUrl = `http://${req.headers.host || 'localhost:3000'}${req.url}`;
              const webReq = new Request(fullUrl, {
                method: 'POST',
                headers: req.headers as HeadersInit,
                body: bodyStr || null,
              });

              const workerResponse = await handleAiCreativeBrief(webReq, {
                GEMINI_API_KEY: process.env.GEMINI_API_KEY,
              });

              res.statusCode = workerResponse.status;
              workerResponse.headers.forEach((val, key) => {
                res.setHeader(key, val);
              });
              const responseData = await workerResponse.text();
              res.end(responseData);
              return;
            } catch (err) {
              console.error('Vite Worker Dev API error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Internal Server Error' }));
              return;
            }
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), cloudflareWorkerDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
