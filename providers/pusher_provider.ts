import { ApplicationService } from '@adonisjs/core/types'
import type { Options } from 'pusher'

export default class PusherProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    this.app.container.singleton('pusher', async () => {
      const { default: Pusher } = await import('pusher')
      const config = this.app.config.get<Options>('pusher')
      return new Pusher(config)
    })
  }

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shut down the app
   */
  async shutdown() {}
}
