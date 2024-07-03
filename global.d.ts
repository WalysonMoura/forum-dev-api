declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string
      DATABASE_CLIENT: string
      DATABASE_URL: string
      JWT_PRIVATE_KEY: string
      JWT_PUBLIC_KEY: string
      CLOUDFLARE_ACCOUNT_ID: string
      AWS_BUCKET_NAME: string
      AWS_ACCESS_KEY_ID: string
      AWS_SECRET_ACCESS_KEY: string
      REDIS_HOST: string
      REDIS_PORT: string
      REDIS_DB: string
      PORT: string
    }
  }
}

export {}
