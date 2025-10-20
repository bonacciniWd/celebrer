This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Supabase (parceiros)

SQL para criar a tabela e políticas mínimas:

```sql
create table if not exists public.partners (
  id bigserial primary key,
  auth_user_id uuid references auth.users(id) on delete set null,
  partner_type text not null check (partner_type in ('fornecedor','espaco')),
  segment text not null,
  name text not null,
  state text not null,
  city text not null,
  email text not null,
  phone text not null,
  username text not null,
  activatedUser boolean not null default false,
  approved boolean not null default false,
  paid boolean not null default false,
  created_at timestamp with time zone default now()
);

-- Campos adicionais para perfil público
alter table public.partners add column if not exists description text;
alter table public.partners add column if not exists website text;
alter table public.partners add column if not exists instagram text;
alter table public.partners add column if not exists cover_image text;     -- url
alter table public.partners add column if not exists gallery text[];       -- array de urls
create unique index if not exists partners_email_uidx on public.partners(email);

create index if not exists idx_partners_type on public.partners(partner_type);
create index if not exists idx_partners_city on public.partners(city);
create index if not exists idx_partners_approved_paid on public.partners(approved, paid);

alter table public.partners enable row level security;

create policy "read_public_approved_paid"
on public.partners
for select
to anon, authenticated
using (approved = true and paid = true);

create policy "insert_anyone"
on public.partners
for insert
to anon, authenticated
with check (true);
```

### Storage (imagens)

SQL para bucket público `images` e políticas mínimas:

```sql
insert into storage.buckets (id, name, public) values ('images', 'images', true) on conflict (id) do nothing;

drop policy if exists "public read" on storage.objects;
create policy "public read" on storage.objects for select to public using ( bucket_id = 'images' );

drop policy if exists "authenticated write" on storage.objects;
create policy "authenticated write" on storage.objects for insert to authenticated with check ( bucket_id = 'images' );

drop policy if exists "authenticated update" on storage.objects;
create policy "authenticated update" on storage.objects for update to authenticated using ( bucket_id = 'images' );

drop policy if exists "authenticated delete" on storage.objects;
create policy "authenticated delete" on storage.objects for delete to authenticated using ( bucket_id = 'images' );
```

Para upload no frontend, utilize `supabase.storage.from('images').upload('user-uuid/arquivo.jpg', file)` e salve a URL pública retornada.