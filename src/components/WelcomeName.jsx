import Typography from "@mui/material/Typography";
import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";

export const WelcomeName = () => {
    const { instance } = useMsal();
    const [name, setName] = useState(null);

    useEffect(() => {
        const currentAccount = instance.getActiveAccount();

        if (currentAccount) {
            setName(currentAccount.name);
        }
    }, [instance]);


    return <Typography variant="h6">Welcome, {name}</Typography>;
};