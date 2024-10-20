import { useToast } from "@/hooks/use-toast";
import { User } from "@/types";
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
import { Button } from "@/ui/button";
import { useForm } from "@inertiajs/react";
import { Trash2 } from "lucide-react";

export interface DeleteUserDialogProps {
    user: User;
}
export default function DeleteUserDialog({ user }: DeleteUserDialogProps) {
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

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete </span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus {user.name}</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Ini akan menghapus
                        pengguna "{user.name} secara permanen dan menghapusnya
                        dari server kami.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => handleDelete(user.id, user.name)}
                        className="dark:bg-red-700 dark:hover:bg-red-900  text-white"
                    >
                        Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
