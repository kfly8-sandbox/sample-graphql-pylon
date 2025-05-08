import '@getcronit/pylon'

declare module '@getcronit/pylon' {
  interface Bindings {
    DATABASE_URL: string
    APP_ENV: string
  }

  interface Variables {}
}
