export interface Bet {
  id: string;
  sport: string;
  league: string;
  date: string;
  stake: number;
  amount: number;
  odds: number;
  type: string;
  result: 'win' | 'loss' | 'pending';
  description: string;
}

export interface BettingStats {
  totalBets: number;
  winCount: number;
  lossCount: number;
  totalStaked: number;
  totalReturns: number;
  profitLoss: number;
  winRate: number;
  bank: number;
}

export interface User {
  email: string;
  password: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}