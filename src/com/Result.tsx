import * as React from "react"

export const Result = (props: any) => {

    return <div onClick={() => { props.props.onChange(props.props) }} className="gridItem">
        <h3 className="text-sm font-medium select-none">
            {props.props.title}
        </h3>
        <div className="text font-light text-xs">{props.props.snippet}</div>
        <p className="text-xs text-secondaryText dark:text-secondaryText-dark">{props.props.url}</p>
    </div>
}