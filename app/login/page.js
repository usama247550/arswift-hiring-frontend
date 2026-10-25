import LoginForm from "@/components/LoginForm";

export const metadata = { title: "Log in | AR Swift Hiring" };

export default function LoginPage() {
  return (
    <main className="login">
      <div className="login-card">
        <h1>AR Swift Hiring</h1>
        <p>Enter the team password to see candidates.</p>
        <LoginForm />
      </div>
    </main>
  );
}
