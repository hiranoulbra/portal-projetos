import { Header } from "@/components/header"

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex items-center h-screen flex-col">
            <Header  />
            <div className="flex max-w-6xl flex-wrap p-4">
                {children}
            </div>
        </div>

    )
}
