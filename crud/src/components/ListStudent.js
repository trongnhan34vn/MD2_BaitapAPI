import React from 'react'
import Student from './Student'

export default function ListStudent(props) {
    const elementStudent = props.listStudents.map((student)=> {
        return <Student key={student.id} student={student} />
    })
    return (
        <div>
            <table className="table table-striped flex-2">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Comment</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {elementStudent}
                </tbody>
            </table>
        </div>
    )
}
 