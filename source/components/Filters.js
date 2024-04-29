import {get_areas} from "@/api/v1/areas"
import {useEffect, useState} from "react"
import {get_titulaciones} from "@/api/v1/titulaciones"

export default function Filters({onSearchChange, handleSearch, handleAreaClick, filters, setFilters}) {
    const
        [areas, setAreas] = useState([]),
        [asignaturas, setAsignaturas] = useState([]),
        [filters_usuario, setFilters_usuario] = useState({}),
        [filters_show, setFilters_show] = useState(true),
        [filters_input_focus, setFilters_input_focus] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')

        get_areas(token).then(data => {
            setAreas(data)
        })

        get_titulaciones(token).then(data => {
            setAsignaturas(data)
        })
    }, [])

    console.log(filters_usuario)
    return (
        <>
            <div className="d-flex flex-row flex-wrap justify-content-center gap-3">
                <div
                    onClick={() => setFilters_show(!filters_show)}
                    className="user-select-none d-flex flex-row flex-nowrap justify-content-center align-items-center gap-5 border border-black border-1 rounded p-3"
                    style={{height: 40, width: 158}}>
                    Filtro
                    {
                        filters_show
                            ?
                            (
                                Object.keys(filters_usuario).length > 0
                                    ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none">
                                        <path d="M6 13H18V11H6M3 6V8H21V6M10 18H14V16H10V18Z" fill="#0065F3"/>
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none">
                                        <path d="M6 13H18V11H6M3 6V8H21V6M10 18H14V16H10V18Z" fill="#091229"/>
                                    </svg>
                            )
                            :
                            (
                                Object.keys(filters_usuario).length > 0
                                    ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M13 18L13 6L11 6L11 18M6 21L8 21L8 3L6 3M18 14L18 10L16 10L16 14L18 14Z" fill="#0065F3"/>
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none">
                                        <path
                                            d="M13 18L13 6L11 6L11 18M6 21L8 21L8 3L6 3M18 14L18 10L16 10L16 14L18 14Z"
                                            fill="#091229"/>
                                    </svg>
                            )
                    }
                </div>

                <select
                    className={`${filters_show && 'd-none'} form-select border-black border-1 rounded`}
                    style={{height: 40, width: 158}}
                    onChange={(e) => {
                        const premiado = !!(parseInt(e.target.value))
                        setFilters({...filters, premiado: premiado})
                        setFilters_usuario({...filters_usuario, premiado: premiado ? "Premiados" : "No premiados"})
                    }}>
                    < option value={0} disabled selected>Premio</option>
                    <option value={1}>Si</option>
                    <option value={0}>No</option>
                </select>

                <select
                    className={`${filters_show && 'd-none'} form-select border-black border-1 rounded`}
                    style={{height: 40, width: 158}}
                    onChange={(e) => {
                        setFilters({...filters, titulacion: e.target.value})

                        const
                            titulacion = asignaturas.find(a => a.id === parseInt(e.target.value)).titulo,
                            index_en = titulacion.indexOf(' en '),
                            index_en_slice = index_en !== -1 ? index_en + 4 : 0

                        setFilters_usuario({...filters_usuario, titulacion: titulacion.slice(index_en_slice)})
                    }}>
                    <option key={-1} value={-1} disabled selected>Titulación</option>
                    {
                        asignaturas
                            .map(
                                asignatura =>
                                    <option key={asignatura.id} value={asignatura.id}>{asignatura.titulo}</option>
                            )
                    }
                </select>

                <input
                    type="number"
                    min={1900}
                    max={new Date().getFullYear()}
                    step={1}
                    className={`${filters_show && 'd-none'} border-black border-1 rounded text-center`}
                    style={{height: 40, width: 158}}
                    defaultValue={new Date().getFullYear()}
                    onChange={(e) => {
                        setFilters({...filters, anio: e.target.value || 0})
                        setFilters_usuario({...filters_usuario, anio: e.target.value || 0})
                    }}/>

                <div
                    className={`${filters_input_focus ? 'border-primary' : 'border-black'} flex-grow-1 d-flex flex-row flex-nowrap justify-content-start align-items-center border border-1 rounded p-3`}
                    style={{height: 40}}>
                    <svg className="ms-4 me-3" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path
                            d="M12.1401 0.034686C5.4457 0.034686 0 5.48038 0 12.1748C0 18.8692 5.4457 24.3149 12.1401 24.3149C14.1866 24.3149 16.1984 23.8293 17.898 22.8927C18.0341 23.0566 18.185 23.2075 18.3489 23.3437L21.8175 26.8123C22.1378 27.1726 22.5283 27.4638 22.9652 27.6678C23.4021 27.8717 23.876 27.9843 24.3579 27.9985C24.8399 28.0127 25.3196 27.9282 25.7677 27.7503C26.2158 27.5723 26.6228 27.3047 26.9638 26.9638C27.3047 26.6228 27.5723 26.2158 27.7503 25.7677C27.9282 25.3196 28.0127 24.8399 27.9985 24.3579C27.9843 23.876 27.8717 23.4021 27.6678 22.9652C27.4638 22.5283 27.1727 22.1378 26.8123 21.8175L23.3437 18.3489C23.1747 18.1799 22.9887 18.0287 22.7887 17.898C23.7252 16.1984 24.3149 14.2213 24.3149 12.1401C24.3149 5.4457 18.8692 0 12.1748 0L12.1401 0.034686ZM12.1401 3.50328C16.9614 3.50328 20.8116 7.35343 20.8116 12.1748C20.8116 14.4641 19.9791 16.5799 18.5223 18.1408C18.4876 18.1755 18.4529 18.2101 18.4183 18.2448C18.2544 18.381 18.1035 18.5319 17.9673 18.6957C16.4412 20.0832 14.36 20.881 12.1054 20.881C7.28406 20.881 3.43391 17.0308 3.43391 12.2095C3.43391 7.38811 7.28406 3.53797 12.1054 3.53797L12.1401 3.50328Z"
                            fill="#6E7377"/>
                    </svg>

                    <input
                        onBlur={() => setFilters_input_focus(false)}
                        onFocus={() => setFilters_input_focus(true)}
                        onChange={(e) => onSearchChange(e)}
                        onKeyDown={(e) => handleSearch(e)}
                        className="form-control border-0 py-2 focus-ring h-100"
                        type="search"
                        placeholder="Buscar un proyecto o escribir el correo de algún miembro"/>
                </div>
            </div>

            <div className="d-flex flex-row flex-wrap justify-content-start align-items-center gap-2 pt-3">
                {
                    Object.keys(filters_usuario)
                        .map(
                            (key, index) =>
                                <div>
                                    <span
                                        className="btn btn-primary rounded-pill px-4"
                                        key={index}
                                        onClick={() => {
                                            const
                                                new_filters = {...filters},
                                                new_filters_usuario = {...filters_usuario}

                                            delete new_filters[key]
                                            delete new_filters_usuario[key]

                                            setFilters(new_filters)
                                            setFilters_usuario(new_filters_usuario)
                                        }}>
                                        {filters_usuario[key]}
                                        <span className="ms-3" aria-hidden="true">&times;</span>
                                    </span>
                                </div>
                        )
                }
            </div>


            <ul className="nav nav-underline d-flex flex-row justify-content-center align-items-center border-bottom">
                <li key="0" className="nav-item me-lg-5">
                    <button id="0" onClick={() => handleAreaClick("0")} className="nav-link text-dark active">Todo</button>
                </li>
                {
                    areas
                        .map(
                            area =>
                                <li key={area.id} className="nav-item me-lg-5">
                                    <button
                                        id={area.id}
                                        onClick={() => handleAreaClick(area.id.toString())}
                                        className="nav-link text-dark">
                                        {area.titulo}
                                    </button>
                                </li>
                        )
                }
            </ul>
        </>
    )

}