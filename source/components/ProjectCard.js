export default function ProjectCard({project, onClick}) {
    console.log(project);
    return (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card border-0 h-100" onClick={() => onClick(project.id)}>
                <img src={`https://api.reservorio-u-tad.com${project.portada}`} alt="Project Image" style={{width: "100%", height: "300px"}}/>
                <div className="card-body">
                    <h5 className="card-title">{project.titulo}</h5>
                    <p className="card-text">{project.usuarios.nombre_completo}</p>
                </div>
            </div>
        </div>
    );
}