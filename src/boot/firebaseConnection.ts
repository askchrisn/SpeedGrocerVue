import { init, auth  } from '../services/base'

export const app = init();
export const auths = auth();

export default async () => {
    console.log('FIRING DB CONNECTION');

  const app = init();
  const auths = auth();

  // Validation that our service structure is working
  // with an initialize Firebase application and auth instance.
  console.log('Firebase App Instantiation:', app)
  console.log('Firebase Auth Module:', auths)
}