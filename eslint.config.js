import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import playwright from "eslint-plugin-playwright";

export default [
  js.configs.recommended,
  prettier,
  {
    ignores: [
      "playwright-report/",
      "playwright-report/**",
      "playwright-report/trace/",
      "playwright-report/trace/**",
      "node_modules/",
      "dist/",
      "coverage/"
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        page: "readonly",
        browser: "readonly",
        context: "readonly",
        test: "readonly",
        expect: "readonly",
      },
    },
    plugins: {
      playwright,
    },
    rules: {
      "no-undef": "off", // Desactiva errores de variables no definidas en tests
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Ignora variables no usadas con prefijo _
      "no-console": "warn", // Advertencia en logs de consola
      "no-empty": ["error", { allowEmptyCatch: true }], // Permite bloques catch vacíos
      "no-prototype-builtins": "off", // Desactiva advertencias sobre hasOwnProperty
      "no-cond-assign": ["error", "always"], // Evita asignaciones en condiciones
      "no-useless-escape": "off", // Desactiva advertencias sobre escapes innecesarios
      "valid-typeof": ["error", { requireStringLiterals: true }], // Asegura que typeof compare con strings válidos
    },
  },
];
