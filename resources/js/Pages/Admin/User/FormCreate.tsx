import InputError from "@/Components/InputError";
import { useToast } from "@/hooks/use-toast";
import { TUser, User } from "@/types";
import { Button } from "@/ui/button";
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
import { useForm } from "@inertiajs/react";
import { UserPlus } from "lucide-react";
import { FormEventHandler, useState } from "react";

export default function FormCreateUser() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
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
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" /> Create User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                    <DialogDescription>
                        Add a new user to your organization. Click save when
                        you're done.
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
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="user@example.com"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select
                            value={data.role}
                            onValueChange={(e) => setData("role", e as TUser)}
                            required
                        >
                            <SelectTrigger className="col-span-3" id="role">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={"admin"}>Admin</SelectItem>
                                <SelectItem value={"user"}>User</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role} className="mt-2" />
                    </div>

                    <div className="flex space-x-4">
                        <div className="space-y-2 flex-1">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter a strong password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
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
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        {processing ? "Creating..." : "Create User"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
