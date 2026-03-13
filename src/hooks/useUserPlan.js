import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useUserPlan() {
  const [plan, setPlan] = useState(null);   // null = cargando
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchPlan() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data, error } = await supabase
        .from('perfiles')
        .select('plan')
        .eq('id', user.id)
        .single();

      if (!cancelled) {
        const resolvedPlan = error ? 'free' : (data?.plan ?? 'free');
        console.log('[useUserPlan] user:', user.id, '| plan:', resolvedPlan, '| error:', error?.message ?? null);
        setPlan(resolvedPlan);
        setLoading(false);
      }
    }

    fetchPlan();
    return () => { cancelled = true; };
  }, []);

  const isPremium = plan === 'premium';

  return { plan, loading, isPremium };
}
