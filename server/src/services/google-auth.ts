import { OAuth2Client } from 'google-auth-library';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

if (!GOOGLE_CLIENT_ID) {
  console.warn('⚠️ GOOGLE_CLIENT_ID not set in .env - Google authentication will fail');
}

const client = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null;

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export const verifyGoogleToken = async (idToken: string): Promise<GoogleUser> => {
  if (!client) {
    throw new Error('Google OAuth client not initialized. Set GOOGLE_CLIENT_ID in .env');
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Invalid token payload');
    }

    return {
      id: payload.sub,
      email: payload.email || '',
      name: payload.name || '',
      picture: payload.picture
    };
  } catch (error) {
    console.error('Google token verification failed:', error);
    throw new Error('Invalid Google token');
  }
};
