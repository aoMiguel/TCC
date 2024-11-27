//@types----declare module 'sql-tag' {
  const sql: (query: TemplateStringsArray, ...values: any[]) => any;
  export { sql };
}
tsconfig.json//{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": [
    "Backend/**/*.ts",
    "@types/**/*.d.ts"
  ],
  "exclude": [
    "node_modules",
    "**/node_modules/*"
  ]
}
