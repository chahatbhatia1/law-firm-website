import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
    const error = useRouteError()

    return (
        <div>
            <h1>Oops!</h1>
            <h2>Something went wrong!</h2>
            <br />
            <p>{error.status + " : " + error.statusText}</p>
        </div>
    )
}

export default ErrorPage