import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        Buffer: "readonly",
        console: "readonly",
        devicePixelRatio: "readonly",
        document: "readonly",
        fetch: "readonly",
        getComputedStyle: "readonly",
        HTMLCanvasElement: "readonly",
        HTMLElement: "readonly",
        innerHeight: "readonly",
        innerWidth: "readonly",
        location: "readonly",
        performance: "readonly",
        process: "readonly",
        scrollY: "readonly",
        URL: "readonly",
        window: "readonly",
      },
    },
    rules: {
      "no-empty": "off",
    },
    ignores: [".next/**", "node_modules/**", ".web-shader-extractor/**"],
  },
];
