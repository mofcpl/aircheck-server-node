import * as dotenv from 'dotenv'

export function loadAndCheckEnvironements(): {uri: string, user: string, password: string} {
    const path = './.env.' + process.env.NODE_ENV
    
    const result = dotenv.config({ path })
    
    if (result.error) {
        console.error('Error while loading environment files: ' + result.error);
        process.exit(1)
    }
    else if (!process.env.DATABASE_URI) {
        console.error('Missing environement DATABASE_URI');
        process.exit(1)
    }
    else if (!process.env.DATABASE_USER) {
        console.error('Missing environement DATABASE_USER');
        process.exit(1)
    }
    else if (!process.env.DATABASE_PASSWORD) {
        console.error('Missing environement DATABASE_PASSWORD');
        process.exit(1)
    }
    else return {
        uri: process.env.DATABASE_URI, 
        user: process.env.DATABASE_USER, 
        password: process.env.DATABASE_PASSWORD
    }
}