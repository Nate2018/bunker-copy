import type { Plugin } from './plugin'
import { toast } from '@zerodevx/svelte-toast' 

export async function fetchExternalPlugin(url: string): Promise<Plugin | undefined> {
  try {
    const response = await fetch(url + 'plugin.json')
    const code = await response.text()
    const blob = new Blob([code], { type: 'application/json' })

    const plugin = JSON.parse(await blob.text()) as Plugin
    console.log(plugin)
   
    
    if (plugin.type == "tile"){
      const moduleResponse = await fetch(url + plugin.content)
      if (!moduleResponse.ok) {
        throw new Error(`Failed to load ${plugin.name}`)
      }
      const moduleText = await moduleResponse.text()
      const moduleBlob = new Blob([moduleText], { type: 'application/javascript' })
      const moduleUrl = URL.createObjectURL(moduleBlob)
      const module = await import(/* @vite-ignore */moduleUrl)
      plugin.content = module.default

      return plugin
    } else if (plugin.type == "app") {
      
      return plugin
    }

  } catch (error) {
    toast.push(`Failed to fetch plugin:`, { theme: { '--toastBackground': 'red' } })
    return
  }
}

