import { Alert, AlertDescription } from "@/ui/alert";
import { CheckCircle } from "lucide-react";

interface SuccessAlertProps {
    message: string;
}

export default function SuccessAlert({ message }: SuccessAlertProps) {
    return (
        <Alert
            variant="default"
            className="bg-green-50 dark:bg-slate-900 border-green-300 text-green-800 dark:text-green-500"
        >
            <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 " />
                <AlertDescription className="text-sm font-medium">
                    {message}
                </AlertDescription>
            </div>
        </Alert>
    );
}
