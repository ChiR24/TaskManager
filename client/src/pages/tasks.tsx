import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import { type Task } from "@shared/schema";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";

export default function Tasks() {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Task Manager</h1>
          <p className="mt-2 text-muted-foreground">
            Organize your tasks efficiently
          </p>
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
              className="bg-primary/90 hover:bg-primary"
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