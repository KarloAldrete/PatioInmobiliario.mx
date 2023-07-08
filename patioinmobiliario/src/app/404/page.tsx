'use client';
import React from "react"

// lets use a lottie animation
import Lottie from "react-lottie"
import animationData from "@/public/6873-under-maintenance.json"

export default function Custom404() {
    return (
        <div className="page-container">
            <h1>La página que buscas no existe</h1>
            <Lottie
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: animationData,
                    rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                    },
                }}
                height={400}
                width={400}
            />
        </div>
    )
}