import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { useBiographies } from "~/hooks";
import type { Route } from "./+types/biographies";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Biografias - Felipe Adeildo" },
    { name: "description", content: "Lista de biografias disponíveis" },
  ];
}

export default function Biographies() {
  const { data: biographies, isLoading, error } = useBiographies();

  if (isLoading) {
    return (
      <div className="pt-16 p-4 container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Biografias</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 p-4 container mx-auto">
        <div className="text-center text-red-500">
          Erro ao carregar biografias: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 p-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Biografias</h1>

      {!biographies || biographies.length === 0 ? (
        <div className="text-center text-gray-500">
          Nenhuma biografia encontrada.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {biographies.map((biography) => (
            <Card
              key={biography.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="line-clamp-2">
                  {biography.title}
                </CardTitle>
                {biography.summary && (
                  <CardDescription className="line-clamp-3">
                    {biography.summary}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    {new Date(biography.created_at).toLocaleDateString("pt-BR")}
                  </Badge>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/bio/${biography.id}`}>Ver biografia →</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
