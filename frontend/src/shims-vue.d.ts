/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue-leaflet/vue-leaflet'
declare let d3: any;
declare let $ : any;
declare module '*.png'
declare module '*.jpg'