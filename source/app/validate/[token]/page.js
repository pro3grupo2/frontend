"use client"

import "@/styles/loading.css"

import {useEffect} from 'react'
import {useRouter} from "next/navigation"
import {validate} from "@/api/v1/auth";

export default function RecoverPassword({params}) {
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            validate(params.token).then((response) => {
                if (!response) return router.push('/signup')
                router.push('/signin')
            })
        }, 2000)
    }, [params.token])

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center h-100 w-100">

            <div className="loader">
                <div className="box box0">
                    <div></div>
                </div>
                <div className="box box1">
                    <div></div>
                </div>
                <div className="box box2">
                    <div></div>
                </div>
                <div className="box box3">
                    <div></div>
                </div>
                <div className="box box4">
                    <div></div>
                </div>
                <div className="box box5">
                    <div></div>
                </div>
                <div className="box box6">
                    <div></div>
                </div>
                <div className="box box7">
                    <div></div>
                </div>
                <div className="ground">
                    <div></div>
                </div>
            </div>
        </div>
    )
}
