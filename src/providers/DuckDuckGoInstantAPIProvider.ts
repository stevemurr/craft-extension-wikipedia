import { SearchProvider } from './SearchProvider';
import { SearchResult } from './SearchResult';

export class DuckDuckGoInstantAPIProvider implements SearchProvider {
    async GetResults(searchOptions: any): Promise<SearchResult[]> {

        const url = `https://api.duckduckgo.com/?q=${searchOptions}&format=json`
        const options: RequestInit = { method: 'GET', mode: 'cors', cache: 'no-cache', credentials: 'same-origin' };
        let searchResults: SearchResult[] = []
        const results = await (await fetch(url, options)).json()
        results.RelatedTopics.map((el: any, idx: any) => {
            let searchResult: SearchResult = {
                title: new URL(el.FirstURL).pathname,
                url: el.FirstURL,
                snippet: el.Text
            }

            searchResults.push(searchResult)
        })

        return Promise.resolve(searchResults)

    }
}
