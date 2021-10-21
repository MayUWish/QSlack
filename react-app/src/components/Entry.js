import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

function User() {
    const [groupJoined, setGroupJoined] = useState({});
    // const { userId }  = useParams();
    const currentUser = useSelector((state) => state.session?.user);
    const userId = currentUser.id

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/groups/`);
            const groups = await response.json();
            console.log('groups!!', groups)
            setGroupJoined(groups);
          
        })();
    }, [userId]);

    if (!userId) {
        return null;
    }

    return (
        <ul>
            {Object.keys(groupJoined).map(key => <li>{groupJoined[key]?.id}</li>)}
        </ul>
    );
}
export default User;