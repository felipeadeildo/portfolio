import { ArrowLeft, Book } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { useBiography, useChapters } from "~/hooks";
import type { Route } from "./+types/biography";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "Biografia - Felipe Adeildo" },
    { name: "description", content: "Detalhes da biografia selecionada" },
  ];
}

export default function Biography({ params }: Route.ComponentProps) {
  const {
    data: biography,
    isLoading: biographyLoading,
    error: biographyError,
  } = useBiography(params.id);
  const {
    data: chapters,
    isLoading: chaptersLoading,
    error: chaptersError,
  } = useChapters(params.id);

  if (biographyLoading) {
    return (
      <div className="pt-16 p-4 container mx-auto">
        <div className="mb-6">
          <Skeleton className="h-10 w-32" />
        </div>
        <Card className="mb-8">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
        </Card>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (biographyError || !biography) {
    return (
      <div className="pt-16 p-4 container mx-auto">
        <div className="text-center text-red-500">
          Erro ao carregar biografia:{" "}
          {biographyError?.message || "Biografia não encontrada"}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 p-4 container mx-auto">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/biographies">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar às biografias
          </Link>
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">{biography.title}</CardTitle>
          {biography.summary && (
            <CardDescription className="text-lg mt-2">
              {biography.summary}
            </CardDescription>
          )}
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              Criado em:{" "}
              {new Date(biography.created_at).toLocaleDateString("pt-BR")}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Book className="h-6 w-6" />
          Capítulos
        </h2>

        {chaptersLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : chaptersError ? (
          <div className="text-red-500">
            Erro ao carregar capítulos: {chaptersError.message}
          </div>
        ) : !chapters || chapters.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Nenhum capítulo encontrado para esta biografia.
          </div>
        ) : (
          <div className="space-y-4">
            {chapters.map((chapter, index) => (
              <Card
                key={chapter.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl">
                        {index + 1}. {chapter.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          Posição: {chapter.position}
                        </Badge>
                        {chapter.permission_required > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            Permissão necessária: {chapter.permission_required}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/bio/${biography.id}/chapter/${chapter.id}`}>
                        Ver capítulo →
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
