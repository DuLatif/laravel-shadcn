import InputError from "@/Components/InputError";
import { useToast } from "@/hooks/use-toast";
import AdminLayout, { DashboardBreadcrumbs } from "@/Layouts/AdminLayout";
import PaginationSection from "@/sections/PaginationSection";
import { PageProps, PaginationResponse, TUser, User } from "@/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/ui/dialog";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/ui/table";
import { useForm, usePage } from "@inertiajs/react";
import { ArrowUpDown, Pencil, Search, Trash2, UserPlus } from "lucide-react";
import { FormEventHandler, useState } from "react";
import FormCreateUser from "./FormCreate";
import DeleteUserDialog from "./DeleteUserDialog";
import FormEditUser from "./FormEdit";

const breadcrums: DashboardBreadcrumbs[] = [
    {
        name: "Dashboard",
        target: route("dashboard"),
    },
    {
        name: "Users",
        target: "#",
    },
];
export default function UserList() {
    const { users } =
        usePage<PageProps<{ users: PaginationResponse<User> }>>().props;
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const {
        data,
        post,
        delete: destroy,
        setData,
        errors,
        processing,
    } = useForm<Partial<User> & { password_confirmation: string }>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const sortedUsers = [...users.data].sort((a, b) => {
        if (!sortColumn) return 0;
        // @ts-ignore
        if (a[sortColumn] < b[sortColumn])
            return sortDirection === "asc" ? -1 : 1;
        // @ts-ignore
        if (a[sortColumn] > b[sortColumn])
            return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    const filteredUsers = sortedUsers.filter((user) =>
        Object.values(user).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <AdminLayout title="Users" breadcrumbs={breadcrums}>
            <Card className="w-full bg-white dark:bg-slate-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                    <CardTitle>Users</CardTitle>
                    {/* <h2 className="text-xl font-bold tracking-tight">Users</h2> */}
                    <div className="flex items-center space-x-2">
                        <Input
                            placeholder="Search users..."
                            value={searchTerm}
                            // onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                        <Button variant={"secondary"}>
                            <Search className="h-4 w-4" />
                        </Button>
                        <FormCreateUser />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    Avatar
                                </TableHead>
                                <TableHead
                                    className="cursor-pointer"
                                    onClick={() => handleSort("name")}
                                >
                                    Name{" "}
                                    {sortColumn === "name" && (
                                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                                    )}
                                </TableHead>
                                <TableHead
                                    className="cursor-pointer"
                                    onClick={() => handleSort("email")}
                                >
                                    Email{" "}
                                    {sortColumn === "email" && (
                                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                                    )}
                                </TableHead>
                                <TableHead
                                    className="cursor-pointer"
                                    onClick={() => handleSort("role")}
                                >
                                    Role{" "}
                                    {sortColumn === "role" && (
                                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                                    )}
                                </TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage
                                                src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}&backgroundColor=d1d5db`}
                                                alt={user.name}
                                            />
                                            <AvatarFallback>
                                                {user.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {user.name}
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell className="text-right">
                                        {/* <Button
                                            variant="outline"
                                            size="sm"
                                            // onClick={() => {
                                            //     setEditedId(category.id);
                                            //     setData(
                                            //         "editedName",
                                            //         category.name
                                            //     );
                                            // }}
                                        >
                                            <Pencil className="h-4 w-4" />
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </Button> */}
                                        <FormEditUser user={user} />
                                        <DeleteUserDialog user={user} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="flex justify-between w-full items-center">
                        <div className="text-xs text-muted-foreground flex-1">
                            Showing{" "}
                            <strong>
                                {users.from}-{users.to}
                            </strong>{" "}
                            of <strong>{users.total}</strong> users
                        </div>
                        <PaginationSection data={users} />
                    </div>
                </CardFooter>
            </Card>
        </AdminLayout>
    );
}
