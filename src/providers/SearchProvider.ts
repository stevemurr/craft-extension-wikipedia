import { SearchResult } from './SearchResult'

export interface SearchProvider {
    GetResults(searchOptions: any): Promise<SearchResult[]>
}