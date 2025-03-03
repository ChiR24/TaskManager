import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
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
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">Task Manager</CardTitle>
            <Button
              onClick={() => {
                setEditingTask(null);
                setIsFormOpen(true);
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-20 w-full animate-pulse rounded-lg bg-muted"
                  />
                ))}
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
