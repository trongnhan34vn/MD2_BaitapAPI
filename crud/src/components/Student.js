import axios from 'axios'
import React from 'react'
import { getDataContext } from '../App'
import { useContext } from 'react'

export default function Student(props) {
    const getData = useContext(getDataContext)
    const { student } = props
    const handleDel = (id) => {
        axios.delete((`http://localhost:3001/students/${id}`))
        .then((response) => {
            getData.getData()
        })
    }
    const handleEdit = (value) => {
        console.log(value);
        getData.handleUpdate(value)
    }
    return (
        <tr>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.country === "HN" ? "Hà Nội" : student.country === "HCM" ? "TP Hồ Chí Minh" : "Đà Nẵng"}</td>
            <td>{student.comment}</td>
            <td><button onClick={() => handleEdit({id: student.id, action: "EDIT"})}>Edit</button></td>
            <td><button onClick={() => handleDel(student.id)}>Delete</button></td>
        </tr>
    )
}
