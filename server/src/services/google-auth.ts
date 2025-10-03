import { OAuth2Client } from 'google-auth-library';

const USE_MOCK = process.env.USE_MOCK === 'true';

// PASTE YOUR GOOGLE_CLIENT_ID in .env file
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

let client: OAuth2Client | null = null;

if (!USE_MOCK && GOOGLE_CLIENT_ID) {
  client = new OAuth2Client(GOOGLE_CLIENT_ID);
}

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export const verifyGoogleToken = async (idToken: string): Promise<GoogleUser> => {
  // Mock mode: accept any token and return mock user
  if (USE_MOCK) {
    console.log('🎭 MOCK: Accepting Google token without verification');
    return {
      id: `mock_${Date.now()}`,
      email: 'demo@anandayojan.com',
      name: 'Demo User',
      picture: 'https://via.placeholder.com/150'
    };
  }

  // Real mode: verify with Google
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
