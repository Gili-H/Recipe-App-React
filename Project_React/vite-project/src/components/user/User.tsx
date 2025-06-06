import { useReducer } from "react";
import userReducer, { initialState, UserContext } from "./userReducer";
import Login from "./Login";
import UserData from "./UserData";

const User = () => {
    const [user, dispatchUser] = useReducer(userReducer, initialState);

    return (<>
        <UserContext.Provider value={{ state: user, dispatch: dispatchUser }}>
            {!user.email ? <Login /> : <UserData />}
        </UserContext.Provider>
    </>)
}
export default User;
