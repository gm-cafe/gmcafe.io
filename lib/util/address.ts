export type Address = `0x${string}`;

export const isAddress = (s: string): s is Address => s.startsWith('0x');
