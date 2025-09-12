import { useEffect, useState } from "react";
import { getCollection } from "../api";
import type { Software } from "../api";
import SoftwareCard from "../components/SoftwareCard";

export default function SoftwarePage() {
    const [software, setSoftware] = useState<Software[]>([]);
    const [loading, setLoading] = useState(false);

    async function fetchSoftware() {
        const software = await getCollection<Software>('software');
        setSoftware(software);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        fetchSoftware();
    }, [])

    let softwareCards = null;
    if (loading) {
        softwareCards = <p>Chargement en cours...</p>;
    } else {
        softwareCards = software.map(s => <SoftwareCard key={s.id} software={s}/>);
    }

    return (
        <section>
            <h1>Liste des logiciels</h1>
            {softwareCards}
        </section>
    );
}