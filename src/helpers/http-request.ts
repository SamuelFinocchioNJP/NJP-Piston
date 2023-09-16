import fetch from 'node-fetch';

export async function httpRequest(
    url: string,
    method: "GET" | "POST",
    body: { [key: string]: any } = {}
) {
    switch(method) {
        case "GET": {
            const request = await fetch(url);
            return await request.json();
        }

        case "POST": {
            const request = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            });

            return await request.json();
        }
    }
}   