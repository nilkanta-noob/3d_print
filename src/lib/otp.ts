import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const OTP_EXPIRY_MINUTES = 10;
const JWT_EXPIRY_MINUTES = 30;

export async function createOtpForEmail(email: string): Promise<string> {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  const salt = await bcrypt.genSalt(10);
  const hashedOtp = await bcrypt.hash(otp, salt);
  
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + OTP_EXPIRY_MINUTES);

  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: hashedOtp,
      expires,
    },
  });

  return otp;
}

export async function verifyOtpForEmail(email: string, otp: string): Promise<boolean> {
  const tokens = await prisma.verificationToken.findMany({
    where: { identifier: email },
  });

  if (tokens.length === 0) return false;
  const record = tokens[0];

  if (new Date() > record.expires) {
    await prisma.verificationToken.delete({ where: { identifier_token: { identifier: record.identifier, token: record.token } } });
    return false;
  }

  const isValid = await bcrypt.compare(otp, record.token);

  if (isValid) {
    await prisma.verificationToken.delete({ where: { identifier_token: { identifier: record.identifier, token: record.token } } });
    return true;
  }
  return false;
}

export function generateQuoteJwt(email: string): string {
  const secret = process.env.JWT_SECRET || 'fallback_secret_please_change';
  return jwt.sign({ email, purpose: 'quote_submission' }, secret, {
    expiresIn: `${JWT_EXPIRY_MINUTES}m`,
  });
}

export function verifyQuoteJwt(token: string): { valid: boolean; email?: string } {
  const secret = process.env.JWT_SECRET || 'fallback_secret_please_change';
  try {
    const decoded = jwt.verify(token, secret) as { email: string; purpose: string };
    if (decoded.purpose === 'quote_submission') {
      return { valid: true, email: decoded.email };
    }
    return { valid: false };
  } catch {
    return { valid: false };
  }
}
