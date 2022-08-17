module.exports = `postgresql://${process.env.DEVELOPMENT_USER}` 
+ `:${process.env.DEVELOPMENT_PASSWORD}`
+ `@${process.env.DEVELOPMENT_HOST}`
+ `:${process.env.DEVELOPMENT_PORT}`
+ `/${process.env.DEVELOPMENT_DATABASE}`;