"use client";

import { useState, useEffect } from "react";
import type { TaskFilters as TaskFiltersType } from "@/lib/types";
import { TaskStatus } from "@/lib/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, SortAsc } from "lucide-react";

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFiltersChange: (filters: TaskFiltersType) => void;
}

export function TaskFilters({ filters, onFiltersChange }: TaskFiltersProps) {
  const [localFilters, setLocalFilters] = useState<TaskFiltersType>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof TaskFiltersType, value: string) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-2 lg:p-4">
      <div className="flex-1 relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
        <Input
          id="search"
          placeholder="Search by mission title..."
          value={localFilters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="w-full pl-12 h-14 bg-white/50 border-slate-200/60 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-700 placeholder:text-slate-400"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="sm:w-56 group">
          <div className="flex items-center gap-2 mb-2 ml-1">
            <Filter className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <span className="text-xs font-bold text-slate-500 group-focus-within:text-indigo-600 transition-colors uppercase tracking-wider">Status</span>
          </div>
          <Select
            value={localFilters.status}
            onValueChange={(value) => handleFilterChange("status", value as TaskStatus | "all")}
          >
            <SelectTrigger className="h-14 bg-white/50 border-slate-200/60 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-slate-700">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-slate-100 shadow-xl p-1">
              <SelectItem value="all" className="rounded-xl focus:bg-indigo-50 focus:text-indigo-600 font-medium">All Status</SelectItem>
              <SelectItem value="todo" className="rounded-xl focus:bg-indigo-50 focus:text-indigo-600 font-medium">To Do</SelectItem>
              <SelectItem value="in-progress" className="rounded-xl focus:bg-indigo-50 focus:text-indigo-600 font-medium">In Progress</SelectItem>
              <SelectItem value="completed" className="rounded-xl focus:bg-indigo-50 focus:text-indigo-600 font-medium">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="sm:w-56 group">
          <div className="flex items-center gap-2 mb-2 ml-1">
            <SortAsc className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <span className="text-xs font-bold text-slate-500 group-focus-within:text-indigo-600 transition-colors uppercase tracking-wider">Sort Order</span>
          </div>
          <Select
            value={`${localFilters.sortBy}-${localFilters.sortOrder}`}
            onValueChange={(value) => {
              const [sortBy, sortOrder] = value.split("-");
              handleFilterChange("sortBy", sortBy as "dueDate" | "title");
              handleFilterChange("sortOrder", sortOrder as "asc" | "desc");
            }}
          >
            <SelectTrigger className="h-14 bg-white/50 border-slate-200/60 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-slate-700">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-slate-100 shadow-xl p-1">
              <SelectItem value="dueDate-asc" className="rounded-xl focus:bg-indigo-50 focus:text-indigo-600 font-medium">Due Date (Earliest)</SelectItem>
              <SelectItem value="dueDate-desc" className="rounded-xl focus:bg-indigo-50 focus:text-indigo-600 font-medium">Due Date (Latest)</SelectItem>
              <SelectItem value="title-asc" className="rounded-xl focus:bg-indigo-50 focus:text-indigo-600 font-medium">Title (A-Z)</SelectItem>
              <SelectItem value="title-desc" className="rounded-xl focus:bg-indigo-50 focus:text-indigo-600 font-medium">Title (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
