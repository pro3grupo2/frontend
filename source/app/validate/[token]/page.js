"use client"

import React, {useEffect, useState} from 'react'
import {useRouter} from "next/navigation"
import Loading from "@/components/Loading"
import {validate} from "@/api/v1/auth"
import Image from "next/image"
import {AuthProvider} from "@/context/authContext"
import NavBar from "@/components/NavBar"

import {validate_texts} from "@/lang"

function ValidateComponent({params}) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    if (loading) return <Loading/>

    const validate_json = validate_texts(localStorage.getItem('lang') ?? 'EN')

    return (
        <div className={'d-flex flex-row justify-content-center vh-100'}>
            <div className='d-flex flex-column align-items-center justify-content-center gap-3'>
                <p className={"ms-bold w-50"}>{validate_json.title}</p>

                <p className='ms-font fs-5 lead w-50'>{validate_json.description}</p>

                <Image src={'/images/background/validate.svg'} alt={'validate'} width={0} height={0} style={{width: '16.93081rem', height: '12.8125rem'}}/>

                <button
                    type='button'
                    disabled={loading}
                    onClick={async () => {
                        setLoading(true)

                        const data = await validate(params.token)
                        if (!data) return router.push('/signup')
                        router.push('/signin')
                    }}
                    className='btn btn-primary border-5 ms-button p-3 w-50' style={{minWidth: "fit-content"}}>
                    {validate_json.button}
                </button>
            </div>
        </div>
    )
}

export default function Validate({params}) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return <Loading/>

    return (
        <AuthProvider redirect={false}>
            <NavBar lang={localStorage.getItem("lang") ?? "EN"}/>
            <ValidateComponent params={params}/>
        </AuthProvider>
    )
}
