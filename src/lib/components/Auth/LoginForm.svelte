<script lang="ts">
  import { auth } from '../../store';
  import type { User } from '../../types';
  
  let email = '';
  let password = '';
  let error = '';

  function handleLogin() {
    const storedUsers = localStorage.getItem('users');
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      auth.set({
        user,
        isAuthenticated: true
      });
      error = '';
    } else {
      error = 'Invalid email or password';
    }
  }
</script>

<form on:submit|preventDefault={handleLogin} class="space-y-4 bg-white p-6 rounded-lg shadow max-w-md mx-auto">
  <h2 class="text-2xl font-bold text-center text-gray-900 mb-6">Login</h2>
  
  {#if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {error}
    </div>
  {/if}

  <div>
    <label class="block text-sm font-medium text-gray-700">Email</label>
    <input
      type="email"
      bind:value={email}
      required
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
  </div>

  <div>
    <label class="block text-sm font-medium text-gray-700">Password</label>
    <input
      type="password"
      bind:value={password}
      required
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
  </div>

  <button
    type="submit"
    class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    Login
  </button>
</form>