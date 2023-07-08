import Sidebar from "@/components/sidebar-menu/Siderbar";

import '@/styles/dashboard.css'


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (

        <div className="dashboard-container">

            <Sidebar />

            {children}

        </div>

    )

}