import React, {useState} from 'react';

function AvatarEditor() {
    const [file, setFile] = useState('');
    function handleAvatarFileChosen(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return(
        <div style={{margin: 10, border: "2px solid gray", padding: 10}}>
            Avatar:
            <span style={{width: 200, height: 200, border: "2px solid white", display: "inline-block"}}>
                <img src={file} style={{maxWidth: "100%", maxHeight: "100%", scale: "auto"}}></img>
            </span>
            <div>
                <input type="file" accept="image/*" onChange={handleAvatarFileChosen}/>
            </div>
        </div>
    )
}

function EmailAddressEditor() {
    
    return(
        <div style={{border: "2px solid gray", padding: 10}}>
            Email: <input type="email" name="email"/>
        </div>
    )
}

function DisplayNameEditor() {
    return(
        <div style={{border: "2px solid gray", padding: 10}}>
            Display name: <input type="text" name="display name"/>
        </div>
    )
}

function UsernameEditor() {
    const [isUsernameValid, setIsUsernameValid] = useState('');
    function handleUsernameChanged(e) {
        var username = e.target.value;

        setIsUsernameValid(testUsernameValidity(username));
    }

    function testUsernameValidity(username) {
        var regex = new RegExp("^[A-Za-z0-9_]+$");
        return regex.test(username);
    }
    
    return(
        <div style={{border: "2px solid gray", padding: 10}}>
            Username: @<input type="text" name="username" onChange={handleUsernameChanged}/>
            
            <div style={{color: (isUsernameValid ? "#00ff00" : "#ff0000")}}>
                 {(isUsernameValid ? "✓" : "✗")} Must be 1 or more alphanumeric characters and/or underscores
            </div>
        </div>
    )
}

function AboutMeEditor() {
    return(
        <div style={{border: "2px solid gray", padding: 10}}>
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
            {EmailAddressEditor()}
            {DisplayNameEditor()}
            {UsernameEditor()}
            {AboutMeEditor()}

            {SaveChangesButton()}
        </>
    )
}
