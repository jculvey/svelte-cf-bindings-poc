## Instructions

- `pnpm install`
- `pnpm run dev`

Hit the API endpoint to confirm we can write to KV in dev:
- `curl -X POST http://localhost:5173/api/test`

Confirm that it works
- `curl -X POST http://localhost:5173/api/test`
- visit `http://localhost:5173/`

## Notes

The magic happens in `src/hooks.server.ts`. Svelte doesn't have adapter support in `dev`,
so this is a workaround to inject bindings into the platform object.

If you want to use `wrangler d1 execute TEST_D1 --local` and/or migrations then this is a good option for the miniflare contructor. (Miniflare defaults folder for persitence is `.mf/`)

```typescript
const mf = new Miniflare({
    kvNamespaces: ["TEST_KV"],
    kvPersist: ".wrangler/state/v3/kv",
    d1Databases: ["TEST_D1"],
    d1Persist: ".wrangler/state/v3/d1",
    modules: true,
    script: ""
  });
```

See https://github.com/sveltejs/kit/issues/4292 for more details.

## D1 Optional (WIP)

If you want to test D1.

- `npx wrangler d1 execute TEST_D1 --local --file=./schema.sql`

Check that it is there
- `npx wrangler d1 execute TEST_D1 --local --command="SELECT * FROM Customers"`

Wranger creates a db in `./wranger/state/v3/d1/miniflare-D1DatabaseObject`

You can try `--persist-to=` but wrangler still adds the `v3/d1` part. So it's easier to modify miniflare persistence paths.

Run the app as per about and try `http://localhost:5173/api/d1`

