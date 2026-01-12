/* ========= Charts ========= */

export interface OhlcvPoint {
  time: number; // unix ms
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
