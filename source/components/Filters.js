import { get_areas } from "@/api/v1/areas";
import { useEffect, useState } from "react";

export default function Filters({ onSearchChange, handleSearch, handleAreaClick, handlePremio }) {
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        get_areas(token).then(data => {
            setAreas(data);
        });
    }, []);

    function changeFocus(focused) {
        let changeBorder = document.getElementById("changeBorder");

        let removeClass = (!focused) ? "border-primary" : "border-black";
        let classBorder = (!focused) ? "border-black" : "border-primary";

        changeBorder.classList.remove(removeClass);
        changeBorder.classList.add(classBorder);
    }

    const handlePremiado = (premio) => {
        handlePremio(premio);

        let filter = document.getElementById("premiadoFilter");
        if (premio === "true") {
            if (!filter) {
                let filtersList = document.getElementById("filtersList");
                let filterButton = document.createElement("span");
                filterButton.id = "premiadoFilter";
                filterButton.className = "btn btn-primary rounded-pill me-2 px-4";
                filterButton.innerHTML = "Premiados <span class='ms-3' aria-hidden='true'>&times;</span>";
                filterButton.onclick = () => {handlePremiado("null")};
                filtersList.appendChild(filterButton);
            } else {
                filter.innerHTML = "Premiados <span class='ms-3' aria-hidden='true'>&times;</span>";
            }
        } else if (premio === "false") {
            if (filter) { 
                filter.innerHTML = "No Premiados <span class='ms-3' aria-hidden='true'>&times;</span>";
            } else {
                let filtersList = document.getElementById("filtersList");
                let filterButton = document.createElement("span");
                filterButton.id = "premiadoFilter";
                filterButton.className = "btn btn-primary rounded-pill me-2 px-4";
                filterButton.innerHTML = "No Premiados <span class='ms-3' aria-hidden='true'>&times;</span>";
                filterButton.onclick = () => {handlePremiado("null")};
                filtersList.appendChild(filterButton);
            }
        } else if (premio === "null") {
            if (filter) filter.remove();
        }
    }

    return (
        <>
            <div className="row mb-5">
                <div id="filters" className="col-1 py-2 d-flex justify-content-around align-items-center border border-black border-2 rounded me-3">
                    <span className="">Filtro</span>
                    <svg className="" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
                        <path d="M3 7H15V5H3M0 0V2H18V0M7 12H11V10H7V12Z" fill="black" />
                    </svg>
                </div>
                <div className="col-1 filterButtons d-flex align-items-center me-3">
                    <div className="dropdown border border-black border-2 rounded w-100 h-75">
                        <button className="btn dropdown-toggle w-100 h-100 no-border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Premio
                        </button>
                        <ul className="dropdown-menu">
                            <li><button onClick={() => {handlePremiado("true")}} className="dropdown-item">Si</button></li>
                            <li><button onClick={() => {handlePremiado("false")}} className="dropdown-item">No</button></li>
                        </ul>
                    </div>
                </div>
                <div className="col-1 filterButtons d-flex align-items-center me-3">
                    <div className="dropdown border border-black border-2 rounded w-100 h-75">
                        <button className="btn dropdown-toggle w-100 h-100 no-border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Titulacion
                        </button>
                        <ul className="dropdown-menu">
                            <li><button className="dropdown-item">Action</button></li>
                            <li><button className="dropdown-item">Another action</button></li>
                            <li><button className="dropdown-item">Something else here</button></li>
                        </ul>
                    </div>
                </div>
                <div className="col-1 filterButtons d-flex align-items-center me-3">
                    <div className="dropdown border border-black border-2 rounded w-100 h-75">
                        <button className="btn dropdown-toggle w-100 h-100 no-border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Año
                        </button>
                        <ul className="dropdown-menu">
                            <li><button className="dropdown-item">Action</button></li>
                            <li><button className="dropdown-item">Another action</button></li>
                            <li><button className="dropdown-item">Something else here</button></li>
                        </ul>
                    </div>
                </div>
                <div id="changeBorder" className="col py-2 border border-black border-2 rounded d-flex align-items-center input-group input-group-lg">
                    <svg className="ms-4 me-3" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M12.1401 0.034686C5.4457 0.034686 0 5.48038 0 12.1748C0 18.8692 5.4457 24.3149 12.1401 24.3149C14.1866 24.3149 16.1984 23.8293 17.898 22.8927C18.0341 23.0566 18.185 23.2075 18.3489 23.3437L21.8175 26.8123C22.1378 27.1726 22.5283 27.4638 22.9652 27.6678C23.4021 27.8717 23.876 27.9843 24.3579 27.9985C24.8399 28.0127 25.3196 27.9282 25.7677 27.7503C26.2158 27.5723 26.6228 27.3047 26.9638 26.9638C27.3047 26.6228 27.5723 26.2158 27.7503 25.7677C27.9282 25.3196 28.0127 24.8399 27.9985 24.3579C27.9843 23.876 27.8717 23.4021 27.6678 22.9652C27.4638 22.5283 27.1727 22.1378 26.8123 21.8175L23.3437 18.3489C23.1747 18.1799 22.9887 18.0287 22.7887 17.898C23.7252 16.1984 24.3149 14.2213 24.3149 12.1401C24.3149 5.4457 18.8692 0 12.1748 0L12.1401 0.034686ZM12.1401 3.50328C16.9614 3.50328 20.8116 7.35343 20.8116 12.1748C20.8116 14.4641 19.9791 16.5799 18.5223 18.1408C18.4876 18.1755 18.4529 18.2101 18.4183 18.2448C18.2544 18.381 18.1035 18.5319 17.9673 18.6957C16.4412 20.0832 14.36 20.881 12.1054 20.881C7.28406 20.881 3.43391 17.0308 3.43391 12.2095C3.43391 7.38811 7.28406 3.53797 12.1054 3.53797L12.1401 3.50328Z" fill="#6E7377" />
                    </svg>
                    <input id="searchbar" onBlur={() => changeFocus(false)} onFocus={() => changeFocus(true)} onChange={(e) => onSearchChange(e)} onKeyDown={(e) => handleSearch(e)} className="form-control border-0 py-2 focus-ring" type="search" placeholder="Buscar un proyecto o escribir el correo de algún miembro"></input>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col">
                    <div id="filtersList" className="d-flex flex-wrap gap-2"></div>
                </div>
                <hr className="m-0 mt-2"></hr>
            </div>

            <div className="row">
                <ul className="nav nav-underline d-flex flex-inline justify-content-center">
                    <li key="0" className="nav-item me-5">
                        <button id="0" onClick={() => handleAreaClick("0")} className="nav-link text-dark active">Todo</button>
                    </li>
                    {areas.map(area => 
                        <li key={area.id} className="nav-item me-5">
                            <button id={area.id} onClick={() => handleAreaClick(area.id)} className="nav-link text-dark">{area.titulo}</button>
                        </li>
                    )}
                </ul>
                <hr className="m-0"></hr>
            </div>
        </>
    );
}