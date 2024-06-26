"use client"

import React, {useState, useEffect} from 'react'

import {AuthProvider} from "@/context/authContext"

import Footer from '@/components/Footer'
import NavBar from "@/components/NavBar"

import '../globals.css'
import '../../styles/Profile.css'

import {help_texts} from "@/lang"
import Loading from "@/components/Loading";

function HelpComponent() {
    const [showFAQ, setShowFAQ] = useState(true)

    const toggleFAQ = () => {
        setShowFAQ(true)
    }

    const toggleAbout = () => {
        setShowFAQ(false)
    }

    const help_json = help_texts(localStorage.getItem('lang') ?? 'EN')

    return (
        <>
            <div className="container-fluid mb-5">
                <div className="bg-white row ms-5">
                    <h1 className="fw-bold display-4 col-12 m-0 pt-4 px-3">{help_json.title}</h1>
                </div>

                <div>
                    <div className="d-flex flex-column flex-sm-row gap-sm-5 mt-4 ps-sm-5 border-bottom color-secundario-gris">
                        <button className={`btn btn-custom ${showFAQ ? 'btn-active' : ''}`} onClick={toggleFAQ}>
                            {help_json.button_1_text}
                        </button>
                        <button className={`btn btn-custom ${!showFAQ ? 'btn-active' : ''}`} onClick={toggleAbout}>
                            {help_json.button_2_text}
                        </button>
                    </div>
                </div>

                {showFAQ && (
                    <div className="col-12 row ps-5 pt-4">
                        <div class="col-12 col-lg-6 row">
                            <div class="col-12 row d-flex">
                                <h2 class="fw-bold col-12 m-0 px-3 py-3">
                                    {help_json.topic_1.title}</h2>
                                <h5 class="fw-bold col-12 m-0 px-3 py-3">
                                    {help_json.topic_1.question_1}</h5>
                                <p class="text-start text-secondary fs-6 fw-normal ms-font col-12 m-0 px-3 py-2">
                                    {help_json.topic_1.answer_1}</p>
                                <h5 className="fw-bold col-12 m-0 px-3 py-3">
                                    {help_json.topic_1.question_2}</h5>
                                <p class="text-start text-secondary fs-6 fw-normal ms-font col-12 m-0 px-3 py-2">
                                    {help_json.topic_1.answer_2}</p>
                                <h5 class="fw-bold col-12 m-0 px-3 py-3">
                                    {help_json.topic_1.question_3}</h5>
                                <p class="text-start text-secondary fs-6 fw-normal ms-font col-12 m-0 px-3 py-2">
                                    {help_json.topic_1.answer_3}</p>
                            </div>
                            <div class="col-12 row d-flex">
                                <h2 class="fw-bold col-12 m-0 px-3 py-3">{help_json.topic_2.title}</h2>
                                <h5 class="fw-bold col-12 m-0 px-3 py-3">
                                    {help_json.topic_2.question_1}</h5>
                                <p class="text-start text-secondary fs-6 fw-normal ms-font col-12 m-0 px-3 py-2">
                                    {help_json.topic_2.answer_1}</p>
                            </div>
                        </div>
                        <div class="col-12 col-lg-6 row">
                            <div class="col-12 row d-flex">
                                <h2 class="fw-bold col-12 m-0 px-3 py-3">{help_json.topic_3.title}</h2>
                                <h5 class="fw-bold col-12 m-0 px-3 py-3">
                                    {help_json.topic_3.question_1}</h5>
                                <p class="text-start text-secondary fs-6 fw-normal ms-font col-12 m-0 px-3 py-2">
                                    {help_json.topic_3.answer_1}</p>
                                <h5 class="fw-bold col-12 m-0 px-3 py-3">
                                    {help_json.topic_3.question_2}</h5>
                                <p class="text-start text-secondary fs-6 fw-normal ms-font col-12 m-0 px-3 py-2">
                                    {help_json.topic_3.answer_2}</p>
                            </div>
                            <div class="col-12 row d-flex">
                                <h2 class="fw-bold col-12 m-0 px-3 py-3">{help_json.topic_4.title}</h2>
                                <h5 class="fw-bold col-12 m-0 px-3 py-3">
                                    {help_json.topic_4.question_1}</h5>
                                <p class="text-start text-secondary fs-6 fw-normal ms-font col-12 m-0 px-3 py-2">
                                    {help_json.topic_4.answer_1}</p>
                            </div>
                        </div>
                    </div>
                )}

                {!showFAQ && (
                    <div id="component" className="container-fluid py-3">
                        <div className="position-relative bg-white row ps-5">
                            <h2 class="fw-bold col-12 m-0 px-3 py-3 pt-4">
                                {help_json.about.title}
                            </h2>
                            <p className="text-start text-dark fs-6 fw-normal ms-font col-12 col-lg-4 m-0 px-3 py-2 pt-1">
                                {help_json.about.paragraph_1}
                                <br/>
                                <br/>
                                {help_json.about.paragraph_2}
                                <br/>
                                <br/>
                                {help_json.about.paragraph_3}
                            </p>
                        </div>
                    </div>

                )}

            </div>

            <Footer lang={localStorage.getItem("lang") ?? "EN"}/>
        </>
    )
}

export default function Help() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return <Loading/>

    return (
        <AuthProvider redirect={false}>
            <NavBar lang={localStorage.getItem("lang") ?? "EN"}/>
            <HelpComponent/>
        </AuthProvider>
    )
}