"use client";

import { Button } from "@/ui/button";
import { ScrollArea } from "@/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";
import { Head, Link } from "@inertiajs/react";
import {
    ChevronRightIcon,
    LayoutDashboardIcon,
    LogOutIcon,
    MenuIcon,
    SettingsIcon,
    UserCircleIcon,
    UsersIcon,
} from "lucide-react";
import { PropsWithChildren, useState } from "react";

export interface DashboardBreadcrumbs {
    name: string;
    target: string;
}
export default function AdminLayout({
    breadcrumbs,
    children,
    withoutTitlePage,
    title,
}: PropsWithChildren<{
    title: string;
    withoutTitlePage?: boolean;
    breadcrumbs?: DashboardBreadcrumbs[];
}>) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.theme = isDarkMode ? "light" : "dark";
        document.documentElement.classList.toggle("dark", isDarkMode);
    };

    const Sidebar = ({ isOpen = true }: { isOpen?: boolean }) => (
        <div className="flex h-full flex-col">
            <div className="flex items-center p-4">
                <svg
                    className="h-8 w-8 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12 2L2 7l10 5 10-5-10-5Z" />
                    <path d="m2 17 10 5 10-5M2 12l10 5 10-5" />
                </svg>
                {isOpen && (
                    <span className="ml-2 text-xl font-bold">Admin Panel</span>
                )}
            </div>
            <ScrollArea className="flex-grow">
                <nav className={`space-y-2 ${isOpen ? "p-4" : "p-2"}`}>
                    <Link
                        className={`flex items-center space-x-2 rounded-lg ${
                            isOpen ? "px-3 py-2" : "px-3 py-3"
                        } text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-300`}
                        href={route("dashboard")}
                    >
                        <LayoutDashboardIcon className="h-5 w-5" />
                        {isOpen && <span>Dashboard</span>}
                    </Link>
                    <Link
                        className={`flex items-center space-x-2 rounded-lg ${
                            isOpen ? "px-3 py-2" : "px-3 py-3"
                        } text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-300`}
                        href={route("admin.users")}
                    >
                        <UsersIcon className="h-5 w-5" />
                        {isOpen && <span>Users</span>}
                    </Link>
                    <Link
                        className={`flex items-center space-x-2 rounded-lg ${
                            isOpen ? "px-3 py-2" : "px-3 py-3"
                        } text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-300`}
                        href={route("profile.edit")}
                    >
                        <SettingsIcon className="h-5 w-5" />
                        {isOpen && <span>Settings</span>}
                    </Link>
                </nav>
            </ScrollArea>
            <div className="p-4">
                <Link
                    href={route("logout")}
                    method="post"
                    className="w-full "
                    as="button"
                >
                    <Button
                        className="w-full dark:text-red-200 dark:bg-red-900 hover:opacity-80 transition duration-150"
                        variant="outline"
                    >
                        <LogOutIcon className="mr-2 h-4 w-4" />
                        {isOpen && "Logout"}
                    </Button>
                </Link>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <Head title={title} />
            {/* Sidebar for larger screens */}
            <aside
                className={`bg-white dark:bg-slate-900 ${
                    isSidebarOpen ? "w-64" : "w-16"
                } hidden transition-all duration-300 ease-in-out lg:block`}
            >
                <Sidebar isOpen={isSidebarOpen} />
            </aside>

            {/* Sidebar for mobile screens */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-4 z-50 lg:hidden"
                    >
                        <MenuIcon className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                    <Sidebar />
                </SheetContent>
            </Sheet>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">
                <header className="flex items-center justify-between bg-white p-4 shadow dark:bg-slate-800">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSidebar}
                            className="hidden lg:flex"
                        >
                            <MenuIcon className="h-6 w-6" />
                        </Button>
                        <nav className="flex" aria-label="Breadcrumb">
                            <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400">
                                {title}
                            </h3>
                        </nav>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleDarkMode}
                    >
                        {isDarkMode ? (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M19.5 14.5l-4-4 4-4M19.5 10.5l-4 4 4 4M19.5 16.5l-4-4 4-4" />
                            </svg>
                        ) : (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M4.219 14.5l4-4 4 4M4.219 10.5l4 4 4-4M4.219 16.5l4-4 4 4" />
                            </svg>
                        )}
                    </Button>
                </header>
                <div className="p-6">
                    <div className="max-w-4xl space-y-6 ">
                        <ol className="flex items-center space-x-2">
                            {breadcrumbs?.map((item, index) => (
                                <li className="flex items-center">
                                    <Link
                                        className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
                                        href={item.target}
                                    >
                                        {item.name}
                                    </Link>
                                    {index < breadcrumbs.length - 1 && (
                                        <ChevronRightIcon className="mx-2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                                    )}
                                </li>
                            ))}
                        </ol>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
