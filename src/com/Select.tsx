
import * as React from "react"

export const Select = (props: any) => {
    return <select value={props.value} className="appearance-none" onChange={props.onChange}>
        {props.values.map((el: any, idx: any) => {
            return <option key={`select-${idx}`}>{el.name}</option>
        })}
    </select>
}

