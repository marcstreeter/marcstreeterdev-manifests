import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>{{cookiecutter.project_name}}</h1>
            <p>{{cookiecutter.project_description}}</p>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/health" element={<Health />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

function Home() {
  return (
    <div>
      <h2>Welcome to {{cookiecutter.project_name}}</h2>
      <p>This is a React service for the marcstreeterdev project.</p>
    </div>
  )
}

function Health() {
  return (
    <div>
      <h2>Health Check</h2>
      <p>Service is healthy!</p>
    </div>
  )
}

export default App 