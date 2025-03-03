import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Loader2,
  CheckCircle2,
  Circle,
  Clock,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Task } from "@shared/schema";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { Progress } from "@/components/ui/progress";

type FilterStatus = "all" | "completed" | "pending";

export default function Tasks() {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  const stats = {
    total: tasks?.length || 0,
    completed: tasks?.filter((t) => t.completed).length || 0,
    pending: tasks?.filter((t) => !t.completed).length || 0,
  };

  const completionPercentage =
    stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  const filteredTasks = tasks
    ?.filter((task) => {
      if (filterStatus === "completed") return task.completed;
      if (filterStatus === "pending") return !task.completed;
      return true;
    })
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-4xl font-bold tracking-tight text-transparent">
            Task Manager
          </h1>
          <p className="mt-2 text-muted-foreground">
            Organize your tasks efficiently
          </p>
        </div>

        {/* Statistics Section */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="border-2 border-primary/20">
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Circle className="h-8 w-8 text-primary/80" />
            </CardContent>
          </Card>
          <Card className="border-2 border-green-500/20">
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500/80" />
            </CardContent>
          </Card>
          <Card className="border-2 border-orange-500/20">
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500/80" />
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Overall Progress</p>
            <p className="text-sm font-medium">
              {Math.round(completionPercentage)}%
            </p>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        <Card className="border-2">
          <CardHeader className="space-y-4">
            <div className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Your Tasks
                </h2>
                <p className="text-sm text-muted-foreground">
                  Manage and track your tasks
                </p>
              </div>
              <Button
                onClick={() => {
                  setEditingTask(null);
                  setIsFormOpen(true);
                }}
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select
                value={filterStatus}
                onValueChange={(value) => setFilterStatus(value as FilterStatus)}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <TaskList tasks={filteredTasks || []} onEdit={handleEdit} />
            )}
          </CardContent>
        </Card>

        <TaskForm
          task={editingTask}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
        />
      </div>
    </div>
  );
}