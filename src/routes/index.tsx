import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

import { type IApp, startPixi } from '../pixi/startPixi'

export default component$(() => {
  const app = useSignal<IApp>()
  useVisibleTask$(() => {
    Promise.all([startPixi('#app')])
      .then(() => app.value)
      .catch((error) => console.error('An error occurred:', error))
  })

  return (
    <main class="bg-dark h-screen">
      <h1 class="fw100 animate-fade-in-down">PIXI.js</h1>
      <div id="app" class="ma border border-dotted w-500px h-500px"></div>
    </main>
  )
})

export const head: DocumentHead = {
  title: 'Qwik Pixi.js RPG',
  meta: [
    {
      name: 'description',
      content: 'Coding games with Qwik and Pixi.js',
    },
  ],
}
