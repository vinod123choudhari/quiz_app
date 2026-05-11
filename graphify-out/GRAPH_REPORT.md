# Graph Report - .  (2026-05-11)

## Corpus Check
- Corpus is ~31,351 words - fits in a single context window. You may not need a graph.

## Summary
- 393 nodes · 740 edges · 28 communities (26 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Quiz Data Model|Quiz Data Model]]
- [[_COMMUNITY_Interactive UI Controls|Interactive UI Controls]]
- [[_COMMUNITY_Input & Layout Components|Input & Layout Components]]
- [[_COMMUNITY_Dialog  Alert Components|Dialog / Alert Components]]
- [[_COMMUNITY_Avatar  Breadcrumb UI|Avatar / Breadcrumb UI]]
- [[_COMMUNITY_App Routing & Auth|App Routing & Auth]]
- [[_COMMUNITY_Command Palette|Command Palette]]
- [[_COMMUNITY_Menu Bar|Menu Bar]]
- [[_COMMUNITY_Context Menu|Context Menu]]
- [[_COMMUNITY_Dropdown Menu|Dropdown Menu]]
- [[_COMMUNITY_Carousel Component|Carousel Component]]
- [[_COMMUNITY_Form Handling|Form Handling]]
- [[_COMMUNITY_Charts & Analytics|Charts & Analytics]]
- [[_COMMUNITY_Drawer UI|Drawer UI]]
- [[_COMMUNITY_Sheet UI|Sheet UI]]
- [[_COMMUNITY_Select Dropdown|Select Dropdown]]
- [[_COMMUNITY_Navigation Menu|Navigation Menu]]
- [[_COMMUNITY_Sidebar Layout|Sidebar Layout]]
- [[_COMMUNITY_Design Guidelines|Design Guidelines]]
- [[_COMMUNITY_Backend Express App|Backend Express App]]
- [[_COMMUNITY_Separator UI|Separator UI]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 223 edges
2. `buttonVariants` - 9 edges
3. `Button()` - 8 edges
4. `Alert()` - 5 edges
5. `useCarousel()` - 5 edges
6. `useFormField()` - 5 edges
7. `Label()` - 5 edges
8. `useSidebar()` - 5 edges
9. `addResult()` - 4 edges
10. `getProgress()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `AccordionItem()` --calls--> `cn()`  [EXTRACTED]
  frontend/src/app/components/ui/accordion.tsx → frontend/src/app/components/ui/utils.ts
- `AccordionTrigger()` --calls--> `cn()`  [EXTRACTED]
  frontend/src/app/components/ui/accordion.tsx → frontend/src/app/components/ui/utils.ts
- `AccordionContent()` --calls--> `cn()`  [EXTRACTED]
  frontend/src/app/components/ui/accordion.tsx → frontend/src/app/components/ui/utils.ts
- `AlertDialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  frontend/src/app/components/ui/alert-dialog.tsx → frontend/src/app/components/ui/utils.ts
- `AlertDialogContent()` --calls--> `cn()`  [EXTRACTED]
  frontend/src/app/components/ui/alert-dialog.tsx → frontend/src/app/components/ui/utils.ts

## Communities (28 total, 2 thin omitted)

### Community 0 - "Quiz Data Model"
Cohesion: 0.06
Nodes (48): Level, LEVELS, QType, Question, Subject, SUBJECTS, Topic, addResult() (+40 more)

### Community 1 - "Interactive UI Controls"
Cohesion: 0.06
Nodes (19): AccordionContent(), AccordionItem(), AccordionTrigger(), Checkbox(), HoverCardContent(), InputOTP(), InputOTPGroup(), InputOTPSlot() (+11 more)

### Community 2 - "Input & Layout Components"
Cohesion: 0.08
Nodes (28): Input(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup(), SidebarGroupAction(), SidebarGroupContent() (+20 more)

### Community 3 - "Dialog / Alert Components"
Cohesion: 0.1
Nodes (18): AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay(), AlertDialogTitle() (+10 more)

### Community 4 - "Avatar / Breadcrumb UI"
Cohesion: 0.14
Nodes (20): Avatar(), AvatarFallback(), AvatarImage(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage() (+12 more)

### Community 5 - "App Routing & Auth"
Cohesion: 0.11
Nodes (9): router, AuthPage(), Dashboard(), SUBJECTS, LandingPage(), Layout(), QUESTIONS_DB, QuizPage() (+1 more)

### Community 6 - "Command Palette"
Cohesion: 0.12
Nodes (14): Command(), CommandGroup(), CommandInput(), CommandItem(), CommandList(), CommandSeparator(), CommandShortcut(), Dialog() (+6 more)

### Community 7 - "Menu Bar"
Cohesion: 0.12
Nodes (11): Menubar(), MenubarCheckboxItem(), MenubarContent(), MenubarItem(), MenubarLabel(), MenubarRadioItem(), MenubarSeparator(), MenubarShortcut() (+3 more)

### Community 8 - "Context Menu"
Cohesion: 0.12
Nodes (9): ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut(), ContextMenuSubContent() (+1 more)

### Community 9 - "Dropdown Menu"
Cohesion: 0.12
Nodes (9): DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut(), DropdownMenuSubContent() (+1 more)

### Community 10 - "Carousel Component"
Cohesion: 0.19
Nodes (13): Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext(), CarouselOptions (+5 more)

### Community 11 - "Form Handling"
Cohesion: 0.2
Nodes (11): FormControl(), FormDescription(), FormFieldContext, FormFieldContextValue, FormItem(), FormItemContext, FormItemContextValue, FormLabel() (+3 more)

### Community 12 - "Charts & Analytics"
Cohesion: 0.22
Nodes (8): ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), THEMES, useChart()

### Community 13 - "Drawer UI"
Cohesion: 0.18
Nodes (6): DrawerContent(), DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerTitle()

### Community 14 - "Sheet UI"
Cohesion: 0.18
Nodes (7): Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle()

### Community 15 - "Select Dropdown"
Cohesion: 0.18
Nodes (7): SelectContent(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator(), SelectTrigger()

### Community 16 - "Navigation Menu"
Cohesion: 0.22
Nodes (9): NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuTrigger(), navigationMenuTriggerStyle (+1 more)

### Community 17 - "Sidebar Layout"
Cohesion: 0.33
Nodes (6): Sidebar(), SidebarMenuButton(), sidebarMenuButtonVariants, SidebarRail(), SidebarTrigger(), useSidebar()

### Community 18 - "Design Guidelines"
Cohesion: 0.33
Nodes (5): Button, Design system guidelines, General guidelines, Usage, Variants

## Knowledge Gaps
- **32 isolated node(s):** `express`, `app`, `QType`, `LEVELS`, `SUBJECTS` (+27 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Avatar / Breadcrumb UI` to `Quiz Data Model`, `Interactive UI Controls`, `Input & Layout Components`, `Dialog / Alert Components`, `Command Palette`, `Menu Bar`, `Context Menu`, `Dropdown Menu`, `Carousel Component`, `Form Handling`, `Charts & Analytics`, `Drawer UI`, `Sheet UI`, `Select Dropdown`, `Navigation Menu`, `Sidebar Layout`, `Separator UI`?**
  _High betweenness centrality (0.646) - this node is a cross-community bridge._
- **Why does `Button()` connect `Dialog / Alert Components` to `Quiz Data Model`, `Carousel Component`, `Input & Layout Components`, `Avatar / Breadcrumb UI`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `Label()` connect `Form Handling` to `Quiz Data Model`, `Avatar / Breadcrumb UI`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `express`, `app`, `QType` to the rest of the system?**
  _32 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Quiz Data Model` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Interactive UI Controls` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Input & Layout Components` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._