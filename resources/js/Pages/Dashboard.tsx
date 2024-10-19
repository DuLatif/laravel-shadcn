import AdminLayout, { DashboardBreadcrumbs } from "@/Layouts/AdminLayout";

export default function Dashboard() {
    const breadcrums: DashboardBreadcrumbs[] = [
        {
            name: "Home",
            target: "#",
        },
        {
            name: "Dashboard",
            target: "#",
        },
    ];
    return (
        <AdminLayout
            title="Dashboard"
            breadcrumbs={breadcrums}
            withoutTitlePage
        >
            <h1 className="text-2xl font-bold">
                Welcome to the Admin Dashboard
            </h1>
            <p className="mt-4">
                This is where you can add your main content for the admin panel.
            </p>
        </AdminLayout>
    );
}
