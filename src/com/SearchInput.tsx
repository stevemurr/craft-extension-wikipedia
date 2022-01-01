import * as React from "react"

export const SearchInput = (props: any) => {
    const [textValue, setTextValue] = React.useState("");

    function isKeyCode(keyCode: string, expectedKeyCode: string = "Enter"): boolean {
        return (keyCode === expectedKeyCode)
    }

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
        className="inputGridItem text-sm text-black dark:text-white"
        placeholder="Search ..." />
}