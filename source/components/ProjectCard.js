export default function ProjectCard({project, onClick}) {
    return (
        <div className="col col-lg-3 col-sm-6 col-12 col-md-4 mb-4">
            <div className="shadow card border-0 rounded h-100" onClick={() => onClick(project.id)}>
                {/* <img src={`https://api.reservorio-u-tad.com${project.portada}`} className="card-image-top border rounded-top" alt="Project Image"/> */}
                <img src={`https://api.reservorio-u-tad.com${project.portada}`} className="card-image-top border rounded-top object-fit-cover h-75" alt="Project Image"/>
                <div className="card-body d-flex flex-column justify-content-end">
                    <h5 className="card-title fw-bold">{project.titulo}</h5>
                    <p className="card-text text-secondary-emphasis">{project.usuarios.nombre_completo}</p>
                </div>
            </div>
        </div>
    );
}