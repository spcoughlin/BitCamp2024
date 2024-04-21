export async function getBets() {
    //set access control allow origin header
    const response = await fetch('http://bitcamp.alecagayan.com/api', {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}