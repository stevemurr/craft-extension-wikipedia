import { SearchProvider } from './SearchProvider';
import { SearchResult } from './SearchResult';

export class GoogleSearchProvider implements SearchProvider {
    async GetResults(searchOptions: any): Promise<SearchResult[]> {
        const url = `https://suggestqueries.google.com/complete/search?origin=*&q=${searchOptions}`
        const results = await (await fetch(url)).json().catch(err => { console.log(err) })

        if (results === undefined) Promise.reject("search failed")

        let searchResults: SearchResult[] = []
        results.query.search.map((el: any, idx: any) => {
            let searchResult: SearchResult = {
                title: el.title,
                url: '',
                snippet: ''
            }

            searchResults.push(searchResult)
        })
        return Promise.resolve(searchResults)
    }
}