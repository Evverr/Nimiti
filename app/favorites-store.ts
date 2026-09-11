'use client';

import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'nimiti-favorites';
const CHANGE_EVENT = 'nimiti-favorites-change';
let memorySnapshot = '[]';

export function readFavoritesSnapshot(): string {
  if (typeof window === 'undefined') return '[]';
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? '[]';
  } catch {
    return memorySnapshot;
  }
}

export function parseFavoriteIds(snapshot: string): number[] {
  try {
    const value: unknown = JSON.parse(snapshot);
    return Array.isArray(value) ? [...new Set(value.filter((id): id is number => Number.isInteger(id) && id > 0 && id <= 18))] : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(id: number) {
  if (typeof window === 'undefined' || !Number.isInteger(id) || id < 1 || id > 18) return;
  const ids = parseFavoriteIds(readFavoritesSnapshot());
  memorySnapshot = JSON.stringify(ids.includes(id) ? ids.filter((savedId) => savedId !== id) : [...ids, id]);
  try {
    window.localStorage.setItem(STORAGE_KEY, memorySnapshot);
  } catch {
    // Keep the selection usable for this session when browser storage is unavailable.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onStorage);
  };
}

export function useFavorites() {
  const snapshot = useSyncExternalStore(subscribe, readFavoritesSnapshot, () => '[]');
  return { favoriteIds: parseFavoriteIds(snapshot), toggleFavorite };
}
