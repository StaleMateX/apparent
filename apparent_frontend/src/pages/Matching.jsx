function MatchPercentage(arg, target, min, max) {
    if (arg < min || max < arg) {
        return 0;
    }

    return 100 * (1 - Math.abs(target - arg) / Math.abs(target));
}

function ProposedMatchCard(name, age, description, kidAge1, kidAge2, kidAge3) {
    return(
        <div>
            <h1>
            {name}
            </h1>
            <div>
                Age: {age} ({MatchPercentage(35, age, 30, 40)}% match)
            </div>
                {kidAge1 == "" ? "" : "Child 1 age: "} {kidAge1 == "" ? "" : {kidAge1}} {}
                {kidAge2 == "" ? "" : "Child 2 age: "} {kidAge2 == "" ? "" : {kidAge2}}
                {kidAge3 == "" ? "" : "Child 3 age: "} {kidAge3 == "" ? "" : {kidAge3}}
            <div>

            </div>
            <div>
                About: {description}
            </div>

            <button>Accept</button>
            <button>Decline</button>
        </div>
    )
}

export function Matching() {
    return(
        <>
            <h1>Matching Page</h1>
            <div>
                Jacob Burritt
            </div>

            {ProposedMatchCard("Jim de St. Germain", 50, "CS instructor at the University of Utah", 9, 4, 3)}
            {ProposedMatchCard("Dr. Bean", 50, "Assistant CS instructor at the University of Utah", 4, 3, 1)}
            {ProposedMatchCard("Firstname Lastname", 50, "Fake person invented by Jacob Burritt", 13, 2, 2)}
        </>
    )
}