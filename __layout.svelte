<script>
  import { GetFirebaseApp } from "../lib/firebase";
  import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
  } from "firebase/auth";
  import { auth, setLoginInfo } from "../stores/store";
  import { onMount } from "svelte";

  onMount(() => {
    $auth = getAuth(GetFirebaseApp());
  });

  // Authentication with Google
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    const res = await signInWithPopup($auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(credential)
        setLoginInfo(credential.idToken, result.user)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  // Authentication with Facebook
  const facebookProvider = new FacebookAuthProvider();
  const signInWithFacebook = async () => {
    const res = await signInWithPopup($auth, facebookProvider)
      .then((result) => {
        console.log('ok, ', result)
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        setLoginInfo(credential)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        console.log(error)
        // ...
      });
  };
</script>

<div class="flex">
  <a href="/">Home</a>
  <a href="/signIn">SignIn</a>
  <a href="/signUp">SignUp</a>
</div>

<slot />

<button on:click={signInWithGoogle}>Login with Google</button>
<button on:click={signInWithFacebook}>Login with Facebook</button>
