"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Task, TaskFilters } from "@/lib/types";
import { storage } from "@/lib/storage";
import { filterAndSortTasks, generateTaskId } from "@/lib/taskUtils";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { TaskCard } from "@/components/task/TaskCard";
import { TaskTable } from "@/components/task/TaskTable";
import { TaskFormModal } from "@/components/task/TaskFormModal";
import { TaskFilters as TaskFiltersComponent } from "@/components/task/TaskFilters";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  Plus, 
  LogOut, 
  LayoutDashboard, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  LayoutGrid,
  List
} from "lucide-react";

const ITEMS_PER_PAGE = 5;

export default function DashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({
    status: "all",
    search: "",
    sortBy: "dueDate",
    sortOrder: "asc",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  useEffect(() => {
    const storedTasks = storage.getTasks();
    const isOutdated = storedTasks.some(t => t.dueDate.includes("2024") || t.dueDate.includes("2025"));
    
    if (storedTasks.length === 0 || isOutdated) {
      const samples: Task[] = [
        { id: "1", title: "Core System Architecture", description: "Design the fundamental structural blocks of the dashboard ecosystem.", status: "completed", dueDate: "2026-04-20" },
        { id: "2", title: "Vibrant UI Refinement", description: "Implement high-fidelity transitions and glassmorphism elements.", status: "in-progress", dueDate: "2026-04-25" },
        { id: "3", title: "Auth Flow Implementation", description: "Secure the dashboard with persistent session management.", status: "todo", dueDate: "2026-05-02" },
        { id: "4", title: "Data Synchronization", description: "Bridge the frontend state with the localized persistence layer.", status: "todo", dueDate: "2026-05-15" },
        { id: "5", title: "Edge Case Validation", description: "Run stress tests on the sorting and filtering engine.", status: "todo", dueDate: "2026-05-28" },
        { id: "6", title: "Visual Polish & UX", description: "Audit the micro-interactions for a superior user experience.", status: "in-progress", dueDate: "2026-06-10" },
        { id: "7", title: "Production Deployment", description: "Finalize build optimizations and deploy to the cloud.", status: "todo", dueDate: "2026-07-01" },
      ];
      storage.saveTasks(samples);
      setTasks(samples);
    } else {
      setTasks(storedTasks);
    }
    
    const storedFilters = storage.getFilters();
    setFilters(storedFilters);
  }, []);

  const filteredTasks = useMemo(() => {
    const filtered = filterAndSortTasks(tasks, filters);
    storage.setFilters(filters);
    return filtered;
  }, [tasks, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const stats = useMemo(() => ({
    total: tasks.length,
    todo: tasks.filter(t => t.status === "todo").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    completed: tasks.filter(t => t.status === "completed").length,
  }), [tasks]);

  const handleCreateTask = (taskData: Omit<Task, "id">) => {
    const newTask: Task = { ...taskData, id: generateTaskId() };
    storage.addTask(newTask);
    setTasks((prev) => [...prev, newTask]);
    setIsModalOpen(false);
  };

  const handleUpdateTask = (taskData: Omit<Task, "id">) => {
    if (!editingTask) return;
    storage.updateTask(editingTask.id, taskData);
    setTasks((prev) => prev.map((t) => (t.id === editingTask.id ? { ...t, ...taskData } : t)));
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId: string) => {
    storage.deleteTask(taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleStatusChange = (taskId: string, status: Task["status"]) => {
    storage.updateTask(taskId, { status });
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status } : t)));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    storage.clearAuth();
    router.push("/login");
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-white dark:bg-[#0a0a0c] relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[30rem] h-[30rem] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-[30rem] h-[30rem] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

        <header className="sticky top-0 z-40 w-full border-b bg-white/40 dark:bg-[#0a0a0c]/40 backdrop-blur-2xl border-slate-200 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/40">
                  <LayoutDashboard className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-black tracking-tight dark:text-white">
                  ABHINAND 
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <div className="hidden lg:flex flex-col items-end mr-2">
                  <span className="text-sm font-bold dark:text-white">
                    {storage.getAuth().email?.split('@')[0]}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{storage.getAuth().email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 dark:text-slate-400 font-bold"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard label="Total" value={stats.total} icon={<LayoutDashboard className="h-5 w-5 text-indigo-600" />} color="indigo" />
            <StatCard label="To Do" value={stats.todo} icon={<Circle className="h-5 w-5 text-amber-600" />} color="amber" />
            <StatCard label="Progress" value={stats.inProgress} icon={<Clock className="h-5 w-5 text-blue-600" />} color="blue" />
            <StatCard label="Done" value={stats.completed} icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />} color="emerald" />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Your Tasks</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and track your project tasks efficiently.</p>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-6 rounded-2xl shadow-xl shadow-indigo-200 dark:shadow-indigo-900/20 transition-all transform hover:-translate-y-1"
            >
              <Plus className="h-5 w-5 mr-1" />
              <span className="font-semibold">Add New Task</span>
            </Button>
          </div>

          <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl p-2 sm:p-4 mb-8 border border-white/60 dark:border-slate-800/60 shadow-xl shadow-slate-200/50 dark:shadow-black/20">
            <TaskFiltersComponent filters={filters} onFiltersChange={setFilters} />
          </div>

          <div className="flex justify-end gap-2 mb-4">
             <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setViewMode("table")} 
                className={`rounded-lg ${viewMode === 'table' ? 'bg-white dark:bg-slate-800 shadow-sm' : ''}`}
              >
                <List className="h-4 w-4 mr-2" />
                Table
             </Button>
             <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setViewMode("grid")} 
                className={`rounded-lg ${viewMode === 'grid' ? 'bg-white dark:bg-slate-800 shadow-sm' : ''}`}
              >
                <LayoutGrid className="h-4 w-4 mr-2" />
                Grid
             </Button>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="text-center py-24 bg-white/50 dark:bg-slate-900/50 rounded-[2rem] border border-dashed border-slate-300 dark:border-slate-700">
              <LayoutDashboard className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No tasks found</h3>
              <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or add a new task.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} onStatusChange={handleStatusChange} />
                  ))}
                </div>
              ) : (
                <>
                  <div className="md:hidden grid gap-6">
                    {paginatedTasks.map((task) => (
                      <TaskCard key={task.id} task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} onStatusChange={handleStatusChange} />
                    ))}
                  </div>
                  <div className="hidden md:block transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
                    <TaskTable tasks={paginatedTasks} onEdit={handleEditTask} onDelete={handleDeleteTask} onStatusChange={handleStatusChange} />
                  </div>
                </>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800 mt-8">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredTasks.length)} of {filteredTasks.length} tasks
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className="rounded-xl border-slate-200 dark:border-slate-800 h-10 w-10 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={`h-10 w-10 rounded-xl ${
                            currentPage === page 
                              ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                              : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400"
                          }`}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="rounded-xl border-slate-200 dark:border-slate-800 h-10 w-10 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          <TaskFormModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingTask(null); }} onSubmit={editingTask ? handleUpdateTask : handleCreateTask} editingTask={editingTask} />
        </main>
      </div>
    </AuthGuard>
  );
}

function StatCard({ label, value, icon, color }: { label: string, value: number, icon: React.ReactNode, color: string }) {
  const colors: Record<string, string> = {
    indigo: "bg-indigo-50/50 dark:bg-indigo-500/5 border-indigo-100 dark:border-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-indigo-500/5",
    amber: "bg-amber-50/50 dark:bg-amber-500/5 border-amber-100 dark:border-amber-500/10 text-amber-600 dark:text-amber-400 shadow-amber-500/5",
    blue: "bg-blue-50/50 dark:bg-blue-500/5 border-blue-100 dark:border-blue-500/10 text-blue-600 dark:text-blue-400 shadow-blue-500/5",
    emerald: "bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-emerald-500/5",
  };
  
  return (
    <div className={`p-6 rounded-3xl border ${colors[color]} transition-all duration-300 bg-white/40 dark:bg-black/20 backdrop-blur-md shadow-xl`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-2xl bg-white dark:bg-white/5 shadow-inner">
          {icon}
        </div>
        <span className="text-3xl font-black tracking-tighter dark:text-white">{value}</span>
      </div>
      <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-60 leading-tight">{label}</p>
    </div>
  );
}
