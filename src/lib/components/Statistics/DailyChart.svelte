<script lang="ts">
  import { Line } from 'svelte-chartjs';
  import { format, parseISO } from 'date-fns';
  import type { Bet } from '../../types';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from 'chart.js';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

  export let bets: Bet[];

  $: dailyProfitLoss = calculateDailyProfitLoss(bets);
  $: chartData = {
    labels: dailyProfitLoss.map(d => d.date),
    datasets: [
      {
        label: 'Daily Profit/Loss',
        data: dailyProfitLoss.map(d => d.profitLoss),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        backgroundColor: dailyProfitLoss.map(d => 
          d.profitLoss >= 0 ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)'
        ),
      }
    ]
  };

  $: chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Profit/Loss'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: number) {
            return '$' + value.toFixed(2);
          }
        }
      }
    }
  };

  function calculateDailyProfitLoss(bets: Bet[]) {
    const dailyMap = new Map<string, number>();

    bets.forEach(bet => {
      const date = format(parseISO(bet.date), 'yyyy-MM-dd');
      const profitLoss = bet.result === 'win' 
        ? bet.amount * bet.odds - bet.amount
        : bet.result === 'loss' ? -bet.amount : 0;

      const current = dailyMap.get(date) || 0;
      dailyMap.set(date, current + profitLoss);
    });

    return Array.from(dailyMap.entries())
      .map(([date, profitLoss]) => ({ date, profitLoss }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }
</script>

<div class="bg-white p-6 rounded-lg shadow-lg">
  <div class="h-[400px]">
    <Line data={chartData} options={chartOptions} />
  </div>
</div>