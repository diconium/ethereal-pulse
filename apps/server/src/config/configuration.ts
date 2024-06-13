export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    uri: process.env.DATABASE_URI || '',
  },
  ethereal: {
    username: process.env.ETHEREAL_USERNAME,
    password: process.env.ETHEREAL_PASSWORD,
  },
});
