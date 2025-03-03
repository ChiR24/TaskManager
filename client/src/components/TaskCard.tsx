
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface TaskCardProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  onToggleComplete: (id: number, completed: boolean) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TaskCard({
  id,
  title,
  description,
  completed,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start gap-2 space-y-0 pb-2">
        <Checkbox
          checked={completed}
          onCheckedChange={(checked) => 
            onToggleComplete(id, checked === true)
          }
          className="mt-1"
        />
        <div className="space-y-1 flex-1">
          <h3 className={`font-semibold leading-none tracking-tight ${completed ? 'line-through text-muted-foreground' : ''}`}>
            {title}
          </h3>
        </div>
      </CardHeader>
      <CardContent>
        <p className={`text-sm ${completed ? 'text-muted-foreground line-through' : ''}`}>
          {description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => onEdit(id)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" size="sm" onClick={() => onDelete(id)} className="text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
