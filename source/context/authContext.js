import {createContext, useContext, useEffect, useState} from "react"

import {useRouter} from "next/navigation"

import {me, signin} from "@/api/v1/auth"
import {update} from "@/api/v1/account"

export const AuthContext = createContext({})

export const AuthProvider = ({children, redirect = true}) => {
    const
        [usuario, setUsuario] = useState({}),
        [token, setToken] = useState(''),
        [signed, setSigned] = useState(false),
        router = useRouter()


    useEffect(() => {
        const
            token_ufx = localStorage.getItem('token') ?? undefined,
            usuario_ufx = JSON.parse(localStorage.getItem('usuario')) ?? undefined

        if (!token_ufx || !usuario_ufx) {
            auth_signout()
            return
        }

        setToken(token_ufx)
        setUsuario(usuario_ufx)
        setSigned(true)

        me(token_ufx) // Comprobar si el token ha expirado
            .then(data => {
                if (!data) return auth_signout() // Si ha expirado, cerrar sesión

                setUsuario(data) // Si no ha expirado, actualizar los datos del usuario
                localStorage.setItem('usuario', JSON.stringify(data))
            })
    }, [])

    const auth_signin = async (correo, password, callback = undefined) => {
        const token_signin = await signin(correo, password, callback)
        if (!token_signin) return
        setToken(token_signin)

        const usuario_signin = await me(token_signin)
        if (!usuario_signin) return auth_signout()
        setUsuario(usuario_signin)

        localStorage.setItem('token', token_signin)
        localStorage.setItem('usuario', JSON.stringify(usuario_signin))

        setSigned(true)

        router.push('/home')
    }

    const auth_signout = async () => {
        setToken('')
        localStorage.removeItem('token')

        setUsuario({})
        localStorage.removeItem('usuario')

        setSigned(false)

        if (redirect) router.push('/signin')
    }

    const account_update = async (nombre_completo, password, descripcion, portfolio, foto, promocion, callback = undefined) => {
        const data = await update(token, nombre_completo, password, descripcion, portfolio, foto, promocion, callback)
        if (!data) return

        setUsuario(data)
        localStorage.setItem('usuario', JSON.stringify(data))
    }

    return (
        <AuthContext.Provider value={{usuario, token, signed, auth_signin, auth_signout, account_update}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)