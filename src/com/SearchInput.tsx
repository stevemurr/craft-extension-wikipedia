import * as React from "react"

export const SearchInput = (props: any) => {


    return <input
        value={props.textValue}
        onKeyUp={props.onKeyUp}
        onChange={props.onChange}
        type="text"
        className="inputGridItem text-sm text-black dark:text-white"
        placeholder="Search ..." />
}