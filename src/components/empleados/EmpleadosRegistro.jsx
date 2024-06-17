import React from "react";
import { useForm } from "react-hook-form";

export default function EmpleadosRegistro({
    AccionABMC,
    Items,
    Item,
    Grabar,
    Cancelar
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({ values: Item });

    const onSubmit = (data) => {
        Grabar(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">

                <fieldset disabled={AccionABMC === "C"}>

                    {/* campo nombre */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="ApellidoYNombre">
                                Nombre<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("ApellidoYNombre", {
                                    required: { value: true, message: "Nombre es requerido" },
                                    minLength: {
                                        value: 4,
                                        message: "Nombre debe tener al menos 4 caracteres",
                                    },
                                    maxLength: {
                                        value: 55,
                                        message: "Nombre debe tener como máximo 55 caracteres",
                                    },
                                })}
                                autoFocus
                                className={
                                    "form-control " + (errors?.Nombre ? "is-invalid" : "")
                                }
                            />
                            {errors?.Nombre && touchedFields.Nombre && (
                                <div className="invalid-feedback">
                                    {errors?.Nombre?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* campo fecha de nacimiento */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="FechaNacimiento">
                                Fecha de Nacimiento<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="date"
                                {...register("FechaNacimiento", {
                                    required: { value: true, message: "Fecha de Nacimiento es requerido" },
                                })}
                                className={
                                    "form-control " + (errors?.FechaNacimiento ? "is-invalid" : "")
                                }
                            />
                            {errors?.FechaNacimiento && touchedFields.FechaNacimiento && (
                                <div className="invalid-feedback">
                                    {errors?.FechaNacimiento?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/*campo Dni */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Dni">
                                Dni<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="integer"
                                {...register("Dni", {
                                    required: { value: true, message: "Dni es requerido" },
                                    minLength: {
                                        value: 7,
                                        message: "Dni debe tener al menos 7 caracteres",
                                    },
                                    maxLength: {
                                        value: 8,
                                        message: "Dni debe tener como máximo 8 caracteres",
                                    },
                                })}
                                className={
                                    "form-control " + (errors?.Dni ? "is-invalid" : "")
                                }
                            />
                            {errors?.Dni && touchedFields.Dni && (
                                <div className="invalid-feedback">
                                    {errors?.Dni?.message}
                                </div>
                            )}
                        </div>
                    </div>


                    {/* campo suspendido */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Suspendido">
                                Suspendido<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                type="boolean"
                                {...register("Suspendido", {
                                    required: { value: true, message: "Suspendido es requerido" },
                                })}
                                className={
                                    "form-control " + (errors?.Suspendido ? "is-invalid" : "")
                                }
                            >
                                <option value={null}></option>
                                <option value={false}>NO</option>
                                <option value={true}>SI</option>
                            </select>
                            {errors?.Suspendido && touchedFields.Suspendido && (
                                <div className="invalid-feedback">
                                    {errors?.Suspendido?.message}
                                </div>
                            )}
                        </div>
                    </div>
                </fieldset>

                {/* Botones */}
                <hr />
                <div className="row justify-content-center">
                    <div className="col text-center botones">
                        {AccionABMC !== "C" && (
                            <button type="submit" className="btn btn-primary">
                                <i className="fa fa-check"></i> Grabar
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => Cancelar()}
                        >
                            <i className="fa fa-arrow-left"></i>
                            {AccionABMC !== "C" ? "Volver" : "Cancelar"}
                        </button>
                    </div>
                </div>

                {/* texto: Revisar los datos ingresados... */}
                {!isValid && isSubmitted && (
                    <div className="row alert alert-danger mensajesAlert">
                        <i className="fa fa-exclamation-sign"></i>
                        Revisar los datos ingresados...
                    </div>
                )}

            </div>
        </form>
    );
}      