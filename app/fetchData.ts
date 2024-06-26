export default async function fetchData<T>(url: string): Promise<T | null> {
    try{
        const response = await fetch(url);

        if(!response.ok){
            throw new Error("Erro: "+ response.status);
        }

        const json = response.json();
        return json;

    }   catch(error) {
        return null;
    }
}