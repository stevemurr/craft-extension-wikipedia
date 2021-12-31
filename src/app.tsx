import { CraftUrlBlockConfig } from "@craftdocs/craft-extension-api";
import * as React from "react"
import * as ReactDOM from 'react-dom'
import * as Providers from './providers'

function useCraftDarkMode() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    craft.env.setListener(env => setIsDarkMode(env.colorScheme === "dark"));
  }, []);

  return isDarkMode;
}

function setHTML(content: string) {
  return <div className="text font-light text-xs" dangerouslySetInnerHTML={{ __html: content }}></div>
}

function isKeyCode(keyCode: string, expectedKeyCode: string = "Enter"): boolean {
  return (keyCode === expectedKeyCode)
}

async function insertArticle(props: any) {
  const content: CraftUrlBlockConfig = {
    url: props.url,
    title: props.title
  }
  const block = craft.blockFactory.urlBlock(content)
  await craft.dataApi.addBlocks([block]);
}

const App: React.FC<{}> = () => {
  const isDarkMode = useCraftDarkMode();
  const [searchResults, setSearchResults] = React.useState([{}]);

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
    <div id="articles" className="mx-2 mt-2 mb-4">
      {searchResults.map((searchResult: any, idx: any) => {
        if (!("title" in searchResult)) return
        return <Article key={`article-${idx}`} props={searchResult} />
      })}
    </div>
  </main>
}

const SearchInput = (props: any) => {
  const [textValue, setTextValue] = React.useState("");

  return <input
    onKeyDown={(e) => {
      if (!isKeyCode(e.key, "Enter")) return
    }}
    value={textValue}
    onKeyUp={async (e) => {
      if (!isKeyCode(e.key, "Enter")) return
      props.onChange(textValue)
    }}
    onChange={(e) => {
      setTextValue(e.target.value)
    }}
    type="text"
    className="inputGridItem text-sm text-black dark:text-white mx-2 mt-2 mb-4"
    placeholder="Search ..." />
}


const Article = (props: any) => {
  return <div onClick={() => { insertArticle(props.props) }} className="gridItem">
    <h3 className="text-sm font-medium select-none">
      {props.props.title}
    </h3>
    {setHTML(props.props.snippet)}
    <p className="text-xs text-secondaryText dark:text-secondaryText-dark">{props.props.url}</p>
  </div>
}

export function initApp() {
  ReactDOM.render(<App />, document.getElementById('react-root'))
}
