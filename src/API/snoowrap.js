const snoowrap = require("snoowrap");

const r = new snoowrap({
  userAgent: process.env.REACT_APP_USER_AGENT,
  clientId: process.env.REACT_APP_APP_ID,
  clientSecret: process.env.REACT_APP_APP_SECRET,
  username: process.env.REACT_APP_USERNAME,
  password: process.env.REACT_APP_PASSWORD,
});

export default r