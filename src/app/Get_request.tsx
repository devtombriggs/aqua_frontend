'use client';

import { useEffect, useState } from 'react';

export default function GetRequest() {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<Error | null>(null);

  useEffect(() => {
    const url = `http://192.168.49.2:30009/api/messages`;
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch(setErr)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;
  if (err) return <p>Error: {err.message}</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
