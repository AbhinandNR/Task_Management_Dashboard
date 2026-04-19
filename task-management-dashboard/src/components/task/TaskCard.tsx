"use client";

import { Task, TaskStatus } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Calendar, RotateCcw, CheckCircle2, Circle, Clock } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

const statusConfig = {
  todo: {
    label: "To Do",
    color: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/50",
    icon: <Circle className="h-3 w-3 mr-1" />,
  },
  "in-progress": {
    label: "In Progress",
    color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900/50",
    icon: <Clock className="h-3 w-3 mr-1" />,
  },
  completed: {
    label: "Completed",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900/50",
    icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
  },
};

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const config = statusConfig[task.status];

  return (
    <Card className="w-full relative overflow-hidden group border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-[2rem] shadow-lg shadow-slate-200/40 dark:shadow-black/20 hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/20 transition-all duration-300">
      <div className={`absolute top-0 left-0 w-1 h-full ${task.status === 'todo' ? 'bg-amber-400' : task.status === 'in-progress' ? 'bg-blue-400' : 'bg-emerald-400'}`}></div>
      
      <CardHeader className="pb-2 pt-6">
        <div className="flex items-start justify-between">
          <Badge className={`${config.color} border font-semibold px-3 py-1 rounded-full shadow-sm`}>
            {config.icon}
            {config.label}
          </Badge>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="h-8 w-8 p-0 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-slate-500 dark:text-slate-400"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 p-0 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors text-slate-500 dark:text-slate-400"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 pb-6 pt-2">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {task.title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm line-clamp-2 leading-relaxed font-medium">
            {task.description}
          </p>
        </div>
        
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center text-slate-400 dark:text-slate-500 text-[13px] font-bold">
            <Calendar className="h-4 w-4 mr-1.5 opacity-70" />
            {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="w-full relative">
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value as Task["status"])}
              className="w-full text-sm font-bold border-none bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl px-4 py-2.5 appearance-none focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer text-slate-700 dark:text-slate-300"
            >
              <option value="todo">Move to To Do</option>
              <option value="in-progress">Set to In Progress</option>
              <option value="completed">Mark as Completed</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
              <RotateCcw className="h-3 w-3 dark:text-slate-400" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
