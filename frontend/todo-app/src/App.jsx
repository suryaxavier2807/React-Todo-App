import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateTodo from './CreateTodo'
import ViewTodos from './viewTodos'

function App() { 

  

  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateTodo />} />
          <Route path='/viewTodos' element={<ViewTodos />} />
        </Routes>
      </BrowserRouter>
    </>
  )


}

export default App
