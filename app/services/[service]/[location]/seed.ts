export function seededIndex(seed: string, length: number) {
  const hash = seed
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return hash % length;
}