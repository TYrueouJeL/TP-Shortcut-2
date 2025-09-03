import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SoftwarePage from './pages/SoftwarePage';

export type PageSlug = 'home' | 'software';

function App() {
  const [page, setPage] = useState<PageSlug>('home');

  let currentPage = null;
  if (page === 'home') {
    currentPage = <HomePage/>;
  } else if (page === 'software') {
    currentPage = <SoftwarePage/>;
  }

  return (
    <main>

      <Header onNavClick={p => setPage(p)}/>

      {currentPage}

    </main>
  )
}

export default App
