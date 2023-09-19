import Typography from "@mui/material/Typography";

import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";

export const WelcomeName = () => {
    const { instance } = useMsal();
    const [ username, setUserName] = useState('');

    useEffect(() => {
        const currentAccount = instance.getActiveAccount();

        if (currentAccount) {
            setUserName(currentAccount.name);
        }
    }, [instance]);
    
    return <Typography variant="h6">Welcome, {username}</Typography>;
};