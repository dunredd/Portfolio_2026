import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index:      resolve(__dirname, 'index.html'),

                resume:     resolve(__dirname, 'resume.html'),
                decathlon:  resolve(__dirname, 'projectDecathlon.html'),
                cegedim:    resolve(__dirname, 'projectCegedim.html'),
                citadelles: resolve(__dirname, 'projectCitadelles.html'),
                weplan:     resolve(__dirname, 'projectWePlan.html'),
                aihub:      resolve(__dirname, 'projectAIHub.html'),
                musique:    resolve(__dirname, 'projectMusique.html'),
            }
        }
    }
})
