<script lang="ts">
  let savedValueKV = "";
  let readValueKV = "";
  let readValueD1: any = {};

  const onKvPost = async () => {
    savedValueKV = new Date().toISOString();
    const response = await fetch("/api/kv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: savedValueKV }),
    });
  };

  const onKvGet = async () => {
    const response = await fetch("/api/kv");
    const data = await response.json();
    readValueKV = data.kvResult;
  };

  const onD1Post = async () => {
    const response = await fetch("/api/d1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: new Date().getTime(),
      }),
    });
    if (response.ok) {
      const data = await response.json();
      readValueD1 = data.d1Result;
    } else {
      readValueD1 = { error: response.statusText };
    }
  };

  const onD1Get = async () => {
    const response = await fetch("/api/d1");
    if (response.ok) {
      const data = await response.json();
      readValueD1 = data;
    } else {
      readValueD1 = { error: response.statusText };
    }
  };

</script>

<h1>Welcome to SvelteKit with Cloudflare Pages "pnpm dev" local support</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the sveltekit
  documentation
</p>
<p>
  Visit <a href="https://developers.cloudflare.com/workers/"
    >developers.cloudflare.com/workers</a
  > to read the cloudflare workers documentation
</p>
<hr />
<h2>KV Testing (Should work)</h2>
<table>
  <tbody>
    <tr>
      <td>
        <button on:click={onKvPost}>Update KV with Date</button>
      </td>
      <td>
        <button on:click={onKvGet}>Get KV Value</button>
      </td>
    </tr>
    <tr>
      <td> You stored: </td>
      <td> You fetched: </td>
    </tr>
    <tr>
      <td>
        <p>{savedValueKV}</p>
      </td>
      <td>
        <p>{readValueKV}</p>
      </td>
    </tr>
  </tbody>
</table>
<hr />
<h2>D1 Testing (WIP)</h2>
<table>
  <tr>
    <td>
      <button on:click={onD1Post}>Write D1 Data</button>
      <button on:click={onD1Get}>Read D1 Data</button>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
        {JSON.stringify(readValueD1, null, 2)}
      </pre>
    </td>
  </tr>
</table>

<style>
  table {
    margin: auto;
  }
  td {
    padding: 10px;
  }

  button {
    padding: 10px;
    border-radius: 10px;
    width: 100%;
  }
</style>
