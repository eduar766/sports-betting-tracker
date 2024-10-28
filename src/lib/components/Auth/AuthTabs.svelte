<script lang="ts">
  let activeTab: 'login' | 'register' = 'login';
</script>

<div class="max-w-md mx-auto mt-8">
  <div class="flex border-b border-gray-200 mb-4">
    <button
      class="flex-1 py-2 px-4 text-center {activeTab === 'login' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}"
      on:click={() => activeTab = 'login'}
    >
      Login
    </button>
    <button
      class="flex-1 py-2 px-4 text-center {activeTab === 'register' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}"
      on:click={() => activeTab = 'register'}
    >
      Register
    </button>
  </div>

  {#if activeTab === 'login'}
    <slot name="login" />
  {:else}
    <slot name="register" />
  {/if}
</div>