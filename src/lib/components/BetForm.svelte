<script lang="ts">
  import { bets, bank } from '../store';
  import type { Bet } from '../types';

  let newBet: Partial<Bet> = {
    sport: '',
    league: '',
    date: new Date().toISOString().split('T')[0],
    stake: 1,
    amount: 0,
    odds: 0,
    type: 'moneyline',
    result: 'pending',
    description: ''
  };

  $: newBet.amount = ($bank * (newBet.stake || 0)) / 100;

  function handleSubmit() {
    bets.update(currentBets => [
      ...currentBets,
      {
        ...newBet,
        id: crypto.randomUUID()
      } as Bet
    ]);

    newBet = {
      sport: '',
      league: '',
      date: new Date().toISOString().split('T')[0],
      stake: 1,
      amount: 0,
      odds: 0,
      type: 'moneyline',
      result: 'pending',
      description: ''
    };
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4 bg-white p-6 rounded-lg shadow">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">Sport</label>
      <input
        type="text"
        bind:value={newBet.sport}
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">League</label>
      <input
        type="text"
        bind:value={newBet.league}
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Date</label>
      <input
        type="date"
        bind:value={newBet.date}
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Stake (%)</label>
      <input
        type="number"
        bind:value={newBet.stake}
        min="0.1"
        max="100"
        step="0.1"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Amount (Auto-calculated)</label>
      <input
        type="number"
        value={newBet.amount.toFixed(2)}
        disabled
        class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Odds</label>
      <input
        type="number"
        bind:value={newBet.odds}
        min="1"
        step="0.01"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Type</label>
      <select
        bind:value={newBet.type}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="moneyline">Moneyline</option>
        <option value="spread">Spread</option>
        <option value="over/under">Over/Under</option>
        <option value="parlay">Parlay</option>
      </select>
    </div>
  </div>

  <div>
    <label class="block text-sm font-medium text-gray-700">Description</label>
    <textarea
      bind:value={newBet.description}
      rows="2"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    ></textarea>
  </div>

  <button
    type="submit"
    class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    Add Bet
  </button>
</form>