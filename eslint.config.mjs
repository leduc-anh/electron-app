import tseslint from "@electron-toolkit/eslint-config-ts";
import eslintConfigPrettier from "@electron-toolkit/eslint-config-prettier";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  // 1️⃣ Bỏ qua thư mục build
  { ignores: ["**/node_modules", "**/dist", "**/out"] },

  // 2️⃣ ✅ Khai báo plugin GLOBALLY
  {
    plugins: {
      "react-hooks": eslintPluginReactHooks,
      "react-refresh": eslintPluginReactRefresh, // 👈 BỔ SUNG DÒNG NÀY
    },
  },

  // 3️⃣ Cấu hình ESLint Toolkit (TS)
  tseslint.configs.recommended,

  // 4️⃣ Main Process
  {
    files: ["src/main/**/*.ts", "src/preload/**/*.ts"],
    ignores: ["src/preload/**/*.d.ts"],
    rules: {
      // tắt hoàn toàn 2 lỗi thường gây ra namespace JSX
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unnecessary-type-constraint": "off",
    },
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // 5️⃣ Renderer Process (React)
  {
    files: ["src/renderer/**/*.ts", "src/renderer/**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.web.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    ...eslintPluginReact.configs.flat.recommended,
    ...eslintPluginReact.configs.flat["jsx-runtime"],
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules,
    },
    settings: {
      react: { version: "detect" },
    },
  },

  // 6️⃣ Cuối cùng: Prettier
  eslintConfigPrettier,
);
