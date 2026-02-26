import { test } from '@japa/runner'
import { defineConfig } from '../src/config/define_config.js'

test.group('defineConfig', () => {
  test('should return the same config object passed to it', ({ assert }) => {
    const config = {
      appId: 'test-app-id',
      key: 'test-key',
      secret: 'test-secret',
      cluster: 'mt1',
    }

    const result = defineConfig(config)

    assert.deepEqual(result, config)
  })

  test('should accept all pusher options with host', ({ assert }) => {
    const config = {
      appId: 'test-app-id',
      key: 'test-key',
      secret: 'test-secret',
      useTLS: true,
      host: 'localhost',
      port: '6001',
      encryptionMasterKeyBase64: 'test-key',
    }

    const result = defineConfig(config)

    assert.deepEqual(result, config)
    assert.equal(result.appId, 'test-app-id')
    assert.equal(result.useTLS, true)
    assert.equal((result as any).host, 'localhost')
    assert.equal((result as any).port, '6001')
  })

  test('should accept cluster option', ({ assert }) => {
    const config = {
      appId: 'test-app-id',
      key: 'test-key',
      secret: 'test-secret',
      cluster: 'mt1',
      useTLS: true,
    }

    const result = defineConfig(config)

    assert.deepEqual(result, config)
    assert.equal((result as any).cluster, 'mt1')
  })

  test('should preserve type information', ({ assert }) => {
    const config = defineConfig({
      appId: '123',
      key: 'key',
      secret: 'secret',
      host: 'localhost',
    })

    // Type safety check - these should be strings
    assert.isString(config.appId)
    assert.isString(config.key)
    assert.isString(config.secret)
    assert.isString((config as any).host)
  })
})
