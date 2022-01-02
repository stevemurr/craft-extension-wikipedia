import { CraftUrlBlockConfig } from "@craftdocs/craft-extension-api";
import * as React from "react"
import * as ReactDOM from 'react-dom'
import { WikipediaSearchProvider, DuckDuckGoInstantAPIProvider, SearchProvider } from './providers'
import { Result, SearchInput, Select } from './com'

const values = [
  {
    "name": "Wikipedia",
    "type": WikipediaSearchProvider
  },
  {
    "name": "DuckDuckGo",
    "type": DuckDuckGoInstantAPIProvider
  }
]

const App: React.FC<{}> = () => {
  const [searchResults, setSearchResults] = React.useState([{}]);
  const [value, setValue] = React.useState(values[0]);

  const [textValue, setTextValue] = React.useState("");

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

  async function insertArticle(props: any) {
    const content: CraftUrlBlockConfig = {
      url: props.url,
      title: props.title,
    }

    const block = craft.blockFactory.urlBlock(content)
    await craft.dataApi.addBlocks([block]);
  }

  async function search(term: string, provider: SearchProvider) {
    const results = await provider.GetResults(term);
    setSearchResults(results);
  }

  function isKeyCode(keyCode: string, expectedKeyCode: string = "Enter"): boolean {
    return (keyCode === expectedKeyCode)
  }

  return <main >
    <Select values={values} onChange={(e: any) => {
      const v = values.filter((t) => { return t.name === e.target.value });
      setValue(v[0])
    }} />
    <SearchInput
      onKeyUp={async (e: any) => {
        if (!isKeyCode(e.key, "Enter")) return
        search(textValue, new value.type())
      }}
      textValue={textValue}
      onChange={(e: any) => {
        setTextValue(e.target.value);
      }} />
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
