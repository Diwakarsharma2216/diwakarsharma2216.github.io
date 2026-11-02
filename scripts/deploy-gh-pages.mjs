import { execSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'

const publicDir = path.resolve('.output/public')
if (!fs.existsSync(path.join(publicDir, 'index.html'))) {
  console.error('No index.html found in .output/public. Run build first.')
  process.exit(1)
}

const remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim()
console.log(`Deploying to ${remoteUrl} (gh-pages branch)...`)

const commands = [
  'git init',
  'git checkout -B gh-pages',
  'git add -A',
  'git commit -m "deploy: update portfolio build [skip ci]" --allow-empty',
  `git push -f ${remoteUrl} gh-pages`,
]

try {
  execSync(commands.join(' && '), {
    cwd: publicDir,
    stdio: 'inherit',
    shell: true,
  })
  console.log('\n✓ Successfully deployed to gh-pages branch!')
} catch (err) {
  console.error('Deployment failed:', err)
  process.exit(1)
}

