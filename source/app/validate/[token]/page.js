"use client"

import {useEffect} from 'react'
import {useRouter} from "next/navigation"
import {validate} from "@/api/v1/auth";
import Loading from "@/components/Loading";

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

    return <Loading/>
}
