/// <reference types="expo" />

declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module 'expo-router/entry' {
  import { ReactElement } from 'react';
  const Entry: () => ReactElement;
  export default Entry;
}

// Global alert function (React Native global)
declare function alert(message: string): void;