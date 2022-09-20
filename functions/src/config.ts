import { ConnectionOptions, Connection, getConnection, createConnection } from 'typeorm';

// Will be true on deployed functions
export const prod = process.env.NODE_ENV === 'production';

export const config: ConnectionOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root', // review
  password: 'root', // review
  database: 'development',
  synchronize: true,
  logging: false,
  entities: [
     'lib/entity/**/*.js'
  ],

  // Production Mode
  // ...(prod && {
  //     database: 'production',
  //     logging: false,
  //     // synchronize: false,
  //     extra: {
  //         socketPath: '/cloudsql/hug-functions:asia-southeast1:hug-tracking-data' // change
  //     },
  // })
}
// export const connection = createConnection(config);

export const connect = async () => {

  let connection: Connection;

  try {
    connection = getConnection(config.name)
    console.log(connection)
  } catch(err) {
    connection = await createConnection(config);
  }

  return connection;
}