import axios from 'axios';
import { useEffect, useState } from 'react';

const Data = () => {
    const [data, setData] = useState([]);
    const [currData, setCurrData] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        axios.get('https://reqres.in/api/users')
            .then(function (response) {
                setData(response.data.data)
                setCurrData(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    const changeInput = (e) => {
        if (!e.target.value) {
            setCurrData(data)
            setText("")
        }
        else setText(e.target.value)
    }

    const searchName = () => {
        const arr = []
        data.map(e => {
            ((e.first_name === text) || (e.last_name === text)) && arr.push(e)
        })
        setCurrData(arr);
    }

    return (
        <>
            <div>
                <input value={text} onChange={(e) => changeInput(e)} />
                <button onClick={searchName}>Search</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currData.map(e => (
                            <tr key={e.id}>
                                <td>{e.first_name}</td>
                                <td>{e.last_name}</td>
                                <td>{e.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Data