"use client";

import { useState, useEffect } from "react";
import { Task, TaskStatus } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutDashboard, Calendar, FileText, Type } from "lucide-react";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id">) => void;
  editingTask?: Task | null;
}

export function TaskFormModal({ isOpen, onClose, onSubmit, editingTask }: TaskFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo" as TaskStatus,
    dueDate: "",
  });

  useEffect(() => {
    if (editingTask && isOpen) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
        dueDate: editingTask.dueDate,
      });
    } else if (!editingTask && isOpen) {
      setFormData({
        title: "",
        description: "",
        status: "todo",
        dueDate: "",
      });
    }
  }, [editingTask, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] rounded-[2rem] border-white/60 bg-white/90 backdrop-blur-xl shadow-2xl p-0 overflow-hidden">
        <div className="p-8">
          <DialogHeader className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 rounded-xl">
                <LayoutDashboard className="h-5 w-5 text-indigo-600" />
              </div>
              <DialogTitle className="text-2xl font-bold text-slate-900">
                {editingTask ? "Update Task" : "Create New Task"}
              </DialogTitle>
            </div>
            <DialogDescription className="text-slate-500 text-base">
              {editingTask ? "Make changes to your task details below." : "Enter the details for your new mission."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Type className="h-4 w-4 text-indigo-500" />
                  TASK TITLE
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g. Design Dashboard"
                  required
                  className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-indigo-500" />
                  DESCRIPTION
                </label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Briefly describe the task..."
                  required
                  className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm font-bold text-slate-700">STATUS</label>
                  <Select value={formData.status} onValueChange={(value) => handleChange("status", value as TaskStatus)}>
                    <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white transition-all font-medium">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="dueDate" className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-indigo-500" />
                    DUE DATE
                  </label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleChange("dueDate", e.target.value)}
                    required
                    className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-4 flex sm:justify-between items-center gap-4">
              <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl font-bold text-slate-500 h-12 px-6">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white h-12 px-8 font-bold shadow-lg shadow-indigo-100 transition-all flex-1 sm:flex-none">
                {editingTask ? "Save Changes" : "Create Task"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
