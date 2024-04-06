"use client"

import React, {useRef, useState} from 'react'
import Link from 'next/link'
import Image from "next/image"
import '../globals.css';
import {useRouter} from "next/navigation"

import {AlertContainer, create_alert} from "@/components/Alerts"
import {EstructuraFormularios} from "@/components/Estructura"
import Loading from "@/components/Loading"

import {check_email, check_password} from "@/utils/validation"
import {signin} from "@/api/v1/auth"


export default function Profile() {
    return (
        <div className="container-fluid p-5 d-flex flex-column" style={{height: '100vh'}}>
            <div className="row d-flex align-items-center p-2 mb-4">
                {/* Columna principal */}
                <div className="col-md-6">
                    <h1 className="display-3 ms-extrabold">Enrique Trigo</h1>
                    <p className="ms-button fs-3">enrique.trigo@live.u-tad.com</p>
                    <p className="ms-regular fs-5 mt-1">
                        Breve descripción del alumno (no más de 280 caracteres)
                        It is a long established fact that a reader will be distracted by the
                        readable content of a page when looking at its layout. The point of
                        using Lorem Ipsum is that it has a more-or-less normal distribution.
                    </p>

                    <div>
                        <Image src="/icons/enlace.svg" alt="enlace.svg" width={0} height={0}
                               className="d-start w-auto h-auto"/>
                        <Link href="google.com" rel="stylesheet">URL(portfolio, linkedin, insta)</Link>
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary  ms-button mt-3 px-3"
                        onClick={() => {/*crerProyecto()*/
                        }}>
                        NUEVO PROYECTO
                    </button>

                    <button
                        type="button"
                        className="btn border-black border-1 ms-button mt-3 ms-3 px-4"
                        onClick={() => {/*editarProyecto()*/
                        }}>
                        EDITAR PERFIL
                    </button>

                </div>

                {/* Columna secundaria */}
                <div className="col-md-6 d-flex justify-content-end">
                    <Image src="/images/perfil.png" alt="profile" width={350} height={300}/>
                </div>
            </div>

            <div className="row p-2 mb-4">
                <Link href="/proyectos-subidos">
                    <button className="col-md-2 style-none">Proyectos Subidos</button>
                </Link>
                <Link href="/solicitudes-pendientes">
                    <button className="col-md-2 ms-4">Solicitudes pendientes</button>
                </Link>
                <hr/>
            </div>

        </div>


    );


}