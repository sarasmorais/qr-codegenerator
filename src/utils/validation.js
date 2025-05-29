export function validateInput(input) {
  if (!input.trim()) {
    return {
      isValid: false,
      error: 'Input cannot be empty.'
    };
  }

  // URL validation
  if (input.toLowerCase().startsWith('http://') || input.toLowerCase().startsWith('https://')) {
    try {
      new URL(input);
      return { isValid: true, error: null };
    } catch (err) {
      return {
        isValid: false,
        error: 'Invalid URL format. Please check your input.'
      };
    }
  }

  // For non-URL inputs, check length (QR has capacity limits)
  if (input.length > 2000) {
    return {
      isValid: false,
      error: 'Input is too long. Maximum 2000 characters allowed.'
    };
  }

  return { isValid: true, error: null };
}