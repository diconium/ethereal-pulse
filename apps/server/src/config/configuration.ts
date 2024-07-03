export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    uri: process.env.DATABASE_URI ?? '',
  },
  ethereal: {
    username: process.env.ETHEREAL_USERNAME,
    password: process.env.ETHEREAL_PASSWORD,
  },
  providers: {
    aws: {
      region: process.env.AWS_CFG_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    azure: {
      connectionString: process.env.AZURE_CONNECTION_STRING,
    },
    common: {
      cloudProviderName: process.env.CLOUD_PROVIDER_NAME,
    },
  },
});
