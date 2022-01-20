import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List")
  const [questions, setQuestions] = useState([])

  const API_URL = 'http://localhost:4000/questions'

  useEffect(() => {
    getQuestions()
  }, [page])

  function getQuestions() {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      setQuestions(data)
    })
  }

  function handleDeleteQuestion(deleteId) {
    const questionsCopy = [...questions]
    console.log(deleteId)
    questionsCopy.splice( questionsCopy.indexOf(q => q.id === deleteId), 1 )

    fetch(`${API_URL}/${deleteId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'}
    })
    .then(getQuestions)
  }

  function handleUpdateQuestion(updateId, newCorrectIndex) {
    const questionsCopy = [...questions]
    const updateIndex = questionsCopy.findIndex(q => q.id === updateId)
    questionsCopy[updateIndex].correctIndex = newCorrectIndex
    setQuestions(questionsCopy)

    fetch(`${API_URL}/${updateId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({'correctIndex': newCorrectIndex})
    })
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ?
        <QuestionForm />
      : <QuestionList questions={questions} handleUpdateQuestion={handleUpdateQuestion} handleDeleteQuestion={handleDeleteQuestion}/>}
    </main>
  );
}

export default App;
