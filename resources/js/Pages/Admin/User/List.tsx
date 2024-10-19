import InputError from "@/Components/InputError";
import { useToast } from "@/hooks/use-toast";
import AdminLayout, { DashboardBreadcrumbs } from "@/Layouts/AdminLayout";
import PaginationSection from "@/sections/PaginationSection";
import { PageProps, PaginationResponse, TUser, User } from "@/types";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/ui/alert-dialog";
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

    const handleDelete = (id: number, user: string) => {
        destroy(route("admin.users.destroy", id.toString()), {
            onFinish: () => {
                toast({
                    title: `${user} deleted`,
                    description: `${user} deleted successfully.`,
                });
            },
        });
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        setIsLoading(true);
        post(route("admin.users.store"), {
            onSuccess: () => {
                setIsLoading(false);
                setIsDialogOpen(false);
                setData({
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                });
                toast({
                    title: `${data.name} added`,
                    description: `${data.name} created successfully`,
                });
            },
        });
    };

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
                        <Dialog
                            open={isDialogOpen}
                            onOpenChange={setIsDialogOpen}
                        >
                            <DialogTrigger asChild>
                                <Button>
                                    <UserPlus className="mr-2 h-4 w-4" /> Create
                                    User
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[625px]">
                                <DialogHeader>
                                    <DialogTitle>Create New User</DialogTitle>
                                    <DialogDescription>
                                        Add a new user to your organization.
                                        Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={submit} className="space-y-8">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            name="name"
                                            placeholder="John Doe"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="user@example.com"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="role">Role</Label>
                                        <Select
                                            value={data.role}
                                            onValueChange={(e) =>
                                                setData("role", e as TUser)
                                            }
                                            required
                                        >
                                            <SelectTrigger
                                                className="col-span-3"
                                                id="role"
                                            >
                                                <SelectValue placeholder="Select Role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={"admin"}>
                                                    Admin
                                                </SelectItem>
                                                <SelectItem value={"user"}>
                                                    User
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.role}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex space-x-4">
                                        <div className="space-y-2 flex-1">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                placeholder="Enter a strong password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.password}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="space-y-2 flex-1">
                                            <Label htmlFor="password">
                                                Password Confirmation
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password_confirmation"
                                                placeholder="Enter a strong password"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "Creating..."
                                            : "Create User"}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
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
                                        <Button
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
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        Delete{" "}
                                                    </span>
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Hapus {user.name}
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Tindakan ini tidak dapat
                                                        dibatalkan. Ini akan
                                                        menghapus pengguna "
                                                        {user.name} secara
                                                        permanen dan
                                                        menghapusnya dari server
                                                        kami.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Batal
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() =>
                                                            handleDelete(
                                                                user.id,
                                                                user.name
                                                            )
                                                        }
                                                        className="dark:bg-red-700 dark:hover:bg-red-900  text-white"
                                                    >
                                                        Hapus
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
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
