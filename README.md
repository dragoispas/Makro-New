# Makro (Web Client)

## Development

- Install Node/npm
- `npm i -g pnpm`
- `pnpm install`

### React dev server

- `pnpm start`

### Formatting & Linting

- `pnpm format`

#### VSCode

- install the following plugins: [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [Format Code Action](https://marketplace.visualstudio.com/items?itemName=rohit-gohri.format-code-action&ssr=false#review-details)
- put the following into your `settings.json` (VSCode settings):

```json
{
  //...
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.probe": ["javascript", "javascriptreact"],
  "editor.formatOnSave": false,
  // Runs Prettier, then ESLint
  "editor.codeActionsOnSave": ["source.formatDocument", "source.fixAll.eslint"]
  // ...
}
```
