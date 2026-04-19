"use client";

import { Task, TaskStatus } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Calendar, RotateCcw, CheckCircle2, Circle, Clock } from "lucide-react";

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

const statusConfig = {
  todo: {
    label: "To Do",
    color: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/50",
    icon: <Circle className="h-3 w-3 mr-1 text-amber-600 dark:text-amber-400" />,
  },
  "in-progress": {
    label: "In Progress",
    color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900/50",
    icon: <Clock className="h-3 w-3 mr-1 text-blue-600 dark:text-blue-400" />,
  },
  completed: {
    label: "Completed",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900/50",
    icon: <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-600 dark:text-emerald-400" />,
  },
};

export function TaskTable({ tasks, onEdit, onDelete, onStatusChange }: TaskTableProps) {
  return (
    <div className="rounded-[2rem] border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-black/20 transition-all duration-300">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 border-slate-100 dark:border-slate-800">
            <TableHead className="font-bold text-slate-900 dark:text-slate-100 py-5 pl-8">TASK TITLE</TableHead>
            <TableHead className="font-bold text-slate-900 dark:text-slate-100 py-5">DESCRIPTION</TableHead>
            <TableHead className="font-bold text-slate-900 dark:text-slate-100 py-5">STATUS</TableHead>
            <TableHead className="font-bold text-slate-900 dark:text-slate-100 py-5">DUE DATE</TableHead>
            <TableHead className="font-bold text-slate-900 dark:text-slate-100 py-5 pr-8 text-right">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => {
            const config = statusConfig[task.status];
            return (
              <TableRow key={task.id} className="group hover:bg-indigo-50/30 dark:hover:bg-indigo-900/20 transition-colors border-slate-50 dark:border-slate-800/50">
                <TableCell className="py-5 pl-8">
                  <span className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {task.title}
                  </span>
                </TableCell>
                <TableCell className="max-w-xs py-5">
                  <p className="text-slate-500 dark:text-slate-400 truncate text-[13px] font-bold" title={task.description}>
                    {task.description}
                  </p>
                </TableCell>
                <TableCell className="py-5">
                  <Badge className={`${config.color} border font-bold px-3 py-1 rounded-full shadow-sm whitespace-nowrap`}>
                    {config.icon}
                    {config.label}
                  </Badge>
                </TableCell>
                <TableCell className="py-5">
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-[13px] font-bold">
                    <Calendar className="h-3.5 w-3.5 mr-1.5 opacity-50" />
                    {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </TableCell>
                <TableCell className="py-5 pr-8 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <div className="relative">
                      <select
                        value={task.status}
                        onChange={(e) => onStatusChange(task.id, e.target.value as Task["status"])}
                        className="text-[12px] font-bold border-none bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-xl px-4 py-2 appearance-none focus:ring-0 transition-all cursor-pointer pr-8 text-slate-700 dark:text-slate-300"
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <RotateCcw className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 opacity-30 pointer-events-none text-slate-500 dark:text-slate-400" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(task)}
                      className="h-9 w-9 p-0 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all text-slate-500 dark:text-slate-400"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(task.id)}
                      className="h-9 w-9 p-0 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-600 dark:hover:text-red-400 transition-all text-slate-500 dark:text-slate-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
