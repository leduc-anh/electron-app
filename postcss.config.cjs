/* eslint-disable @typescript-eslint/no-require-imports */
module.exports = {
  plugins: [
    require("postcss-nesting"), // ✅ Đặt TRƯỚC tailwindcss
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
