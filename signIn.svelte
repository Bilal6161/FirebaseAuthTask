<script>
    import { signInWithEmailAndPassword, signOut } from "firebase/auth";
    import {
        auth,
        loginInfo,
        removeLoginInfo,
        setLoginInfo,
    } from "../stores/store";

    const signIn = async () => {
        const res = await signInWithEmailAndPassword($auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                
                console.log("HEWRE::", userCredential);
                setLoginInfo(userCredential._tokenResponse.idToken, user);


                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    let email;
    let password;

    const logout = async () => {
        const res = await signOut($auth)
            .then(() => {
                removeLoginInfo();
            })
            .catch((error) => {
                // An error happened.
            });
    };
</script>

{$loginInfo.token ? 'Logged In as: ' + $loginInfo.user.displayName : ''}
<div class="card-title text-2xl font-bold">SignIn Here</div>
<label class="form-control">
    <label for="email" class="form-label">Email</label>
    <input
        type="text"
        class="input input-sm input-bordered"
        bind:value={email}
    />
</label>

<label class="form-control">
    <label for="password" class="form-label">Password</label>
    <input
        type="password"
        class="input input-sm input-bordered"
        bind:value={password}
    />
</label>

{#if $loginInfo.token}
    <label class="card-actions">
        <button on:click={logout}>Logout</button>
    </label>
{:else}
    <label class="card-actions">
        <button on:click={signIn}>SignIn</button>
    </label>
{/if}
