import { config } from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceEmpleados;

async function Buscar(Nombre, Activo, Pagina) {
    const resp = await httpService.get(urlResource, {
        params: { Nombre, Activo, Pagina },
    });
    return resp.data;
}

async function BuscarPorId(item) {
    const resp = await httpService.get(urlResource + "/" + item.IdEmpleado);
    return resp.data;
}

async function ActivarDesactivar(item) {
    await httpService.delete(urlResource + "/" + item.IdEmpleado);
}

async function Grabar(item) {
    if (item.IdEmpleado === 0) {
        await httpService.post(urlResource, item);
    } else {
        await httpService.put(urlResource + "/" + item.IdEmpleado, item);
    }
}

export const empleadosService = {
    Buscar,
    BuscarPorId,
    ActivarDesactivar,
    Grabar
};