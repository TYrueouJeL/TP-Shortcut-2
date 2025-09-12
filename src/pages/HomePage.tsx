import { Suspense } from "react";
import ShortcutList from "../components/ShortcutList";

export default function HomePage() {
    return (
        <section>
            <h1>Accueil</h1>
            <Suspense fallback="Chargement en cours...">
                <ShortcutList/>
            </Suspense>
        </section>
    );
}