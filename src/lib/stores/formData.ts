import { writable } from 'svelte/store';

function formDataStore() {
	const { subscribe, set, update } = writable({});

	return {
		subscribe,
		update: (payload) => update(payload),
		reset: () => set({})
	};
}

export const formData = formDataStore();