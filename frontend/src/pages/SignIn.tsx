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
import { AuthService } from "@/services/api"
import { useAuth } from "@/context/AuthContext"

export function SignIn({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {

	const [formData, setFormData] = useState({ email: "", password: ""});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { login } = useAuth();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError(null);
	};


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const res = await AuthService.login(formData);
			await login(res.data.token);
		} catch (err: any) {
			setError(err.response?.data?.message || "Signup failed");
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
											required
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
											required 
										/>
									</div>
									<Button type="submit" className="w-full" disabled={loading}>
										{loading ? "Signing in..." : "Sign In"}
									</Button>
									{error && <div className="text-red-500 text-sm text-center">{error}</div>}
								</div>
								<div className="mt-4 text-center text-sm">
									Don&apos;t have an account?{" "}
									<a href="#" className="underline underline-offset-4">
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
