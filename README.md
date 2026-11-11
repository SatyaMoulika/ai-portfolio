# Porcelain & Azure
Reusable React + TypeScript components, Tailwind CSS v4 theme tokens, Vite portfolio demo and AI motion illustrations.

## Run the full source
Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
npm test
npm run build
```
`npm run build` typechecks, builds the reusable library into `lib/`, then builds the demo into `dist/`. `npm run preview` previews the production demo.

## Install the component package in another React project
Download `porcelain-azure-0.1.0.tgz`, then:

```sh
npm install ./porcelain-azure-0.1.0.tgz
```

```tsx
import { ThemeProvider, Button, AIMotion, ProjectCard } from '@portfolio/porcelain-azure';
import '@portfolio/porcelain-azure/styles.css';

export function App() {
  return (
    <ThemeProvider overrides={{ teal: '#087F8C' }}>
      <Button onClick={() => console.log('clicked')}>Explore project</Button>
      <AIMotion kind="network" tone="teal" className="h-48" />
    </ThemeProvider>
  );
}
```
React and React DOM 19 are peer dependencies, not bundled. The package includes TypeScript declarations and compiled CSS, so its built-in component styles work without setting up Tailwind in the consuming app. To generate additional custom utility classes, configure Tailwind in that app too. The compiled stylesheet includes Tailwind Preflight: import once at your app entry and account for its reset when integrating with an existing app.

## Fonts
Fonts are not downloaded by the package. Load Manrope (400–800) and Lora Italic (500), as the demo does in index.html, or self-host them. System and Georgia fallbacks are provided.

## Components
- `ThemeProvider`: scoped colour overrides and shared motion state.
- `Button`, `ButtonLink`: primary, secondary and ghost variants; loading/disabled states on buttons.
- `Badge`: azure, teal or violet.
- `Card`, `StatCard`, `Section`, `Eyebrow`: presentation primitives.
- `InputField`, `SelectField`: labelled fields; InputField associates hints and validation messages.
- `Navbar`, `Sidebar`, `DashboardShell`: composable layouts; Sidebar is controlled by `active` and `onChange`.
- `ProjectCard`: typed content and reusable motif artwork.
- `AIMotion`: embeddings, gpu, tokens, vectors, network, attention or agents. Supports tone, label, decorative mode and ambient/hover interaction.
- `MotionToggle`, `useMotion`: shared pause controls.

All motion respects `prefers-reduced-motion`; system preference changes are observed at runtime. Hover-only motion also starts when a project link receives keyboard focus. Use the global pause control for ambient movement. Motion diagrams are conceptual, not numerical model outputs; token chunks do not represent a specific tokenizer.

## Design tokens
Namespaced CSS variables (`--pa-azure`, `--pa-ink`, etc.) map to semantic Tailwind colours (`bg-canvas`, `text-muted`, `border-line`, etc.). Manrope is the UI font; Lora Italic is for occasional expressive accents. Override colour roles through ThemeProvider and verify contrast for custom colours. Azure is the primary action; teal represents connections; violet represents attention.

## Source structure
- `src/design-system/`: independent component library, tokens, motion and styles.
- `src/app/`: demo-specific content and state.
- `public/`: previous visual explorations and attributed reference assets.
- `vite.lib.config.ts`: reusable ES-module library build.
- `vite.config.ts`: demo app build.

## Scope
This is a reusable starter, not a published npm registry package. Install the provided archive or host it in your own package registry later. Portfolio projects, professional links and résumé remain illustrative or pending. Earlier reference pages and assets are included as attributed design research.
