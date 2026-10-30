import type { WordToken } from "./types";

export function normalizeOrder(tokens: readonly WordToken[], order: readonly string[]) {
  const available = new Set(tokens.map((token) => token.id));
  const seen = new Set<string>();
  return order.filter((id) => {
    if (!available.has(id) || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

export function insertToken(order: readonly string[], tokenId: string, index: number) {
  const result = order.filter((id) => id !== tokenId);
  const position = Number.isFinite(index) ? Math.max(0, Math.min(result.length, Math.trunc(index))) : result.length;
  result.splice(position, 0, tokenId);
  return result;
}

export function moveToken(order: readonly string[], tokenId: string, direction: -1 | 1) {
  const position = order.indexOf(tokenId);
  return position === -1 ? [...order] : insertToken(order, tokenId, position + direction);
}

export function isCorrectOrder(tokens: readonly WordToken[], order: readonly string[], correctOrder: readonly string[]) {
  if (!tokens.length || order.length !== tokens.length || correctOrder.length !== tokens.length) return false;
  if (normalizeOrder(tokens, order).length !== tokens.length || normalizeOrder(tokens, correctOrder).length !== tokens.length) return false;
  const words = new Map(tokens.map((token) => [token.id, token.text]));
  // Identical words may trade IDs without changing a correct sentence.
  return order.every((id, index) => words.get(id) === words.get(correctOrder[index]));
}
