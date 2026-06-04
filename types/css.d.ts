// Allow side-effect CSS imports in TypeScript with moduleResolution: bundler
declare module '*.css' {
  const styles: Record<string, string>
  export default styles
}
