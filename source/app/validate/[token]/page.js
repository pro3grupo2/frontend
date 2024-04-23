"use client"

import { useState } from 'react'
import { useRouter } from "next/navigation"
import Loading from "@/components/Loading"
import { validate } from "@/api/v1/auth"

export default function RecoverPassword({ params }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    if (loading) return <Loading />

    return (
        <div className='d-flex flex-column align-items-center justify-content-evenly' style={{ minHeight: '60vh' }}>
            <p className='ms-font fs-5 lead text-center w-50'>
                Ya estas casi listo para comenzar a usar nuestra plataforma, para validar tu cuenta solo debes hacer click en el siguiente botón.
            </p>

            <button
                type='button'
                disabled={loading}
                onClick={async () => {
                    setLoading(true)

                    const data = await validate(params.token)
                    if (!data) return router.push('/signup')
                    router.push('/signin')
                }}
                className='btn btn-primary border-5 ms-button p-3 w-50' style={{ minWidth: "fit-content" }}>
                VALIDAR CUENTA
            </button>
        </div>
    )
}
