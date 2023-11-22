// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
        interface Platform {
          env: {
            TEST_KV: KVNamespace;
          };
          context: {
            waitUntil(promise: Promise<any>): void;
          };
          caches: CacheStorage & { default: Cache }
        }
    }
}

export {};
