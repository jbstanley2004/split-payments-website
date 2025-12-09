-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Applications Table
create table if not exists applications (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  stage text default 'pending_documents',
  approval_amount numeric default 25000,
  progress_percentage numeric default 0,
  
  -- JSONB columns
  business_info jsonb default '{}'::jsonb,
  contact_info jsonb default '{}'::jsonb,
  owner_info jsonb default '{}'::jsonb,
  equipment_info jsonb default '{}'::jsonb,
  verification_info jsonb default '{"status": "pending", "completed": false}'::jsonb,
  documents jsonb default '[]'::jsonb,
  messages jsonb default '[]'::jsonb,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table applications enable row level security;

-- Policies
create policy "Users can view their own application" on applications for select using ( auth.uid() = id );
create policy "Users can update their own application" on applications for update using ( auth.uid() = id );
create policy "Users can insert their own application" on applications for insert with check ( auth.uid() = id );

-- Conversations Table (for AI Chat)
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  title text,
  preview text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Messages Table (for AI Chat)
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text,
  embedded_component jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Storage bucket
insert into storage.buckets (id, name, public) values ('documents', 'documents', false)
on conflict (id) do nothing;

-- Storage Policies
create policy "Authenticated users can upload documents" on storage.objects for insert with check ( bucket_id = 'documents' and auth.role() = 'authenticated' );
create policy "Users can view their own documents" on storage.objects for select using ( bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1] );
