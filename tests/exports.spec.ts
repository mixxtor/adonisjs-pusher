import { test } from '@japa/runner'
import { stubsRoot } from '../stubs/main.js'

test.group('Package Exports', () => {
  test('should export stubsRoot', ({ assert }) => {
    assert.isString(stubsRoot)
    assert.isTrue(stubsRoot.endsWith('stubs'))
  })

  test('should export defineConfig from index', async ({ assert }) => {
    const { defineConfig } = await import('../index.js')
    assert.isFunction(defineConfig)
  })

  test('should export configure from index', async ({ assert }) => {
    const { configure } = await import('../index.js')
    assert.isFunction(configure)
  })

  test('should export stubsRoot from index', async ({ assert }) => {
    const indexExports = await import('../index.js')
    assert.isString(indexExports.stubsRoot)
  })

  test('should export PusherProvider from src/index', async ({ assert }) => {
    const { PusherProvider } = await import('../src/index.js')
    assert.isFunction(PusherProvider)
  })

  test('should export types from src/types', async ({ assert }) => {
    // Just verify the module loads without error
    const types = await import('../src/types/pusher.js')
    assert.isDefined(types)
  })
})
