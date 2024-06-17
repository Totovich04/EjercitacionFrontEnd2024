import React, { useState, useEffect } from 'react';
import moment from 'moment';
import EmpleadosBuscar from './EmpleadosBuscar';
import EmpleadosListado from './EmpleadosListado';
import EmpleadosRegistro from './EmpleadosRegistro';
import { empleadosService } from '../../services/empleados.service';
import modalDialogService from '../../services/modalDialog.service';


function Empleados() {
    const TituloAccionABMC = {
        A: '(Agregar)',
        B: '(Eliminar)',
        M: '(Modificar)',
        C: '(Consultar)',
        L: '(Listado)',
    };
    const [AccionABMC, setAccionABMC] = useState('L');

    const [ApellidoYNombre, setNombre] = useState('');
    const [Suspendido, setSuspendido] = useState('');

    const [Items, setItems] = useState(null);
    const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
    const [RegistrosTotal, setRegistrosTotal] = useState(0);
    const [Pagina, setPagina] = useState(1);
    const [Paginas, setPaginas] = useState([]);

    // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
    useEffect(() => {
        async function BuscarEmpleados() {
            let data = await empleadosService.Buscar();
            setItems(data);
        }
        BuscarEmpleados();
    }, []);

    async function Buscar(_pagina) {
        if (_pagina && _pagina !== Pagina) {
            setPagina(_pagina);
        }
        // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
        else {
            _pagina = Pagina;
        }
        modalDialogService.BloquearPantalla(true);
        const data = await empleadosService.Buscar(ApellidoYNombre, Suspendido, _pagina);
        modalDialogService.BloquearPantalla(false);
        setItems(data.Items);
        setRegistrosTotal(data.RegistrosTotal);

        //generar array de las páginas para mostrar en select del paginador
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
            arrPaginas.push(i);
        }
        setPaginas(arrPaginas);
    }

    async function BuscarPorId(item, accionABMC) {
        const data = await empleadosService.BuscarPorId(item);
        setItem(data);
        setAccionABMC(accionABMC);
    }

    function Consultar(item) {
        BuscarPorId(item, 'C');
    }

    function Editar(item) {
        if (!item.Suspendido) {
            modalDialogService.Alert('No se puede editar un empleado suspendido');
            return;
        }
        BuscarPorId(item, 'M');
    }

    async function Agregar() {
        setAccionABMC('A');
        setItem({
            IdEmpleado: 0,
            ApellidoYNombre: '',
            FechaNacimiento: '',
            Dni: '',
            Suspendido: false,
        });
    }

    async function ActivarDesactivar(item) {
        modalDialogService.Confirm('¿Está seguro de ' + (item.Suspendido ? 'activar' : 'desactivar') + ' este empleado?', async () => {
            await empleadosService.ActivarDesactivar(item);
            await Buscar();
        });
    }

    async function Grabar(item) {
        try {
            await empleadosService.Grabar(item)
                ;
        } catch (error) {
            modalDialogService.Alert('Ocurrió un error al intentar grabar el empleado');
            return
        }

        modalDialogService.Alert('Empleado grabado correctamente');

        setTimeout(() => {
            modalDialogService.Alert(
                "Registro " +
                (AccionABMC === "A" ? "agregado" : "modificado") +
                " correctamente."
            );
        }, 0);
    }

    function Cancelar() {
        setAccionABMC('L');
    }
    return (
        <div>
            <div className="tituloPagina">
                Empleados {TituloAccionABMC[AccionABMC]}
            </div>
            {AccionABMC === 'L' && (
                <EmpleadosBuscar
                    Nombre={ApellidoYNombre}
                    setNombre={setNombre}
                    Suspendido={Suspendido}
                    setSuspendido={setSuspendido}
                    Buscar={Buscar}
                    Agregar={Agregar}

                />
            )}

            {AccionABMC === "L" && Items?.length > 0 && (
                <EmpleadosListado
                    {...{
                        Items,
                        Consultar,
                        Editar,
                        ActivarDesactivar,
                        Pagina,
                        RegistrosTotal,
                        Paginas,
                        Buscar,
                    }}
                />
            )}
            {AccionABMC === "L" && Items?.length === 0 && (
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    No se encontraron registros...
                </div>
            )}

            {AccionABMC !== "L" && (
                <EmpleadosRegistro
                    {...{ AccionABMC, Items, Item, Grabar, Cancelar }}
                />
            )}
        </div>
    );
}
export { Empleados };