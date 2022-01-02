
import * as React from "react"

export const Select = (props: any) => {
    return <select style={{ width: "95%" }} className="appearance-none w-full px-3 py-2 mx-2 my-2" value={props.value} onChange={props.onChange}>
        {props.values.map((el: any, idx: any) => {
            return <option key={`select-${idx}`}>{el.name}</option>
        })}
    </select>
}

