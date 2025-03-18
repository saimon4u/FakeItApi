import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export function SignIn({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {

	const [formData, setFormData] = useState({ email: "", password: ""});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if(localStorage.getItem("isAuthenticated") === "true"){
			navigate("/dashboard");
		}
	}, [])


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch("http://localhost:3000/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await response.json();
			
			if(!response.ok){
				toast.error(data.message);
				return;
			};
			
			localStorage.setItem("accessToken", data.accessToken);
			localStorage.setItem("isAuthenticated", "true");
			toast.success(data.message, {description: "Welcome back!"});
			navigate("/dashboard");
		} catch (err: any) {
			toast.error(err.message || "Signin failed");
		} finally {
			setLoading(false);
		}
	};




	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className={cn("flex flex-col gap-6 shadow-2xl", className)} {...props}>
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl text-center">Sign In</CardTitle>
							<CardDescription className="text-center">
								Enter your email below to login to your account
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit}>
								<div className="flex flex-col gap-6">
									<div className="grid gap-2">
										<Label htmlFor="email">Email</Label>
										<Input
											value={formData.email}
											onChange={handleChange}
											id="email"
											type="email"
											placeholder="m@example.com"
											name="email"
										/>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="password">Password</Label>
										<Input
											value={formData.password}
											onChange={handleChange}
											name="password" 
											id="password" 
											type="password" 
										/>
									</div>
									<Button type="submit" className="w-full" disabled={loading}>
										{loading ? "Signing in..." : "Sign In"}
									</Button>
								</div>
								<div className="mt-4 text-center text-sm">
									Don&apos;t have an account?{" "}
									<a href="/signup" className="underline underline-offset-4">
										Sign up
									</a>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
