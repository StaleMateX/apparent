import React, {useState} from 'react';

function AvatarEditor() {
    const [file, setFile] = useState('');
    function handleAvatarFileChosen(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return(
        <div>
            <div style={{width: 200, height: 200, border: "2px solid white"}}>
                <img src={file} style={{maxWidth: "100%", maxHeight: "100%", scale: "auto"}}></img>
            </div>
            Avatar: <input type="file" accept="image/*" onChange={handleAvatarFileChosen}/>
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
            About me: <textarea name="about me" rows="5" cols="40"/>
        </div>
    )
}

function SaveChangesButton() {
    return(
        <div>
            <button type="submit">Save changes</button>
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

            {SaveChangesButton()}
        </>
    )
}
