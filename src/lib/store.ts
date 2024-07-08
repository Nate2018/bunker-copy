import { writable } from 'svelte/store'
export const plugins = writable<any[]>([]);
export const externalPlugins = writable<any[]>([]);
export const externalPluginLocations = writable<any[]>([]);
export const externalApps = writable<any[]>([]);
export const externalAppLocations = writable<any[]>([]);
export const currentApp = writable<any>();
export const internalPlugins = writable<any[]>([]);
export const internalApps = writable<any[]>([]);
export const currentAppType = writable<any>();
export const externalStores = writable<any[]>([]);
export const internalStores = writable<any[]>([]);

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

 // @ts-ignore
 externalStores.set(JSON.parse(localStorage.getItem('externalStores')) || []);

 externalStores.subscribe((value) => {
     localStorage.setItem('externalStores', JSON.stringify(value));
 });
}