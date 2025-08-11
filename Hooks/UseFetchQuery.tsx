import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Colors } from '@/constants/Colors';
const endpoint="https://pokeapi.co/api/v2/";
type API={
    '/pokemon?limit=21': {
        count: number;
        next: string | null;
        previous: string | null;
        results: {
            name: string;
            url: string;
        }[];
    };
    // Add more endpoints as needed
    '/pokemon/[id]':{
        height: number,
        id:number,
        name:string,
        weight:number,
        moves:{
            move:{name:string}
        }[],
        stats:{
            base_stat:number;
            stat:{
                name:string;
            };
        }[]; 
        cries:{
            latest:string;
        };
        types:{
            type:{
                name:keyof typeof Colors["type"] ;
            },
        }[];
    };

    '/pokemon-species/[id]':{
       flavor_text_entries:{
        flavor_text:string,
        language:{
            name:string
        };
       }[];
    };
}
export function UseFetchQuery<T extends keyof API>(url:T,params ?:Record<string,string|number>) {
    /*const [data, setData] = React.useState<T | null>(null);
    const [error, setError] = React.useState<Error | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);    */
    const localUrl =endpoint + Object.entries(params ?? {}).reduce<string>(
        (acc, [key, value]) => acc.replaceAll(`[${key}]`, String(value)),
        url
    );
    return useQuery({
        queryKey: [localUrl],
        queryFn: async () => {
            wait(1); // Simulate a delay
            // Fetch data from the API 
            return fetch(localUrl
                ,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }   
            ).then((r=>r.json() as Promise<API[T]>))
        },
        refetchOnWindowFocus: false,
        retry: 1,
        //enabled: !!url, // Uncomment if you want to disable the query when url is empty
    });
}

export function UseInfiniteFetchQuery<T extends keyof API>(url:T) {
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
                    return response.json() as Promise<API[T]>;
                }
            );
        },
        getNextPageParam: (lastPage) => {
            // Type guard to check if lastPage has 'next' property
            return 'next' in lastPage ? lastPage.next : null;
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