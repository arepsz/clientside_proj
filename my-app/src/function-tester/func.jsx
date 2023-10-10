export function ShowFunction({fn}) {
    return (
        <div className="function-container">
            <h1 className="function-container-h1">Function name</h1>
            {String(fn)}
        </div>
    )
}