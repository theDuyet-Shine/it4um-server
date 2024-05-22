const otpStore = new Map();

export const storeOtp = (email, otp) => {
  otpStore.set(email, { otp, validated: false, timestamp: Date.now() });
};

export const getOtp = (email) => {
  return otpStore.get(email);
};

export const validateOtp = (email) => {
  const otpData = otpStore.get(email);
  if (otpData) {
    otpData.validated = true;
    otpStore.set(email, otpData);
  }
};

export const isOtpValidated = (email) => {
  const otpData = otpStore.get(email);
  return otpData && otpData.validated;
};

export const deleteOtp = (email) => {
  otpStore.delete(email);
};
