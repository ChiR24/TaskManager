import { useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit2, Trash2, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { type Task } from "@shared/schema";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
}

export default function TaskList({ tasks, onEdit }: TaskListProps) {
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({ title: "Task deleted successfully" });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: number; completed: boolean }) => {
      const res = await apiRequest("PATCH", `/api/tasks/${id}`, { completed });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
  });

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-primary/10 p-4">
          <PlusCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">No tasks yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Add your first task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
            task.completed 
              ? "bg-muted/50 hover:bg-muted/60" 
              : "bg-card hover:bg-card/95"
          }`}
        >
          {/* Status indicator */}
          <div
            className={`absolute left-0 top-0 h-full w-1 ${
              task.completed ? "bg-green-500/50" : "bg-orange-500/50"
            }`}
          />

          <CardHeader className="pb-2">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center pt-1">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={(checked) =>
                    toggleMutation.mutate({
                      id: task.id,
                      completed: checked as boolean,
                    })
                  }
                  className={`h-5 w-5 transition-colors ${
                    task.completed 
                      ? "border-green-500/50 text-green-500" 
                      : "border-orange-500/50"
                  }`}
                />
              </div>
              <div className="flex-1 space-y-1">
                <CardTitle
                  className={`text-lg transition-colors ${
                    task.completed
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  }`}
                >
                  {task.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {task.description}
                </CardDescription>
              </div>
              <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(task)}
                  className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate(task.id)}
                  disabled={deleteMutation.isPending}
                  className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}