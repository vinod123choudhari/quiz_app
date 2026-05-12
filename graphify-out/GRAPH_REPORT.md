# Graph Report - final_year_project  (2026-05-12)

## Corpus Check
- 87 files · ~35,939 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 530 nodes · 883 edges · 43 communities (39 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ad3b300e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 36|Community 36]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 223 edges
2. `Phase 6 — Frontend API Integration` - 12 edges
3. `buttonVariants` - 9 edges
4. `Button()` - 8 edges
5. `Quizzo — Full-Stack Implementation Plan` - 8 edges
6. `Proposed Changes` - 8 edges
7. `authMiddleware()` - 7 edges
8. `getHealthReport()` - 6 edges
9. `Phase 3 — Authentication System` - 6 edges
10. `Alert()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `AlertDialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  frontend/src/app/components/ui/alert-dialog.tsx → frontend/src/app/components/ui/utils.ts
- `AlertDialogContent()` --calls--> `cn()`  [EXTRACTED]
  frontend/src/app/components/ui/alert-dialog.tsx → frontend/src/app/components/ui/utils.ts
- `AlertDialogHeader()` --calls--> `cn()`  [EXTRACTED]
  frontend/src/app/components/ui/alert-dialog.tsx → frontend/src/app/components/ui/utils.ts
- `AlertDialogFooter()` --calls--> `cn()`  [EXTRACTED]
  frontend/src/app/components/ui/alert-dialog.tsx → frontend/src/app/components/ui/utils.ts
- `AlertDialogTitle()` --calls--> `cn()`  [EXTRACTED]
  frontend/src/app/components/ui/alert-dialog.tsx → frontend/src/app/components/ui/utils.ts

## Communities (43 total, 4 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (48): Level, LEVELS, QType, Question, Subject, SUBJECTS, Topic, addResult() (+40 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (22): Checkbox(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+14 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (42): code:block1 (Production:), code:block2 (backend/), code:prisma (generator client {), code:ts (// Auth), code:js (// New structure:), code:block6 (JWT_SECRET=<generate-a-strong-random-string>), [DELETE or DEPRECATE] [data.ts](file:///d:/final_year_project/frontend/src/app/data.ts), [DELETE or DEPRECATE] [store.ts](file:///d:/final_year_project/frontend/src/app/store.ts) (+34 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (34): Separator(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup(), SidebarGroupAction() (+26 more)

### Community 4 - "Community 4"
Cohesion: 0.13
Nodes (20): AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback(), AvatarImage(), InputOTP(), InputOTPGroup() (+12 more)

### Community 5 - "Community 5"
Cohesion: 0.1
Nodes (18): AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay(), AlertDialogTitle() (+10 more)

### Community 6 - "Community 6"
Cohesion: 0.12
Nodes (18): authMiddleware(), extractToken(), { verifyToken }, { authMiddleware }, express, router, { authMiddleware }, express (+10 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (9): router, AuthPage(), Dashboard(), SUBJECTS, LandingPage(), Layout(), QUESTIONS_DB, QuizPage() (+1 more)

### Community 8 - "Community 8"
Cohesion: 0.14
Nodes (18): checkDatabase(), checkStorage(), checkUpstash(), fs, getHealthReport(), loadEnvFromFileIfNeeded(), net, path (+10 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (14): Command(), CommandGroup(), CommandInput(), CommandItem(), CommandList(), CommandSeparator(), CommandShortcut(), Dialog() (+6 more)

### Community 10 - "Community 10"
Cohesion: 0.12
Nodes (11): Menubar(), MenubarCheckboxItem(), MenubarContent(), MenubarItem(), MenubarLabel(), MenubarRadioItem(), MenubarSeparator(), MenubarShortcut() (+3 more)

### Community 11 - "Community 11"
Cohesion: 0.12
Nodes (9): ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut(), ContextMenuSubContent() (+1 more)

### Community 12 - "Community 12"
Cohesion: 0.13
Nodes (14): Automated Tests, code:bash (curl -X POST http://localhost:4000/api/auth/register -H "Con), code:mermaid (graph TD), code:bash (npx prisma db push), code:bash (curl http://localhost:4000/health), Current State Summary, Estimated Effort, Implementation Order & Dependencies (+6 more)

### Community 13 - "Community 13"
Cohesion: 0.19
Nodes (13): Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext(), CarouselOptions (+5 more)

### Community 14 - "Community 14"
Cohesion: 0.2
Nodes (11): FormControl(), FormDescription(), FormFieldContext, FormFieldContextValue, FormItem(), FormItemContext, FormItemContextValue, FormLabel() (+3 more)

### Community 15 - "Community 15"
Cohesion: 0.22
Nodes (8): ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), THEMES, useChart()

### Community 16 - "Community 16"
Cohesion: 0.18
Nodes (6): DrawerContent(), DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerTitle()

### Community 17 - "Community 17"
Cohesion: 0.18
Nodes (7): SelectContent(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator(), SelectTrigger()

### Community 18 - "Community 18"
Cohesion: 0.18
Nodes (7): Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle()

### Community 19 - "Community 19"
Cohesion: 0.22
Nodes (9): NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuTrigger(), navigationMenuTriggerStyle (+1 more)

### Community 21 - "Community 21"
Cohesion: 0.25
Nodes (6): BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator()

### Community 22 - "Community 22"
Cohesion: 0.33
Nodes (5): Button, Design system guidelines, General guidelines, Usage, Variants

## Knowledge Gaps
- **94 isolated node(s):** `fs`, `path`, `net`, `path`, `express` (+89 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 4` to `Community 0`, `Community 1`, `Community 3`, `Community 36`, `Community 5`, `Community 9`, `Community 10`, `Community 11`, `Community 13`, `Community 14`, `Community 15`, `Community 16`, `Community 17`, `Community 18`, `Community 19`, `Community 21`?**
  _High betweenness centrality (0.354) - this node is a cross-community bridge._
- **Why does `Proposed Changes` connect `Community 2` to `Community 12`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 5` to `Community 0`, `Community 3`, `Community 4`, `Community 13`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `fs`, `path`, `net` to the rest of the system?**
  _94 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._