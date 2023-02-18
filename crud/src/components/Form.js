import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Form(props) {
    const [inputValue, setInputValue] = useState({
        id: '',
        name: '',
        country: 'HN',
        comment: ''
    })

    useEffect(() => {
        props.selectedStudent.selectedStudent && setInputValue(props.selectedStudent.selectedStudent)
    }, [props.selectedStudent])

    const handleChange = (e) => {
        let key = e.target.name
        let value = e.target.value
        setInputValue({ ...inputValue, [key]: value })
    }

    const handleSubmit = () => {
        if (props.selectedStudent.action === undefined) {
            props.setSelectedStudent({...props.selectedStudent, action: "Submit"})
        }
        if (props.selectedStudent.action !== 'EDIT') {
            setInputValue({
                id: '',
                name: '',
                country: 'HN',
                comment: ''
            })
            axios.post("http://localhost:3001/students", inputValue)
                .then((response) => {
                    props.getData()
                })
        } else {
            axios.put(`http://localhost:3001/students/${props.selectedStudent.selectedStudent.id}`, inputValue)
                .then((response) => {
                    props.getData()
                })
            setInputValue({
                id: '',
                name: '',
                country: 'HN',
                comment: ''
            })
            props.setSelectedStudent({
                selectedStudent: {
                    id: '',
                    name: '',
                    country: 'HN',
                    comment: ''
                },
                action: 'Submit'
            })
        }
    }

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th colSpan="2">
                            User Register Form
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Id</td>
                        <td><input onChange={handleChange} className="w-100" type="text" name='id' value={inputValue.id} /></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td><input onChange={handleChange} className="w-100" type="text" name='name' value={inputValue.name} /></td>
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td>
                            <select onChange={handleChange} name='country' value={inputValue.country}>
                                <option value="HN">Hà Nội</option>
                                <option value="HCM">TP Hồ Chí Minh</option>
                                <option value="ĐN">Đà Nẵng</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Comment</td>
                        <td><input onChange={handleChange} className="w-100" type="text" name='comment' value={inputValue.comment} /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button onClick={handleSubmit}>{props.selectedStudent.action}</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
