import contentScript from '@/contentScripts/contentScript.vue'
import devtools from '@vue/devtools' // Make sure you import devtools before Vue, otherwise it might not work as expected.
import { createApp } from 'vue'

if (process.env.NODE_ENV === 'development') {
  devtools.connect('http://localhost', 8098)
}

const el = document.createElement('nav')
el.setAttribute('class', 'web-note-quickly-box')
document.body.appendChild(el)
createApp(contentScript).mount(el)