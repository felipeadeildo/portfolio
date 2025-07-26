-- Create initial tables for biography management system

-- 1. Groups table
CREATE TABLE public.groups (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. User groups junction table
CREATE TABLE public.user_groups (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    group_id INT NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    PRIMARY KEY(user_id, group_id)
);

-- 3. Biographies table
CREATE TABLE public.biographies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Chapters table
CREATE TABLE public.chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    biography_id UUID NOT NULL REFERENCES public.biographies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    position INT NOT NULL,
    permission_required INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(biography_id, position)
);

-- 5. Content blocks table
CREATE TABLE public.content_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('TEXT','MEDIA')),
    text_content TEXT,
    media_id UUID NULL,
    position INT NOT NULL,
    permission_required INT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(chapter_id, position)
);

-- 6. Chapter user permissions table
CREATE TABLE public.chapter_user_permissions (
    chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    PRIMARY KEY(chapter_id, user_id)
);

-- 7. Chapter group permissions table
CREATE TABLE public.chapter_group_permissions (
    chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
    group_id INT NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    PRIMARY KEY(chapter_id, group_id)
);

-- 8. Block user permissions table
CREATE TABLE public.block_user_permissions (
    block_id UUID NOT NULL REFERENCES public.content_blocks(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    PRIMARY KEY(block_id, user_id)
);

-- 9. Block group permissions table
CREATE TABLE public.block_group_permissions (
    block_id UUID NOT NULL REFERENCES public.content_blocks(id) ON DELETE CASCADE,
    group_id INT NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    PRIMARY KEY(block_id, group_id)
);