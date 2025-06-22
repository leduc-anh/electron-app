import type { JSX as ReactJSX } from "react";

// Nối namespace JSX của React vào global
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace JSX {
    export interface Element extends ReactJSX.Element {}
    export interface ElementClass extends ReactJSX.ElementClass {}
    export interface IntrinsicElements extends ReactJSX.IntrinsicElements {}
  }
}
