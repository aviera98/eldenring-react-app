export type FutureStoreSlice = 'ui' | 'session' | 'filters';

// Reserved integration point for future global stores that should coexist with React context.
export const STORE_BLUEPRINT: FutureStoreSlice[] = ['ui', 'session', 'filters'];
