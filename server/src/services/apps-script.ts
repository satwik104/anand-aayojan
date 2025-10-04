// Google Sheets integration disabled
// This functionality has been removed. Integrate a proper database instead.

export const forwardToAppsScript = async (
  action: 'create' | 'cancel' | 'feedback' | 'contact' | 'partner',
  data: any
): Promise<any> => {
  // Apps Script integration disabled - no-op
  console.log('ℹ️ Apps Script integration disabled');
  console.log('Action:', action);
  console.log('Data:', JSON.stringify(data, null, 2));
  return { success: true, disabled: true };
};
