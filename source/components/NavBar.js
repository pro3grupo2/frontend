import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid py-3">
                <div className="navbar-brand" style={{maxWidth: '20vw', minWidth: '50px'}}>
                    <Link className="mx-2" href="/home">
                        <Image className="img-fluid" src="/images/logos/utad.svg" alt="Logo de U-tad" width={180} height={100}/>
                    </Link>
                </div>

                <div className="d-flex align-items-center mx-3">
                    <p className="ms-light m-0 fs-6 p-2">900 373 379</p>

                    <Link className="mx-2" href="/signin">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 42 42" fill="none">
                            <path
                                d="M21 1C23.5196 1 25.9359 2.00089 27.7175 3.78249C29.4991 5.56408 30.5 7.98044 30.5 10.5C30.5 13.0196 29.4991 15.4359 27.7175 17.2175C25.9359 18.9991 23.5196 20 21 20C18.4804 20 16.0641 18.9991 14.2825 17.2175C12.5009 15.4359 11.5 13.0196 11.5 10.5C11.5 7.98044 12.5009 5.56408 14.2825 3.78249C16.0641 2.00089 18.4804 1 21 1ZM21 27.25C26.6798 27.25 31.7702 28.4022 35.4037 30.219C39.0968 32.0655 41 34.432 41 36.75V41H1V36.75C1 34.432 2.90325 32.0655 6.59628 30.219C10.2298 28.4022 15.3202 27.25 21 27.25Z"
                                stroke="black" strokeWidth="2"/>
                        </svg>
                    </Link>
                    <button className="border-0 bg-transparent fs-6 fw-bold">EN</button>
                </div>
            </div>
        </nav>
    )
}