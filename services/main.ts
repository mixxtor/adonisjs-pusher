/*
 * @mixxtor/currencyx-adonisjs
 *
 * (c) Mixxtor
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import app from '@adonisjs/core/services/app'
import Pusher from 'pusher'

/**
 * Currency service with full type inference
 *
 * Usage:
 * ```ts
 * import currency from '@mixxtor/currencyx-adonisjs/services/currency'
 *
 * // Direct usage - no type casting needed
 * const rates = await currency.latestRates()
 *
 * // Provider switching with type inference
 * const googleProvider = currency.use('google')  // Only configured providers
 * const rates = await googleProvider.latestRates()
 * ```
 */

let pusher: Pusher

await app.booted(async () => {
  pusher = await app.container.make('pusher')
})

export { pusher as default }
