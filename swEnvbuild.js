import dotenv from 'dotenv';
import fs from 'fs'


dotenv.config();
fs.writeFileSync('./public/swenv.js',
`
const process = {
  env: {
    FB_API_KEY: '${process.env.REACT_APP_FIREBASE_API_KEY}',
  }
}
`);