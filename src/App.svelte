<script lang="ts">
  import { auth } from './lib/store';
  import BetForm from './lib/components/BetForm.svelte';
  import BetList from './lib/components/BetList.svelte';
  import Stats from './lib/components/Stats.svelte';
  import StatsPage from './lib/components/Statistics/StatsPage.svelte';
  import AuthTabs from './lib/components/Auth/AuthTabs.svelte';
  import LoginForm from './lib/components/Auth/LoginForm.svelte';
  import RegisterForm from './lib/components/Auth/RegisterForm.svelte';

  let activeTab: 'dashboard' | 'statistics' = 'dashboard';

  function handleLogout() {
    auth.set({
      user: null,
      isAuthenticated: false
    });
  }
</script>

{#if $auth.isAuthenticated}
  <main class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex space-x-8">
              <button
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
                {activeTab === 'dashboard' 
                  ? 'border-blue-500 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
                on:click={() => activeTab = 'dashboard'}
              >
                Dashboard
              </button>
              <button
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
                {activeTab === 'statistics' 
                  ? 'border-blue-500 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
                on:click={() => activeTab = 'statistics'}
              >
                Statistics
              </button>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-600">Welcome, {$auth.user?.name}</span>
            <button
              on:click={handleLogout}
              class="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {#if activeTab === 'dashboard'}
        <div class="space-y-8">
          <h1 class="text-3xl font-bold text-gray-900">Sports Betting Tracker</h1>
          
          <Stats />
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">Add New Bet</h2>
              <BetForm />
            </div>
            
            <div>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">Betting History</h2>
              <BetList />
            </div>
          </div>
        </div>
      {:else}
        <div class="space-y-8">
          <h1 class="text-3xl font-bold text-gray-900">Statistics</h1>
          <StatsPage />
        </div>
      {/if}
    </div>
  </main>
{:else}
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">Sports Betting Tracker</h1>
      
      <AuthTabs>
        <LoginForm slot="login" />
        <RegisterForm slot="register" />
      </AuthTabs>
    </div>
  </div>
{/if}