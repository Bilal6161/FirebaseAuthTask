<script>
  import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
  import { auth } from "../stores/store";

  const signUp = async () => {
    const res = await createUserWithEmailAndPassword($auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  let email = "";
  let password = "";

  const logout = async () => {
    const res = await signOut($auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

</script>

<div class="card-title text-2xl font-bold">SignUp Here</div>
<label class="form-control">
  <label for="email" class="form-label">Email</label>
  <input type="text" class="input input-sm input-bordered" bind:value={email} />
</label>

<label class="form-control">
  <label for="password" class="form-label">Password</label>
  <input
    type="password"
    class="input input-sm input-bordered"
    bind:value={password}
  />
</label>
{#if $auth}
  <label class="card-actions">
    <button on:click={logout}>Logout</button>
  </label>
{:else}
  <label class="card-actions">
    <button on:click={signUp}>SignUp</button>
  </label>
{/if}
