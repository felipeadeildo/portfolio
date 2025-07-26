-- Fix Auth RLS Initialization Plan issue
-- Replace auth.uid() with (select auth.uid()) to prevent re-evaluation for each row

-- Drop the existing policy that has the re-evaluation issue
DROP POLICY IF EXISTS "View user groups policy" ON public.user_groups;

-- Recreate the policy with optimized auth function call
CREATE POLICY "View user groups policy" ON public.user_groups
    FOR SELECT USING (
        -- Admin can view all
        public.is_admin() OR 
        -- Users can view their own group memberships (optimized auth call)
        user_id = (select auth.uid())
    );