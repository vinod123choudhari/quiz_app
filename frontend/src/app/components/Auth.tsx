import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import { GraduationCap } from "lucide-react";
import {
  hashPassword, getUsers, saveUsers, setSession,
  validateEmail, validatePassword,
} from "../store";

export function Auth({ onAuth }: { onAuth: (email: string) => void }) {
  const [tab, setTab] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState("");

  async function onRegister(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (name.trim().length < 2) return setErr("Please enter your name.");
    if (!validateEmail(email)) return setErr("Enter a valid email.");
    if (!validatePassword(pw)) return setErr("Password must be at least 6 characters.");
    if (pw !== pw2) return setErr("Passwords do not match.");
    const users = getUsers();
    if (users.some(u => u.email === email)) return setErr("Email already registered.");
    const passwordHash = await hashPassword(pw);
    users.push({ name: name.trim(), email, passwordHash });
    saveUsers(users);
    setSession(email);
    onAuth(email);
  }

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!validateEmail(email)) return setErr("Enter a valid email.");
    const users = getUsers();
    const u = users.find(x => x.email === email);
    if (!u) return setErr("No account with this email.");
    const ph = await hashPassword(pw);
    if (ph !== u.passwordHash) return setErr("Incorrect password.");
    setSession(email);
    onAuth(email);
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 size-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
            <GraduationCap />
          </div>
          <CardTitle>QuizMaster</CardTitle>
          <CardDescription>Learn, test, and track your progress</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={onLogin} className="space-y-3 mt-4">
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
                </div>
                <div className="space-y-1.5">
                  <Label>Password</Label>
                  <Input type="password" value={pw} onChange={e => setPw(e.target.value)} />
                </div>
                {err && <Alert variant="destructive"><AlertDescription>{err}</AlertDescription></Alert>}
                <Button type="submit" className="w-full">Login</Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={onRegister} className="space-y-3 mt-4">
                <div className="space-y-1.5">
                  <Label>Name</Label>
                  <Input value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Password</Label>
                  <Input type="password" value={pw} onChange={e => setPw(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Confirm Password</Label>
                  <Input type="password" value={pw2} onChange={e => setPw2(e.target.value)} />
                </div>
                {err && <Alert variant="destructive"><AlertDescription>{err}</AlertDescription></Alert>}
                <Button type="submit" className="w-full">Create account</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
