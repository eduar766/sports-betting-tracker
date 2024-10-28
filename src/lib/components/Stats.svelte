<script lang="ts">
  import { bets, bank } from '../store';
  import { calculateStats } from '../store';

  $: stats = calculateStats($bets, $bank);

  function updateBank(event: Event) {
    const input = event.target as HTMLInputElement;
    const newBank = parseFloat(input.value);
    if (!isNaN(newBank) && newBank > 0) {
      bank.set(newBank);
    }
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="bg-white p-4 rounded-lg shadow">
    <h3 class="text-lg font-semibold text-gray-900">Overview</h3>
    <div class="mt-2 space-y-2">
      <p>Total Bets: {stats.totalBets}</p>
      <p>Win Rate: {stats.winRate.toFixed(1)}%</p>
      <p>Wins: {stats.winCount}</p>
      <p>Losses: {stats.lossCount}</p>
    </div>
  </div>

  <div class="bg-white p-4 rounded-lg shadow">
    <h3 class="text-lg font-semibold text-gray-900">Financial</h3>
    <div class="mt-2 space-y-2">
      <div class="flex items-center space-x-2">
        <label class="text-sm font-medium text-gray-700">Bank:</label>
        <input
          type="number"
          value={stats.bank}
          on:change={updateBank}
          min="0"
          step="0.01"
          class="w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <p>Total Staked: ${stats.totalStaked.toFixed(2)}</p>
      <p>Total Returns: ${stats.totalReturns.toFixed(2)}</p>
      <p class:text-green-600={stats.profitLoss > 0} class:text-red-600={stats.profitLoss < 0}>
        Profit/Loss: ${stats.profitLoss.toFixed(2)}
      </p>
    </div>
  </div>
</div>