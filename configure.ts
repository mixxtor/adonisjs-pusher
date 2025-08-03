/*
|--------------------------------------------------------------------------
| Configure hook
|--------------------------------------------------------------------------
|
| The configure hook is called when someone runs "node ace configure <package>"
| command. You are free to perform any operations inside this function to
| configure the package.
|
| To make things easier, you have access to the underlying "ConfigureCommand"
| instance and you can use codemods to modify the source files.
|
*/

import ConfigureCommand from '@adonisjs/core/commands/configure'
import { stubsRoot } from './stubs/main.js'

export async function configure(command: ConfigureCommand) {
  const codemods = await command.createCodemods()
  const project = await codemods.getTsMorphProject()

  /**
   * Publish config file if it doesn't exist
   */
  const configExists = project?.getSourceFile('config/pusher.ts')
  if (!configExists) {
    await codemods.makeUsingStub(stubsRoot, 'config/pusher.stub', {})
  }

  /**
   * Register provider
   */
  await codemods.updateRcFile((rcFile) => {
    rcFile.addProvider('@mixxtor/adonisjs-pusher/provider')
  })
}
