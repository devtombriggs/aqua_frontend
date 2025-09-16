'use client';
import { useEffect, useState } from "react";

type Sensormessage = { id: number; message: string, createdAt: string };

export default function get_request() {
    const [data, setData] = useState<Sensormessage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/api/messages')
        .then(res => res.json())
        .then(setData)
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>loading...</p>

    return(
        <main style={{ padding: 24 }}>
            <h1>Aquaponics</h1>
            <ul>
                {data.map(m => (
                    <li key={m.id}>
                        <strong>{m.message}</strong><em>({new Date(m.createdAt).toLocaleString()})</em>
                    </li>
                ))}
            </ul>
        </main>
    );
}