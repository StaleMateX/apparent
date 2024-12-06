function MatchPercentage(arg, target, min, max) {
    if (arg < min || max < arg) {
        return 0;
    }

    return 1 - Math.abs(target - arg) / Math.abs(target);
}

export function Matching() {
    return(
        <>
            <h1>Matching Page</h1>
            <div/>
        </>
    )
}