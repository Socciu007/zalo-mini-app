export function isValidPhoneNumber(phone: string): boolean {
  try {
    if (!phone) return false;
  
    // Remove all non-numeric characters and keep +
    const cleaned = phone.replace(/[^+\d]/g, '');
  
    // Regex for Vietnam phone number: 0x or +84x, total 10 digits
    const vietnamPhoneRegex = /^(0[2-9]\d{8}|(\+84)[2-9]\d{8})$/;
  
    // Regex for international phone number: starts with + and has 9 to 15 digits
    const internationalPhoneRegex = /^\+\d{9,15}$/;
  
    return vietnamPhoneRegex.test(cleaned) || internationalPhoneRegex.test(cleaned);
  } catch (error) {
    return false;
  }
}