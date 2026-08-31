# Minti Figma sync

Source: `https://www.figma.com/design/bZGaiGiAPGttDjV58mr7hW/Landing`

`figma-sync.json` is the source map between Figma nodes and application routes.
When the design changes, read the listed screen nodes with Figma design context,
compare their screenshots with the corresponding routes, update shared code in
`app/store.tsx` and tokens in `app/globals.css`, then replace changed exports in
`public/minti`. Keep `data-figma-node` attributes intact so shared components and
screens remain traceable.

The project intentionally stores exported assets locally. Figma MCP asset URLs
expire, while the files in `public/minti` remain stable in builds.
