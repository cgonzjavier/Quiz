-- ============================================================
-- Tabla: perfiles
-- Almacena el plan de cada usuario (free / premium)
-- ============================================================
create table if not exists public.perfiles (
  id          uuid        primary key references auth.users(id) on delete cascade,
  plan        text        not null default 'free',
  created_at  timestamptz not null default now()
);

-- Solo el propio usuario puede leer su perfil
alter table public.perfiles enable row level security;

create policy "usuario puede ver su perfil"
  on public.perfiles for select
  using (auth.uid() = id);

create policy "usuario puede actualizar su perfil"
  on public.perfiles for update
  using (auth.uid() = id);

-- ============================================================
-- Trigger: crea fila en perfiles al registrarse un usuario
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.perfiles (id)
  values (new.id);
  return new;
end;
$$;

-- Elimina el trigger si ya existía (para poder re-ejecutar el script)
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
