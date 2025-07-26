-- Enable Row Level Security on all tables
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.biographies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_user_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_group_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.block_user_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.block_group_permissions ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin (user with email ending in @felipeadeildo.com)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM auth.users 
        WHERE id = auth.uid() 
        AND email LIKE '%@felipeadeildo.com'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user belongs to a group
CREATE OR REPLACE FUNCTION public.user_in_group(group_id_param INT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_groups 
        WHERE user_id = auth.uid() AND group_id = group_id_param
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user has permission to view chapter
CREATE OR REPLACE FUNCTION public.can_view_chapter(chapter_id_param UUID)
RETURNS BOOLEAN AS $$
DECLARE
    chapter_permission INT;
    biography_owner UUID;
BEGIN
    -- Get chapter permission level and biography owner
    SELECT c.permission_required, b.owner_id 
    INTO chapter_permission, biography_owner
    FROM public.chapters c
    JOIN public.biographies b ON c.biography_id = b.id
    WHERE c.id = chapter_id_param;
    
    -- If no permission required (0), everyone can view
    IF chapter_permission = 0 THEN
        RETURN TRUE;
    END IF;
    
    -- If user is the owner, they can always view
    IF biography_owner = auth.uid() THEN
        RETURN TRUE;
    END IF;
    
    -- Check if user has direct permission
    IF EXISTS (
        SELECT 1 FROM public.chapter_user_permissions 
        WHERE chapter_id = chapter_id_param AND user_id = auth.uid()
    ) THEN
        RETURN TRUE;
    END IF;
    
    -- Check if user belongs to a group with permission
    IF EXISTS (
        SELECT 1 FROM public.chapter_group_permissions cgp
        JOIN public.user_groups ug ON cgp.group_id = ug.group_id
        WHERE cgp.chapter_id = chapter_id_param AND ug.user_id = auth.uid()
    ) THEN
        RETURN TRUE;
    END IF;
    
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user has permission to view content block
CREATE OR REPLACE FUNCTION public.can_view_block(block_id_param UUID)
RETURNS BOOLEAN AS $$
DECLARE
    block_permission INT;
    chapter_id_param UUID;
    biography_owner UUID;
BEGIN
    -- Get block permission level, chapter id, and biography owner
    SELECT cb.permission_required, cb.chapter_id, b.owner_id
    INTO block_permission, chapter_id_param, biography_owner
    FROM public.content_blocks cb
    JOIN public.chapters c ON cb.chapter_id = c.id
    JOIN public.biographies b ON c.biography_id = b.id
    WHERE cb.id = block_id_param;
    
    -- If no permission required, check chapter permission
    IF block_permission IS NULL THEN
        RETURN public.can_view_chapter(chapter_id_param);
    END IF;
    
    -- If user is the owner, they can always view
    IF biography_owner = auth.uid() THEN
        RETURN TRUE;
    END IF;
    
    -- Check if user has direct permission to the block
    IF EXISTS (
        SELECT 1 FROM public.block_user_permissions 
        WHERE block_id = block_id_param AND user_id = auth.uid()
    ) THEN
        RETURN TRUE;
    END IF;
    
    -- Check if user belongs to a group with permission to the block
    IF EXISTS (
        SELECT 1 FROM public.block_group_permissions bgp
        JOIN public.user_groups ug ON bgp.group_id = ug.group_id
        WHERE bgp.block_id = block_id_param AND ug.user_id = auth.uid()
    ) THEN
        RETURN TRUE;
    END IF;
    
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- GROUPS POLICIES
-- Only admin can create, update, delete groups
CREATE POLICY "Admin can manage groups" ON public.groups
    FOR ALL USING (public.is_admin());

-- Everyone can view groups
CREATE POLICY "Anyone can view groups" ON public.groups
    FOR SELECT USING (true);

-- USER_GROUPS POLICIES
-- Only admin can manage user group assignments
CREATE POLICY "Admin can manage user groups" ON public.user_groups
    FOR ALL USING (public.is_admin());

-- Users can view their own group memberships
CREATE POLICY "Users can view own group memberships" ON public.user_groups
    FOR SELECT USING (user_id = auth.uid());

-- BIOGRAPHIES POLICIES
-- Only admin can create, update, delete biographies
CREATE POLICY "Admin can manage biographies" ON public.biographies
    FOR ALL USING (public.is_admin());

-- Everyone can view biographies (chapter/block level permissions control detailed access)
CREATE POLICY "Anyone can view biographies" ON public.biographies
    FOR SELECT USING (true);

-- CHAPTERS POLICIES
-- Only admin can manage chapters
CREATE POLICY "Admin can manage chapters" ON public.chapters
    FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update chapters" ON public.chapters
    FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admin can delete chapters" ON public.chapters
    FOR DELETE USING (public.is_admin());

-- Users can view chapters based on permissions
CREATE POLICY "Users can view permitted chapters" ON public.chapters
    FOR SELECT USING (public.can_view_chapter(id));

-- CONTENT_BLOCKS POLICIES
-- Only admin can manage content blocks
CREATE POLICY "Admin can manage content blocks" ON public.content_blocks
    FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update content blocks" ON public.content_blocks
    FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admin can delete content blocks" ON public.content_blocks
    FOR DELETE USING (public.is_admin());

-- Users can view content blocks based on permissions
CREATE POLICY "Users can view permitted content blocks" ON public.content_blocks
    FOR SELECT USING (public.can_view_block(id));

-- CHAPTER_USER_PERMISSIONS POLICIES
-- Only admin can manage chapter user permissions
CREATE POLICY "Admin can manage chapter user permissions" ON public.chapter_user_permissions
    FOR ALL USING (public.is_admin());

-- CHAPTER_GROUP_PERMISSIONS POLICIES
-- Only admin can manage chapter group permissions
CREATE POLICY "Admin can manage chapter group permissions" ON public.chapter_group_permissions
    FOR ALL USING (public.is_admin());

-- BLOCK_USER_PERMISSIONS POLICIES
-- Only admin can manage block user permissions
CREATE POLICY "Admin can manage block user permissions" ON public.block_user_permissions
    FOR ALL USING (public.is_admin());

-- BLOCK_GROUP_PERMISSIONS POLICIES
-- Only admin can manage block group permissions
CREATE POLICY "Admin can manage block group permissions" ON public.block_group_permissions
    FOR ALL USING (public.is_admin());