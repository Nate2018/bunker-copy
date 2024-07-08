export async function openStore(store: string): Promise<Object | undefined> {

    try {   
        const response = await fetch(store);
        const code = await response.text();
        const blob = new Blob([code], { type: 'application/json' });

        const storeInfo = JSON.parse(await blob.text());
        return storeInfo
    } catch (error) {
        console.log(error)
    }
}