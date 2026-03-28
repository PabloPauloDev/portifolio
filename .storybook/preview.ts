import type { Preview } from '@storybook/nextjs-vite'
import "@/styles/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "cream",
      values: [
        { name: "cream", value: "#FFFDF1" },
        { name: "rust", value: "#562F00" },
      ],
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo'
    }
  },
};

export default preview;