/**
 * Configure script for @mixxtor/adonisjs-pusher
 * This script sets up the package in an AdonisJS application
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Copy config file to user's project
 */
function copyConfigFile() {
  const configDir = join(process.cwd(), 'config')
  const configFile = join(configDir, 'pusher.ts')
  
  // Create config directory if it doesn't exist
  if (!existsSync(configDir)) {
    mkdirSync(configDir, { recursive: true })
  }
  
  // Skip if config already exists
  if (existsSync(configFile)) {
    console.log('⚠️  config/pusher.ts already exists, skipping...')
    return
  }
  
  const configTemplate = `import env from '#start/env'
import type { Options } from 'pusher'

export default <Options>{
  host: env.get('PUSHER_HOST'),
  port: env.get('PUSHER_PORT'),
  appId: env.get('PUSHER_APP_ID'),
  key: env.get('PUSHER_APP_KEY'),
  secret: env.get('PUSHER_APP_SECRET'),
  cluster: env.get('PUSHER_APP_CLUSTER', 'mt1'),
  useTLS: env.get('PUSHER_TLS', true),
}
`
  
  writeFileSync(configFile, configTemplate)
  console.log('✅ Created config/pusher.ts')
}

/**
 * Add environment variables to env.ts
 */
function updateEnvFile() {
  const envFile = join(process.cwd(), 'start', 'env.ts')
  
  if (!existsSync(envFile)) {
    console.log('⚠️  start/env.ts not found, skipping env variables setup')
    return
  }
  
  const envContent = readFileSync(envFile, 'utf-8')
  
  // Check if Pusher variables already exist
  if (envContent.includes('PUSHER_HOST')) {
    console.log('⚠️  Pusher environment variables already exist, skipping...')
    return
  }
  
  // Find the schema object and add Pusher variables
  const pusherEnvVars = `
  /*
  |--------------------------------------------------------------------------
  | Variables for the Pusher real-time communication
  |--------------------------------------------------------------------------
  */
  PUSHER_HOST: Env.schema.string.optional({ format: 'host' }),
  PUSHER_PORT: Env.schema.number.optional(),
  PUSHER_APP_ID: Env.schema.string.optional(),
  PUSHER_APP_KEY: Env.schema.string.optional(),
  PUSHER_APP_SECRET: Env.schema.string.optional(),
  PUSHER_APP_CLUSTER: Env.schema.string.optional(),
  PUSHER_TLS: Env.schema.boolean.optional(),`
  
  // Insert before the closing brace of the schema
  const updatedContent = envContent.replace(
    /(\s*})(\s*\)\s*$)/,
    `,${pusherEnvVars}$1$2`
  )
  
  writeFileSync(envFile, updatedContent)
  console.log('✅ Added Pusher environment variables to start/env.ts')
}

/**
 * Update adonisrc.ts to include the provider
 */
function updateAdonisRc() {
  const adonisrcFile = join(process.cwd(), 'adonisrc.ts')
  
  if (!existsSync(adonisrcFile)) {
    console.log('⚠️  adonisrc.ts not found, skipping provider registration')
    return
  }
  
  const adonisrcContent = readFileSync(adonisrcFile, 'utf-8')
  
  // Check if provider already exists
  if (adonisrcContent.includes('@adomin/adonisjs-pusher/provider')) {
    console.log('⚠️  Pusher provider already registered, skipping...')
    return
  }
  
  // Add provider to the providers array
  const providerLine = "    () => import('@adomin/adonisjs-pusher/provider'),"
  
  const updatedContent = adonisrcContent.replace(
    /(providers:\s*\[[\s\S]*?)(\s*\])/,
    `$1    ${providerLine}$2`
  )
  
  writeFileSync(adonisrcFile, updatedContent)
  console.log('✅ Registered Pusher provider in adonisrc.ts')
}

/**
 * Main configuration function
 */
function configure() {
  console.log('🚀 Configuring @adomin/adonisjs-pusher...')
  
  copyConfigFile()
  updateEnvFile()
  updateAdonisRc()
  
  console.log('\n✨ Configuration completed!')
  console.log('\n📝 Next steps:')
  console.log('1. Add your Pusher credentials to .env file')
  console.log('2. Import and use pusher from the container: const pusher = await app.container.make("pusher")')
}

configure()
