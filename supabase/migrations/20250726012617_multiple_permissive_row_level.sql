-- Fix RLS policy issues: multiple permissive policies and auth function optimization

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admin can manage biographies" ON public.biographies;
DROP POLICY IF EXISTS "Anyone can view biographies" ON public.biographies;
DROP POLICY IF EXISTS "Admin can manage groups" ON public.groups;
DROP POLICY IF EXISTS "Anyone can view groups" ON public.groups;
DROP POLICY IF EXISTS "Admin can manage user groups" ON public.user_groups;
DROP POLICY IF EXISTS "Users can view own group memberships" ON public.user_groups;

-- BIOGRAPHIES: Consolidate into single policy for SELECT
CREATE POLICY "View biographies policy" ON public.biographies
    FOR SELECT USING (
        -- Admin can view all
        public.is_admin() OR 
        -- Everyone can view (public access)
        true
    );

-- BIOGRAPHIES: Admin-only policies for modifications
CREATE POLICY "Admin insert biographies" ON public.biographies
    FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admin update biographies" ON public.biographies
    FOR UPDATE USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin delete biographies" ON public.biographies
    FOR DELETE USING (public.is_admin());

-- GROUPS: Consolidate into single policy for SELECT
CREATE POLICY "View groups policy" ON public.groups
    FOR SELECT USING (
        -- Admin can view all
        public.is_admin() OR 
        -- Everyone can view groups
        true
    );

-- GROUPS: Admin-only policies for modifications
CREATE POLICY "Admin insert groups" ON public.groups
    FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admin update groups" ON public.groups
    FOR UPDATE USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin delete groups" ON public.groups
    FOR DELETE USING (public.is_admin());

-- USER_GROUPS: Consolidate into single policy for SELECT with optimized auth call
CREATE POLICY "View user groups policy" ON public.user_groups
    FOR SELECT USING (
        -- Admin can view all
        public.is_admin() OR 
        -- Users can view their own group memberships
        user_id = auth.uid()
    );

-- USER_GROUPS: Admin-only policies for modifications
CREATE POLICY "Admin insert user groups" ON public.user_groups
    FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admin update user groups" ON public.user_groups
    FOR UPDATE USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin delete user groups" ON public.user_groups
    FOR DELETE USING (public.is_admin());