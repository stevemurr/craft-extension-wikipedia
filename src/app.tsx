import { CraftTextBlockConfig, CraftUrlBlockConfig } from "@craftdocs/craft-extension-api";
import * as React from "react"
import * as ReactDOM from 'react-dom'
import { WikipediaSearchProvider, Provider } from './providers'
import { Result, SearchInput } from './com'


async function insertArticle(props: any) {
  const content: CraftUrlBlockConfig = {
    url: props.url,
    title: props.title,
  }

  const block = craft.blockFactory.urlBlock(content)
  await craft.dataApi.addBlocks([block]);
}

const App: React.FC<{}> = () => {
  const [searchResults, setSearchResults] = React.useState([{}]);

  function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    React.useEffect(() => {
      craft.env.setListener(env => setIsDarkMode(env.colorScheme === "dark"));
    }, []);
    return isDarkMode;
  }

  const isDarkMode = useDarkMode();

  React.useEffect(() => {
    isDarkMode ? document.body.classList.add("dark") : document.body.classList.remove("dark");
  }, [isDarkMode]);

  async function search(term: string, provider: Provider) {
    let p;
    switch (provider) {
      case Provider.WikipediaSearchProvider:
        p = new WikipediaSearchProvider();
        break
      default:
        p = new WikipediaSearchProvider();
    }
    const results = await p.GetResults(term);
    setSearchResults(results);
  }

  return <main >
    <SearchInput onChange={search} />
    <div id="results" className="mx-2 mt-2 mb-4">
      {searchResults.map((searchResult: any, idx: any) => {
        if (!("title" in searchResult)) return

        searchResult.onChange = insertArticle
        return <Result key={`result-${idx}`} props={searchResult} />
      })}
    </div>
  </main>
}


export function initApp() {
  ReactDOM.render(<App />, document.getElementById('react-root'))
}
