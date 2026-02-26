/*
 * @mixxtor/adonisjs-pusher
 *
 * (c) Mixxtor
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import app from '@adonisjs/core/services/app'
import type Pusher from 'pusher'

/**
 * Pusher service singleton
 *
 * Usage:
 * ```ts
 * import pusher from '@mixxtor/adonisjs-pusher/services/main'
 *
 * // Trigger an event
 * await pusher.trigger('my-channel', 'my-event', { message: 'hello' })
 * ```
 */

let pusher: Pusher

await app.booted(async () => {
  pusher = await app.container.make('pusher')
})

export { pusher as default }
