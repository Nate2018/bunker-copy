import Home from './Home.svelte'
import Viewer from './Viewer.svelte'
import App from './App.svelte'

const routes = {
    '/': Home,
    '/viewer': Viewer,
    '/app': App
}

export default routes