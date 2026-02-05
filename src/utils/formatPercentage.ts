export const calculatePercentage = (value: number, total: number): number =>
  total === 0 ? 0 : Math.round((value / total) * 100)

export const formatPercentage = (value: number, total: number): string =>
  `${calculatePercentage(value, total)}%`
