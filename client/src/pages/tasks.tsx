import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2, CheckCircle2, Circle, Clock } from "lucide-react";
import { type Task } from "@shared/schema";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";

export default function Tasks() {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  const stats = {
    total: tasks?.length || 0,
    completed: tasks?.filter(t => t.completed).length || 0,
    pending: tasks?.filter(t => !t.completed).length || 0
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

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Your Tasks</h2>
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
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <TaskList
                tasks={tasks || []}
                onEdit={(task) => {
                  setEditingTask(task);
                  setIsFormOpen(true);
                }}
              />
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