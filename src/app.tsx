import { CraftTextBlockConfig, CraftUrlBlockConfig } from "@craftdocs/craft-extension-api";
import * as React from "react"
import * as ReactDOM from 'react-dom'
import * as Providers from './providers'
import { Result, SearchInput } from './com'


async function insertArticle(props: any) {
  const titleBlock: CraftTextBlockConfig = {
    content: props.title,
    style: {
      textStyle: "page",
      cardStyle: {
        type: "large",
        isLightColor: false
      }
    }
  }
  const content: CraftUrlBlockConfig = {
    url: props.url,
    title: props.title,
  }
  const focusContent: CraftTextBlockConfig = {
    content: props.snippet,
    hasFocusDecoration: true,
    style: {
      textStyle: "body"
    }
  }
  const blockPage = craft.blockFactory.textBlock(titleBlock)
  const block = craft.blockFactory.urlBlock(content)
  const block2 = craft.blockFactory.textBlock(focusContent)

  await craft.dataApi.addBlocks([blockPage, block, block2]);
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

  async function search(term: string, providerSelect: string = "wikipedia") {
    let provider;
    switch (providerSelect) {
      case "wikipedia":
        provider = new Providers.WikipediaSearchProvider();
        break
      case "google":
        provider = new Providers.GoogleSearchProvider();
        break
      default:
        provider = new Providers.WikipediaSearchProvider();
    }
    const results = await provider.GetResults(term);
    setSearchResults(results);
  }

  return <main className="flex-1 overflow-y-auto">
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
