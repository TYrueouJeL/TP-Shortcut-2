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
    <>
      <Header onNavClick={p => setPage(p)}/>

      <main className={"container mx-auto px-4 flex items-center justify-between"}>
        {currentPage}
      </main>
    </>
  )
}

export default App
