import { writable } from 'svelte/store'
import { onMount } from 'svelte';
export const plugins = writable<any[]>([]);
export const externalPlugins = writable<any[]>([]);
export const externalPluginLocations = writable<any[]>([]);
export const externalApps = writable<any[]>([]);
export const externalAppLocations = writable<any[]>([]);
export const currentApp = writable<any>();
export const internalPlugins = writable<any[]>([]);
export const internalPluginLocations = writable<any[]>([]);

export function loadStore() {
 // @ts-ignore
 plugins.set(JSON.parse(localStorage.getItem('plugins')) || []);

 plugins.subscribe((value) => {
     localStorage.setItem('plugins', JSON.stringify(value));
 });

 // @ts-ignore
 externalPluginLocations.set(JSON.parse(localStorage.getItem('externalPluginLocations')) || []);

 externalPluginLocations.subscribe((value) => {
     localStorage.setItem('externalPluginLocations', JSON.stringify(value));
 });

 // @ts-ignore
 externalAppLocations.set(JSON.parse(localStorage.getItem('externalAppLocations')) || []);

 externalAppLocations.subscribe((value) => {
     localStorage.setItem('externalAppLocations', JSON.stringify(value));
 });
}