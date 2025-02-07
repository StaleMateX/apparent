import "./About.css";

export function About(){
    return(
        <div className="about-container">
            <h1>About Us</h1>
            <p>
                Welcome to APParent! Our project is designed to help student parents 
                navigate the challenges of balancing academics and childcare. 
                At APParent, we believe in fostering a community where parents can 
                support each other, share resources, and create lasting connections.
            </p>

            <h2>How APParent Works</h2>
            <p>
                APParent is a platform tailored for student parents, providing tools 
                to connect, collaborate, and find resources efficiently. By bringing 
                parents together, we aim to create a support network that makes balancing 
                school and parenting a bit easier.
            </p>

            <h2>Key Features</h2>

            <h3>1. Interactive Map</h3>
            <p>
                The interactive map is one of our most important features. It allows 
                student parents to find and connect with others in their area. 
                <ul>
                    <li>
                        <strong>Red Pins:</strong> Highlight hot spots where multiple 
                        student parents are already participating in nanny-sharing 
                        arrangements. Other student parents can join these groups 
                        to share childcare responsibilities.
                    </li>
                    <li>
                        <strong>Blue Pins:</strong> Indicate single student parents 
                        looking to connect or form a nanny-sharing group. 
                    </li>
                </ul>
                This feature simplifies the process of finding reliable and 
                affordable childcare options near your location.
            </p>

            <h3>2. Community Forum</h3>
            <p>
                The forum is a space for student parents to support each other 
                and share valuable information. It allows parents to:
                <ul>
                    <li>Ask questions like how to help a baby sleep easily.</li>
                    <li>Share tips on where to find discounts on food, clothing, and baby supplies.</li>
                    <li>Donate or exchange gently used clothes and toys.</li>
                    <li>Discuss parenting strategies, academic challenges, and more.</li>
                </ul>
                By fostering real-time communication, the forum creates a dynamic 
                and helpful community for student parents.
            </p>

            <h2>Join Us</h2>
            <p>
                Sign up with your school email to unlock more features and 
                become a part of the APParent community today!
            </p>
        </div>
    )
}
