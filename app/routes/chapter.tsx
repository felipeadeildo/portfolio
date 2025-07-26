import { ArrowLeft, FileText, Image } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { useBiography, useChapter, useContentBlocks } from "~/hooks";
import type { Route } from "./+types/chapter";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "Capítulo - Felipe Adeildo" },
    { name: "description", content: "Conteúdo do capítulo selecionado" },
  ];
}

export default function Chapter({ params }: Route.ComponentProps) {
  const {
    data: chapter,
    isLoading: chapterLoading,
    error: chapterError,
  } = useChapter(params.chapterId);
  const { data: biography, isLoading: biographyLoading } = useBiography(
    params.biographyId,
  );
  const {
    data: contentBlocks,
    isLoading: blocksLoading,
    error: blocksError,
  } = useContentBlocks(params.chapterId);

  if (chapterLoading || biographyLoading) {
    return (
      <div className="pt-16 p-4 container mx-auto">
        <div className="mb-6">
          <Skeleton className="h-10 w-32" />
        </div>
        <Card className="mb-8">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
        </Card>
        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (chapterError || !chapter || !biography) {
    return (
      <div className="pt-16 p-4 container mx-auto">
        <div className="text-center text-red-500">
          Erro ao carregar capítulo:{" "}
          {chapterError?.message || "Capítulo não encontrado"}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 p-4 container mx-auto">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to={`/bio/${biography.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar à biografia
          </Link>
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link to={`/bio/${biography.id}`} className="hover:underline">
              {biography.title}
            </Link>
            <span>→</span>
            <span>Capítulo {chapter.position}</span>
          </div>
          <CardTitle className="text-3xl">{chapter.title}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              Criado em:{" "}
              {new Date(chapter.created_at).toLocaleDateString("pt-BR")}
            </Badge>
            {chapter.permission_required > 0 && (
              <Badge variant="destructive">
                Permissão necessária: {chapter.permission_required}
              </Badge>
            )}
          </div>
        </CardHeader>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-6">Conteúdo</h2>

        {blocksLoading ? (
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : blocksError ? (
          <div className="text-red-500">
            Erro ao carregar conteúdo: {blocksError.message}
          </div>
        ) : !contentBlocks || contentBlocks.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Nenhum conteúdo encontrado para este capítulo.
          </div>
        ) : (
          <div className="space-y-6">
            {contentBlocks.map((block, index) => (
              <Card key={block.id} className="relative">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {block.type === "TEXT" ? (
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Image className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      {block.type === "TEXT" && block.text_content && (
                        <div className="prose prose-sm max-w-none">
                          {block.text_content
                            .split("\n")
                            .map((paragraph, i) => (
                              <p key={i} className="mb-2 last:mb-0">
                                {paragraph}
                              </p>
                            ))}
                        </div>
                      )}
                      {block.type === "MEDIA" && block.media_id && (
                        <div className="text-muted-foreground">
                          Mídia ID: {block.media_id}
                          {/* Aqui você implementaria a exibição da mídia */}
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-4">
                        <Badge variant="outline" className="text-xs">
                          Posição: {block.position}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Tipo: {block.type}
                        </Badge>
                        {block.permission_required &&
                          block.permission_required > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              Permissão: {block.permission_required}
                            </Badge>
                          )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
