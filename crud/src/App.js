import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import ListStudent from './components/ListStudent';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios'

export const getDataContext = createContext()
function App() {
  const [listStudents, setListStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState({
    selectedStudent: null,
    action: "SUBMIT"
  })
  const getData = () => {
    axios.get("http://localhost:3001/students")
      .then((response) => setListStudents(response.data))
  }
  useEffect(() => {
    getData()
  }, [])
  const handleUpdate = (value) => {
    console.log(value);
    for (let i = 0; i < listStudents.length; i++) {
      if (listStudents[i].id === value.id) {
        setSelectedStudent(
          {
            selectedStudent : listStudents[i],
            action: value.action
          }
        );
        break;
      }
    }
  }

  return (
    <div className="App">
      <div className="d-flex gap-5">
        {/* Form */}
        <Form setSelectedStudent={setSelectedStudent} selectedStudent={selectedStudent} handleUpdate={handleUpdate} getData={getData} setListStudents={setListStudents} />
        {/* Form */}
        {/* List Students */}
        <getDataContext.Provider value={{ getData, handleUpdate }} >
          <ListStudent listStudents={listStudents} />
        </getDataContext.Provider>
        {/* List Students */}
      </div>

    </div>
  );
}

export default App;
