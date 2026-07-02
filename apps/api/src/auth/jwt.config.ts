const DEVELOPMENT_JWT_SECRET = 'flexisys_development_jwt_secret_change_me';

export const JWT_ACCESS_TOKEN_EXPIRES_IN = '1d';
export const JWT_MOBILE_TOKEN_EXPIRES_IN = '12h';

export function getJwtSecret(): string {
  const configuredSecret = process.env.JWT_SECRET?.trim();

  if (configuredSecret) {
    return configuredSecret;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET must be configured in production');
  }

  return DEVELOPMENT_JWT_SECRET;
}
