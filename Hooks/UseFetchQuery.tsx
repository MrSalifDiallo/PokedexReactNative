import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { use } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
const endpoint="https://pokeapi.co/api/v2/";
export function UseFetchQuery(url: string) {
    /*const [data, setData] = React.useState<T | null>(null);
    const [error, setError] = React.useState<Error | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);    */
    return useQuery({
        queryKey: [url],
        queryFn: async () => {
            wait(1); // Simulate a delay
            // Fetch data from the API 
            return fetch(endpoint + url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
        },
        refetchOnWindowFocus: false,
        retry: 1,
        //enabled: !!url, // Uncomment if you want to disable the query when url is empty
    });
}

export function UseInfiniteFetchQuery(url: string) {
    return useInfiniteQuery({
        queryKey: [url],
        initialPageParam: endpoint+url,
        queryFn: async ({ pageParam}) => {
            wait(1); // Simulate a delay
            // Fetch data from the API 
            return fetch(pageParam,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                }
            );
        },
        getNextPageParam: (lastPage, allPages) => {
            // Assuming the API returns a next page URL or null
            return lastPage.next ? lastPage.next : null;
        },
        refetchOnWindowFocus: false,
        retry: 1,
        //enabled: !!url, // Uncomment if you want to disable the query when url is empty
    })
}

    
// Usage example
/*
const { data, error, isLoading } = UseFetchQuery("https://pokeapi.co/api/v2/pokemon?limit=10");
if (isLoading) return <Text>Loading...</Text>;
if (error) return <Text>Error: {error.message}</Text>;
return <Text>Data: {JSON.stringify(data)}</Text>;
*/
function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms* 1000));
}