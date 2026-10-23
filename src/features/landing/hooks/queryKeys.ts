// Same window as the API's `Cache-Control: max-age=60`: asking sooner would only get the
// browser's cached copy back.
export const PUBLIC_BOARD_STALE_TIME_MS = 60_000

export const publicComplaintKeys = {
  all: ['publicComplaints'] as const,
  stats: () => [...publicComplaintKeys.all, 'stats'] as const,
  latest: (limit: number) =>
    [...publicComplaintKeys.all, 'latest', limit] as const,
}
