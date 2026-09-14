import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')
const OUTPUT_FILE = path.join(ROOT_DIR, 'portfolio-context.md')

// Code and configuration file extensions to collect
const ALLOWED_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.json',
  '.css',
  '.md',
  '.html',
  '.cursorrules',
])

// Directories to exclude entirely
const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  '.idea',
  '.vscode',
  '.github',
  'dist',
  'build',
  '.output',
  '.tanstack',
  'coverage',
])

// Large auto-generated or lock files to exclude
const IGNORED_FILES = new Set([
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
  'portfolio-context.md',
  'routeTree.gen.ts', // TanStack Router generated routes
  '.DS_Store',
])

function getLanguage(ext) {
  switch (ext) {
    case '.ts':
    case '.tsx':
      return 'typescript'
    case '.js':
    case '.jsx':
      return 'javascript'
    case '.json':
      return 'json'
    case '.css':
      return 'css'
    case '.md':
      return 'markdown'
    case '.html':
      return 'html'
    default:
      return ''
  }
}

function getFiles(dirPath, fileList = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)
    const relativePath = path.relative(ROOT_DIR, fullPath)

    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) {
        getFiles(fullPath, fileList)
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase()

      // Include allowed extensions or explicit dotfiles like .cursorrules
      if (
        (ALLOWED_EXTENSIONS.has(ext) || ALLOWED_EXTENSIONS.has(entry.name)) &&
        !IGNORED_FILES.has(entry.name)
      ) {
        fileList.push({ fullPath, relativePath, ext })
      }
    }
  }

  return fileList
}

function collate() {
  console.log('Collating portfolio context...')
  const files = getFiles(ROOT_DIR)

  let output = `# Portfolio Project Context\n\n`
  output += `Generated: ${new Date().toISOString()}\n`
  output += `Total Files Included: ${files.length}\n\n`
  output += `## Directory Structure\n\`\`\`\n`

  files.forEach((f) => {
    output += `${f.relativePath}\n`
  })
  output += `\`\`\`\n\n---\n\n`

  for (const file of files) {
    try {
      const content = fs.readFileSync(file.fullPath, 'utf-8')
      const lang = getLanguage(file.ext)

      output += `## File: \`${file.relativePath}\`\n\n`
      output += `\`\`\`${lang}\n${content}\n\`\`\`\n\n---\n\n`
    } catch (err) {
      console.error(`Error reading ${file.relativePath}:`, err.message)
    }
  }

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8')
  console.log(`✓ Collation complete: ${OUTPUT_FILE}`)
}

collate()
