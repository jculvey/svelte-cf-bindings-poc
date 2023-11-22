import type * as Kit from "@sveltejs/kit";

export const load: Kit.Load = async ({ platform }) => {
  const testKvVal = await platform?.env.TEST_KV.get("TEST_KEY");

  return { TEST: "TEST", kv: testKvVal };
};
