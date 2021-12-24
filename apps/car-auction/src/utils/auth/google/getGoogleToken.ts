import axios from 'axios'
import querystring from 'querystring'
export const getTokens = async ({ code, clientId, clientSecret, redirect_Uri, }: { code: string; clientId: string; clientSecret: string; redirect_Uri: string; }):
  Promise<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    id_token: string;
  }> => {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirect_Uri,
    grant_type: "authorization_code",
  };
  return axios
    .post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(dat => dat.data)
    .catch(e => e)
}