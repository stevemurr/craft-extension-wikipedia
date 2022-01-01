import { SearchProvider } from './SearchProvider';
import { SearchResult } from './SearchResult';

function stripHtml(html: string): string {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

export class WikipediaSearchProvider implements SearchProvider {
    async GetResults(searchOptions: any): Promise<SearchResult[]> {
        var url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchOptions}&origin=*&format=json`
        const results = await (await fetch(url)).json().catch(err => { console.log(err) })

        if (results === undefined) Promise.reject("search failed")

        let searchResults: SearchResult[] = []
        results.query.search.map((el: any, idx: any) => {
            let searchResult: SearchResult = {
                title: el.title,
                url: `https://en.wikipedia.org/?curid=${el.pageid}`,
                snippet: stripHtml(el.snippet)
            }
            searchResults.push(searchResult)
        })
        return Promise.resolve(searchResults)
    }
}