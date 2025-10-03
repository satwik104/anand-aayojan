const USE_MOCK = process.env.USE_MOCK === 'true';

// PASTE YOUR APPS_SCRIPT_URL and APPS_SCRIPT_SECRET in .env file
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;
const APPS_SCRIPT_SECRET = process.env.APPS_SCRIPT_SECRET;

export const forwardToAppsScript = async (
  action: 'create' | 'cancel' | 'feedback' | 'contact' | 'partner',
  data: any
): Promise<any> => {
  // Mock mode: simulate success
  if (USE_MOCK) {
    console.log('🎭 MOCK: Would write to Apps Script');
    console.log('Action:', action);
    console.log('Data:', JSON.stringify(data, null, 2));
    return { success: true, mock: true };
  }

  // Real mode: forward to Apps Script
  if (!APPS_SCRIPT_URL || !APPS_SCRIPT_SECRET) {
    throw new Error('APPS_SCRIPT_URL or APPS_SCRIPT_SECRET not set in .env');
  }

  try {
    const url = `${APPS_SCRIPT_URL}?action=${action}&secret=${APPS_SCRIPT_SECRET}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Apps Script responded with ${response.status}`);
    }

    const result = await response.json();
    console.log('📝 Apps Script updated:', action);
    return result;
  } catch (error) {
    console.error('Apps Script forwarding failed:', error);
    throw new Error('Failed to update Google Sheet');
  }
};
