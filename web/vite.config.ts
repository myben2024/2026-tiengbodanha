import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'node:path'
import { handleAudioApi } from './server/audio-api.mjs'
import { loadLocalEnv } from './server/env.mjs'

export default defineConfig({
	plugins: [
		react(),
		{
			name: 'audio-api',
			async configureServer(server) {
				await loadLocalEnv(join(process.cwd(), '.env'))
				server.middlewares.use((request, response, next) => {
					void handleAudioApi(request, response).then((handled) => {
						if (!handled) next()
					})
				})
			},
			async configurePreviewServer(server) {
				await loadLocalEnv(join(process.cwd(), '.env'))
				server.middlewares.use((request, response, next) => {
					void handleAudioApi(request, response).then((handled) => {
						if (!handled) next()
					})
				})
			},
		},
	],
	base: './',
})