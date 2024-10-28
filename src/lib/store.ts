import { writable, derived } from 'svelte/store';
import type { Bet, BettingStats, AuthState, User } from './types';

// Auth store
const storedAuth = localStorage.getItem('auth');
const initialAuth: AuthState = storedAuth 
  ? JSON.parse(storedAuth)
  : { user: null, isAuthenticated: false };

export const auth = writable<AuthState>(initialAuth);

auth.subscribe(value => {
  localStorage.setItem('auth', JSON.stringify(value));
});

// Load bets and bank from localStorage
const storedBets = localStorage.getItem('bets');
const storedBank = localStorage.getItem('bank');
const initialBets: Bet[] = storedBets ? JSON.parse(storedBets) : [];
const initialBank: number = storedBank ? parseFloat(storedBank) : 1000;

export const bets = writable<Bet[]>(initialBets);
export const bank = writable<number>(initialBank);

// Subscribe to changes and update localStorage
bets.subscribe(value => {
  localStorage.setItem('bets', JSON.stringify(value));
});

bank.subscribe(value => {
  localStorage.setItem('bank', value.toString());
});

export function calculateStats(bets: Bet[], currentBank: number): BettingStats {
  const stats: BettingStats = {
    totalBets: bets.length,
    winCount: bets.filter(bet => bet.result === 'win').length,
    lossCount: bets.filter(bet => bet.result === 'loss').length,
    totalStaked: bets.reduce((acc, bet) => acc + bet.amount, 0),
    totalReturns: bets.reduce((acc, bet) => {
      if (bet.result === 'win') {
        return acc + (bet.amount * bet.odds);
      }
      return acc;
    }, 0),
    profitLoss: 0,
    winRate: 0,
    bank: currentBank
  };

  stats.profitLoss = stats.totalReturns - stats.totalStaked;
  stats.winRate = stats.totalBets > 0 ? (stats.winCount / stats.totalBets) * 100 : 0;

  return stats;
}