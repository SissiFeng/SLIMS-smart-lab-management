// styles/theme.ts

export const colors = {
    primary: '#144E5A',    // 深青色
    secondary: '#C07D53',  // 棕色
    accent: '#FFDE6D',     // 浅黄色
    dark: '#1C2520',       // 深灰近黑色
    white: '#FFFFFF',
    background: '#F5F7F6',
    text: {
      primary: '#1C2520',
      secondary: '#144E5A',
      light: '#FFFFFF'
    }
  };
  
  export const theme = {
    token: {
      colorPrimary: colors.primary,
      colorSecondary: colors.secondary,
      colorAccent: colors.accent,
      colorText: colors.text.primary,
      colorTextSecondary: colors.text.secondary,
      colorBgContainer: colors.white,
      colorBgLayout: colors.background,
    },
    components: {
      Button: {
        primaryColor: colors.primary,
        defaultBorderColor: colors.primary,
        defaultColor: colors.primary,
        borderRadius: 4,
      },
      Card: {
        headerBg: colors.white,
        borderRadius: 8,
      },
      Menu: {
        darkItemColor: colors.white,
        darkItemBg: colors.primary,
        darkSubMenuItemBg: colors.primary,
      },
    },
  };