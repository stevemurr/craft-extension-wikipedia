import { WikipediaSearchProvider } from "./WikipediaSearchProvider";
import { GoogleSearchProvider } from "./GoogleSearchProvider";
import { SearchResult } from "./SearchResult";
import { SearchProvider } from "./SearchProvider";

export { WikipediaSearchProvider, GoogleSearchProvider, SearchResult, SearchProvider }

export enum Provider {
    WikipediaSearchProvider,
    GoogleSearchProvider
}