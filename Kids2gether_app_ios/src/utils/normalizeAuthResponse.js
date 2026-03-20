export const normalizeAuthResponse = (data = {}, fallback = {}) => {
  const root = data || {};
  const nested = root.data || {};
  const user = root.user || nested.user || {};

  const token =
    root.token ||
    root.jwt ||
    nested.token ||
    nested.jwt ||
    null;

  const userId =
    root.user_id ||
    nested.user_id ||
    user.ID ||
    user.id ||
    null;

  const userEmail =
    root.user_email ||
    user.user_email ||
    user.email ||
    root.email ||
    null;

  const userDisplayName =
    root.user_display_name ||
    user.display_name ||
    root.display_name ||
    fallback.display_name ||
    null;

  const userNicename =
    root.user_nicename ||
    user.user_nicename ||
    user.nicename ||
    null;

  const tokenExpires =
    root.token_expires ||
    root.expires ||
    nested.expires ||
    nested.exp ||
    root.exp ||
    null;

  const refreshToken = root.refresh_token || nested.refresh_token || null;

  return {
    token,
    user_id: userId ? String(userId) : null,
    user_email: userEmail,
    user_display_name: userDisplayName,
    user_nicename: userNicename,
    membership: root.membership ?? false,
    token_expires: tokenExpires,
    refresh_token: refreshToken,
  };
};
