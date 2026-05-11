import { useEffect, useMemo, useState } from "react";
import { Question, Level, Subject, Topic } from "../data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { CheckCircle2, XCircle, Sparkles, Clock, ArrowLeft } from "lucide-react";
import { addResult, markComplete, QuizResult } from "../store";

function generateAIExplanation(q: Question, wasCorrect: boolean) {
  const base = q.explanation || "This is a key concept worth reviewing.";
  const prefix = wasCorrect
    ? "Great job! Here's why this is correct: "
    : "Let's understand this better: ";
  return prefix + base;
}

function answersEqual(q: Question, user: any): boolean {
  if (q.type === "match") {
    const ans = q.answer as Record<string, string>;
    return Object.keys(ans).every(k => ans[k] === user?.[k]);
  }
  return user === q.answer;
}

type Props = {
  subject: Subject;
  topic: Topic;
  level: Level | "Final";
  email: string;
  onExit: () => void;
};

export function Quiz({ subject, topic, level, email, onExit }: Props) {
  const isFinal = level === "Final";
  const questions: Question[] = useMemo(
    () => isFinal ? [...topic.finalTest] : [...topic.levels[level as Level]],
    [topic, level, isFinal]
  );
  const totalSeconds = isFinal ? Math.max(60, questions.length * 30) : 0;

  const [i, setI] = useState(0);
  const [userAns, setUserAns] = useState<any>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ correct: boolean; user: any }[]>([]);
  const [done, setDone] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    if (!isFinal || done) return;
    if (timeLeft <= 0) { finish(); return; }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, isFinal, done]);

  const q = questions[i];

  function check() {
    if (userAns == null && q.type !== "match") return;
    if (q.type === "match" && (!userAns || Object.keys(userAns).length !== (q.pairs?.length || 0))) return;
    const correct = answersEqual(q, userAns);
    setChecked(true);
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, { correct, user: userAns }]);
  }

  function next() {
    if (i + 1 >= questions.length) finish();
    else {
      setI(i + 1);
      setUserAns(null);
      setChecked(false);
    }
  }

  function finishFinalImmediate() {
    // For final test, we don't show instant feedback — just record and advance
    const correct = answersEqual(q, userAns);
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, { correct, user: userAns }]);
    if (i + 1 >= questions.length) {
      finish(correct ? score + 1 : score, [...answers, { correct, user: userAns }]);
    } else {
      setI(i + 1);
      setUserAns(null);
    }
  }

  function finish(finalScore?: number, finalAnswers?: { correct: boolean; user: any }[]) {
    const s = finalScore ?? score;
    const result: QuizResult = {
      id: `${Date.now()}`,
      date: Date.now(),
      subjectId: subject.id,
      topicId: topic.id,
      level,
      score: s,
      total: questions.length,
      durationSec: Math.round((Date.now() - startTime) / 1000),
    };
    addResult(email, result);
    const passed = s / questions.length >= 0.6;
    if (passed) markComplete(email, subject.id, topic.id, level);
    setDone(true);
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const passed = pct >= 60;
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Results — {topic.name} ({level})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-6">
              <div className="text-6xl mb-2">{passed ? "🎉" : "📘"}</div>
              <div className="text-3xl">{score} / {questions.length}</div>
              <div className="text-muted-foreground">{pct}%</div>
              <Badge className="mt-2" variant={passed ? "default" : "secondary"}>
                {passed ? "Passed — level unlocked!" : "Try again to unlock the next level"}
              </Badge>
            </div>
            <Progress value={pct} />
            <Button className="w-full" onClick={onExit}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onExit}><ArrowLeft className="size-4 mr-1" />Exit</Button>
        <div className="flex items-center gap-3">
          {isFinal && (
            <Badge variant="destructive" className="gap-1">
              <Clock className="size-3" />
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
            </Badge>
          )}
          <Badge variant="secondary">Score: {score}</Badge>
        </div>
      </div>
      <Progress value={((i) / questions.length) * 100} />
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline">{q.type === "mcq" ? "Multiple Choice" : q.type === "tf" ? "True / False" : "Match"}</Badge>
            <span className="text-sm text-muted-foreground">Question {i + 1} / {questions.length}</span>
          </div>
          <CardTitle className="mt-2">{q.q}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {q.type === "mcq" && (
            <RadioGroup value={userAns ?? ""} onValueChange={setUserAns} disabled={checked}>
              {q.options!.map(opt => (
                <div key={opt} className="flex items-center gap-2 border rounded-md p-3">
                  <RadioGroupItem value={opt} id={opt} />
                  <Label htmlFor={opt} className="flex-1 cursor-pointer">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
          {q.type === "tf" && (
            <div className="grid grid-cols-2 gap-2">
              {[true, false].map(v => (
                <Button
                  key={String(v)}
                  variant={userAns === v ? "default" : "outline"}
                  onClick={() => !checked && setUserAns(v)}
                  disabled={checked}
                >
                  {v ? "True" : "False"}
                </Button>
              ))}
            </div>
          )}
          {q.type === "match" && (
            <div className="space-y-2">
              {q.pairs!.map(p => (
                <div key={p.left} className="grid grid-cols-2 gap-2 items-center">
                  <div className="border rounded-md p-2 bg-muted">{p.left}</div>
                  <select
                    className="border rounded-md p-2 bg-background"
                    disabled={checked}
                    value={userAns?.[p.left] ?? ""}
                    onChange={e => setUserAns({ ...(userAns || {}), [p.left]: e.target.value })}
                  >
                    <option value="">Select...</option>
                    {q.pairs!.map(o => <option key={o.right} value={o.right}>{o.right}</option>)}
                  </select>
                </div>
              ))}
            </div>
          )}

          {checked && !isFinal && (
            <Alert variant={answers[answers.length - 1]?.correct ? "default" : "destructive"}>
              {answers[answers.length - 1]?.correct
                ? <CheckCircle2 className="size-4" />
                : <XCircle className="size-4" />}
              <AlertTitle>
                {answers[answers.length - 1]?.correct ? "Correct!" : "Incorrect"}
              </AlertTitle>
              <AlertDescription className="space-y-1 mt-1">
                <div><strong>Your answer:</strong> {formatAns(q, userAns)}</div>
                <div><strong>Correct answer:</strong> {formatAns(q, q.answer)}</div>
                <div className="flex gap-2 mt-2 items-start">
                  <Sparkles className="size-4 mt-0.5 text-purple-500" />
                  <span className="text-sm">{generateAIExplanation(q, answers[answers.length - 1]?.correct)}</span>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            {!isFinal && !checked && <Button onClick={check} className="flex-1">Submit Answer</Button>}
            {!isFinal && checked && <Button onClick={next} className="flex-1">{i + 1 >= questions.length ? "Finish" : "Next Question"}</Button>}
            {isFinal && <Button onClick={finishFinalImmediate} className="flex-1" disabled={userAns == null}>{i + 1 >= questions.length ? "Submit Test" : "Next"}</Button>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function formatAns(q: Question, a: any): string {
  if (a == null) return "(no answer)";
  if (q.type === "tf") return a ? "True" : "False";
  if (q.type === "match") {
    return Object.entries(a).map(([k, v]) => `${k} → ${v}`).join(", ");
  }
  return String(a);
}
