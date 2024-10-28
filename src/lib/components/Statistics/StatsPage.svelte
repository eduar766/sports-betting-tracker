<script lang="ts">
  import { bets, bank } from '../../store';
  import DailyChart from './DailyChart.svelte';
  import { format, parseISO } from 'date-fns';

  $: completedBets = $bets.filter(bet => bet.result !== 'pending');
  $: totalBets = completedBets.length;
  $: winningBets = completedBets.filter(bet => bet.result === 'win').length;
  $: winRate = totalBets > 0 ? (winningBets / totalBets * 100).toFixed(1) : '0';
  
  $: profitLoss = completedBets.reduce((acc, bet) => {
    if (bet.result === 'win') {
      return acc + (bet.amount * bet.odds - bet.amount);
    } else if (bet.result === 'loss') {
      return acc - bet.amount;
    }
    return acc;
  }, 0);

  $: roi = totalBets > 0 
    ? (profitLoss / completedBets.reduce((acc, bet) => acc + bet.amount, 0) * 100).toFixed(1)
    : '0';
</script>

<div class="space-y-6">
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="bg-white p-4 rounded-lg shadow">
      <h3 class="text-lg font-medium text-gray-900">Total Bets</h3>
      <p class="mt-2 text-3xl font-bold text-gray-900">{totalBets}</p>
    </div>

    <div class="bg-white p-4 rounded-lg shadow">
      <h3 class="text-lg font-medium text-gray-900">Win Rate</h3>
      <p class="mt-2 text-3xl font-bold text-gray-900">{winRate}%</p>
    </div>

    <div class="bg-white p-4 rounded-lg shadow">
      <h3 class="text-lg font-medium text-gray-900">Profit/Loss</h3>
      <p class="mt-2 text-3xl font-bold" class:text-green-600={profitLoss > 0} class:text-red-600={profitLoss < 0}>
        ${profitLoss.toFixed(2)}
      </p>
    </div>

    <div class="bg-white p-4 rounded-lg shadow">
      <h3 class="text-lg font-medium text-gray-900">ROI</h3>
      <p class="mt-2 text-3xl font-bold" class:text-green-600={parseFloat(roi) > 0} class:text-red-600={parseFloat(roi) < 0}>
        {roi}%
      </p>
    </div>
  </div>

  <DailyChart {bets} />

  <div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-lg font-medium text-gray-900 mb-4">Recent Bets</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sport</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stake</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P/L</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each $bets.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10) as bet}
            {@const profitLoss = bet.result === 'win' 
              ? bet.amount * bet.odds - bet.amount 
              : bet.result === 'loss' ? -bet.amount : 0}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {format(parseISO(bet.date), 'MMM d, yyyy')}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {bet.sport}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {bet.stake}%
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${bet.amount.toFixed(2)}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  {bet.result === 'win' ? 'bg-green-100 text-green-800' : 
                   bet.result === 'loss' ? 'bg-red-100 text-red-800' : 
                   'bg-yellow-100 text-yellow-800'}">
                  {bet.result}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm" 
                class:text-green-600={profitLoss > 0} 
                class:text-red-600={profitLoss < 0}>
                ${profitLoss.toFixed(2)}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>