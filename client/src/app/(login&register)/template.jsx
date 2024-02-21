import { Toolbar } from "@mui/material";

const { Fragment } = require("react")




const UserTemplate = ({ children }) => {

    return (
        <Fragment>
            <Toolbar />
            {children}
        </Fragment>
    )
}

export default UserTemplate;