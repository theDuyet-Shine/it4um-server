const otpStore = new Map();
const OTP_EXPIRATION_TIME = 3 * 60 * 1000; // Thời gian hết hạn OTP là 3 phút (đơn vị là milliseconds)

export const storeOtp = (email, otp) => {
  otpStore.set(email, { otp, validated: false, timestamp: Date.now() });
};

export const getOtp = (email) => {
  const otpData = otpStore.get(email);
  if (otpData && Date.now() - otpData.timestamp < OTP_EXPIRATION_TIME) {
    return otpData;
  } else {
    otpStore.delete(email); // Xóa OTP nếu đã hết hạn
    return null;
  }
};

export const validateOtpInStore = (email) => {
  const otpData = getOtp(email);
  if (otpData) {
    otpData.validated = true;
    otpStore.set(email, otpData);
  }
};

export const isOtpValidated = (email) => {
  const otpData = getOtp(email);
  return otpData && otpData.validated;
};

export const deleteOtp = (email) => {
  otpStore.delete(email);
};
