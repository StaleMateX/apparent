function MatchPercentage(arg, target, min, max) {
    if (arg < min || max < arg) {
        return 0;
    }

    return 1 - Math.abs(target - arg) / Math.abs(target);
}

function ProposedMatchCard(name, age, description, kidAge1, kidAge2, kidAge3) {
    return(
        <>
            <h1>
            {name}
            </h1>
            <div>
                Age: {age}
            </div>
                {kidAge1 == "" ? "" : "Child 1 age: "} {kidAge1 == "" ? "" : {kidAge1}}
                {kidAge2 == "" ? "" : "Child 2 age: "} {kidAge2 == "" ? "" : {kidAge2}}
                {kidAge3 == "" ? "" : "Child 3 age: "} {kidAge3 == "" ? "" : {kidAge3}}
            <div>

            </div>
            <div>
                About: {description}
            </div>
        </>
    )
}

export function Matching() {
    return(
        <>
            <h1>Matching Page</h1>
            <div/>
        </>
    )
}