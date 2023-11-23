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

See https://github.com/sveltejs/kit/issues/4292 for more details.

## D1 Optional (WIP)

If you want to test D1.

- `npx wrangler d1 execute TEST_D1 --local --file=./schema.sql`

Check that it is there
- `npx wrangler d1 execute TEST_D1 --local --command="SELECT * FROM Customers"`

This creates a db in `./wranger/state/v3/d1/miniflare-D1DatabaseObject`

Run the app as per about and try `http://localhost:5173/api/d1`
You will get
```
Error: D1_ERROR: no such table: Customers
```

This is because minfilare stores it's data in `.mf/d1/miniflare-D1DatabaseObject`

But if you run 
`http://localhost:5173/api/d1/setup` it will create the db for you for runtime.

Now I need to figure out how to specify the path for 
If you do this
```
npx wrangler d1 execute TEST_D1 --local --command="SELECT * FROM Customers" --persist-to="./.mf/"
```

You end up with local paths: `.mf/d1/v3/d1/miniflare-D1DatabaseObject`

So if you can aline wrangler with minfilare to use the same path, it will be great.
