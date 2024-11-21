function AvatarEditor() {
    return(
        <div>
            Avatar: <input type="file" accept="image/*"/>
        </div>
    )
}

function DisplayNameEditor() {
    return(
        <div>
            Display name: <input type="text" name="display name"/>
        </div>
    )
}

function UsernameEditor() {
    return(
        <div>
            Username: @<input type="text" name="username"/>
        </div>
    )
}

function AboutMeEditor() {
    return(
        <div>
            About me: <textarea name="about me" wid="500"/>
        </div>
    )
}

export function UserProfile() {
    return(
        <>
            <h1>Profile Page</h1>
            <div/>

            {AvatarEditor()}
            {DisplayNameEditor()}
            {UsernameEditor()}
            {AboutMeEditor()}
        </>
    )
}
