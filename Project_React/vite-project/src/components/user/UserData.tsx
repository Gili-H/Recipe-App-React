import { useContext } from "react"
import { UserContext } from "./userReducer"
import UpdateUser from "./UpdateUser";

const UserData = () => {
    const { state: user } = useContext(UserContext);
    return (<>
        hello, {user.firstName || user.email}
        <UpdateUser />
    </>)
}

export default UserData