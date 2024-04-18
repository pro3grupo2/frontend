import { get_areas } from "@/api/v1/areas";
import { get_asignaturas } from "@/api/v1/asignaturas";
import { useEffect, useState } from "react";

export default function Filters({ onSearchChange, handleSearch, handleAreaClick, handlePremio, handleAnio, handleAsignatura }) {
    const [areas, setAreas] = useState([]);
    const [anio, setAnio] = useState(2024);
    const [asignaturas, setAsignaturas] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        get_areas(token).then(data => {
            setAreas(data);
        });
        
        get_asignaturas(token).then(data => {
            setAsignaturas(data);
        });
    }, []);

    const createFilterButton = (id, title, onClick) => {
        let filtersList = document.getElementById("filtersList");
        let filterButton = document.createElement("span");
        filterButton.id = id;
        filterButton.className = "btn btn-primary rounded-pill me-2 px-4 mb-3";
        filterButton.innerHTML = title + " <span class='ms-3' aria-hidden='true'>&times;</span>";
        filterButton.onclick = onClick;
        filtersList.appendChild(filterButton);
    }

    const changeFocus = (focused) => {
        let changeBorder = document.getElementById("changeBorder");

        let removeClass = (!focused) ? "border-primary" : "border-black";
        let classBorder = (!focused) ? "border-black" : "border-primary";

        changeBorder.classList.remove(removeClass);
        changeBorder.classList.add(classBorder);
    }

    const handleClass = (asignatura) => {
        handleAsignatura(asignatura);
        
        let filter = document.getElementById("asignaturaFilter");
        
        if (asignatura === -1) {
            if (filter) filter.remove();
            return;
        }
        
        if (filter) {
            filter.innerHTML = asignaturas.find(a => a.id === parseInt(asignatura)).titulo + " <span class='ms-3' aria-hidden='true'>&times;</span>";
        } else {
            createFilterButton("asignaturaFilter", asignaturas.find(a => a.id === parseInt(asignatura)).titulo, () => handleClass(-1));
        }
    }
    
    const handleYear = (year) => {
        handleAnio(year);

        let filter = document.getElementById("anioFilter");
        
        if (year === "null") {
            setAnio(2024);
            if (filter) filter.remove();
            return;
        }

        setAnio(year);

        if (filter) {
            filter.innerHTML = year + " <span class='ms-3' aria-hidden='true'>&times;</span>";
        } else {
            createFilterButton("anioFilter", year, () => handleYear("null"));
        }
    }

    const handlePremiado = (premio) => {
        handlePremio(premio);

        let filter = document.getElementById("premiadoFilter");
        if (premio === "true") {
            if (!filter) {
                createFilterButton("premiadoFilter", "Premiados", () => handlePremiado("null"));
            } else {
                filter.innerHTML = "Premiados <span class='ms-3' aria-hidden='true'>&times;</span>";
            }
        } else if (premio === "false") {
            if (filter) { 
                filter.innerHTML = "No Premiados <span class='ms-3' aria-hidden='true'>&times;</span>";
            } else {
                createFilterButton("premiadoFilter", "No Premiados", () => handlePremiado("null"));
            }
        } else if (premio === "null") {
            if (filter) filter.remove();
        }
    }
    
    const handleFilters = () => {
        let filters = document.getElementById("svgFilter");
        let premioButton = document.getElementById("premioButton");
        let asignaturasButton = document.getElementById("asignaturasButton");
        let yearButton = document.getElementById("yearButton");
        
        premioButton.classList.toggle("visually-hidden");
        asignaturasButton.classList.toggle("visually-hidden");
        yearButton.classList.toggle("visually-hidden");
        
        if (premioButton.classList.contains("visually-hidden")) {
            filters.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
                    <path d="M3 7H15V5H3M0 0V2H18V0M7 12H11V10H7V12Z" fill="#091229"/>
                </svg>`
        } else {
            filters.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="18" viewBox="0 0 12 18" fill="none">
                    <path d="M7 15L7 3L5 3L5 15M0 18L2 18L2 -8.74228e-08L-7.86805e-07 0M12 11L12 7L10 7L10 11L12 11Z" fill="#091229"/>
                </svg>`
        }
    }

    return (
        <>
            <div className="row mb-4">
                <div id="filters" onClick={handleFilters}
                     className="col-1 d-flex justify-content-around align-items-center border border-black border-2 rounded me-3">
                    <span className="">Filtro</span>
                    <span id="svgFilter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
                            <path d="M3 7H15V5H3M0 0V2H18V0M7 12H11V10H7V12Z" fill="black"/>
                        </svg>
                    </span>
                </div>
                <div id="premioButton" className="col-1 filterButtons d-flex align-items-center me-3 visually-hidden">
                    <div className="dropdown border border-black border-2 rounded w-100 h-100">
                    <button className="btn dropdown-toggle w-100 h-100 no-border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Premio
                        </button>
                        <ul className="dropdown-menu">
                            <li><button onClick={() => {handlePremiado("true")}} className="dropdown-item">Si</button></li>
                            <li><button onClick={() => {handlePremiado("false")}} className="dropdown-item">No</button></li>
                        </ul>
                    </div>
                </div>
                <div id="asignaturasButton" className="col-1 filterButtons d-flex align-items-center me-3 visually-hidden">
                    <div className="border border-black border-2 rounded w-100 h-100">
                        <select className="form-select border-0 h-100" defaultValue={"Asignatura"} onChange={(e) => handleClass(e.target.value)}>
                            <option key={-1} id="defaultAsignatura" disabled>Asignatura</option>
                            {
                                asignaturas.map(
                                    asignatura => <option key={asignatura.id} value={asignatura.id}>{asignatura.titulo}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <div id="yearButton" className="col-1 filterButtons d-flex align-items-center me-3 visually-hidden">
                    <div className="dropdown w-100 h-100">
                        <input id="yearButton" type="number" min={1900} max={new Date().getFullYear()} step={1} className="form-control border-black border-2 h-100" value={anio} onChange={(e) => handleYear(e.target.value)}/>
                    </div>
                </div>
                <div id="changeBorder" className="col border border-black border-2 rounded d-flex align-items-center input-group input-group-lg">
                    <svg className="ms-4 me-3" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M12.1401 0.034686C5.4457 0.034686 0 5.48038 0 12.1748C0 18.8692 5.4457 24.3149 12.1401 24.3149C14.1866 24.3149 16.1984 23.8293 17.898 22.8927C18.0341 23.0566 18.185 23.2075 18.3489 23.3437L21.8175 26.8123C22.1378 27.1726 22.5283 27.4638 22.9652 27.6678C23.4021 27.8717 23.876 27.9843 24.3579 27.9985C24.8399 28.0127 25.3196 27.9282 25.7677 27.7503C26.2158 27.5723 26.6228 27.3047 26.9638 26.9638C27.3047 26.6228 27.5723 26.2158 27.7503 25.7677C27.9282 25.3196 28.0127 24.8399 27.9985 24.3579C27.9843 23.876 27.8717 23.4021 27.6678 22.9652C27.4638 22.5283 27.1727 22.1378 26.8123 21.8175L23.3437 18.3489C23.1747 18.1799 22.9887 18.0287 22.7887 17.898C23.7252 16.1984 24.3149 14.2213 24.3149 12.1401C24.3149 5.4457 18.8692 0 12.1748 0L12.1401 0.034686ZM12.1401 3.50328C16.9614 3.50328 20.8116 7.35343 20.8116 12.1748C20.8116 14.4641 19.9791 16.5799 18.5223 18.1408C18.4876 18.1755 18.4529 18.2101 18.4183 18.2448C18.2544 18.381 18.1035 18.5319 17.9673 18.6957C16.4412 20.0832 14.36 20.881 12.1054 20.881C7.28406 20.881 3.43391 17.0308 3.43391 12.2095C3.43391 7.38811 7.28406 3.53797 12.1054 3.53797L12.1401 3.50328Z" fill="#6E7377" />
                    </svg>
                    <input id="searchbar" onBlur={() => changeFocus(false)} onFocus={() => changeFocus(true)} onChange={(e) => onSearchChange(e)} onKeyDown={(e) => handleSearch(e)} className="form-control border-0 py-2 focus-ring" type="search" placeholder="Buscar un proyecto o escribir el correo de algún miembro"></input>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col">
                    <div id="filtersList" className="d-flex flex-wrap gap-2"></div>
                </div>
                <hr className="m-0"></hr>
            </div>

            <div className="row">
                <ul className="nav nav-underline d-flex flex-inline justify-content-center">
                    <li key="0" className="nav-item me-5">
                        <button id="0" onClick={() => handleAreaClick("0")} className="nav-link text-dark active">Todo</button>
                    </li>
                    {areas.map(area => 
                        <li key={area.id} className="nav-item me-5">
                            <button id={area.id} onClick={() => handleAreaClick(area.id.toString())} className="nav-link text-dark">{area.titulo}</button>
                        </li>
                    )}
                </ul>
                <hr className="m-0"></hr>
            </div>
        </>
    );
}