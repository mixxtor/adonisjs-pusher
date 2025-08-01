import type Pusher from 'pusher'
import type { Options } from 'pusher'

export type PusherConfig = Options & {
  [key: string]: any
}

// Extend container bindings for dependency injection
declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    pusher: Pusher
  }
}
