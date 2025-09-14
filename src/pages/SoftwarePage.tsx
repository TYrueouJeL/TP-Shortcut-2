import {type FormEvent, useEffect, useState} from "react";
import { createResource, getCollection } from "../api";
import type { NewSoftware, Software } from "../api";
import SoftwareCard from "../components/software/SoftwareCard.tsx";

export default function SoftwarePage() {
    const [software, setSoftware] = useState<Software[]>([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

    async function fetchSoftware() {
        const software = await getCollection<Software>('software');
        setSoftware(software);
        setLoading(false);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const newSoftware = await createResource<NewSoftware, Software>('software', { name: name });
        setSoftware([ newSoftware, ...software ]);
        setName('');
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
            <h1 className={'title'}>Liste des logiciels</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={event => setName(event.target.value)} placeholder="Nom du logiciel" className={"px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"}/>
                <button type="submit" className={"button"}>Ajouter</button>
            </form>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 my-4 ml-2 mr-2">
                {softwareCards}
            </div>
        </section>
    );
}