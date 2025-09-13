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
        <header className="bg-gradient-to-r from-purple-700 to-blue-700 text-white p-4 mb-4">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <h1 className="text-2xl cursor-default">Shortcut TP 2</h1>

                <nav>
                    <ul className="flex gap-4">
                        <li>
                            <ul className="flex gap-2">
                                <button className="text-white hover:text-purple-200 px-2 cursor-pointer hover:rotate-10 duration-100" onClick={e => handleNavClick(e, 'home')}>Accueil</button>
                                <button className="text-white hover:text-purple-200 px-2 cursor-pointer hover:rotate-10 duration-100" onClick={e => handleNavClick(e, 'software')}>Logiciels</button>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}