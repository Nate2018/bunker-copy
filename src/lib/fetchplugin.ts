import type { Plugin } from './plugin'
import { toast } from '@zerodevx/svelte-toast' 

export async function fetchExternalPlugin(url: string): Promise<Plugin | undefined> {
  try {
    const response = await fetch(url + 'plugin.json')
    const code = await response.text()
    const blob = new Blob([code], { type: 'application/json' })

    const plugin = JSON.parse(await blob.text()) as Plugin
   
    
      const moduleResponse = await fetch(url + plugin.content)
      if (!moduleResponse.ok) {
        throw new Error(`Failed to load ${plugin.name}`)
      }
      const moduleText = await moduleResponse.text()
      const moduleBlob = new Blob([moduleText], { type: 'application/javascript' })
      const moduleUrl = URL.createObjectURL(moduleBlob)
      const module = await import(/* @vite-ignore */moduleUrl)
      plugin.content = module.default

      if (plugin.type == "app") {
        plugin.icon = "https://unpkg.com/lucide-static@latest/icons/" + plugin.icon;
      }

      return plugin

  } catch (error) {
    toast.push(`Failed to fetch plugin:`, { theme: { '--toastBackground': 'red' } })
    return
  }
}
