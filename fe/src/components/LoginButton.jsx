const LoginButton = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const googleClientId =
    "939075084742-dn7f15nqs1s4pa1ql7igqhsiciel7d41.apps.googleusercontent.com";
  const redirectUri = "http://localhost:5173/loginfinished";
  const scope = "openid%20profile%20email";
  const prompt = "consent";

  const googleUrl = `${rootUrl}?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&prompt=${prompt}`;
  
  return <a href={googleUrl}>Login with Google</a>;
};

export default LoginButton;
