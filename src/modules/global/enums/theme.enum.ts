export enum Theme {
  DARK = 'DARK',
  LIGHT = 'LIGHT'
}

export const themes = {
  DARK: {
    '--text-color': '#FFFFFF',
    '--text-color-active': '#f1f1f1',
    '--primary-color': '#33474f',
    '--primary-color-hover': '#2c4048',
    '--secondary-color': '#506f7a',
    '--secondary-color-hover': '#496772'
  },
  LIGHT: {
    '--text-color': '#33474f',
    '--text-color-active': '#2c4048',
    '--primary-color': '#506f7a',
    '--primary-color-hover': '#496772',
    '--secondary-color': '#ffffff',
    '--secondary-color-hover': '#f1f1f1'
  }
};
