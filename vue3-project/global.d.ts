import Tool from './src/utils/tool'

/*
由于$tool是动态挂载到Vue原型上的，VS Code 默认不知道它是什么。
要实现跳转，你需要通过 TypeScript 类型扩展
*/
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $tool: typeof Tool
  }
}
