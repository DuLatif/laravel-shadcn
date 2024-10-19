import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import AdminLayout, { DashboardBreadcrumbs } from "@/Layouts/AdminLayout";

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const breadcrumbs: DashboardBreadcrumbs[] = [
        {
            name: "Dashboard",
            target: route("dashboard"),
        },
        {
            name: "Settings",
            target: "#",
        },
    ];
    return (
        <AdminLayout title="Settings" breadcrumbs={breadcrumbs}>
            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className="max-w-xl"
                />
            </div>

            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                <UpdatePasswordForm className="max-w-xl" />
            </div>

            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                <DeleteUserForm className="max-w-xl" />
            </div>
        </AdminLayout>
    );
}
