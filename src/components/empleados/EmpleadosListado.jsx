import React from 'react';
import moment from 'moment';

export default function EmpleadosListado({
    Items,
    Consultar,
    Editar,
    ActivarDesactivar,
    Pagina,
    RegistrosTotal,
    Paginas,
    Buscar,
}) {
    return (
        <div className="table-responsive">
            <table className="table table-hover table-sm table-bordered table-striped">
                <thead>
                    <tr>
                        <th className="text-center">ApellidoYNombre</th>
                        <th className="text-center">Dni</th>
                        <th className="text-center">FechaNacimiento</th>
                        <th className="text-center">Suspendido</th>
                        <th className="text-center text-nowrap">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Items &&
                        Items.map((Item) => (
                            <tr key={Item.IdEmpleado}>
                                <td>{Item.ApellidoYNombre}</td>
                                <td>{Item.Dni}</td>
                                <td className="text-end">
                                    {moment(Item.FechaNacimiento).format('DD/MM/YYYY')}
                                </td>
                                <td>{Item.Suspendido ? 'SI' : 'NO'}</td>
                                <td className="text-center text-nowrap">
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        title="Consultar"
                                        onClick={() => Consultar(Item)}
                                    >
                                        <i className="fa fa-eye"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        title="Modificar"
                                        onClick={() => Editar(Item)}
                                    >
                                        <i className="fa fa-pencil"></i>
                                    </button>
                                    <button
                                        className={
                                            'btn btn-sm ' +
                                            (Item.Activo
                                                ? 'btn-outline-danger'
                                                : 'btn-outline-success')
                                        }
                                        title={Item.Activo ? 'Desactivar' : 'Activar'}
                                        onClick={() => ActivarDesactivar(Item)}
                                    >
                                        {Item.Activo ? (
                                            <i className="fa fa-ban"></i>
                                        ) : (
                                            <i className="fa fa-check"></i>
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* Paginado */}
            <div className="paginador">
                <div className='row'>
                    <div className="col">
                        <span className='pyBadge'>Registros: {RegistrosTotal}</span>
                    </div>
                    <div className="col text-center">
                        Pagina: &nbsp;
                        <select
                            value={Pagina}
                            onChange={(e) => {
                                Buscar(e.target.value);
                            }}
                        >
                            {Paginas?.map((x) => (
                                <option value={x} key={x}>
                                    {x}
                                </option>
                            ))}
                        </select>
                        &nbsp; de {Paginas?.length}
                    </div>

                </div>
            </div>
        </div>
    );
}