import { useState } from 'react'
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
    <div className="app-container">

      <Header onNavClick={p => setPage(p)}/>

      <main className="app-main">
        {currentPage}
      </main>

    </div>
  )
}

export default App
