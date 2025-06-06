import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { UserContext } from "./userReducer"
import axios from "axios"

const UpdateUser = () => {
    const [open, setOpen] = useState(false)
    const { state: user, dispatch: userDispatch } = useContext(UserContext)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        userDispatch({ type: 'UPDATE', data: { [id]: value } })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(user);
        try {
            const res = await axios.put(`http://localhost:3000/api/user`,
                user, {
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': `${user.id}`,
                    'access-control-allow-origin': '*',
                }
            })
            userDispatch({ type: 'UPDATE', data: res.data })
        } catch (err) {
            console.error(err)
        }
        finally {
            setOpen(false)
        }
    }

    return (<>
        <button onClick={() => setOpen(!open)}>update data</button>
        {open &&
            <form onSubmit={handleSubmit}>
                <label>first name: <input type="text" value={user.firstName} onChange={handleChange} id='firstName' /></label>
                <label>last name: <input type="text" value={user.lastName} onChange={handleChange} id='lastName' /></label>
                <label>email: <input type="email" value={user.email} onChange={handleChange} id='email' /></label>
                <label>address: <input type="text" value={user.address} onChange={handleChange} id='address' /></label>
                <label>phone: <input type="tel" value={user.phone} onChange={handleChange} id='phone' /></label>
                <br />
                <button type="submit">update</button>
            </form >
        }
    </>)
}

export default UpdateUser