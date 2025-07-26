-- Performance improvement: Add indexes for foreign keys
-- This addresses the unindexed foreign keys identified by Supabase linter

-- Index for biographies.owner_id
CREATE INDEX idx_biographies_owner_id ON public.biographies (owner_id);

-- Indexes for block_group_permissions
CREATE INDEX idx_block_group_permissions_block_id ON public.block_group_permissions (block_id);
CREATE INDEX idx_block_group_permissions_group_id ON public.block_group_permissions (group_id);

-- Indexes for block_user_permissions
CREATE INDEX idx_block_user_permissions_block_id ON public.block_user_permissions (block_id);
CREATE INDEX idx_block_user_permissions_user_id ON public.block_user_permissions (user_id);

-- Indexes for chapter_group_permissions
CREATE INDEX idx_chapter_group_permissions_chapter_id ON public.chapter_group_permissions (chapter_id);
CREATE INDEX idx_chapter_group_permissions_group_id ON public.chapter_group_permissions (group_id);

-- Indexes for chapter_user_permissions
CREATE INDEX idx_chapter_user_permissions_chapter_id ON public.chapter_user_permissions (chapter_id);
CREATE INDEX idx_chapter_user_permissions_user_id ON public.chapter_user_permissions (user_id);

-- Index for chapters.biography_id
CREATE INDEX idx_chapters_biography_id ON public.chapters (biography_id);

-- Index for content_blocks.chapter_id
CREATE INDEX idx_content_blocks_chapter_id ON public.content_blocks (chapter_id);

-- Indexes for user_groups
CREATE INDEX idx_user_groups_user_id ON public.user_groups (user_id);
CREATE INDEX idx_user_groups_group_id ON public.user_groups (group_id);

-- Additional performance indexes for common queries
-- Index for chapters ordered by position within a biography
CREATE INDEX idx_chapters_biography_position ON public.chapters (biography_id, position);

-- Index for content_blocks ordered by position within a chapter
CREATE INDEX idx_content_blocks_chapter_position ON public.content_blocks (chapter_id, position);

-- Index for biographies ordered by creation date
CREATE INDEX idx_biographies_created_at ON public.biographies (created_at DESC);

-- Index for chapters ordered by creation date
CREATE INDEX idx_chapters_created_at ON public.chapters (created_at DESC);

-- Index for content_blocks ordered by creation date
CREATE INDEX idx_content_blocks_created_at ON public.content_blocks (created_at DESC);