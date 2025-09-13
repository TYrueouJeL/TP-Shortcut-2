import ShortcutList from "../components/shortcut/ShortcutList.tsx";
import {type ChangeEvent, type MouseEvent, useEffect, useState} from "react";
import {type Category, getCollection, getPages} from "../api.ts";

export default function HomePage() {
    const [categories, setCategories] = useState<Category[]|null>(null);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [pages, setPages] = useState<number|null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loadingPages, setLoadingPages] = useState(false);

    async function fetchCategories() {
        setLoadingCategories(true);
        const categories = await getCollection<Category>("categories");
        setCategories(categories);
        setLoadingCategories(false);
    }

    async function handleChange(event: ChangeEvent<HTMLSelectElement>) {
        setCategoryId(Number(event.target.value));
        setPageNumber(1);
    }

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        const value = event.currentTarget.value;
        if (value === "<") {
            setPageNumber(pageNumber - 1);
        } else if (value === ">") {
            setPageNumber(pageNumber + 1);
        } else {
            setPageNumber(Number(value));
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    let select = null;

    if (loadingCategories || categories === null) {
        select =
            <select
                id={"category"}
                name={"category"}
                className="px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-500"
                disabled={true}>
                <option>Chargement en cours...</option>
            </select>
    } else if (categories.length === 0) {
        select =
            <select
                id={"category"}
                name={"category"}
                className="px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-500"
                disabled={true}>
                <option>Aucune catégorie</option>
            </select>
    } else {
        select =
            <select
                id={"category"}
                name={"category"}
                className="px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                onChange={handleChange}>
                <option key={0} value={0}>Toutes les catégories</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>))
                }
            </select>
    }

    let paging = null;

    if (loadingPages || pages === null) {
        paging = <p>Chargement en cours...</p>;
    } else {
        paging =
        <div className={"flex gap-2"}>
            <button className={pageNumber - 1 <= 0 ? "button disabled" : "button"} value={"<"} key={"<"} onClick={handleClick} disabled={pageNumber - 1 <= 0}>{'<'}</button>
            {Array.from({length: pages}, (_, i) => i + 1).map(page => (
                <button className={page === pageNumber ? "button disabled" : "button"} value={page} key={page} onClick={handleClick} disabled={pageNumber == page}>{page}</button>
            ))}
            <button className={pageNumber + 1 > pages ? "button disabled" : "button"} value={">"} key={">"} onClick={handleClick} disabled={pageNumber + 1 > pages}>{'>'}</button>
        </div>;
    }

    useEffect(() => {
        setLoadingPages(true);
        getPages(categoryId).then(setPages);
        setLoadingPages(false);
    }, [categoryId]);

    return (
        <section>
            <h1 className={"title"}>Accueil</h1>

            <div className={"mx-auto flex items-center justify-between"}>
                <form>
                    <label htmlFor={"category"} className={"font-bold text-gray-800 mb-4"}>Catégorie : </label>
                    {select}
                </form>

                {paging}
            </div>

            <ShortcutList key={categoryId} categoryId={categoryId} pageNumber={pageNumber} />
        </section>
    );
}