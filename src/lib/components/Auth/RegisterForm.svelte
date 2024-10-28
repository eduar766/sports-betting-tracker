<script lang="ts">
  import type { User } from '../../types';
  
  let email = '';
  let password = '';
  let name = '';
  let error = '';
  let success = '';

  function handleRegister() {
    const storedUsers = localStorage.getItem('users');
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
    
    if (users.some(u => u.email === email)) {
      error = 'Email already registered';
      success = '';
      return;
    }

    const newUser: User = {
      email,
      password,
      name
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    error = '';
    success = 'Registration successful! You can now login.';
    email = '';
    password = '';
    name = '';
  }
</script>

<form on:submit|preventDefault={handleRegister} class="space-y-4 bg-white p-6 rounded-lg shadow max-w-md mx-auto">
  <h2 class="text-2xl font-bold text-center text-gray-900 mb-6">Register</h2>
  
  {#if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {error}
    </div>
  {/if}

  {#if success}
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
      {success}
    </div>
  {/if}

  <div>
    <label class="block text-sm font-medium text-gray-700">Name</label>
    <input
      type="text"
      bind:value={name}
      required
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
  </div>

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
      minlength="6"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
  </div>

  <button
    type="submit"
    class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    Register
  </button>
</form>