// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
        interface Platform {
          env: {
            TEST_KV: KVNamespace;
            TEST_D1: D1Namespace;
          };
          context: {
            waitUntil(promise: Promise<any>): void;
          };
          caches: CacheStorage & { default: Cache }
        }
    }
}

export {};
