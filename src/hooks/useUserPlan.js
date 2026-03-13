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
        setPlan(error ? 'free' : (data?.plan ?? 'free'));
        setLoading(false);
      }
    }

    fetchPlan();
    return () => { cancelled = true; };
  }, []);

  const isPremium = plan === 'premium';

  return { plan, loading, isPremium };
}
