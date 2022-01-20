import React from "react";
import QuestionItem from './QuestionItem'

function QuestionList({questions, handleDeleteQuestion, handleUpdateQuestion}) {

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.length === 0 ?
          <p>Loading...</p>
        : questions.map((question) => <QuestionItem key={question.id} question={question} handleUpdateQuestion={handleUpdateQuestion} handleDeleteQuestion={handleDeleteQuestion}/>)}
      </ul>
    </section>
  );
}

export default QuestionList;
