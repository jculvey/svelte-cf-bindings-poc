import { dev } from "$app/environment";

let env = {};

if (dev) {
  /*
  We need to import miniflare here conditionally in dev since the esbuild which runs during
  `npm run build` won't be able to resolve `node:*` imports since they aren't marked as external.

  See the following for more info:
  - https://github.com/sveltejs/kit/issues/10732
  - https://github.com/sveltejs/kit/pull/10544
*/
  const { Miniflare } = await import("miniflare");

  const mf = new Miniflare({
    kvNamespaces: ["TEST_KV"],
    kvPersist: ".wrangler/state/v3/kv",
    d1Databases: ["TEST_D1"],
    d1Persist: ".wrangler/state/v3/d1",
    modules: true,
    script: ""
  });
  env = await mf.getBindings();
}

export const handle = async ({ event, resolve }) => {
  if (dev) {
    event.platform = {
      ...event.platform,
      env,
    };
  }

  return resolve(event);
};
