import Image from 'next/image';

export default function ProjectCard({ project, onClick }) {
    return (
        <div className="col col-lg-3 col-sm-6 col-12 col-md-4 mb-4">
            <div className="shadow card border-0 rounded h-100" onClick={() => onClick(project.id)}>
                <div className="h-75 position-relative">
                    <Image
                        src={project.portada.startsWith('http') ? project.portada : `https://api.reservorio-u-tad.com${project.portada}`}
                        className="card-image-top w-100 h-100 position-relative object-fit-cover border rounded-top"
                        layout="fill"
                        alt="Project Image"
                    />
                </div>
                <div className="card-body d-flex flex-column justify-content-end">
                    <h5 className="card-title fw-bold">{project.titulo}</h5>
                    <p className="card-text text-secondary-emphasis">{project.usuarios.nombre_completo}</p>
                    {
                        project.estado === 'rechazado'
                            ? <span className="badge bg-danger">Denegado</span>
                            : project.estado === 'pendiente'
                                ? <span className="badge bg-warning">Pendiente</span>
                                : null
                    }
                </div>
            </div>
        </div>
    )
}