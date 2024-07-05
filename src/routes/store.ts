import { writable } from 'svelte/store'


export const plugins = writable<any[]>([]);
export const externalPlugins = writable<any[]>([]);