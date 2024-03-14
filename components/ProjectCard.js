export default function ProjectCard({ project, onClick }) {
    return (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card border-0 h-100" onClick={() => console.log("Project clicked")}> {/* onClick={() => onClick(project.id)} */}
                {/* TODO - Implementar imagen */}
                <svg className="bd-placeholder-img card-img-top" width="100%" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
                <div className="card-body">
                    <h5 className="card-title">{project.titulo}</h5>
                    <p className="card-text">{project.usuarios.nombre_completo}</p>
                </div>
            </div>
        </div>
    );
}