import type { PageSlug } from "../App";

interface Props {
    onNavClick: (page: PageSlug) => void;
}

export default function Header({onNavClick}: Props) {
    function handleNavClick(event: React.MouseEvent, page: PageSlug) {
        event.preventDefault();
        onNavClick(page);
    }

    return (
        <header className="app-header">
            <nav>
                <ul>
                    <li>
                        <a href="/home" onClick={e => handleNavClick(e, 'home')}>Accueil</a>
                    </li>
                    <li>
                        <a href="/software" onClick={e => handleNavClick(e, 'software')}>Logiciels</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}