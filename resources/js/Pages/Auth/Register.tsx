import InputError from "@/Components/InputError";
import Authentication from "@/Layouts/AuthenticationLayout";
import { Alert, AlertDescription } from "@/ui/alert";
import { Button } from "@/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <Authentication>
            <Card className="w-full max-w-md mx-auto  shadow-none border-none">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">
                        Create an account
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your details to register
                    </CardDescription>
                </CardHeader>
                <form onSubmit={submit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                type="text"
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
                                placeholder="you@example.com"
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
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
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
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
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
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full">
                            Register
                        </Button>
                        <div className="text-sm text-center text-muted-foreground">
                            Already have an account?{" "}
                            <Link
                                href={route("login")}
                                className="text-primary hover:underline"
                            >
                                Log in
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </Authentication>
    );
}
