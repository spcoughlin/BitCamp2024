export async function get(url) {
    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(url, request);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function post(url, data) {
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(url, request);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getBets() {
    return get(process.env.REACT_APP_API_URL + '/bets');
}