"use client"

import {useState} from 'react'
import {useRouter} from "next/navigation"
import Loading from "@/components/Loading"
import {validate} from "@/api/v1/auth"
import Image from "next/image";

export default function RecoverPassword({params}) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    if (loading) return <Loading/>

    return (
        <div className={'d-flex flex-row justify-content-center vh-100'}>
            <div className='d-flex flex-column align-items-center justify-content-center gap-3'>
                <p className={"ms-bold w-50"}>Finalizar inscripción</p>

                <p className='ms-font fs-5 lead w-50'>
                    Paso 4 de 4. Para completar el proceso, haga clic en el siguiente botón para validar su cuenta y acceder a Reservorio U-tad
                </p>

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
                    VALIDAR CUENTA
                </button>
            </div>
        </div>
    )
}
