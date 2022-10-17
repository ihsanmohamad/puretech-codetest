import { writable } from 'svelte/store';

function tableDataStore() {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
		update: (payload) => update((payload) => [...payload]),
		reset: () => set([])
	};
}

export const tablesData = tableDataStore();