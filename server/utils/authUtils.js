export const generateCodeVerifier = (length) => {
    /**
     * Description: Generates a random code verifier string of a specified length.
     * Used in the Spotify PKCE authorization flow as a cryptographically secure random string.
     * 
     * ========== Parameters ===========
     * @param length - The length of the code verifier string to generate.
     * 
     * ========== Returns ============
     * @returns codeVerifier - A randomly generated string consisting of letters and digits.
     */
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

  
export const generateCodeChallenge = async (codeVerifier) => {
    /**
     * Description: Generates a SHA-256 code challenge from a given code verifier.
     * Used in the Spotify PKCE authorization flow to create a secure code challenge.
     * 
     * ========== Parameters ===========
     * @param codeVerifier - The random string used as the code verifier.
     * 
     * ========== Returns ============
     * @returns codeChallenge - A base64-url-encoded SHA-256 hash of the code verifier.
     */
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Buffer.from(digest)
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
}
