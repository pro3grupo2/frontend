export default function Filters({ onSearchChange, handleSearch, handleAreaClick }) {
    function changeFocus(focused) {
        let changeBorder = document.getElementById("changeBorder");

        let removeClass = (!focused) ? "border-primary" : "border-black";
        let classBorder = (!focused) ? "border-black" : "border-primary";

        changeBorder.classList.remove(removeClass);
        changeBorder.classList.add(classBorder);
    }

    function onFiltersClicked() {
        let filter = document.getElementById("filters");
        // filters.classList.replace("col", "col-6") || filters.classList.replace("col-6", "col");
        filter.classList.replace("col", "col-1") || filter.classList.replace("col-1", "col");
        let filters = document.getElementsByClassName("filterButtons");
        for (let i = 0; i < filters.length; i++) {
            filters[i].classList.toggle("visually-hidden");
        }
    }

    return (
        <>
            <div className="row mb-5">
                <div id="filters" className="col-1 py-2 border border-black border-2 rounded me-3">
                    <div className="row d-flex justify-content-around align-items-center h-100">
                        <div onClick={onFiltersClicked} className="col">
                            <div className="row d-flex justify-content-around align-items-center">
                                <span className="col">Filtro</span>
                                <svg className="col" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
                                    <path d="M3 7H15V5H3M0 0V2H18V0M7 12H11V10H7V12Z" fill="black" />
                                </svg>
                            </div>
                        </div>
                        <div className="col filterButtons me-3 visually-hidden">
                            <div className="dropdown border border-black border-2 rounded w-100 h-100">
                                <button className="btn dropdown-toggle w-100 h-100 no-border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Filtro 1
                                </button>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item">Action</button></li>
                                    <li><button className="dropdown-item">Another action</button></li>
                                    <li><button className="dropdown-item">Something else here</button></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col filterButtons me-3 visually-hidden">
                            <div className="dropdown border border-black border-2 rounded w-100 h-100">
                                <button className="btn dropdown-toggle w-100 h-100 no-border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Filtro 2
                                </button>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item">Action</button></li>
                                    <li><button className="dropdown-item">Another action</button></li>
                                    <li><button className="dropdown-item">Something else here</button></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col filterButtons me-3 visually-hidden">
                            <div className="dropdown border border-black border-2 rounded w-100 h-100">
                                <button className="btn dropdown-toggle w-100 h-100 no-border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Filtro 3
                                </button>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item">Action</button></li>
                                    <li><button className="dropdown-item">Another action</button></li>
                                    <li><button className="dropdown-item">Something else here</button></li>
                                </ul>
                            </div>
                        </div>
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
                <ul className="nav nav-underline d-flex flex-inline justify-content-center">
                    <li className="nav-item me-5">
                        <button id="area-todo" onClick={() => handleAreaClick("area-todo")} className="nav-link text-dark active">TODO</button>
                    </li>
                    <li className="nav-item me-5">
                        <button id="area-anim" onClick={() => handleAreaClick("area-anim")} className="nav-link text-dark">ANIMACION</button>
                    </li>
                    <li className="nav-item me-5">
                        <button id="area-didi" onClick={() => handleAreaClick("area-didi")} className="nav-link text-dark">DISEÑO DIGITAL</button>
                    </li>
                    <li className="nav-item me-5">
                        <button id="area-ing" onClick={() => handleAreaClick("area-ing")} className="nav-link text-dark">INGENIERIA Y CIENCIAS</button>
                    </li>
                    <li className="nav-item me-5">
                        <button id="area-vid" onClick={() => handleAreaClick("area-vid")} className="nav-link text-dark">VIDEOJUEGOS</button>
                    </li>
                </ul>
                <hr className="m-0"></hr>
            </div>

            <div className="row">
                <div className="col">
                    <div className="d-flex flex-wrap gap-2">
                        {/* <span className="btn btn-outline-dark rounded-pill me-2">
                            Filtro <span className="ms-3" aria-hidden="true">&times;</span>
                        </span>
                        <span className="btn btn-outline-dark rounded-pill me-2">
                            Filtro <span className="ms-3" aria-hidden="true">&times;</span>
                        </span> */}
                    </div>
                </div>
                {/* <hr className="m-3"></hr> */}
            </div>
        </>
    );
}