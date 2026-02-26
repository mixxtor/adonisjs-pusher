import { test } from '@japa/runner'
import PusherProvider from '../providers/pusher_provider.js'

test.group('PusherProvider', () => {
  test('should have register method', ({ assert }) => {
    const mockApp = {
      container: {
        singleton: () => {},
      },
      config: {
        get: () => ({}),
      },
    } as any

    const provider = new PusherProvider(mockApp)

    assert.isFunction(provider.register)
  })

  test('should have lifecycle methods', ({ assert }) => {
    const mockApp = {
      container: {
        singleton: () => {},
      },
      config: {
        get: () => ({}),
      },
    } as any

    const provider = new PusherProvider(mockApp)

    assert.isFunction(provider.boot)
    assert.isFunction(provider.start)
    assert.isFunction(provider.ready)
    assert.isFunction(provider.shutdown)
  })

  test('register should bind pusher singleton to container', ({ assert }) => {
    let boundKey: string | undefined
    let boundFactory: Function | undefined

    const mockApp = {
      container: {
        singleton: (key: string, factory: Function) => {
          boundKey = key
          boundFactory = factory
        },
      },
      config: {
        get: () => ({
          appId: 'test-app-id',
          key: 'test-key',
          secret: 'test-secret',
          cluster: 'mt1',
        }),
      },
    } as any

    const provider = new PusherProvider(mockApp)
    provider.register()

    assert.equal(boundKey, 'pusher')
    assert.isFunction(boundFactory)
  })

  test('registered factory should create Pusher instance with config', async ({ assert }) => {
    let capturedFactory: Function | undefined

    const testConfig = {
      appId: 'test-app-id',
      key: 'test-key',
      secret: 'test-secret',
      cluster: 'mt1',
    }

    const mockApp = {
      container: {
        singleton: (_key: string, factory: Function) => {
          capturedFactory = factory
        },
      },
      config: {
        get: () => testConfig,
      },
    } as any

    const provider = new PusherProvider(mockApp)
    provider.register()

    // Call the factory to get the Pusher instance
    const pusherInstance = await capturedFactory!()

    // Verify it's a Pusher instance
    assert.isObject(pusherInstance)
    assert.isFunction(pusherInstance.trigger)
    assert.isFunction(pusherInstance.triggerBatch)
  })
})
