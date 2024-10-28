<script lang="ts">
  import { bets } from '../store';
  import type { Bet } from '../types';

  type BetResult = 'win' | 'loss' | 'pending';

  function updateBetResult(id: string, event: Event) {
    const select = event.target as HTMLSelectElement;
    const newResult = select.value as BetResult;
    
    bets.update(currentBets =>
      currentBets.map(bet =>
        bet.id === id ? { ...bet, result: newResult } : bet
      )
    );
  }

  function deleteBet(id: string) {
    bets.update(currentBets => currentBets.filter(bet => bet.id !== id));
  }
</script>

<div class="space-y-4">
  {#each $bets as bet (bet.id)}
    <div class="bg-white p-4 rounded-lg shadow">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-lg font-semibold">{bet.sport} - {bet.league}</h3>
          <p class="text-sm text-gray-600">{bet.date}</p>
          <p class="mt-1">{bet.description}</p>
          <div class="mt-2 space-x-2">
            <span class="text-sm font-medium">Stake: {bet.stake}%</span>
            <span class="text-sm font-medium">Amount: ${bet.amount.toFixed(2)}</span>
            <span class="text-sm font-medium">Odds: {bet.odds}</span>
            <span class="text-sm font-medium">Type: {bet.type}</span>
          </div>
        </div>
        <div class="space-x-2">
          <select
            bind:value={bet.result}
            on:change={(e) => updateBetResult(bet.id, e)}
            class="rounded border-gray-300 text-sm"
          >
            <option value="pending">Pending</option>
            <option value="win">Win</option>
            <option value="loss">Loss</option>
          </select>
          <button
            on:click={() => deleteBet(bet.id)}
            class="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  {/each}
</div>